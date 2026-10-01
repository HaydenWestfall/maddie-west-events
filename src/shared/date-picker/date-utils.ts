const pad = (n: number) => String(n).padStart(2, "0");

/** Format a Date as a local ISO date string (YYYY-MM-DD), no timezone shift. */
export const toISODate = (date: Date): string =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

/** Today as an ISO date string (used as the date picker minimum). */
export const todayISO = (): string => toISODate(new Date());

/** Parse an ISO date string (YYYY-MM-DD) as a local Date. */
export const parseISODate = (iso: string): Date => {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
};

/** Human-friendly display, e.g. "Fri, Aug 15, 2025". */
export const formatFriendlyDate = (iso: string): string =>
  parseISODate(iso).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
