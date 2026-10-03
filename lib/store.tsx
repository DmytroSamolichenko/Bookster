"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from "react";
import {
  books,
  createChallenges,
  createInitialParticipations,
  getBook,
  initialHistory,
} from "./data";
import { knowledgeFrom, shortDate } from "./format";
import { quotedPrize, type SettlementResult } from "./settlement";
import type {
  AppData,
  FontSize,
  HistoryItem,
  LedgerTx,
  Participation,
  Screen,
  Sheet,
  TabId,
  TxPhase,
} from "./types";

export const DATA_VERSION = 1;
const STORAGE_KEY = "bookster-demo-v1";

function createData(origin = Date.now()): AppData {
  return {
    version: DATA_VERSION,
    wallet: { available: 247.5, locked: 35, address: "7xA...92K" },
    profile: {
      name: "Alex",
      booksCompleted: 8,
      challengesJoined: 14,
      challengesWon: 3,
      usdcEarned: 214,
      avgKnowledge: 89,
      streak: 12,
      week: { books: 2, wins: 1, knowledge: 91, usdc: 48 },
      month: { books: 4, wins: 2, knowledge: 90, usdc: 96 },
    },
    challenges: createChallenges(origin),
    participations: createInitialParticipations(origin),
    savedBookIds: ["power", "thinking"],
    history: initialHistory,
    transactions: [
      {
        id: "tx-deep",
        kind: "join",
        title: "Deep Work · #1888",
        amount: -25,
        hash: "8Qm...K3d",
        at: origin - 5 * 86400000,
      },
      {
        id: "tx-money",
        kind: "join",
        title: "Psychology of Money · #1744",
        amount: -10,
        hash: "2Lp...C8s",
        at: origin - 2 * 86400000,
      },
      {
        id: "tx-sapiens",
        kind: "claim",
        title: "Sapiens · reward",
        amount: 120,
        hash: "9Va...M1q",
        at: origin - 20 * 86400000,
      },
    ],
    fontSize: "m",
    relaxedLines: false,
    seenDemoNote: false,
    walletConnected: false,
  };
}

function refreshWindows(data: AppData, now: number): AppData {
  return {
    ...data,
    challenges: data.challenges.map((challenge) => {
      if (challenge.seededExpired) return challenge;
      if (challenge.endsAt < now + 60000) {
        return { ...challenge, endsAt: now + challenge.durationMs };
      }
      return challenge;
    }),
  };
}

export type Toast = { id: number; message: string } | null;

type UiState = {
  tab: TabId;
  stack: Screen[];
  dir: "forward" | "back";
  sheet: Sheet;
  tx: TxPhase | null;
  homeIndex: number;
  swiped: boolean;
  toast: Toast;
  now: number;
};

type State = { data: AppData; ui: UiState };

const initialUi = (): UiState => ({
  tab: "home",
  stack: [],
  dir: "forward",
  sheet: null,
  tx: null,
  homeIndex: 0,
  swiped: false,
  toast: null,
  now: Date.now(),
});

type Action =
  | { type: "hydrate"; data: AppData }
  | { type: "reset" }
  | { type: "tick"; now: number }
  | { type: "tab"; tab: TabId }
  | { type: "push"; screen: Screen }
  | { type: "pop" }
  | { type: "sheet"; sheet: Sheet }
  | { type: "tx"; tx: TxPhase | null }
  | { type: "home"; index: number }
  | { type: "swiped" }
  | { type: "demo-seen" }
  | { type: "connect-wallet" }
  | { type: "disconnect-wallet" }
  | { type: "toast"; message: string }
  | { type: "toast-clear" }
  | { type: "font"; size: FontSize }
  | { type: "lines" }
  | { type: "save"; bookId: string }
  | { type: "bookmark"; challengeId: string; chapter: number }
  | {
      type: "join";
      challengeId: string;
      result: SettlementResult;
    }
  | {
      type: "create";
      bookId: string;
      entryFee: number;
      maxPlayers: number;
      durationMs: number;
      result: SettlementResult;
    }
  | { type: "read-chapter"; challengeId: string; chapter: number }
  | { type: "checkpoint"; challengeId: string; chapter: number; score: number }
  | {
      type: "final";
      challengeId: string;
      score: number;
      passed: boolean;
      concepts: string[];
    }
  | { type: "claim"; challengeId: string; result: SettlementResult };

function withParticipation(
  data: AppData,
  challengeId: string,
  update: (item: Participation) => Participation,
): AppData {
  return {
    ...data,
    participations: data.participations.map((item) =>
      item.challengeId === challengeId ? update(item) : item,
    ),
  };
}

function maybeWin(data: AppData, challengeId: string, now: number): AppData {
  const participation = data.participations.find((item) => item.challengeId === challengeId);
  const challenge = data.challenges.find((item) => item.id === challengeId);
  const book = participation ? getBook(participation.bookId) : undefined;
  if (!participation || !challenge || !book) return data;
  if (participation.status !== "active" || !participation.finalPassed) return data;
  if (participation.chaptersRead < book.chapters.length) return data;
  if (participation.knowledgeScore < challenge.minKnowledge) return data;
  if (challenge.rivals.some((rival) => rival >= 100)) return data;

  const knowledge = participation.knowledgeScore;
  const completed = data.profile.booksCompleted;
  const avg = Math.round((data.profile.avgKnowledge * completed + knowledge) / (completed + 1));
  const history: HistoryItem = {
    id: `win-${challengeId}`,
    title: book.title,
    author: book.author,
    bookId: book.id,
    kicker: book.category,
    bg: "#E7DCC8",
    fg: "#1C140E",
    accent: "#C6A36A",
    date: shortDate(now),
    knowledge,
    result: "Won",
    prize: participation.quotedPrize,
  };

  return {
    ...data,
    challenges: data.challenges.map((item) =>
      item.id === challengeId ? { ...item, rivals: item.rivals.map((rival) => Math.min(rival, 96)) } : item,
    ),
    participations: data.participations.map((item) =>
      item.challengeId === challengeId ? { ...item, status: "won", finishedAt: now } : item,
    ),
    history: [history, ...data.history.filter((item) => item.id !== history.id)],
    profile: {
      ...data.profile,
      booksCompleted: completed + 1,
      challengesWon: data.profile.challengesWon + 1,
      avgKnowledge: avg,
      week: {
        ...data.profile.week,
        books: data.profile.week.books + 1,
        wins: data.profile.week.wins + 1,
        knowledge: avg,
      },
      month: {
        ...data.profile.month,
        books: data.profile.month.books + 1,
        wins: data.profile.month.wins + 1,
        knowledge: avg,
      },
    },
  };
}

function finishIfWon(state: State, data: AppData, challengeId: string): State {
  const before = state.data.participations.find((item) => item.challengeId === challengeId)?.status;
  const after = data.participations.find((item) => item.challengeId === challengeId);
  if (before === "active" && after?.status === "won") {
    const screen: Screen = { name: "winner", bookId: after.bookId, challengeId };
    const stack = state.ui.stack[state.ui.stack.length - 1]?.name === "winner"
      ? state.ui.stack
      : [...state.ui.stack.slice(0, -1), screen];
    return { data, ui: { ...state.ui, stack, dir: "forward" } };
  }
  return { ...state, data };
}

function applyDelta(data: AppData, result: SettlementResult): AppData {
  if (!result.delta) return data;
  return {
    ...data,
    wallet: {
      ...data.wallet,
      available: Math.round((data.wallet.available + result.delta.available) * 100) / 100,
      locked: Math.round((data.wallet.locked + result.delta.locked) * 100) / 100,
    },
  };
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "hydrate":
      return { ...state, data: refreshWindows(action.data, Date.now()) };
    case "reset":
      return { data: createData(), ui: { ...initialUi(), toast: { id: Date.now(), message: "Demo reset" } } };
    case "tick":
      return { ...state, ui: { ...state.ui, now: action.now } };
    case "tab":
      return { ...state, ui: { ...state.ui, tab: action.tab, stack: [], dir: "back", sheet: null } };
    case "push":
      return { ...state, ui: { ...state.ui, stack: [...state.ui.stack, action.screen], dir: "forward", sheet: null } };
    case "pop":
      return { ...state, ui: { ...state.ui, stack: state.ui.stack.slice(0, -1), dir: "back", sheet: null } };
    case "sheet":
      return { ...state, ui: { ...state.ui, sheet: action.sheet } };
    case "tx":
      return { ...state, ui: { ...state.ui, tx: action.tx, sheet: action.tx ? null : state.ui.sheet } };
    case "home":
      return { ...state, ui: { ...state.ui, homeIndex: action.index } };
    case "swiped":
      return { ...state, ui: { ...state.ui, swiped: true } };
    case "demo-seen":
      return { ...state, data: { ...state.data, seenDemoNote: true } };
    case "connect-wallet":
      return { ...state, data: { ...state.data, walletConnected: true } };
    case "disconnect-wallet":
      return { ...state, data: { ...state.data, walletConnected: false } };
    case "toast":
      return { ...state, ui: { ...state.ui, toast: { id: Date.now(), message: action.message } } };
    case "toast-clear":
      return { ...state, ui: { ...state.ui, toast: null } };
    case "font":
      return { ...state, data: { ...state.data, fontSize: action.size } };
    case "lines":
      return { ...state, data: { ...state.data, relaxedLines: !state.data.relaxedLines } };
    case "save": {
      const has = state.data.savedBookIds.includes(action.bookId);
      return {
        ...state,
        data: {
          ...state.data,
          savedBookIds: has
            ? state.data.savedBookIds.filter((id) => id !== action.bookId)
            : [...state.data.savedBookIds, action.bookId],
        },
        ui: { ...state.ui, toast: { id: Date.now(), message: has ? "Removed from saved" : "Saved for later" } },
      };
    }
    case "bookmark":
      return {
        ...state,
        data: withParticipation(state.data, action.challengeId, (item) => ({
          ...item,
          bookmark: item.bookmark === action.chapter ? undefined : action.chapter,
        })),
        ui: {
          ...state.ui,
          toast: {
            id: Date.now(),
            message:
              state.data.participations.find((item) => item.challengeId === action.challengeId)?.bookmark ===
              action.chapter
                ? "Bookmark removed"
                : `Bookmarked · Chapter ${action.chapter + 1}`,
          },
        },
      };
    case "join": {
      if (!action.result.ok || !action.result.delta || !action.result.hash) return state;
      const challenge = state.data.challenges.find((item) => item.id === action.challengeId);
      if (!challenge) return state;
      if (state.data.participations.some((item) => item.challengeId === challenge.id)) return state;
      const book = getBook(challenge.bookId);
      const prize = quotedPrize(challenge.pool);
      const participation: Participation = {
        challengeId: challenge.id,
        bookId: challenge.bookId,
        entryFee: challenge.entryFee,
        quotedPrize: prize,
        status: "active",
        chaptersRead: 0,
        checkpointScores: Array(book?.chapters.length ?? 0).fill(null),
        knowledgeScore: 0,
        joinedAt: state.ui.now,
      };
      const tx: LedgerTx = {
        id: `tx-${action.result.hash}`,
        kind: "join",
        title: `${book?.title ?? "Challenge"} · #${challenge.number}`,
        amount: -challenge.entryFee,
        hash: action.result.hash,
        at: state.ui.now,
      };
      return {
        ...state,
        data: applyDelta(
          {
            ...state.data,
            challenges: state.data.challenges.map((item) =>
              item.id === challenge.id
                ? { ...item, players: item.players + 1, pool: item.pool + item.entryFee }
                : item,
            ),
            participations: [participation, ...state.data.participations],
            transactions: [tx, ...state.data.transactions],
            profile: {
              ...state.data.profile,
              challengesJoined: state.data.profile.challengesJoined + 1,
            },
          },
          action.result,
        ),
      };
    }
    case "create": {
      if (!action.result.ok || !action.result.hash) return state;
      const book = getBook(action.bookId);
      if (!book) return state;
      const number = Math.max(...state.data.challenges.map((item) => item.number)) + 1;
      const id = `c${number}`;
      const participation: Participation = {
        challengeId: id,
        bookId: action.bookId,
        entryFee: action.entryFee,
        quotedPrize: quotedPrize(action.entryFee),
        status: "active",
        chaptersRead: 0,
        checkpointScores: Array(book.chapters.length).fill(null),
        knowledgeScore: 0,
        joinedAt: state.ui.now,
      };
      return {
        ...state,
        data: applyDelta(
          {
            ...state.data,
            challenges: [
              {
                id,
                number,
                bookId: action.bookId,
                entryFee: action.entryFee,
                pool: action.entryFee,
                players: 1,
                maxPlayers: action.maxPlayers,
                endsAt: state.ui.now + action.durationMs,
                durationMs: action.durationMs,
                minKnowledge: 80,
                rivals: [],
                featured: true,
                createdByUser: true,
              },
              ...state.data.challenges,
            ],
            participations: [participation, ...state.data.participations],
            transactions: [
              {
                id: `tx-${action.result.hash}`,
                kind: "create",
                title: `Created #${number}`,
                amount: -action.entryFee,
                hash: action.result.hash,
                at: state.ui.now,
              },
              ...state.data.transactions,
            ],
            profile: {
              ...state.data.profile,
              challengesJoined: state.data.profile.challengesJoined + 1,
            },
          },
          action.result,
        ),
        ui: {
          ...state.ui,
          stack: [{ name: "challenges", bookId: action.bookId }],
          dir: "forward",
          toast: { id: Date.now(), message: `Challenge #${number} is open` },
        },
      };
    }
    case "read-chapter": {
      const participation = state.data.participations.find((item) => item.challengeId === action.challengeId);
      if (!participation || participation.chaptersRead !== action.chapter) return state;
      return {
        ...state,
        data: withParticipation(state.data, action.challengeId, (item) => ({
          ...item,
          chaptersRead: item.chaptersRead + 1,
        })),
      };
    }
    case "checkpoint": {
      const next = withParticipation(state.data, action.challengeId, (item) => {
        const scores = item.checkpointScores.slice();
        scores[action.chapter] = action.score;
        return { ...item, checkpointScores: scores, knowledgeScore: knowledgeFrom(scores) };
      });
      return finishIfWon(state, maybeWin(next, action.challengeId, state.ui.now), action.challengeId);
    }
    case "final": {
      const next = withParticipation(state.data, action.challengeId, (item) => ({
        ...item,
        finalScore: action.score,
        finalPassed: action.passed,
        finalNotes: action.concepts,
      }));
      return finishIfWon(state, maybeWin(next, action.challengeId, state.ui.now), action.challengeId);
    }
    case "claim": {
      if (!action.result.ok || !action.result.hash) return state;
      const participation = state.data.participations.find((item) => item.challengeId === action.challengeId);
      const book = participation ? getBook(participation.bookId) : undefined;
      if (!participation || participation.status !== "won") return state;
      const prize = participation.quotedPrize;
      const tx: LedgerTx = {
        id: `tx-${action.result.hash}`,
        kind: "claim",
        title: `${book?.title ?? "Reward"} · reward`,
        amount: prize,
        hash: action.result.hash,
        at: state.ui.now,
      };
      return {
        ...state,
        data: applyDelta(
          {
            ...withParticipation(state.data, action.challengeId, (item) => ({
              ...item,
              status: "claimed",
              claimedAt: state.ui.now,
            })),
            transactions: [tx, ...state.data.transactions],
            profile: {
              ...state.data.profile,
              usdcEarned: state.data.profile.usdcEarned + prize,
              week: { ...state.data.profile.week, usdc: state.data.profile.week.usdc + prize },
              month: { ...state.data.profile.month, usdc: state.data.profile.month.usdc + prize },
            },
          },
          action.result,
        ),
      };
    }
    default:
      return state;
  }
}

const StoreContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
} | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, () => ({
    data: createData(),
    ui: initialUi(),
  }));
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as AppData;
        if (parsed.version === DATA_VERSION && parsed.wallet && parsed.challenges) {
          dispatch({
            type: "hydrate",
            data: { ...parsed, walletConnected: Boolean(parsed.walletConnected) },
          });
        }
      }
    } catch {
      /* keep the fresh demo */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.data));
  }, [state.data, ready]);

  useEffect(() => {
    const timer = window.setInterval(() => dispatch({ type: "tick", now: Date.now() }), 30000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!state.ui.toast) return;
    const timer = window.setTimeout(() => dispatch({ type: "toast-clear" }), 2200);
    return () => window.clearTimeout(timer);
  }, [state.ui.toast]);

  const value = useMemo(() => ({ state, dispatch }), [state]);
  if (!ready) {
    return <div className="boot" />;
  }
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) throw new Error("Store missing");
  return context;
}

export function useData() {
  return useStore().state.data;
}

export function useUi() {
  return useStore().state.ui;
}

export function participationFor(data: AppData, challengeId: string) {
  return data.participations.find((item) => item.challengeId === challengeId);
}

export { books };
