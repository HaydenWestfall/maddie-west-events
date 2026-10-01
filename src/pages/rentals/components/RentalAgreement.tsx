/**
 * Rental Agreement copy shown to the customer on its own page (see
 * pages/rental-agreement) and referenced when they acknowledge it at
 * submission. When the wording changes in any meaningful way, bump
 * AGREEMENT_VERSION so each stored acknowledgment records exactly which
 * version the customer agreed to. Old versions remain reconstructable via
 * git history.
 */
export const AGREEMENT_VERSION = "2026-07-25";

const RentalAgreement: React.FC = () => {
  return (
    <div className="rental-agreement">
      <h2 className="rental-agreement-title">Event Rental Agreement</h2>
      <p className="rental-agreement-version">Version {AGREEMENT_VERSION}</p>

      <div className="rental-agreement-body">
        <p>
          <strong>Maddie West Events</strong>
          <br />
          Website: maddiewestevents.com
          <br />
          Contact: madisonwestfall@maddiewestevents.com
        </p>

        <p>
          These terms (the "Agreement") govern the rental of items from <strong>Maddie West Events</strong> ("Company,"
          "we," "us," or "our") by the person or entity placing the rental order ("Renter," "you," or "your"). The
          specific items, quantities, prices, event date, and deposit for your rental are shown in your order summary
          and are incorporated into this Agreement by reference. By accepting this Agreement, you agree to all of the
          terms below.
        </p>

        <h3>1. Rental Items</h3>
        <p>
          The items rented to you (the "Rental Items"), including their quantities, rental prices, and replacement
          values, are those listed in your order summary at the time of booking.
        </p>

        <h3>2. Rental Period, Pickup, and Return</h3>
        <p>
          <strong>2.1 Pickup.</strong> You must pick up the Rental Items on the{" "}
          <strong>day immediately before your Event Date</strong>, at 9358 Fenner Rd, Ludlow Falls, OH 45339, United
          States.
        </p>
        <p>
          <strong>2.2 Return.</strong> You must return the Rental Items on the{" "}
          <strong>day immediately after your Event Date</strong>, to 9358 Fenner Rd, Ludlow Falls, OH 45339, United
          States.
        </p>
        <p>
          <strong>2.3 Fixed rental window.</strong> The rental period runs from pickup on the day before the Event Date
          through return on the day after the Event Date. Any earlier pickup or later return requires Maddie West
          Events' prior written approval and may be subject to additional charges.
        </p>
        <p>
          <strong>2.4 Late return.</strong> If the Rental Items are not returned by the close of business on the day
          after your Event Date, you will be charged a late fee of <strong>$[amount] per day</strong> until all items
          are returned. Company may treat items unreturned after <strong>[number] days</strong> as lost and charge the
          full replacement value under Section 6.
        </p>
        <p>
          <strong>2.5 Condition on pickup.</strong> Rental Items are provided clean and in good working condition. You
          should inspect the items at pickup and report any pre-existing issue immediately; otherwise the items are
          deemed accepted in good condition.
        </p>

        <h3>3. Fees, Deposit, and Payment</h3>
        <p>
          <strong>3.1 Rental fee.</strong> The total rental fee is the amount shown in your order summary.
        </p>
        <p>
          <strong>3.2 Security / damage deposit.</strong> A refundable security deposit in the amount shown in your
          order is due at or before pickup. The deposit secures your obligations under this Agreement, including for
          damage, loss, late return, and excessive cleaning.
        </p>
        <p>
          <strong>3.3 Payment.</strong> Payment is due{" "}
          <strong>[in full at booking / at pickup / per the schedule shown at booking]</strong> using an accepted
          payment method.
        </p>
        <p>
          <strong>3.4 Deposit refund.</strong> Company will inspect the returned Rental Items and refund the deposit,
          less any amounts owed under this Agreement, within <strong>[number] days</strong> of return. Where deductions
          are made, Company will provide you an itemized statement.
        </p>

        <h3>4. Care and Use</h3>
        <p>
          <strong>4.1</strong> You shall use the Rental Items only for their intended purpose and in a careful and
          proper manner.
        </p>
        <p>
          <strong>4.2</strong> You shall not alter, repair, paint, or modify any Rental Item without Company's prior
          written consent.
        </p>
        <p>
          <strong>4.3</strong> You shall keep the Rental Items in your possession and control and shall not sublease,
          loan, or transfer them to any third party.
        </p>
        <p>
          <strong>4.4</strong> You are responsible for the Rental Items from the moment of pickup until they are
          returned to and accepted by Company.
        </p>

        <h3>5. Cleaning</h3>
        <p>
          <strong>5.1</strong> Unless otherwise agreed, Rental Items should be returned free of food, debris, and gross
          soiling. Normal light cleaning by Company is included.
        </p>
        <p>
          <strong>5.2</strong> If items are returned requiring cleaning beyond normal light cleaning, you will be
          charged a cleaning fee of <strong>$[amount]</strong> (or the actual cleaning cost), which may be deducted from
          the deposit.
        </p>

        <h3>6. Damage, Loss, and Replacement</h3>
        <p>
          <strong>6.1 Your responsibility.</strong> You are responsible for any damage to, or loss or theft of, the
          Rental Items occurring during the rental period, regardless of cause, except for normal wear and tear.
        </p>
        <p>
          <strong>6.2 Normal wear and tear excluded.</strong> You are not charged for normal wear and tear consistent
          with ordinary, careful use.
        </p>
        <p>
          <strong>6.3 Repairable damage.</strong> For items that are damaged but repairable, you shall pay the
          reasonable cost of repair.
        </p>
        <p>
          <strong>6.4 Loss, theft, or damage beyond repair.</strong> For items that are lost, stolen, or damaged beyond
          reasonable repair, you shall pay the full replacement value stated in your order (or, if not stated, current
          retail replacement cost).
        </p>
        <p>
          <strong>6.5 Assessment and billing.</strong> Company will inspect returned items and determine any repair or
          replacement charges and provide you an itemized statement. Charges may be deducted from the deposit; any
          amount exceeding the deposit is due within <strong>[number] days</strong> of the statement.
        </p>

        <h3>7. Cancellation and Refunds</h3>
        <p>
          <strong>7.1 Your cancellation.</strong> If you cancel <strong>[number] or more days</strong> before your Event
          Date, you receive <strong>[full refund / refund less deposit / refund less $amount]</strong>. Cancellations
          within <strong>[number] days</strong> of the Event Date are{" "}
          <strong>[non-refundable / subject to a $amount fee]</strong>.
        </p>
        <p>
          <strong>7.2 Company cancellation.</strong> If Company is unable to fulfill your rental, Company will provide a
          comparable substitute where possible or refund all amounts paid. Company's liability for cancellation is
          limited to the amounts you paid.
        </p>

        <h3>8. Delivery and Setup (if applicable)</h3>
        <p>
          Standard terms assume Renter pickup and return. If Company provides delivery, setup, or teardown, those
          services and their fees are stated in your order and are governed by this Agreement.
        </p>

        <h3>9. Assumption of Risk and Limitation of Liability</h3>
        <p>
          <strong>9.1</strong> You use the Rental Items at your own risk. Company is not liable for any injury, loss, or
          damage to persons or property arising from your use of the Rental Items, except to the extent caused by
          Company's gross negligence or willful misconduct.
        </p>
        <p>
          <strong>9.2</strong> To the maximum extent permitted by law, Company's total liability under this Agreement
          shall not exceed the total rental fee you paid.
        </p>
        <p>
          <strong>9.3</strong> Company is not liable for any indirect, incidental, consequential, or special damages.
        </p>

        <h3>10. Indemnification</h3>
        <p>
          You agree to indemnify and hold harmless Company and its owners, employees, and agents from any claims,
          damages, liabilities, or expenses (including reasonable attorneys' fees) arising out of your use of the Rental
          Items or your breach of this Agreement, except to the extent caused by Company's gross negligence or willful
          misconduct.
        </p>

        <h3>11. Force Majeure</h3>
        <p>
          Neither Party is liable for failure or delay in performance caused by events beyond its reasonable control,
          including natural disasters, severe weather, fire, government action, or other emergencies. If such an event
          prevents the rental, the Parties will work in good faith toward a rescheduled date or a fair refund.
        </p>

        <h3>12. Governing Law</h3>
        <p>
          This Agreement is governed by the laws of the State of Ohio, without regard to its conflict of laws
          principles. Any dispute shall be brought in the courts located in <strong>[county]</strong> County, Ohio.
        </p>

        <h3>13. Entire Agreement</h3>
        <p>
          This Agreement, together with your order summary, is the entire agreement between the Parties regarding the
          Rental Items and supersedes any prior understandings. If any provision is held unenforceable, the remaining
          provisions remain in effect.
        </p>

        <h3>14. Acceptance</h3>
        <p>
          By checking the acceptance box and entering your name in the rental form, you acknowledge that you have read,
          understood, and agree to be bound by this Agreement, including the pickup and return schedule in Section 2 and
          the damage and loss terms in Section 6. Your electronic acceptance has the same legal effect as a handwritten
          signature.
        </p>
      </div>
    </div>
  );
};

export default RentalAgreement;
