import { useState } from "react";
import { DateCalendarPopover } from "../../shared/date-picker/DateCalendar";
import { formatFriendlyDate, todayISO } from "../../shared/date-picker/date-utils";

interface DateInputProps {
  /** ISO date string (YYYY-MM-DD); empty when nothing is picked yet. */
  value: string;
  onChange: (iso: string) => void;
  /** Called once the picker closes, so the form can flag the field as touched. */
  onTouched?: () => void;
  invalid?: boolean;
  placeholder?: string;
  /** Accessible name for the calendar dialog. */
  label?: string;
}

/**
 * Contact-form date field. Swaps the browser's native date control for the
 * site's own calendar popover so the forms match the rentals flow; the value it
 * hands back is the same ISO string a native date input would produce.
 */
const DateInput: React.FC<DateInputProps> = ({
  value,
  onChange,
  onTouched,
  invalid,
  placeholder = "SELECT A DATE",
  label,
}) => {
  const [open, setOpen] = useState(false);

  const close = () => {
    setOpen(false);
    onTouched?.();
  };

  return (
    <div className="date-input">
      <button
        type="button"
        className={`date-input-field${open ? " open" : ""}${invalid ? " invalid" : ""}${value ? "" : " placeholder"}`}
        onClick={() => (open ? close() : setOpen(true))}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        {value ? formatFriendlyDate(value) : placeholder}
      </button>

      <DateCalendarPopover
        open={open}
        value={value || null}
        min={todayISO()}
        label={label}
        onSelect={(iso) => {
          onChange(iso);
          close();
        }}
        onClose={close}
      />
    </div>
  );
};

export default DateInput;
