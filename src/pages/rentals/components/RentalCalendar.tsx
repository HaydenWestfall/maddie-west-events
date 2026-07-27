import { AnimatePresence, motion } from "framer-motion";
import { popoverMotion } from "../../../shared/date-picker/DateCalendar";

export { DateCalendarPopover as RentalCalendarPopover } from "../../../shared/date-picker/DateCalendar";

interface RentalDateConfirmProps {
  onConfirm: () => void;
  onCancel: () => void;
}

/**
 * Shown instead of the calendar when the visitor already has items in their
 * cart and picks a different date. Availability is scoped to a single date,
 * so switching dates can't carry the cart forward — this makes that explicit
 * before we wipe it.
 */
const RentalDateConfirm: React.FC<RentalDateConfirmProps> = ({ onConfirm, onCancel }) => (
  <>
    <div className="calendar-scrim" onClick={onCancel} aria-hidden="true" />
    <motion.div className="mwe-calendar date-confirm" role="dialog" aria-label="Confirm date change" {...popoverMotion}>
      <p className="confirm-message">
        Availability is tied to your event date. Changing it will empty your cart so you can start over.
      </p>
      <div className="confirm-actions">
        <button type="button" className="confirm-cancel" onClick={onCancel}>
          Keep current date
        </button>
        <button type="button" className="confirm-proceed" onClick={onConfirm}>
          Change date
        </button>
      </div>
    </motion.div>
  </>
);

export const RentalDateConfirmPopover: React.FC<RentalDateConfirmProps & { open: boolean }> = ({ open, ...props }) => (
  <AnimatePresence>{open && <RentalDateConfirm {...props} />}</AnimatePresence>
);
