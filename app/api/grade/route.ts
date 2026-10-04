import { getBook } from "@/lib/data";
import { gradeChoice, openAnswers } from "@/lib/ai";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    bookId?: string;
    chapterId?: string;
    token?: string;
    index?: number;
    choice?: number;
    prompt?: string;
    choices?: string[];
  } | null;

  const book = body?.bookId ? getBook(body.bookId) : undefined;
  const chapter = book?.chapters.find((item) => item.id === body?.chapterId);
  if (!book || !chapter || !body?.token || body.index == null || body.choice == null) {
    return Response.json({ error: "missing" }, { status: 400 });
  }

  const answers = openAnswers(body.token, chapter.id);
  const sealed = answers?.[body.index];
  if (sealed == null || !body.prompt || !body.choices?.length) {
    return Response.json({ error: "invalid" }, { status: 400 });
  }

  const result = await gradeChoice({
    book,
    chapter,
    question: { prompt: body.prompt, choices: body.choices },
    choice: body.choice,
    sealed,
  });
  return Response.json(result);
}
