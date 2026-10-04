import { getBook } from "@/lib/data";
import { gradeEssay } from "@/lib/ai";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { bookId?: string; essay?: string } | null;
  const book = body?.bookId ? getBook(body.bookId) : undefined;
  if (!book || typeof body?.essay !== "string") return Response.json({ error: "missing" }, { status: 400 });
  const evaluation = await gradeEssay(book, body.essay);
  return Response.json(evaluation);
}
