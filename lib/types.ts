export type Difficulty = "Easy" | "Medium" | "Hard";

export type QuestionKind =
  | "Recall"
  | "Comprehension"
  | "Application"
  | "Connection"
  | "Synthesis";

export type Question = {
  prompt: string;
  choices: [string, string, string, string];
  answer: 0 | 1 | 2 | 3;
  kind: QuestionKind;
};

export type Chapter = {
  id: string;
  title: string;
  paragraphs: string[];
  questions: [Question, Question, Question];
};

export type CoverVariant =
  | "atomic"
  | "deep"
  | "money"
  | "alchemist"
  | "thinking"
  | "power";

export type Book = {
  id: string;
  title: string;
  author: string;
  category: string;
  rating: number;
  pages: number;
  readTime: string;
  difficulty: Difficulty;
  description: string;
  cover: CoverVariant;
  coverImage?: string;
  finalPrompt: string;
  chapters: Chapter[];
};

export type Challenge = {
  id: string;
  number: number;
  bookId: string;
  entryFee: number;
  pool: number;
  players: number;
  maxPlayers: number;
  endsAt: number;
  durationMs: number;
  minKnowledge: number;
  rivals: number[];
  featured?: boolean;
  seededExpired?: boolean;
  createdByUser?: boolean;
};

export type ParticipationStatus = "active" | "won" | "claimed";

export type Participation = {
  challengeId: string;
  bookId: string;
  entryFee: number;
  quotedPrize: number;
  status: ParticipationStatus;
  chaptersRead: number;
  checkpointScores: Array<number | null>;
  knowledgeScore: number;
  finalScore?: number;
  finalPassed?: boolean;
  finalNotes?: string[];
  joinedAt: number;
  finishedAt?: number;
  claimedAt?: number;
  bookmark?: number;
};

export type HistoryItem = {
  id: string;
  title: string;
  author: string;
  kicker: string;
  bg: string;
  fg: string;
  accent: string;
  date: string;
  knowledge: number;
  result: string;
  prize: number;
  bookId?: string;
  coverImage?: string;
};

export type TxKind = "join" | "claim" | "create";

export type LedgerTx = {
  id: string;
  kind: TxKind;
  title: string;
  amount: number;
  hash: string;
  at: number;
};

export type Wallet = {
  available: number;
  locked: number;
  address: string;
};

export type PeriodStats = {
  books: number;
  wins: number;
  knowledge: number;
  usdc: number;
};

export type Profile = {
  name: string;
  booksCompleted: number;
  challengesJoined: number;
  challengesWon: number;
  usdcEarned: number;
  avgKnowledge: number;
  streak: number;
  week: PeriodStats;
  month: PeriodStats;
};

export type BoardRow = {
  id: string;
  name: string;
  books: number;
  wins: number;
  knowledge: number;
  usdc: number;
};

export type TabId = "home" | "challenges" | "library" | "leaderboard" | "profile";

export type Screen =
  | { name: "challenges"; bookId: string }
  | { name: "reading"; bookId: string; challengeId: string }
  | { name: "checkpoint"; bookId: string; challengeId: string; chapter: number }
  | { name: "final"; bookId: string; challengeId: string }
  | { name: "winner"; bookId: string; challengeId: string }
  | { name: "create"; bookId?: string };

export type Sheet =
  | { type: "join"; challengeId: string }
  | { type: "wallet" }
  | { type: "reading-settings" }
  | null;

export type TxPhase =
  | { stage: "confirming" | "processing" }
  | { stage: "failed"; message: string }
  | { stage: "confirmed" | "in"; hash: string; bookId: string; challengeId: string };

export type FontSize = "s" | "m" | "l";

export type AppData = {
  version: number;
  wallet: Wallet;
  profile: Profile;
  challenges: Challenge[];
  participations: Participation[];
  savedBookIds: string[];
  history: HistoryItem[];
  transactions: LedgerTx[];
  fontSize: FontSize;
  relaxedLines: boolean;
  seenDemoNote: boolean;
  walletConnected: boolean;
};
