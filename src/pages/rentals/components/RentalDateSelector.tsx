import { useState } from "react";
import { formatFriendlyDate, todayISO } from "../rentals.api";
import { RentalCalendarPopover, RentalDateConfirmPopover } from "./RentalCalendar";

interface RentalDateSelectorProps {
  eventDate: string | null;
  onChange: (date: string) => void;
  variant?: "hero" | "compact";
  /** Number of items currently in the cart; a nonzero count gates date changes behind a confirmation. */
  cartCount?: number;
}

/**
 * Single event-date picker. Behind the scenes the app reserves a pickup ->
 * return window around the date; we surface that here so it's transparent.
 */
const RentalDateSelector: React.FC<RentalDateSelectorProps> = ({
  eventDate,
  onChange,
  variant = "hero",
  cartCount = 0,
}) => {
  const [open, setOpen] = useState(false);
  const [pendingDate, setPendingDate] = useState<string | null>(null);

  const close = () => {
    setOpen(false);
    setPendingDate(null);
  };

  const handleSelect = (date: string) => {
    if (cartCount > 0 && date !== eventDate) {
      // Availability is scoped to a single date, so the cart can't carry
      // forward — confirm before wiping it.
      setPendingDate(date);
      return;
    }
    onChange(date);
    close();
  };

  const confirmChange = () => {
    if (pendingDate) onChange(pendingDate);
    close();
  };

  return (
    <div className={`rental-date-selector ${variant}`}>
      <div className="date-field-wrap">
        <button
          type="button"
          className={`date-field${open ? " open" : ""}`}
          onClick={() => setOpen((o) => !o)}
          aria-haspopup="dialog"
          aria-expanded={open}
        >
          <span className="date-label">Event date:</span>
          <span className={`date-display${eventDate ? "" : " placeholder"}`}>
            {eventDate ? formatFriendlyDate(eventDate) : "Select a date"}
          </span>
        </button>

        {pendingDate ? (
          <RentalDateConfirmPopover open onConfirm={confirmChange} onCancel={close} />
        ) : (
          <RentalCalendarPopover open={open} value={eventDate} min={todayISO()} onSelect={handleSelect} onClose={close} />
        )}
      </div>
    </div>
  );
};

export default RentalDateSelector;
