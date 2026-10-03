type IconProps = { size?: number };

export function WalletIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
      <rect x="1.6" y="3.4" width="12.8" height="9.4" rx="1.6" stroke="currentColor" strokeWidth="1.2" />
      <path d="M1.8 6.2h12.4" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="11.2" cy="9.3" r="0.8" fill="currentColor" />
    </svg>
  );
}

export function Person() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <circle cx="8" cy="5.4" r="2.1" stroke="currentColor" strokeWidth="1.3" />
      <path d="M3.6 12.6c.8-2 2.4-2.9 4.4-2.9s3.6.9 4.4 2.9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

export function HomeIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5.2v-5.2H10.2V21H5a1 1 0 0 1-1-1v-9.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

export function BoltIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M13 3 5.8 13.2h5.2L10.2 21 18.2 10.2h-5.4L13 3Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

export function BookIcon({ size = 22 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M5 5.5c2.6-1 5.2-.2 7 1.4 1.8-1.6 4.4-2.4 7-1.4V19c-2.6-1.1-5.2-.2-7 1.3C10.2 18.8 7.6 17.9 5 19V5.5Z" stroke="currentColor" strokeWidth="1.4" />
      <path d="M12 6.9V20.2" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export function ChartIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M5 19V10M12 19V5M19 19v-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function Star() {
  return (
    <svg width="10" height="10" viewBox="0 0 12 12" fill="#c6a36a" aria-hidden>
      <path d="m6 1.2 1.2 2.7 2.9.3-2.2 1.9.6 2.9L6 7.5 3.5 9l.6-2.9L1.9 4.2l2.9-.3L6 1.2Z" />
    </svg>
  );
}

export function Clock() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden>
      <circle cx="8" cy="8" r="5.2" stroke="currentColor" strokeWidth="1.2" />
      <path d="M8 5.2V8l2 1.4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export function Pages() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M4 2.8h6.2L13 5.6V13a.8.8 0 0 1-.8.8H4.8A.8.8 0 0 1 4 13V2.8Z" stroke="currentColor" strokeWidth="1.2" />
      <path d="M10 2.9V5.6H13" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export function Levels({ filled }: { filled: number }) {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden>
      {[0, 1, 2].map((index) => (
        <rect
          key={index}
          x={2 + index * 4.2}
          y={10 - index * 2.4}
          width="2.4"
          height={3.2 + index * 2.4}
          rx="0.4"
          fill={index < filled ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1"
        />
      ))}
    </svg>
  );
}

export function People() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <circle cx="6" cy="5.2" r="1.7" stroke="currentColor" strokeWidth="1.2" />
      <path d="M2.8 11.8c.6-1.6 1.8-2.3 3.2-2.3 1.4 0 2.6.7 3.2 2.3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="11" cy="5.6" r="1.4" stroke="currentColor" strokeWidth="1.1" />
      <path d="M10.2 9.6c1.2-.2 2.2.2 2.9 1.4" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  );
}

export function Reader() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <circle cx="8" cy="5" r="1.8" stroke="currentColor" strokeWidth="1.2" />
      <path d="M3.8 12.4c.7-1.8 2.2-2.6 4.2-2.6s3.5.8 4.2 2.6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export function Coin() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <circle cx="8" cy="8" r="5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M8 5.2v5.6M6.3 6.4c.4-.6 1-.8 1.7-.8 1 0 1.7.5 1.7 1.3S9 8.2 8 8.2 6.3 8.7 6.3 9.5 7 10.8 8 10.8c.7 0 1.3-.2 1.7-.7" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  );
}

export function Chevron({ dir = "right" }: { dir?: "right" | "up" | "left" }) {
  const rotate = dir === "up" ? -90 : dir === "left" ? 180 : 0;
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ transform: `rotate(${rotate}deg)` }} aria-hidden>
      <path d="M6 3.5 11 8 6 12.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Check() {
  return (
    <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M3.2 8.2 6.4 11.4 12.8 4.8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Bookmark({ filled = false }: { filled?: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill={filled ? "currentColor" : "none"} aria-hidden>
      <path d="M5 2.8h8a.8.8 0 0 1 .8.8v11.2L9 12.1 4.2 14.8V3.6a.8.8 0 0 1 .8-.8Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  );
}

export function TypeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <path d="M3.2 4.2h11.6M9 4.2v9.6M6.4 13.8h5.2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

export function Sliders() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <path d="M3 5.5h12M3 12.5h12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <circle cx="7" cy="5.5" r="1.6" fill="#050505" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="11.5" cy="12.5" r="1.6" fill="#050505" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}
