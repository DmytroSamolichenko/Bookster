"use client";

import { useMemo, useState } from "react";
import { MiniCover } from "./BookCover";
import { Chevron } from "./icons";
import { books, getBook } from "@/lib/data";
import { formatRemaining, formatUsdc } from "@/lib/format";
import { PLATFORM_FEE, quotedPrize } from "@/lib/settlement";
import { participationFor, useData, useStore, useUi } from "@/lib/store";
import type { Challenge } from "@/lib/types";

const fees = [0, 5, 10, 25];

export function ChallengesTab() {
  const data = useData();
  const ui = useUi();
  const { dispatch } = useStore();
  const [filter, setFilter] = useState<"All" | "Mine" | "Ending soon">("All");
  const rows = useMemo(() => {
    const open = data.challenges.filter((item) => item.endsAt > ui.now && !item.seededExpired);
    if (filter === "Mine") {
      const ids = new Set(data.participations.map((item) => item.challengeId));
      return data.challenges.filter((item) => ids.has(item.id));
    }
    const list = open.filter((item) => item.players < item.maxPlayers);
    return filter === "Ending soon" ? [...list].sort((a, b) => a.endsAt - b.endsAt) : list;
  }, [data, filter, ui.now]);

  return (
    <section className="screen tab-pane">
      <header className="topbar">
        <div className="top-grow"><h1>Challenges</h1></div>
        <button className="top-action" onClick={() => dispatch({ type: "push", screen: { name: "create" } })}>Create</button>
      </header>
      <div className="filters">
        {(["All", "Mine", "Ending soon"] as const).map((item) => (
          <button key={item} className={filter === item ? "chip on" : "chip"} onClick={() => setFilter(item)}>{item}</button>
        ))}
      </div>
      <div className="screen-body">
        {rows.map((challenge) => {
          const book = getBook(challenge.bookId);
          const mine = participationFor(data, challenge.id);
          return (
            <button key={challenge.id} className="list-row" onClick={() => openChallenge(challenge, mine?.status, dispatch)}>
              {book && <MiniCover book={book} />}
              <span>
                <b>{book?.title}</b>
                <small>#{challenge.number} · {formatUsdc(challenge.entryFee)} USDC · {challenge.players}/{challenge.maxPlayers}</small>
              </span>
              <span className="list-end">
                <b>{formatUsdc(challenge.pool)}</b>
                <small>{mine ? mine.status === "active" ? "Joined" : "Won" : formatRemaining(challenge.endsAt, ui.now)}</small>
              </span>
            </button>
          );
        })}
        {rows.length === 0 && <p className="kicker">Nothing in this view.</p>}
      </div>
    </section>
  );
}

export function BookChallenges({ bookId }: { bookId: string }) {
  const book = getBook(bookId);
  const data = useData();
  const ui = useUi();
  const { dispatch } = useStore();
  const [fee, setFee] = useState(0);
  if (!book) return null;
  const saved = data.savedBookIds.includes(bookId);
  const list = data.challenges
    .filter((item) => item.bookId === bookId && (fee === 0 || item.entryFee === fee))
    .sort((a, b) => rank(a, ui.now) - rank(b, ui.now) || a.number - b.number);

  return (
    <section className="screen">
      <header className="topbar">
        <button className="back" aria-label="Back" onClick={() => dispatch({ type: "pop" })}><Chevron dir="left" /></button>
        <div className="top-grow"><h1>{book.title}</h1></div>
        <button className="top-action" onClick={() => dispatch({ type: "save", bookId })}>{saved ? "Saved" : "Save"}</button>
      </header>
      <p className="kicker" style={{ padding: "0 18px 8px" }}>Commit demo USDC. Finish first, with verified comprehension.</p>
      <div className="filters">
        {fees.map((item) => (
          <button key={item} className={fee === item ? "chip on" : "chip"} onClick={() => setFee(item)}>
            {item === 0 ? "All" : `${item} USDC`}
          </button>
        ))}
      </div>
      <div className="screen-body">
        {list.map((challenge) => (
          <ChallengeCard key={challenge.id} challenge={challenge} now={ui.now} />
        ))}
        {list.length === 0 && <p className="kicker">No challenges at this entry.</p>}
      </div>
    </section>
  );
}

function ChallengeCard({ challenge, now }: { challenge: Challenge; now: number }) {
  const data = useData();
  const { dispatch } = useStore();
  const mine = participationFor(data, challenge.id);
  const expired = challenge.endsAt <= now;
  const full = challenge.players >= challenge.maxPlayers && !mine;
  const label = mine ? (mine.status === "active" ? "CONTINUE" : "VIEW RESULT") : full ? "FULL" : expired ? "ENDED" : "JOIN";
  return (
    <article className="card">
      <div className="card-top">
        <h2 className="card-id">#{challenge.number}</h2>
        <span className="tiny muted">{formatRemaining(challenge.endsAt, now)}</span>
      </div>
      <p className="tiny muted" style={{ margin: "6px 0 0" }}>{formatUsdc(challenge.entryFee)} USDC entry</p>
      <p className="prize">{formatUsdc(challenge.pool)} <span>prize pool</span></p>
      <div className="card-foot">
        <span>{challenge.players} / {challenge.maxPlayers} players</span>
        <span>Minimum knowledge {challenge.minKnowledge}%</span>
      </div>
      <button className={mine ? "gold-btn" : "line-btn"} onClick={() => openChallenge(challenge, mine?.status, dispatch)}>
        {label}
      </button>
    </article>
  );
}

function rank(challenge: Challenge, now: number) {
  if (challenge.endsAt <= now) return 3;
  if (challenge.players >= challenge.maxPlayers) return 2;
  if (challenge.featured) return 0;
  return 1;
}

function openChallenge(
  challenge: Challenge,
  status: "active" | "won" | "claimed" | undefined,
  dispatch: ReturnType<typeof useStore>["dispatch"],
) {
  if (status === "active") {
    dispatch({ type: "push", screen: { name: "reading", bookId: challenge.bookId, challengeId: challenge.id } });
    return;
  }
  if (status === "won" || status === "claimed") {
    dispatch({ type: "push", screen: { name: "winner", bookId: challenge.bookId, challengeId: challenge.id } });
    return;
  }
  dispatch({ type: "sheet", sheet: { type: "join", challengeId: challenge.id } });
}

export function JoinSheet({ challengeId, onConfirm }: { challengeId: string; onConfirm: (id: string) => void }) {
  const data = useData();
  const ui = useUi();
  const { dispatch } = useStore();
  const challenge = data.challenges.find((item) => item.id === challengeId);
  const book = challenge ? getBook(challenge.bookId) : undefined;
  const [error, setError] = useState<string | null>(null);
  if (!challenge || !book) return null;
  const expired = challenge.endsAt <= ui.now;
  const full = challenge.players >= challenge.maxPlayers;
  const poor = data.wallet.available < challenge.entryFee;
  const message = error || (expired ? "This challenge has ended." : full ? "This challenge is already full." : poor ? "Not enough demo USDC" : null);
  const prize = quotedPrize(challenge.pool);
  return (
    <>
      <button className="sheet-backdrop" aria-label="Close" onClick={() => dispatch({ type: "sheet", sheet: null })} />
      <div className="sheet" role="dialog" aria-label="Join challenge">
        <div className="handle" />
        <p className="kicker">{book.title}</p>
        <h2 style={{ fontSize: 28, marginTop: 6 }}>#{challenge.number}</h2>
        <div className="kv"><span>Entry</span><b>{formatUsdc(challenge.entryFee)} USDC</b></div>
        <div className="kv"><span>Prize pool</span><b>{formatUsdc(challenge.pool)} USDC</b></div>
        <div className="kv"><span>Players</span><b>{challenge.players} / {challenge.maxPlayers}</b></div>
        <div className="kv"><span>Remaining</span><b>{formatRemaining(challenge.endsAt, ui.now)}</b></div>
        <div className="kv"><span>Platform fee</span><b>{Math.round(PLATFORM_FEE * 100)}%</b></div>
        <div className="kv emph"><span>Potential prize</span><b>{formatUsdc(prize)} USDC</b></div>
        {message && <p className="note">{message}</p>}
        <button
          className="gold-btn"
          disabled={Boolean(message)}
          onClick={() => {
            if (message) {
              setError(message);
              return;
            }
            onConfirm(challenge.id);
          }}
        >
          JOIN CHALLENGE
        </button>
        <button className="ghost-btn" onClick={() => dispatch({ type: "sheet", sheet: null })}>Cancel</button>
      </div>
    </>
  );
}

const durations = [
  { label: "6h", ms: 6 * 3600000 },
  { label: "12h", ms: 12 * 3600000 },
  { label: "1 day", ms: 24 * 3600000 },
  { label: "3 days", ms: 72 * 3600000 },
  { label: "7 days", ms: 168 * 3600000 },
];

export function CreateChallenge({ bookId }: { bookId?: string }) {
  const data = useData();
  const { dispatch } = useStore();
  const [book, setBook] = useState(bookId ?? "atomic");
  const [entry, setEntry] = useState(10);
  const [players, setPlayers] = useState(10);
  const [duration, setDuration] = useState(durations[2].ms);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const poor = data.wallet.available < entry;
  const fullPool = entry * players;

  async function create() {
    if (poor || pending) {
      setError("Not enough demo USDC");
      return;
    }
    setPending(true);
    const { createSettlementService } = await import("@/lib/settlement");
    const result = await createSettlementService().createChallenge({ wallet: data.wallet, entryFee: entry });
    setPending(false);
    if (!result.ok) {
      setError("Something went wrong. Try again.");
      return;
    }
    dispatch({ type: "create", bookId: book, entryFee: entry, maxPlayers: players, durationMs: duration, result });
  }

  return (
    <section className="screen">
      <header className="topbar">
        <button className="back" aria-label="Back" onClick={() => dispatch({ type: "pop" })}><Chevron dir="left" /></button>
        <div className="top-grow"><h1>Create challenge</h1></div>
      </header>
      <div className="screen-body">
        <div className="field">
          <p>BOOK</p>
          <div className="covers-scroll">
            {books.map((item) => (
              <button key={item.id} className={book === item.id ? "pick on" : "pick"} onClick={() => setBook(item.id)}>
                <MiniCover book={item} />
                <small>{item.title}</small>
              </button>
            ))}
          </div>
        </div>
        <div className="field">
          <p>ENTRY FEE</p>
          <div className="choices">
            {[5, 10, 25, 50].map((item) => (
              <button key={item} className={entry === item ? "chip on" : "chip"} onClick={() => setEntry(item)}>{item} USDC</button>
            ))}
          </div>
        </div>
        <div className="field">
          <p>MAXIMUM PLAYERS</p>
          <div className="stepper">
            <button onClick={() => setPlayers((value) => Math.max(2, value - 1))} aria-label="Fewer players">−</button>
            <b>{players}</b>
            <button onClick={() => setPlayers((value) => Math.min(20, value + 1))} aria-label="More players">+</button>
          </div>
        </div>
        <div className="field">
          <p>DURATION</p>
          <div className="choices">
            {durations.map((item) => (
              <button key={item.label} className={duration === item.ms ? "chip on" : "chip"} onClick={() => setDuration(item.ms)}>{item.label}</button>
            ))}
          </div>
        </div>
        <div className="card" style={{ marginTop: 18 }}>
          <div className="kv"><span>Prize pool now</span><b>{formatUsdc(entry)} USDC</b></div>
          <div className="kv"><span>Players</span><b>1 / {players}</b></div>
          <div className="kv"><span>Platform fee</span><b>5%</b></div>
          <div className="kv emph"><span>Potential prize if full</span><b>{formatUsdc(quotedPrize(fullPool))} USDC</b></div>
          <p className="kicker" style={{ marginTop: 10 }}>You join as the first reader. The pool grows as others enter. Demo mode.</p>
        </div>
        {poor && <p className="note">Not enough demo USDC</p>}
        {error && !poor && <p className="note">{error}</p>}
        <button className="gold-btn" disabled={poor || pending} onClick={create}>{pending ? "CREATING" : "CREATE CHALLENGE"}</button>
      </div>
    </section>
  );
}
