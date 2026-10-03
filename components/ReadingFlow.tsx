"use client";

import { useMemo, useState } from "react";
import { Bookmark, Chevron, Sliders, TypeIcon } from "./icons";
import { ERROR_COPY, getBook } from "@/lib/data";
import { evaluateAnswer } from "@/lib/evaluate";
import { formatUsdc, knowledgeFrom, readingPercent, standing, walletAmount } from "@/lib/format";
import { createSettlementService } from "@/lib/settlement";
import { participationFor, useData, useStore } from "@/lib/store";
import type { Evaluation } from "@/lib/evaluate";

const letters = ["A", "B", "C", "D"];

export function ReadingFlow({ bookId, challengeId }: { bookId: string; challengeId: string }) {
  const book = getBook(bookId);
  const data = useData();
  const { dispatch } = useStore();
  const participation = participationFor(data, challengeId);
  const [chapter, setChapter] = useState(() => {
    if (!book || !participation) return 0;
    if (participation.bookmark != null) return participation.bookmark;
    return Math.min(participation.chaptersRead, book.chapters.length - 1);
  });
  const [phase, setPhase] = useState<"read" | "intro" | "quiz" | "result" | "final" | "evaluating" | "final-result">(() => {
    if (!book || !participation) return "read";
    if (participation.chaptersRead >= book.chapters.length && !participation.finalPassed && participation.status === "active") return "final";
    return "read";
  });
  const [step, setStep] = useState(0);
  const [choice, setChoice] = useState<number | null>(null);
  const [locked, setLocked] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [started, setStarted] = useState(() => Date.now());
  const [times, setTimes] = useState<number[]>([]);
  const [localScore, setLocalScore] = useState<number | null>(null);
  const [rushed, setRushed] = useState(false);
  const [essay, setEssay] = useState("");
  const [evaluation, setEvaluation] = useState<Evaluation | null>(null);
  const [claiming, setClaiming] = useState(false);
  const [claimError, setClaimError] = useState<string | null>(null);

  if (!book || !participation) return null;
  const current = book.chapters[chapter];
  const progress = readingPercent(participation.chaptersRead, book.chapters.length);
  const textDone = participation.chaptersRead > chapter;
  const checkpointScore = participation.checkpointScores[chapter];
  const challenge = data.challenges.find((item) => item.id === challengeId);

  function finishText() {
    if (participation && participation.chaptersRead === chapter) {
      dispatch({ type: "read-chapter", challengeId, chapter });
    }
    setPhase("intro");
  }

  function beginQuiz() {
    setStep(0);
    setChoice(null);
    setLocked(false);
    setCorrectCount(0);
    setTimes([]);
    setLocalScore(null);
    setRushed(false);
    setStarted(Date.now());
    setPhase("quiz");
  }

  function commitChoice() {
    if (choice == null || !current || locked) return;
    const question = current.questions[step];
    const good = choice === question.answer;
    setLocked(true);
    setTimes((list) => [...list, (Date.now() - started) / 1000]);
    if (good) setCorrectCount((count) => count + 1);
  }

  function nextQuestion() {
    if (!current || !participation) return;
    const answered = step + 1;
    const totalRight = correctCount;
    if (answered < current.questions.length) {
      setStep(answered);
      setChoice(null);
      setLocked(false);
      setStarted(Date.now());
      return;
    }
    const average = times.length ? times.reduce((sum, item) => sum + item, 0) / times.length : 3;
    let score = Math.round((totalRight / current.questions.length) * 100);
    const tooFast = average < 2;
    if (tooFast) score = Math.max(0, score - 8);
    setRushed(tooFast);
    setLocalScore(score);
    dispatch({ type: "checkpoint", challengeId, chapter, score });
    setPhase("result");
  }

  async function submitFinal() {
    if (!book) return;
    setPhase("evaluating");
    const result = evaluateAnswer(book.id, essay);
    await wait(1400);
    setEvaluation(result);
    dispatch({ type: "final", challengeId, score: result.score, passed: result.passed, concepts: result.concepts });
    setPhase("final-result");
  }

  async function claim() {
    if (!participation || claiming) return;
    setClaiming(true);
    setClaimError(null);
    await wait(700);
    const result = await createSettlementService().claimReward({
      wallet: data.wallet,
      entryFee: participation.entryFee,
      prize: participation.quotedPrize,
    });
    setClaiming(false);
    if (!result.ok) {
      setClaimError(ERROR_COPY.failed);
      return;
    }
    dispatch({ type: "claim", challengeId, result });
  }

  if (participation.status === "won" || participation.status === "claimed") {
    return (
      <section className="screen">
        <div className="screen-body" style={{ paddingTop: 28 }}>
          <p className="eyebrow">CHALLENGE COMPLETE</p>
          <h2 style={{ fontSize: 40, margin: "8px 0 0", fontWeight: 520, letterSpacing: "-0.04em" }}>You won</h2>
          <p className="author" style={{ marginTop: 8 }}>{book.title}</p>
          <div className="kv"><span>Reading progress</span><b>100%</b></div>
          <div className="kv"><span>Knowledge score</span><b>{participation.knowledgeScore}%</b></div>
          {participation.finalScore != null && <div className="kv"><span>Final challenge</span><b>{participation.finalScore.toFixed(1)} / 10</b></div>}
          <p className="prize" style={{ marginTop: 22 }}>{formatUsdc(participation.quotedPrize)} <span>USDC</span></p>
          <p className="eyebrow" style={{ marginTop: 12 }}>VERIFIED WINNER</p>
          {participation.status === "claimed" ? (
            <>
              <p className="kicker" style={{ marginTop: 18 }}>Reward claimed</p>
              <p style={{ fontVariantNumeric: "tabular-nums" }}>Available · {walletAmount(data.wallet.available)} USDC</p>
            </>
          ) : (
            <button className="gold-btn" onClick={claim} disabled={claiming}>{claiming ? "CLAIMING" : "CLAIM REWARD"}</button>
          )}
          {claimError && <p className="note">{claimError}</p>}
          <button className="ghost-btn" onClick={() => dispatch({ type: "pop" })}>Close</button>
        </div>
      </section>
    );
  }

  return (
    <section className="screen">
      {phase === "read" && current && (
        <>
          <div className="read-head">
            <div className="row">
              <button className="back" aria-label="Back" onClick={() => dispatch({ type: "pop" })}><Chevron dir="left" /></button>
              <div>
                <p className="read-kicker">{book.title.toUpperCase()}</p>
                <h2 className="read-title">{current.title}</h2>
              </div>
              <div className="read-stats">
                <b>{progress}%</b>
                <span>Knowledge {participation.knowledgeScore}%</span>
              </div>
            </div>
            <div className="progress-line"><i style={{ width: `${progress}%` }} /></div>
          </div>
          <div className="screen-body" style={{ padding: 0 }}>
            <article className={`reading size-${data.fontSize} ${data.relaxedLines ? "relaxed" : ""}`}>
              <p className="read-kicker">CHAPTER {chapter + 1}</p>
              {current.paragraphs.map((paragraph) => <p key={paragraph.slice(0, 24)}>{paragraph}</p>)}
              {!textDone && participation.chaptersRead === chapter && (
                <button className="line-btn finish" onClick={finishText}>FINISH CHAPTER</button>
              )}
              {textDone && checkpointScore == null && (
                <button className="line-btn finish" onClick={() => setPhase("intro")}>CONTINUE TO CHECKPOINT</button>
              )}
              {checkpointScore != null && (
                <button className="ghost-btn" onClick={beginQuiz}>Retake checkpoint · {checkpointScore}%</button>
              )}
            </article>
          </div>
          <div className="tools">
            <button className="tool" aria-label="Previous chapter" onClick={() => setChapter((value) => Math.max(0, value - 1))}><Chevron dir="left" /></button>
            <div className="mid">
              <button className="tool" aria-label="Reading settings" onClick={() => dispatch({ type: "sheet", sheet: { type: "reading-settings" } })}><TypeIcon /></button>
              <button className={participation.bookmark === chapter ? "tool on" : "tool"} aria-label="Bookmark" onClick={() => dispatch({ type: "bookmark", challengeId, chapter })}><Bookmark filled={participation.bookmark === chapter} /></button>
              <button className="tool" aria-label="Text settings" onClick={() => dispatch({ type: "sheet", sheet: { type: "reading-settings" } })}><Sliders /></button>
            </div>
            <button className="tool" aria-label="Next" onClick={() => {
              if (!textDone && participation.chaptersRead === chapter) finishText();
              else if (textDone && checkpointScore == null) setPhase("intro");
              else if (chapter < book.chapters.length - 1) setChapter(chapter + 1);
              else if (participation.chaptersRead >= book.chapters.length) setPhase("final");
            }}><Chevron /></button>
          </div>
        </>
      )}

      {phase === "intro" && current && (
        <div className="screen-body" style={{ paddingTop: 36 }}>
          <p className="eyebrow">CHAPTER COMPLETE</p>
          <h2 style={{ fontSize: 32, margin: "8px 0 0", fontWeight: 520 }}>You’ve completed Chapter {chapter + 1}.</h2>
          <p className="desc" style={{ maxWidth: "28ch" }}>Now prove you understood it.</p>
          <button className="gold-btn" onClick={beginQuiz}>3 QUESTIONS</button>
          <button className="ghost-btn" onClick={() => setPhase("read")}>Back to the chapter</button>
        </div>
      )}

      {phase === "quiz" && current && (
        <Quiz
          index={step}
          total={current.questions.length}
          prompt={current.questions[step].prompt}
          kind={current.questions[step].kind}
          choices={current.questions[step].choices}
          answer={current.questions[step].answer}
          choice={choice}
          locked={locked}
          onChoose={setChoice}
          onCheck={commitChoice}
          onNext={nextQuestion}
          onClose={() => setPhase("read")}
        />
      )}

      {phase === "result" && (
        <div className="screen-body" style={{ paddingTop: 32 }}>
          <p className="eyebrow">CHECKPOINT</p>
          <p className="score-hero">{localScore ?? checkpointScore ?? 0}%</p>
          <p className="kicker">This checkpoint</p>
          <div className="kv"><span>Reading progress</span><b>{readingPercent(participation.chaptersRead, book.chapters.length)}%</b></div>
          <div className="kv"><span>Knowledge score</span><b>{knowledgeFrom(replaceScore(participation.checkpointScores, chapter, localScore ?? checkpointScore ?? 0))}%</b></div>
          {rushed && <p className="note">Answers were unusually fast, so the score was reduced slightly.</p>}
          {(localScore ?? 100) < 67 && <p className="note">{ERROR_COPY.checkpoint}</p>}
          {(localScore ?? 100) < 67 && <button className="gold-btn" onClick={beginQuiz}>TRY AGAIN</button>}
          <button className={(localScore ?? 100) < 67 ? "ghost-btn" : "gold-btn"} onClick={() => {
            if (chapter < book.chapters.length - 1 && participation.chaptersRead > chapter) {
              setChapter(Math.min(book.chapters.length - 1, participation.chaptersRead));
              setPhase("read");
              return;
            }
            if (participation.chaptersRead >= book.chapters.length) setPhase("final");
            else setPhase("read");
          }}>
            {participation.chaptersRead >= book.chapters.length ? "FINAL CHALLENGE" : "CONTINUE READING"}
          </button>
        </div>
      )}

      {(phase === "final" || phase === "evaluating" || phase === "final-result") && challenge && (
        <div className="screen-body" style={{ paddingTop: 28 }}>
          <button className="back" aria-label="Back" onClick={() => setPhase("read")}><Chevron dir="left" /></button>
          <p className="eyebrow">FINAL CHALLENGE</p>
          <h2 style={{ fontSize: 28, margin: "8px 0 0", fontWeight: 520 }}>{book.title}</h2>
          <p className="desc" style={{ maxWidth: "36ch" }}>{book.finalPrompt}</p>
          {phase !== "final-result" && (
            <>
              <textarea className="essay" value={essay} onChange={(event) => setEssay(event.target.value)} placeholder="Write the system in your own words." />
              {phase === "evaluating" ? <div className="fill-bar"><i /></div> : <button className="gold-btn" disabled={essay.trim().length < 20} onClick={submitFinal}>SUBMIT</button>}
              {phase === "evaluating" && <p className="kicker" style={{ marginTop: 12 }}>Simulated evaluation</p>}
            </>
          )}
          {phase === "final-result" && evaluation && (
            <FinalResult
              evaluation={evaluation}
              knowledge={participation.knowledgeScore}
              required={challenge.minKnowledge}
              onRetry={() => { setPhase("final"); setEvaluation(null); }}
              onReview={() => setPhase("read")}
            />
          )}
        </div>
      )}
    </section>
  );
}

function Quiz({
  index, total, prompt, kind, choices, answer, choice, locked, onChoose, onCheck, onNext, onClose,
}: {
  index: number;
  total: number;
  prompt: string;
  kind: string;
  choices: string[];
  answer: number;
  choice: number | null;
  locked: boolean;
  onChoose: (index: number) => void;
  onCheck: () => void;
  onNext: () => void;
  onClose: () => void;
}) {
  return (
    <>
      <header className="topbar">
        <button className="back" aria-label="Close" onClick={onClose}><Chevron dir="left" /></button>
        <div className="top-grow"><h1>{index + 1} of {total}</h1></div>
      </header>
      <div className="progress-line" style={{ marginTop: 0 }}><i style={{ width: `${((index + (locked ? 1 : 0)) / total) * 100}%` }} /></div>
      <div className="screen-body">
        <p className="question-kind">{kind.toUpperCase()}</p>
        <p className="prompt">{prompt}</p>
        {choices.map((option, optionIndex) => {
          const className = ["option", choice === optionIndex ? "on" : "", locked && optionIndex === answer ? "good" : "", locked && choice === optionIndex && optionIndex !== answer ? "bad" : ""].filter(Boolean).join(" ");
          return (
            <button key={option} className={className} onClick={() => !locked && onChoose(optionIndex)}>
              <i>{letters[optionIndex]}</i>
              <span>{option}</span>
            </button>
          );
        })}
        {locked && choice !== answer && <p className="kicker">The stronger answer is {letters[answer]}.</p>}
        {!locked ? (
          <button className="gold-btn" disabled={choice == null} onClick={onCheck}>CHECK</button>
        ) : (
          <button className="gold-btn" onClick={onNext}>{index === total - 1 ? "SEE SCORE" : "NEXT"}</button>
        )}
      </div>
    </>
  );
}

function FinalResult({
  evaluation, knowledge, required, onRetry, onReview,
}: {
  evaluation: Evaluation;
  knowledge: number;
  required: number;
  onRetry: () => void;
  onReview: () => void;
}) {
  const knowledgeShort = knowledge < required;
  if (evaluation.passed && !knowledgeShort) {
    return <p className="kicker">Opening your result…</p>;
  }
  return (
    <div>
      <p className="score-hero">{evaluation.score.toFixed(1)}<span style={{ fontSize: 18, color: "#8e8a84" }}> / 10</span></p>
      {evaluation.dimensions.map((item) => (
        <div className="dim" key={item.label}><span>{item.label}</span><b>{item.score.toFixed(1)}</b></div>
      ))}
      {evaluation.concepts.length > 0 && <p className="kicker" style={{ marginTop: 12 }}>Recognized · {evaluation.concepts.join(", ")}</p>}
      {!evaluation.passed && <p className="note">{ERROR_COPY.final}</p>}
      {knowledgeShort && <p className="note">{ERROR_COPY.checkpoint}</p>}
      {!evaluation.passed && <button className="gold-btn" onClick={onRetry}>TRY AGAIN</button>}
      {knowledgeShort && <button className="line-btn" style={{ marginTop: 10 }} onClick={onReview}>REVIEW CHECKPOINTS</button>}
    </div>
  );
}

function replaceScore(scores: Array<number | null>, index: number, score: number) {
  const next = scores.slice();
  next[index] = score;
  return next;
}

function wait(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

export function usePosition(challengeId: string) {
  const data = useData();
  return useMemo(() => {
    const participation = participationFor(data, challengeId);
    const challenge = data.challenges.find((item) => item.id === challengeId);
    const book = participation ? getBook(participation.bookId) : undefined;
    if (!participation || !challenge || !book) return null;
    const progress = readingPercent(participation.chaptersRead, book.chapters.length);
    return standing(progress, challenge.rivals);
  }, [data, challengeId]);
}
