/**
 * Plain-language summary of how a rental actually works — the window, where
 * pickup happens, what requesting does, and what's expected on return. The
 * binding version of all of this lives in RentalAgreement; this is the
 * skim-able version so nobody has to read the agreement to answer "does this
 * even work for my weekend?".
 */
const RentalGuidelines: React.FC = () => {
  return (
    <section className="rental-guidelines" aria-labelledby="rental-guidelines-title">
      <div className="guidelines-inner">
        <div className="guidelines-head">
          <span className="eyebrow">GOOD TO KNOW</span>
          <h2 id="rental-guidelines-title">How our rentals work</h2>
        </div>

        <ul className="guidelines-grid">
          <li className="guideline">
            <span className="guideline-index">01</span>
            <h3>Your rental window</h3>
            <p>
              Pick up the <strong>day before</strong> your event and return the <strong>day after</strong>. That full
              three-day window is held for you at no extra charge, so there's no rush on setup or teardown.
            </p>
          </li>

          <li className="guideline">
            <span className="guideline-index">02</span>
            <h3>Pickup &amp; return</h3>
            <p>
              Pickup and return both happen in <strong>Ludlow Falls, Ohio</strong>, just north of Dayton. We'll send you
              the exact address once your request is approved. Renter pickup is standard — ask if you'd like to talk
              about delivery.
            </p>
          </li>

          <li className="guideline">
            <span className="guideline-index">03</span>
            <h3>Requesting is free</h3>
            <p>
              Choose your date, add the pieces you love, and send your request.{" "}
              <strong>Nothing is charged up front</strong> — Maddie reviews availability, confirms final pricing, and
              follows up by email.
            </p>
          </li>

          <li className="guideline">
            <span className="guideline-index">04</span>
            <h3>Care &amp; deposit</h3>
            <p>
              Items go out clean and in good condition. Please return them free of food and debris. A refundable damage
              deposit is due at pickup and returned after everything is checked back in.
            </p>
          </li>
        </ul>

        <p className="guidelines-footnote">
          Availability shown here is live for the date you choose, and is held once your request is approved. Full terms
          live in the{" "}
          <a href="/rentals/agreement" target="_blank" rel="noopener noreferrer">
            rental agreement
          </a>
          .
        </p>
      </div>
    </section>
  );
};

export default RentalGuidelines;
