import { createHmac, timingSafeEqual } from "crypto";
import type { Book, Chapter, QuestionKind } from "./types";
import { evaluateAnswer, type Evaluation } from "./evaluate";

const KINDS: QuestionKind[] = ["Recall", "Comprehension", "Application", "Connection", "Synthesis"];

type Generated = {
  kind: QuestionKind;
  prompt: string;
  choices: [string, string, string, string];
  answer: 0 | 1 | 2 | 3;
};

type Sealed = { v: 1; chapterId: string; answers: number[]; exp: number };

function secret() {
  return process.env.QUIZ_SECRET || process.env.OPENAI_API_KEY || "bookster-demo-quiz";
}

export function sealAnswers(chapterId: string, answers: number[]) {
  const payload: Sealed = { v: 1, chapterId, answers, exp: Date.now() + 60 * 60 * 1000 };
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const sig = createHmac("sha256", secret()).update(body).digest("base64url");
  return `${body}.${sig}`;
}

export function openAnswers(token: string, chapterId: string) {
  const [body, sig] = token.split(".");
  if (!body || !sig) return null;
  const expected = createHmac("sha256", secret()).update(body).digest("base64url");
  const left = Buffer.from(sig);
  const right = Buffer.from(expected);
  if (left.length !== right.length || !timingSafeEqual(left, right)) return null;
  try {
    const payload = JSON.parse(Buffer.from(body, "base64url").toString()) as Sealed;
    if (payload.v !== 1 || payload.chapterId !== chapterId || payload.exp < Date.now()) return null;
    if (!Array.isArray(payload.answers) || payload.answers.some((item) => item < 0 || item > 3)) return null;
    return payload.answers;
  } catch {
    return null;
  }
}

async function complete(system: string, user: string) {
  const key = process.env.OPENAI_API_KEY;
  if (!key) throw new Error("missing_key");
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      temperature: 0.3,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
    }),
    signal: AbortSignal.timeout(20000),
  });
  if (!response.ok) throw new Error("openai_failed");
  const payload = (await response.json()) as { choices?: { message?: { content?: string } }[] };
  const content = payload.choices?.[0]?.message?.content;
  if (!content) throw new Error("empty");
  return JSON.parse(content) as unknown;
}

function asQuestion(value: unknown): Generated | null {
  if (!value || typeof value !== "object") return null;
  const item = value as Record<string, unknown>;
  const kind = KINDS.includes(item.kind as QuestionKind) ? (item.kind as QuestionKind) : "Comprehension";
  const prompt = typeof item.prompt === "string" ? item.prompt.trim() : "";
  const raw = Array.isArray(item.choices) ? item.choices.map((choice) => String(choice).trim()) : [];
  const answer = Number(item.answer);
  if (prompt.length < 12 || raw.length !== 4 || raw.some((choice) => choice.length < 2)) return null;
  if (![0, 1, 2, 3].includes(answer)) return null;
  return { kind, prompt, choices: raw as Generated["choices"], answer: answer as Generated["answer"] };
}

export async function createQuestions(book: Book, chapter: Chapter): Promise<Generated[]> {
  const data = await complete(
    "You write understanding checks for a reading app. Use only the chapter text. Return JSON {\"questions\":[...]} with exactly 3 questions. Each question has kind (Comprehension, Application, or Connection), prompt, choices (exactly 4 strings), and answer (the correct index 0-3). One choice is clearly best. The others are plausible but miss the chapter. No trivia about the author's biography.",
    `Book: ${book.title}\nChapter: ${chapter.title}\n\n${chapter.paragraphs.join("\n\n")}`,
  );
  const list = data && typeof data === "object" && Array.isArray((data as { questions?: unknown }).questions)
    ? (data as { questions: unknown[] }).questions
    : [];
  const questions = list.map(asQuestion).filter((item): item is Generated => item != null).slice(0, 3);
  if (questions.length !== 3) throw new Error("bad_questions");
  return questions;
}

export async function gradeChoice(input: {
  book: Book;
  chapter: Chapter;
  question: { prompt: string; choices: string[] };
  choice: number;
  sealed: number;
}) {
  try {
    const data = await complete(
      "You grade one reading-check answer. Judge from the chapter, not from outside knowledge. Return JSON {\"answer\": number, \"correct\": boolean}. answer is the best choice index, 0-3. correct is true only if the student's choice matches that best index.",
      `Book: ${input.book.title}\nChapter: ${input.chapter.title}\n\n${input.chapter.paragraphs.join("\n\n")}\n\nQuestion: ${input.question.prompt}\nChoices:\n${input.question.choices.map((choice, index) => `${index}. ${choice}`).join("\n")}\nStudent choice: ${input.choice}`,
    );
    const record = data as { answer?: unknown; correct?: unknown };
    const answer = Number(record.answer);
    if ([0, 1, 2, 3].includes(answer)) {
      return { answer, correct: answer === input.choice };
    }
  } catch {
    /* use the sealed key from question generation */
  }
  return { answer: input.sealed, correct: input.choice === input.sealed };
}

export async function gradeEssay(book: Book, essay: string): Promise<Evaluation> {
  const words = essay.trim() ? essay.trim().split(/\s+/).length : 0;
  const local = evaluateAnswer(book.id, essay);
  if (words < 20) return local;
  try {
    const context = book.chapters.map((chapter) => `${chapter.title}: ${chapter.paragraphs[0]}`).join("\n");
    const data = await complete(
      "You grade a reader's written answer for a book challenge. Score understanding, not style. Return JSON {\"score\": number, \"concepts\": string[], \"dimensions\": [{\"label\": string, \"score\": number}]}. score is 0-10 in half steps. dimensions has exactly four items labeled Concept accuracy, Application, Reasoning, Consistency, each scored 0-10. concepts lists the ideas from the book that the answer actually used. Do not pass vague praise.",
      `Book: ${book.title} by ${book.author}\nPrompt: ${book.finalPrompt}\n\nChapter context:\n${context}\n\nReader answer:\n${essay.trim()}`,
    );
    const record = data as { score?: unknown; concepts?: unknown; dimensions?: unknown };
    const score = Math.round(Math.min(10, Math.max(0, Number(record.score))) * 2) / 2;
    if (!Number.isFinite(score)) return local;
    const concepts = Array.isArray(record.concepts) ? record.concepts.map((item) => String(item)).filter(Boolean).slice(0, 5) : local.concepts;
    const dimensions = Array.isArray(record.dimensions)
      ? record.dimensions.slice(0, 4).map((item) => {
          const row = item as { label?: unknown; score?: unknown };
          return {
            label: String(row.label || "Score"),
            score: Math.round(Math.min(10, Math.max(0, Number(row.score))) * 2) / 2,
          };
        })
      : local.dimensions;
    const passed = score >= 7 && words >= 40 && concepts.length >= 2;
    return { score, passed, concepts, dimensions: dimensions.length === 4 ? dimensions : local.dimensions };
  } catch {
    return local;
  }
}
