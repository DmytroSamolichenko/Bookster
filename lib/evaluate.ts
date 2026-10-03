export type Evaluation = {
  score: number;
  passed: boolean;
  concepts: string[];
  dimensions: {
    label: string;
    score: number;
  }[];
};

const RUBRICS: Record<string, { label: string; terms: string[] }[]> = {
  atomic: [
    { label: "identity", terms: ["identity", "vote", "votes"] },
    { label: "environment", terms: ["environment", "obvious", "friction", "visible", "cue"] },
    { label: "habit stacking", terms: ["stack", "stacking", "after i", "after my"] },
    { label: "starting small", terms: ["two-minute", "two minute", "two minutes", "small", "atomic", "shoes"] },
    { label: "systems", terms: ["system", "systems", "schedule", "routine"] },
  ],
  deep: [
    { label: "deep work", terms: ["deep work", "focus", "uninterrupted", "shallow"] },
    { label: "ritual", terms: ["ritual", "routine", "same time", "shutdown"] },
    { label: "environment", terms: ["environment", "phone", "distraction", "block"] },
    { label: "boredom", terms: ["boredom", "attention", "rest"] },
  ],
  money: [
    { label: "behavior", terms: ["behavior", "behaviour", "enough", "greed"] },
    { label: "room for error", terms: ["room for error", "margin", "buffer", "surprise"] },
    { label: "compounding", terms: ["compound", "time", "patience", "long"] },
    { label: "freedom", terms: ["freedom", "control", "independence"] },
  ],
  alchemist: [
    { label: "personal legend", terms: ["personal legend", "legend", "dream", "calling"] },
    { label: "omens", terms: ["omen", "sign", "listen"] },
    { label: "fear", terms: ["fear", "suffer", "courage", "begin"] },
    { label: "journey", terms: ["journey", "treasure", "path", "return"] },
  ],
  thinking: [
    { label: "two systems", terms: ["system 1", "system 2", "fast", "slow", "deliberate"] },
    { label: "bias", terms: ["anchor", "bias", "loss", "wysiati", "assumption"] },
    { label: "pause", terms: ["pause", "check", "question", "slow down"] },
  ],
  power: [
    { label: "reputation", terms: ["reputation", "perception", "appear"] },
    { label: "restraint", terms: ["conceal", "silence", "restraint", "intention"] },
    { label: "dependence", terms: ["depend", "need", "leverage", "ally"] },
    { label: "caution", terms: ["cost", "risk", "history", "caution", "limit"] },
  ],
};

function hitGroups(bookId: string, text: string) {
  const groups = RUBRICS[bookId] ?? [];
  const lower = text.toLowerCase();
  return groups.filter((group) => group.terms.some((term) => lower.includes(term)));
}

export function evaluateAnswer(bookId: string, raw: string): Evaluation {
  const text = raw.trim();
  const words = text ? text.split(/\s+/).length : 0;
  const hits = hitGroups(bookId, text);
  const applied = words >= 45 && hits.length >= 1;
  const connected = /\b(because|so that|then|instead|after|before|when)\b/i.test(text);

  let concept = Math.min(10, hits.length * 2.4);
  let application = applied ? Math.min(10, 6 + Math.min(4, words / 40)) : Math.min(5, words / 18);
  let reasoning = connected ? Math.min(10, 6.5 + Math.min(3, words / 50)) : Math.min(6, words / 16);
  let consistency = hits.length >= 2 ? 8.5 : hits.length === 1 ? 6 : 3;

  if (words < 35) {
    concept = Math.min(concept, 4);
    application = Math.min(application, 4);
    reasoning = Math.min(reasoning, 4);
    consistency = Math.min(consistency, 4);
  }

  const average = (concept + application + reasoning + consistency) / 4;
  const score = Math.round(average * 2) / 2;
  const passed = score >= 7 && hits.length >= 2 && words >= 40;

  return {
    score: Math.min(10, score),
    passed,
    concepts: hits.map((hit) => hit.label),
    dimensions: [
      { label: "Concept accuracy", score: roundHalf(concept) },
      { label: "Application", score: roundHalf(application) },
      { label: "Reasoning", score: roundHalf(reasoning) },
      { label: "Consistency", score: roundHalf(consistency) },
    ],
  };
}

function roundHalf(value: number) {
  return Math.round(Math.min(10, value) * 2) / 2;
}
