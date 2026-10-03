"use client";

import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { MiniCover } from "./BookCover";
import { WalletIcon } from "./icons";
import { npcBoards, getBook } from "@/lib/data";
import { formatUsdc, ordinal, readingPercent, standing, walletAmount } from "@/lib/format";
import { useData, useStore } from "@/lib/store";
import type { BoardRow, Profile } from "@/lib/types";

type LibraryTab = "reading" | "completed" | "saved";
type Board = "week" | "month" | "all";

const seedOrder: Record<Board, string[]> = {
  week: ["nora", "elias", "alex", "kenji", "priya", "leah"],
  month: ["samira", "nora", "alex", "mateo", "hana", "elias"],
  all: ["jordan", "samira", "mina", "alex", "nora", "kenji", "leah"],
};
const memory: Record<Board, string[]> = { week: seedOrder.week, month: seedOrder.month, all: seedOrder.all };

export function LibraryScreen() {
  const data = useData();
  const { dispatch } = useStore();
  const [tab, setTab] = useState<LibraryTab>("reading");
  const reading = data.participations.filter((item) => item.status === "active");
  return (
    <section className="screen tab-pane">
      <header className="topbar"><div className="top-grow"><h1>Library</h1></div></header>
      <div className="tabs">
        {([["reading", "Currently reading"], ["completed", "Completed"], ["saved", "Saved"]] as const).map(([id, label]) => (
          <button key={id} className={tab === id ? "on" : ""} onClick={() => setTab(id)}>{label}</button>
        ))}
      </div>
      <div className="screen-body">
        {tab === "reading" && reading.map((item) => {
          const book = getBook(item.bookId);
          const challenge = data.challenges.find((entry) => entry.id === item.challengeId);
          if (!book || !challenge) return null;
          const progress = readingPercent(item.chaptersRead, book.chapters.length);
          const place = standing(progress, challenge.rivals);
          return (
            <button key={item.challengeId} className="list-row" onClick={() => dispatch({ type: "push", screen: { name: "reading", bookId: book.id, challengeId: item.challengeId } })}>
              <MiniCover book={book} />
              <span>
                <b>{book.title}</b>
                <small>{book.author}</small>
                <small>Knowledge {item.knowledgeScore}% · #{place}</small>
                <span className="progress-slim"><i style={{ width: `${progress}%` }} /></span>
              </span>
              <span className="list-end">
                <b>{progress}%</b>
              </span>
            </button>
          );
        })}
        {tab === "reading" && reading.length === 0 && <p className="kicker">Join a challenge to start reading.</p>}
        {tab === "completed" && data.history.map((item) => {
          const book = item.bookId ? getBook(item.bookId) : undefined;
          const pending = data.participations.find((entry) => entry.bookId === item.bookId && entry.status === "won");
          return (
            <button key={item.id} className="list-row" onClick={() => {
              if (pending) dispatch({ type: "push", screen: { name: "winner", bookId: pending.bookId, challengeId: pending.challengeId } });
            }}>
              <MiniCover book={book} plain={book ? undefined : item} />
              <span>
                <b>{item.title}</b>
                <small>{item.author} · {item.date}</small>
              </span>
              <span className="list-end">
                <b>{item.knowledge}%</b>
                <small>{item.result}{item.prize ? ` · ${formatUsdc(item.prize)} USDC` : ""}</small>
                {pending && <small>Claim reward</small>}
              </span>
            </button>
          );
        })}
        {tab === "saved" && data.savedBookIds.map((id) => {
          const book = getBook(id);
          if (!book) return null;
          return (
            <button key={id} className="list-row" onClick={() => dispatch({ type: "push", screen: { name: "challenges", bookId: id } })}>
              <MiniCover book={book} />
              <span><b>{book.title}</b><small>{book.author}</small></span>
              <span className="list-end"><small>View challenges</small></span>
            </button>
          );
        })}
        {tab === "saved" && data.savedBookIds.length === 0 && <p className="kicker">No saved books yet.</p>}
      </div>
    </section>
  );
}

export function LeaderboardScreen() {
  const data = useData();
  const [tab, setTab] = useState<Board>("week");
  const rows = useMemo(() => buildRows(tab, data.profile), [tab, data.profile]);
  const order = rows.map((row) => row.id).join("|");
  const [shift, setShift] = useState<Record<string, number>>({});
  const [animate, setAnimate] = useState(false);
  const seen = useRef(order);

  useLayoutEffect(() => {
    if (seen.current === order) return;
    const previous = memory[tab];
    const nextShift: Record<string, number> = {};
    rows.forEach((row, index) => {
      const before = previous.indexOf(row.id);
      if (before >= 0 && before !== index) nextShift[row.id] = (before - index) * 64;
    });
    memory[tab] = rows.map((row) => row.id);
    seen.current = order;
    if (Object.keys(nextShift).length === 0) return;
    setAnimate(false);
    setShift(nextShift);
    const frame = requestAnimationFrame(() => {
      setAnimate(true);
      setShift({});
    });
    return () => cancelAnimationFrame(frame);
  }, [order, rows, tab]);

  return (
    <section className="screen tab-pane">
      <header className="topbar"><div className="top-grow"><h1>Leaderboard</h1></div></header>
      <div className="tabs">
        {([["week", "Week"], ["month", "Month"], ["all", "All time"]] as const).map(([id, label]) => (
          <button key={id} className={tab === id ? "on" : ""} onClick={() => setTab(id)}>{label}</button>
        ))}
      </div>
      <div className="screen-body">
        {rows.map((row, index) => (
          <div
            key={row.id}
            className={row.id === "alex" ? "board-row me" : "board-row"}
            style={{
              transform: shift[row.id] ? `translateY(${shift[row.id]}px)` : undefined,
              transition: animate ? "transform 520ms cubic-bezier(0.22, 1, 0.36, 1)" : "none",
            }}
          >
            <span className={index < 3 ? "rank top" : "rank"}>{index + 1}</span>
            <span className={row.id === "alex" ? "avatar me" : "avatar"}>{row.name.slice(0, 1)}</span>
            <span>
              <b>{row.name}</b>
              <small className="muted">{row.books} books · {row.wins} wins · {row.knowledge}%</small>
            </span>
            <span className="earned">{formatUsdc(row.usdc)} USDC</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function buildRows(tab: Board, profile: Profile): BoardRow[] {
  const alex: BoardRow = tab === "all"
    ? { id: "alex", name: "Alex", books: profile.booksCompleted, wins: profile.challengesWon, knowledge: profile.avgKnowledge, usdc: profile.usdcEarned }
    : { id: "alex", name: "Alex", ...profile[tab] };
  return [...npcBoards[tab], alex].sort((a, b) => b.usdc - a.usdc || b.wins - a.wins);
}

const achievements = [
  { label: "First Book", test: (profile: Profile) => profile.booksCompleted >= 1 },
  { label: "First Challenge", test: (profile: Profile) => profile.challengesJoined >= 1 },
  { label: "First Win", test: (profile: Profile) => profile.challengesWon >= 1 },
  { label: "5 Books", test: (profile: Profile) => profile.booksCompleted >= 5 },
  { label: "10 Challenges", test: (profile: Profile) => profile.challengesJoined >= 10 },
  { label: "Knowledge Master", test: (profile: Profile) => profile.avgKnowledge >= 90 },
  { label: "7 Day Streak", test: (profile: Profile) => profile.streak >= 7 },
];

export function ProfileScreen() {
  const data = useData();
  const { dispatch } = useStore();
  const profile = data.profile;
  const rows = [
    ["Books completed", String(profile.booksCompleted)],
    ["Challenges joined", String(profile.challengesJoined)],
    ["Challenges won", String(profile.challengesWon)],
    ["USDC earned", `${formatUsdc(profile.usdcEarned)} USDC`],
    ["Average knowledge", `${profile.avgKnowledge}%`],
    ["Reading streak", `${profile.streak} days`],
  ];
  return (
    <section className="screen tab-pane">
      <div className="screen-body" style={{ paddingTop: 18 }}>
        <div className="avatar me" style={{ width: 56, height: 56, fontSize: 20 }}>A</div>
        <h1 className="profile-name">{profile.name}</h1>
        <p className="address">{data.wallet.address}</p>
        <p className="kicker">Simulated wallet · Demo mode</p>
        <button className="line-btn" style={{ marginTop: 16 }} onClick={() => dispatch({ type: "sheet", sheet: { type: "wallet" } })}>
          {data.walletConnected ? `${walletAmount(data.wallet.available)} USDC AVAILABLE` : "CONNECT WALLET"}
        </button>
        <div className="stat-list">
          {rows.map(([label, value]) => (
            <div className="kv" key={label}><span>{label}</span><b>{value}</b></div>
          ))}
        </div>
        <p className="kicker" style={{ marginTop: 22 }}>ACHIEVEMENTS</p>
        {achievements.map((item) => {
          const on = item.test(profile);
          return (
            <div className={on ? "achieve on" : "achieve"} key={item.label}>
              <span>{item.label}</span>
              <em>{on ? "Unlocked" : "Locked"}</em>
            </div>
          );
        })}
        <button className="ghost-btn" onClick={() => dispatch({ type: "reset" })}>Reset demo</button>
      </div>
    </section>
  );
}

export function WalletSheet() {
  const data = useData();
  const { dispatch } = useStore();
  const [connecting, setConnecting] = useState(false);
  const total = data.wallet.available + data.wallet.locked;

  function connect() {
    if (connecting || data.walletConnected) return;
    setConnecting(true);
    window.setTimeout(() => {
      dispatch({ type: "connect-wallet" });
      setConnecting(false);
    }, 700);
  }

  return (
    <>
      <button className="sheet-backdrop" aria-label="Close wallet" onClick={() => dispatch({ type: "sheet", sheet: null })} />
      <div className="sheet" role="dialog" aria-label="Wallet">
        <div className="handle" />
        {!data.walletConnected ? (
          <>
            <p className="eyebrow">DEMO MODE</p>
            <h2 style={{ fontSize: 28 }}>Connect a wallet</h2>
            <p className="desc">A simulated wallet on this device. Balances and history stay hidden until you connect.</p>
            <div className="wallet-option">
              <span className="wallet-glyph"><WalletIcon /></span>
              <span>
                <b>Bookster Demo</b>
                <small>{data.profile.name} · {data.wallet.address}</small>
              </span>
            </div>
            <button className="gold-btn" disabled={connecting} onClick={connect}>
              {connecting ? "CONNECTING" : "CONNECT WALLET"}
            </button>
            <p className="kicker" style={{ marginTop: 12, textAlign: "center" }}>No network. No real USDC.</p>
          </>
        ) : (
          <>
            <p className="eyebrow">DEMO MODE</p>
            <h2 style={{ fontSize: 28 }}>{walletAmount(data.wallet.available)}</h2>
            <p className="kicker">Available USDC · simulated, on this device</p>
            <div className="kv"><span>Available</span><b>{walletAmount(data.wallet.available)} USDC</b></div>
            <div className="kv"><span>Locked</span><b>{walletAmount(data.wallet.locked)} USDC</b></div>
            <div className="kv emph"><span>Total</span><b>{walletAmount(total)} USDC</b></div>
            <p className="address">{data.wallet.address}</p>
            <p className="kicker" style={{ margin: "18px 0 6px" }}>RECENT</p>
            {data.transactions.slice(0, 6).map((tx) => (
              <div className="kv" key={tx.id}>
                <span>{tx.title}<br /><small>{tx.hash}</small></span>
                <b style={{ color: tx.amount > 0 ? "#e0c396" : "#f4f0e8" }}>{tx.amount > 0 ? "+" : ""}{formatUsdc(tx.amount)} USDC</b>
              </div>
            ))}
            <button className="ghost-btn" onClick={() => dispatch({ type: "disconnect-wallet" })}>Disconnect</button>
          </>
        )}
      </div>
    </>
  );
}

export function SettingsSheet() {
  const data = useData();
  const { dispatch } = useStore();
  return (
    <>
      <button className="sheet-backdrop" aria-label="Close settings" onClick={() => dispatch({ type: "sheet", sheet: null })} />
      <div className="sheet" role="dialog" aria-label="Reading settings">
        <div className="handle" />
        <h2>Reading</h2>
        <div className="field">
          <p>SIZE</p>
          <div className="choices">
            {(["s", "m", "l"] as const).map((size) => (
              <button key={size} className={data.fontSize === size ? "chip on" : "chip"} onClick={() => dispatch({ type: "font", size })}>
                {size === "s" ? "Small" : size === "m" ? "Medium" : "Large"}
              </button>
            ))}
          </div>
        </div>
        <div className="field">
          <p>LINE SPACING</p>
          <div className="choices">
            <button className={!data.relaxedLines ? "chip on" : "chip"} onClick={() => data.relaxedLines && dispatch({ type: "lines" })}>Comfortable</button>
            <button className={data.relaxedLines ? "chip on" : "chip"} onClick={() => !data.relaxedLines && dispatch({ type: "lines" })}>Relaxed</button>
          </div>
        </div>
      </div>
    </>
  );
}

export function Ceremony({
  stage,
  hash,
  message,
  onStart,
  onClose,
  onRetry,
}: {
  stage: "confirming" | "processing" | "confirmed" | "in" | "failed";
  hash?: string;
  message?: string;
  onStart: () => void;
  onClose: () => void;
  onRetry: () => void;
}) {
  const title = {
    confirming: "Confirming Entry",
    processing: "Processing…",
    confirmed: "Transaction Confirmed",
    in: "You’re in",
    failed: "Something went wrong",
  }[stage];
  return (
    <div className="overlay">
      <div className="step" key={stage}>
        {(stage === "confirmed" || stage === "in") && <div className="check"><span style={{ fontSize: 18 }}>✓</span></div>}
        <p className="eyebrow">{stage === "in" ? "CHALLENGE JOINED" : "DEMO MODE"}</p>
        <h2 style={{ fontSize: stage === "in" ? 40 : 32, fontWeight: 520, letterSpacing: "-0.04em" }}>{title}</h2>
        {stage === "failed" && <p className="note">{message}</p>}
        {(stage === "confirming" || stage === "processing") && <div className="bar"><i /></div>}
        {hash && stage !== "failed" && <p className="hash">Reference · {hash}</p>}
        {stage === "in" && <button className="gold-btn" onClick={onStart}>START READING</button>}
        {stage === "failed" && <button className="gold-btn" onClick={onRetry}>TRY AGAIN</button>}
        {stage === "failed" && <button className="ghost-btn" onClick={onClose}>Close</button>}
      </div>
    </div>
  );
}

export function positionLabel(progress: number, rivals: number[]) {
  return ordinal(standing(progress, rivals));
}
