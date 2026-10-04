"use client";

import { useEffect, useRef, useState } from "react";
import { BookChallenges, ChallengesTab, CreateChallenge, JoinSheet } from "./ChallengeScreens";
import { BottomNav, HomeScreen } from "./HomeScreen";
import { Ceremony, LeaderboardScreen, LibraryScreen, ProfileScreen, SettingsSheet, WalletSheet } from "./MoreScreens";
import { ReadingFlow } from "./ReadingFlow";
import { ERROR_COPY } from "@/lib/data";
import { createSettlementService } from "@/lib/settlement";
import { StoreProvider, useStore } from "@/lib/store";
import type { TxPhase } from "@/lib/types";

const settlement = createSettlementService();

export function App() {
  return (
    <StoreProvider>
      <Phone />
    </StoreProvider>
  );
}

function Phone() {
  const { state, dispatch } = useStore();
  const frame = useFrame();
  const [splash, setSplash] = useState(true);
  const [splashOut, setSplashOut] = useState(false);
  const top = state.ui.stack[state.ui.stack.length - 1];
  const lock = useRef(false);
  const showNav = !top && !state.ui.tx;
  const screenKey = top ? `${top.name}-${"bookId" in top ? top.bookId : ""}-${"challengeId" in top ? top.challengeId : ""}` : state.ui.tab;

  useEffect(() => {
    const fade = window.setTimeout(() => setSplashOut(true), 2200);
    const done = window.setTimeout(() => setSplash(false), 3000);
    return () => {
      window.clearTimeout(fade);
      window.clearTimeout(done);
    };
  }, []);

  async function confirmJoin(challengeId: string) {
    if (lock.current) return;
    const challenge = state.data.challenges.find((item) => item.id === challengeId);
    if (!challenge) return;
    lock.current = true;
    dispatch({ type: "tx", tx: { stage: "confirming" } });
    await wait(680);
    dispatch({ type: "tx", tx: { stage: "processing" } });
    const result = await settlement.joinChallenge({
      wallet: state.data.wallet,
      entryFee: challenge.entryFee,
      players: challenge.players,
      maxPlayers: challenge.maxPlayers,
      endsAt: challenge.endsAt,
      now: Date.now(),
    });
    await wait(820);
    if (!result.ok || !result.hash) {
      dispatch({ type: "tx", tx: { stage: "failed", message: ERROR_COPY[result.error ?? "failed"] } });
      lock.current = false;
      return;
    }
    dispatch({ type: "join", challengeId, result });
    const next: TxPhase = { stage: "confirmed", hash: result.hash, bookId: challenge.bookId, challengeId };
    dispatch({ type: "tx", tx: next });
    await wait(880);
    dispatch({ type: "tx", tx: { stage: "in", hash: result.hash, bookId: challenge.bookId, challengeId } });
    lock.current = false;
  }

  return (
    <div className={frame.native ? "stage native" : "stage"} style={frame.native ? undefined : { height: "100dvh" }}>
      <div style={frame.native ? undefined : { width: 390 * frame.scale, height: 844 * frame.scale }}>
      <div
        className={frame.native ? "device native" : "device"}
        style={
          frame.native
            ? undefined
            : {
                width: 390,
                height: 844,
                borderRadius: 36,
                transform: `scale(${frame.scale})`,
                transformOrigin: "top left",
              }
        }
      >
        {frame.native && <div className="safe-top" />}
        <div className="device-main">
          <div key={screenKey} className={top ? (state.ui.dir === "forward" ? "anim-forward screen-wrap" : "anim-back screen-wrap") : "tab-pane screen-wrap"}>
            {!top && state.ui.tab === "home" && <HomeScreen />}
            {!top && state.ui.tab === "challenges" && <ChallengesTab />}
            {!top && state.ui.tab === "library" && <LibraryScreen />}
            {!top && state.ui.tab === "leaderboard" && <LeaderboardScreen />}
            {!top && state.ui.tab === "profile" && <ProfileScreen />}
            {top?.name === "challenges" && <BookChallenges bookId={top.bookId} />}
            {top?.name === "create" && <CreateChallenge bookId={top.bookId} />}
            {(top?.name === "reading" || top?.name === "winner" || top?.name === "checkpoint" || top?.name === "final") && (
              <ReadingFlow bookId={top.bookId} challengeId={top.challengeId} />
            )}
          </div>
        </div>
        {!state.data.seenDemoNote && !top && (
          <div className="demo-bar">
            <span>Demo mode · balances are simulated</span>
            <button onClick={() => dispatch({ type: "demo-seen" })} aria-label="Dismiss demo note">Close</button>
          </div>
        )}
        {showNav && <BottomNav native={frame.native} />}
        {state.ui.sheet?.type === "join" && <JoinSheet challengeId={state.ui.sheet.challengeId} onConfirm={confirmJoin} />}
        {state.ui.sheet?.type === "wallet" && <WalletSheet />}
        {state.ui.sheet?.type === "reading-settings" && <SettingsSheet />}
        {state.ui.tx && (
          <Ceremony
            stage={state.ui.tx.stage}
            hash={"hash" in state.ui.tx ? state.ui.tx.hash : undefined}
            message={state.ui.tx.stage === "failed" ? state.ui.tx.message : undefined}
            onClose={() => dispatch({ type: "tx", tx: null })}
            onRetry={() => dispatch({ type: "tx", tx: null })}
            onStart={() => {
              if (state.ui.tx && state.ui.tx.stage === "in") {
                const { bookId, challengeId } = state.ui.tx;
                dispatch({ type: "tx", tx: null });
                dispatch({ type: "push", screen: { name: "reading", bookId, challengeId } });
              }
            }}
          />
        )}
        {state.ui.toast && <div className="toast">{state.ui.toast.message}</div>}
        {splash && (
          <div className={splashOut ? "splash out" : "splash"} aria-hidden={splashOut}>
            <img src="/bookster-logo.png" alt="" />
          </div>
        )}
      </div>
      </div>
    </div>
  );
}

function useFrame() {
  const [frame, setFrame] = useState({ scale: 1, native: false });
  useEffect(() => {
    const fit = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const native = vw <= 520;
      if (native) {
        setFrame({ scale: 1, native: true });
        return;
      }
      const scale = Math.min(1, (vw - 40) / 390, (vh - 40) / 844);
      setFrame({ scale, native: false });
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);
  return frame;
}

function wait(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}
