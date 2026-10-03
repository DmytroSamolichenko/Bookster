export function formatUsdc(value: number, digits?: number) {
  const fraction =
    digits ?? (Number.isInteger(value) ? 0 : 2);
  return value.toLocaleString("en-US", {
    minimumFractionDigits: fraction,
    maximumFractionDigits: fraction,
  });
}

export function walletAmount(value: number) {
  return formatUsdc(value, 2);
}

export function formatRemaining(endsAt: number, now: number) {
  const ms = endsAt - now;
  if (ms <= 0) return "Ended";
  const totalMinutes = Math.floor(ms / 60000);
  const days = Math.floor(totalMinutes / 1440);
  const hours = Math.floor((totalMinutes % 1440) / 60);
  const minutes = totalMinutes % 60;
  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}

export function standing(progress: number, rivals: number[]) {
  return 1 + rivals.filter((rival) => rival > progress).length;
}

export function readingPercent(chaptersRead: number, total: number) {
  if (total <= 0) return 0;
  return Math.round((chaptersRead / total) * 100);
}

export function knowledgeFrom(scores: Array<number | null>) {
  const done = scores.filter((score): score is number => score != null);
  if (!done.length) return 0;
  return Math.round(done.reduce((sum, score) => sum + score, 0) / done.length);
}

export function ordinal(n: number) {
  const mod100 = n % 100;
  if (mod100 >= 11 && mod100 <= 13) return `${n}th`;
  switch (n % 10) {
    case 1:
      return `${n}st`;
    case 2:
      return `${n}nd`;
    case 3:
      return `${n}rd`;
    default:
      return `${n}th`;
  }
}

export function shortDate(timestamp: number) {
  return new Date(timestamp).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export function makeHash() {
  const alphabet = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
  let value = "";
  for (let i = 0; i < 32; i += 1) {
    value += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return `${value.slice(0, 3)}...${value.slice(-3)}`;
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}
