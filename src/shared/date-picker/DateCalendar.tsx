import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { parseISODate, toISODate } from "./date-utils";
import "./date-picker.scss";

interface DateCalendarProps {
  /** Currently selected date (ISO YYYY-MM-DD) or null. */
  value: string | null;
  /** Earliest selectable date (ISO). Days before are disabled. */
  min: string;
  onSelect: (iso: string) => void;
  onClose: () => void;
  /** Accessible name for the popover dialog. */
  label?: string;
}

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

/** Shared animation for every popover that hangs off a date field. */
export const popoverMotion = {
  initial: { opacity: 0, y: -8, scale: 0.97 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -8, scale: 0.97 },
  transition: { duration: 0.18, ease: [0.22, 1, 0.36, 1] },
} as const;

/**
 * Bespoke calendar popover — matches the site's design language rather than a
 * library's (or the browser's) default chrome. Renders a single month grid with
 * prev/next navigation; past days (before `min`) are disabled.
 *
 * Positioning is left to the consumer: the popover is absolutely positioned, so
 * whatever wraps it needs `position: relative`.
 */
const DateCalendar: React.FC<DateCalendarProps> = ({ value, min, onSelect, onClose, label = "Choose a date" }) => {
  const selected = value ? parseISODate(value) : null;
  const minDate = startOfDay(parseISODate(min));
  const today = startOfDay(new Date());

  // The month currently on screen — defaults to the selected date's month, else the min month.
  const [view, setView] = useState<Date>(() => {
    const base = selected ?? minDate;
    return new Date(base.getFullYear(), base.getMonth(), 1);
  });

  const canGoPrev = useMemo(
    () => new Date(view.getFullYear(), view.getMonth(), 1) > new Date(minDate.getFullYear(), minDate.getMonth(), 1),
    [view, minDate]
  );

  const weeks = useMemo(() => {
    const year = view.getFullYear();
    const month = view.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const cells: (Date | null)[] = [];
    for (let i = 0; i < firstDay; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
    while (cells.length % 7 !== 0) cells.push(null);

    const rows: (Date | null)[][] = [];
    for (let i = 0; i < cells.length; i += 7) rows.push(cells.slice(i, i + 7));
    return rows;
  }, [view]);

  const isSameDay = (a: Date, b: Date | null) =>
    !!b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

  const changeMonth = (delta: number) => setView((v) => new Date(v.getFullYear(), v.getMonth() + delta, 1));

  return (
    <>
      <div className="calendar-scrim" onClick={onClose} aria-hidden="true" />
      <motion.div className="mwe-calendar" role="dialog" aria-label={label} {...popoverMotion}>
        <div className="calendar-head">
          <button
            type="button"
            className="nav"
            onClick={() => changeMonth(-1)}
            disabled={!canGoPrev}
            aria-label="Previous month"
          >
            &#8249;
          </button>
          <div className="calendar-title">
            <span className="month">{MONTHS[view.getMonth()]}</span>
            <span className="year">{view.getFullYear()}</span>
          </div>
          <button type="button" className="nav" onClick={() => changeMonth(1)} aria-label="Next month">
            &#8250;
          </button>
        </div>

        <div className="calendar-weekdays">
          {WEEKDAYS.map((d, i) => (
            <span key={i}>{d}</span>
          ))}
        </div>

        <div className="calendar-grid">
          {weeks.map((week, wi) =>
            week.map((day, di) => {
              if (!day) return <span key={`${wi}-${di}`} className="day empty" />;
              const disabled = startOfDay(day) < minDate;
              const isSelected = isSameDay(day, selected);
              const isToday = isSameDay(day, today);
              return (
                <button
                  key={`${wi}-${di}`}
                  type="button"
                  className={`day${isSelected ? " selected" : ""}${isToday ? " today" : ""}`}
                  disabled={disabled}
                  onClick={() => onSelect(toISODate(day))}
                >
                  {day.getDate()}
                </button>
              );
            })
          )}
        </div>
      </motion.div>
    </>
  );
};

/** Wrapper that mounts the calendar only when open, so exit animations run. */
export const DateCalendarPopover: React.FC<DateCalendarProps & { open: boolean }> = ({ open, ...props }) => (
  <AnimatePresence>{open && <DateCalendar {...props} />}</AnimatePresence>
);

export default DateCalendar;
