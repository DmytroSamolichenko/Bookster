import { getBook } from "@/lib/data";
import { createQuestions, sealAnswers } from "@/lib/ai";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { bookId?: string; chapterId?: string } | null;
  const book = body?.bookId ? getBook(body.bookId) : undefined;
  const chapter = book?.chapters.find((item) => item.id === body?.chapterId);
  if (!book || !chapter) return Response.json({ error: "missing" }, { status: 404 });

  try {
    const questions = await createQuestions(book, chapter);
    return Response.json({
      source: "openai",
      token: sealAnswers(chapter.id, questions.map((item) => item.answer)),
      questions: questions.map(({ answer: _answer, ...item }) => item),
    });
  } catch {
    return Response.json({ error: "unavailable" }, { status: 503 });
  }
}
