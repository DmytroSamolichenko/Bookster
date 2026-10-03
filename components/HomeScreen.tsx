"use client";

import { useEffect, useState, type ReactNode } from "react";
import { BookCover } from "./BookCover";
import { Pager } from "./Pager";
import {
  Battery,
  BookIcon,
  BoltIcon,
  ChartIcon,
  Chevron,
  Clock,
  Coin,
  HomeIcon,
  Levels,
  Pages,
  People,
  Person,
  Reader,
  Signal,
  Star,
  WalletIcon,
  Wifi,
} from "./icons";
import { bookStats, books } from "@/lib/data";
import { formatUsdc, walletAmount } from "@/lib/format";
import { useData, useStore, useUi } from "@/lib/store";
import type { Book, Difficulty, TabId } from "@/lib/types";

export function StatusBar() {
  const [time, setTime] = useState("9:41");
  useEffect(() => {
    const paint = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }));
    };
    paint();
    const timer = window.setInterval(paint, 10000);
    return () => window.clearInterval(timer);
  }, []);
  return (
    <div className="statusbar">
      <span>{time}</span>
      <span className="status-icons">
        <Signal />
        <Wifi />
        <Battery />
      </span>
    </div>
  );
}

export function BrandBar() {
  const data = useData();
  const { dispatch } = useStore();
  return (
    <header className="brandbar">
      <div className="brand">
        <img className="brand-logo" src="/bookster-logo.png" alt="Bookster" />
      </div>
      <div className="brand-actions">
        <button className="wallet-pill" onClick={() => dispatch({ type: "sheet", sheet: { type: "wallet" } })} aria-label="Open wallet">
          <WalletIcon />
          <strong>{data.walletConnected ? <>{walletAmount(data.wallet.available)} <em>USDC</em></> : "Connect"}</strong>
          <Chevron />
        </button>
        <button className="icon-btn" aria-label="Profile" onClick={() => dispatch({ type: "tab", tab: "profile" })}>
          <Person />
        </button>
      </div>
    </header>
  );
}

export function BottomNav({ native }: { native: boolean }) {
  const ui = useUi();
  const { dispatch } = useStore();
  const items: { id: TabId; label: string; icon: ReactNode }[] = [
    { id: "home", label: "Home", icon: <HomeIcon /> },
    { id: "challenges", label: "Challenges", icon: <BoltIcon /> },
    { id: "library", label: "Library", icon: <BookIcon /> },
    { id: "leaderboard", label: "Leaderboard", icon: <ChartIcon /> },
    { id: "profile", label: "Profile", icon: <Person /> },
  ];
  return (
    <nav className="nav" aria-label="Primary">
      {items.map((item) => (
        <button key={item.id} className={ui.tab === item.id && ui.stack.length === 0 ? "on" : ""} onClick={() => dispatch({ type: "tab", tab: item.id })}>
          {item.icon}
          <span>{item.label}</span>
        </button>
      ))}
      {!native && <i className="home-bar" />}
    </nav>
  );
}

const levels: Record<Difficulty, number> = { Easy: 1, Medium: 2, Hard: 3 };

export function HomeScreen() {
  const data = useData();
  const ui = useUi();
  const { dispatch } = useStore();
  return (
    <div className="home">
      <BrandBar />
      <Pager
        index={ui.homeIndex}
        onIndex={(index) => {
          dispatch({ type: "home", index });
          if (!ui.swiped) dispatch({ type: "swiped" });
        }}
      >
        {books.map((book, index) => (
          <BookSlide key={book.id} book={book} index={index} total={books.length} swiped={ui.swiped} now={ui.now} challenges={data.challenges} onOpen={() => dispatch({ type: "push", screen: { name: "challenges", bookId: book.id } })} />
        ))}
      </Pager>
    </div>
  );
}

function BookSlide({
  book,
  index,
  total,
  swiped,
  now,
  challenges,
  onOpen,
}: {
  book: Book;
  index: number;
  total: number;
  swiped: boolean;
  now: number;
  challenges: ReturnType<typeof useData>["challenges"];
  onOpen: () => void;
}) {
  const stats = bookStats(book.id, challenges, now);
  return (
    <article className="slide">
      <div className="stage-row">
        <div />
        <BookCover book={book} size="hero" />
        <div className="rail">
          <div className="rating"><Star /> {book.rating.toFixed(1)}</div>
          <div className="rail-count">{index + 1}/{total}</div>
          <div className="rail-line" />
          <div className="dots">
            {Array.from({ length: total }, (_, dot) => <i key={dot} className={dot === index ? "on" : ""} />)}
          </div>
        </div>
      </div>
      <div className="copy">
        <h1 className="book-title">{book.title}</h1>
        <p className="author">{book.author}</p>
        <div><span className="pill">{book.category}</span></div>
        <div className="meta-row">
          <span><Pages /> {book.pages} pages</span>
          <span><Clock /> {book.readTime}</span>
          <span><Levels filled={levels[book.difficulty]} /> {book.difficulty}</span>
        </div>
        <p className="desc">{book.description}</p>
        <div className="statbar">
          <div className="stat">
            <People />
            <div><b>{stats.challenges}</b><small>active challenges</small></div>
          </div>
          <div className="stat">
            <Reader />
            <div><b>{stats.readers}</b><small>active readers</small></div>
          </div>
          <div className="stat gold">
            <Coin />
            <div><small>Starting from</small><b>{formatUsdc(stats.starting)} USDC</b></div>
          </div>
        </div>
        <button className="gold-btn" onClick={onOpen}>
          VIEW CHALLENGES <Chevron />
        </button>
        <div className={swiped ? "swipe-hint dim" : "swipe-hint"}>
          <Chevron dir="up" />
          SWIPE TO EXPLORE
        </div>
      </div>
    </article>
  );
}
