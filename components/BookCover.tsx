import type { Book, HistoryItem } from "@/lib/types";

const specks = [
  [18, 14], [28, 22], [72, 12], [84, 20], [16, 32], [90, 28], [24, 18], [64, 16],
  [80, 36], [12, 24], [40, 12], [88, 14], [22, 40], [76, 18], [34, 20], [68, 28],
];

export function BookCover({
  book,
  plain,
  size = "hero",
}: {
  book?: Book;
  plain?: HistoryItem;
  size?: "hero" | "thumb";
}) {
  if (plain && !plain.bookId) {
    return (
      <div className={`cover-plain thumb`} style={{ background: plain.bg, color: plain.fg }}>
        <div className="cover-inner">
          <p className="cover-title" style={{ color: plain.fg }}>{shortTitle(plain.title)}</p>
        </div>
      </div>
    );
  }
  if (!book) return null;
  const thumb = size === "thumb";
  return (
    <article className={`cover ${book.cover} ${size === "hero" ? "cover-hero" : "thumb"}`} aria-label={`${book.title} cover`}>
      {book.cover === "atomic" && (
        <svg className="specks" viewBox="0 0 100 100" aria-hidden>
          {specks.map(([x, y], index) => (
            <circle key={index} cx={x} cy={y} r={index % 3 === 0 ? 0.7 : 0.4} fill={index % 2 ? "#B08958" : "#8A7355"} opacity={0.55} />
          ))}
        </svg>
      )}
      {book.cover === "power" && <div className="frame-line" />}
      <div className="cover-inner">
        {book.cover === "atomic" && <div className="kicker-cover">THE INTERNATIONAL BESTSELLER</div>}
        {book.cover === "deep" && <hr className="rule" />}
        {book.cover === "money" && <div className="circle" />}
        {book.cover === "alchemist" && <div className="sun" />}
        <h2 className={`cover-title ${book.cover === "thinking" ? "split-title" : ""}`}>
          {thumb ? shortTitle(book.title) : coverTitle(book)}
        </h2>
        {!thumb && book.cover === "atomic" && (
          <p className="cover-sub">Tiny Changes,<br />Remarkable Results</p>
        )}
        {!thumb && book.cover === "deep" && <p className="cover-sub">Rules for focused success</p>}
        {!thumb && <p className="cover-author">{book.author}</p>}
      </div>
    </article>
  );
}

function coverTitle(book: Book) {
  if (book.cover === "atomic") return <>Atomic<br />Habits</>;
  if (book.cover === "deep") return <>Deep<br />Work</>;
  if (book.cover === "money") return <>The<br />Psychology<br />of Money</>;
  if (book.cover === "alchemist") return <>The<br />Alchemist</>;
  if (book.cover === "thinking") return <>Thinking,<br />Fast and Slow</>;
  return <>48 Laws<br />of Power</>;
}

const thumbTitles: Record<string, string> = {
  "Atomic Habits": "Atomic Habits",
  "Deep Work": "Deep Work",
  "The Psychology of Money": "Psychology of Money",
  "The Alchemist": "Alchemist",
  "Thinking, Fast and Slow": "Thinking",
  "The 48 Laws of Power": "48 Laws",
  "Man's Search for Meaning": "Meaning",
  "Start With Why": "Start With Why",
  "Can't Hurt Me": "Can't Hurt Me",
  "Show Your Work": "Show Your Work",
  "The Subtle Art": "Subtle Art",
};

function shortTitle(title: string) {
  return thumbTitles[title] ?? title.split(" ").slice(0, 2).join(" ");
}

export function MiniCover({ book, plain }: { book?: Book; plain?: HistoryItem }) {
  if (book) return <BookCover book={book} size="thumb" />;
  if (plain) return <BookCover plain={plain} size="thumb" />;
  return null;
}
