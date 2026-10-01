# Maddie West Events — Business Presence

> A single-source summary of the business, distilled from the Maddie West Events website (React frontend). Purpose: give Claude the context it needs to understand the business when working alongside emails, Instagram posts, and other materials. Last compiled from the site codebase on 2026-07-20.

---

## 1. Business at a Glance

- **Business name:** Maddie West Events
- **Owner / lead coordinator:** Madison "Maddie" Westfall
- **What it is:** A boutique wedding & event planning/coordination company. Maddie is a detail-oriented wedding and event coordinator.
- **Home base:** Dayton, Ohio area (the site also references the Greenville, OH area). Based near Ludlow Falls, OH (studio location).
- **Service area:** Dayton, Cincinnati, and Columbus, Ohio — "and beyond."
- **Website:** https://maddiewestevents.com
- **Instagram (events):** https://www.instagram.com/maddiewestevents/ (handle referenced as @maddiewest)
- **Tagline / positioning:** "Every detail adds depth to the narrative of celebration." Coordination focused on stress-free, collaborative, and properly-executed events.

### Sister brand
- **Still Acre Studio** (also written "Stillacre Studio" / "Stillacre Studios") — a photography studio run under the same umbrella. See Section 5.
- **Instagram (studio):** https://www.instagram.com/stillacrestudio/

---

## 2. Origin Story & Owner Bio

Maddie Westfall got married in **2022** and executed the wedding she had always envisioned. As a recent bride, she discovered a passion for giving other brides the ability to be fully present and enjoy their day rather than manage the details. She founded Maddie West Events out of that experience.

Her stated philosophy: an event's success lies in the careful consideration of its details. She positions herself as the person who handles all the logistics and vendor communication so the couple, families, and guests can be present. She emphasizes strong, long-standing relationships with venues and vendors in the local wedding industry.

She has also organized **styled shoots** to collaborate with and cross-promote local wedding vendors (rental companies, hair/makeup artists, florists, stationery designers, photographers, videographers). She actively invites local vendors to collaborate on future shoots.

---

## 3. Brand Voice & Aesthetic

- **Aesthetic keywords:** Timeless, modern, refined. "Intricate but soft designs." Organic neutrals with pops of earthy tones.
- **Tone:** Warm, personal, first-person ("I"), emotionally invested in couples. Emphasis on being calm, laid-back, and reassuring on the day-of.
- **Recurring themes:** Details, presence, joy, love as "meticulously curated," being a stress-free/calming presence, celebrating individuality.
- **Typographic style on site:** Heavy use of ALL CAPS headers with selectively capitalized words for emphasis (e.g., "The SUCCESS of an EVENT lies within the CAREFUL CONSIDERATION of its DETAILS").

---

## 4. Services — Coordination Packages

All packages are "Created and executed by Maddie Westfall." Each tier is cumulative — higher tiers include everything in the Month Of package. Inquiries route to the contact form.

### Month Of Coordination Package — $2,200
Begins **one month** before the wedding. For brides confident in their own planning (vendors, décor, details) who need execution support.
- Initial meeting one month out: finalize details, timeline, draft the processional.
- Attend and run the rehearsal.
- 10 hours day-of coverage including set-up and breakdown (additional hours available at a fee).
- **Day-of responsibilities:** vendor point-of-contact and direction; executing décor/aesthetic for ceremony & reception; greeting/seating guests; organizing the processional; tracking marriage license, ritual items, and rings; distributing ceremony items; verifying stationery/favors/place cards; lighting candles; confirming guest book, gift table, cake table, and rentals; following the timeline; safe transfer of gifts; handling last-minute emergencies.

### Final Planning Package — $2,500
Begins **3 months** before the wedding. Includes everything in Month Of. For brides in the final planning stages needing extra guidance.
- Monthly meetings leading up to the wedding.
- Attend final vendor meetings (venue, caterer, florist, DJ, rental companies, etc.).
- Organize/plan the rehearsal dinner.
- Confirm rental pieces and quantities.
- Assist mailing invitations.
- Develop and finalize the timeline.
- Create the seating chart.

### Partial Planning Package — $3,250
Begins **6 months** before the wedding. Includes everything in Month Of. For brides who have a venue/date and maybe some vendors but want guidance through the rest.
- Monthly meetings leading up to the wedding.
- Assist creating the wedding registry.
- Design/order save the dates.
- Finalize guest list.
- Schedule alterations appointment.
- Decide on bridesmaid dresses and men's suits/tuxedos.
- Research vendors (videographers, bartenders, DJ/band, florist, rental companies, etc.).
- Decide on decorations and quantities.
- Finalize alcohol provider and quantities.

> Note: These prices reflect the current site (a recent commit references a "price increase"). Confirm against the live site before quoting.

---

## 5. Still Acre Studio (Photography Studio)

A separate offering under the Maddie West umbrella — a rentable photography studio.

- **Location:** 9358 Fenner Rd, Ludlow Falls, Ohio.
- **Setting:** Nestled among the trees / surrounded by woods; modern aesthetic with soft natural light; private, peaceful, secluded.
- **Use cases:** Intimate couple's sessions, shoots with friends, family portraits, engagement shoots, holiday/Christmas shoots.
- **Booking model:** Hourly bookings. Listed rate: **$50.00 / hour**. Studio booking inquiries go through the contact form (Studio Booking tab), which collects shoot date, shoot length (30-min increments, 0.5–6 hours), session type, and number of people.
- **Instagram:** https://www.instagram.com/stillacrestudio/
- **Sample galleries on site:** "Kleyson + Kat" (Engagement), "Martin Family" (Christmas), "Matt, Kate, + Graham" (Christmas), "4 Generations" (Family Session).
- The studio is actively promoted on the homepage via a pop-up ad overlay.

---

## 6. Rentals (Event Rental Inventory)

Maddie West Events offers **event décor rentals** ("Curated pieces for your special day") through an on-site catalog backed by a separate rentals API (rental-service).

- **Flow:** Customer selects their event date → sees available inventory → filters by category or search → adds items to a cart → submits a rental **request/inquiry** (not an instant checkout).
- Each item has: name, description, images, category, quantity available, price, and metadata (color, material, dimensions).
- After submitting, the customer gets a confirmation email; **Maddie manually reviews** to confirm availability and final pricing.
- A **rental agreement** acknowledgment (checkbox + typed signature) is part of the request flow. ⚠️ The agreement text on the site is currently a **placeholder** (version dated `2026-07-01`) — final legal terms covering deposits, damage/liability, payment, and cancellation are still to be provided by Maddie.
- Rentals is a newer feature (under active development on the `rentals` branch at time of writing).

---

## 7. Website Structure (Pages)

| Route | Purpose |
|-------|---------|
| `/` (Home) | Brand intro, owner intro, journal preview, testimonial, favorite vendors, aesthetic sections, Still Acre Studio ad |
| `/about` | Maddie's full bio, origin story, styled-shoot narrative |
| `/testimonies` | Detailed client testimonials |
| `/packages` | The three coordination packages and pricing |
| `/studio` | Still Acre Studio details, galleries, pricing, booking |
| `/rentals` | Rental inventory catalog + inquiry/cart flow |
| `/journal` | Long-form storytelling entries about individual weddings |
| `/contact` | Contact form with two tabs: Event Planning + Studio Booking |

---

## 8. Contact & Inquiry

- **Primary contact method:** On-site contact form at `/contact`. Two modes:
  - **Event Planning inquiry** — collects name, email, event location, event type, event date, event budget, guest count, and comments.
  - **Studio Booking inquiry** — collects name, email, shoot date, shoot length, session type, number of people, and message.
- **Response promise:** "You will hear back within 48 hours."
- **Fallback / social contact:** Instagram (@maddiewestevents) — the site suggests reaching out via Instagram if the form fails.
- Backend: form submissions POST to a contact API (`/api/contact`). No public phone number or email address is published on the site; Instagram is the main public-facing channel besides the form.

---

## 9. Testimonials & Social Proof

The business leans heavily on client testimonials. Notable named clients/quotes referenced on the site:

- **Olivia + Caleb (09.02.2023)** — Olivia Gannelli: praised flawless coordination and nailing the vision.
- **Julia + Cole (08.25.2023)** — Julia Johnson: "on top of everything from start to finish."
- **Anna + Kodi (10.14.2023)** — Anna Roshak: "From a small intimate event to the largest grand nuptials, SHE MAKES THE DAY!" (this line is also used as a headline quote).
- **Sarah Voge** — trusted Maddie entirely with day-of décor.
- Homepage testimonial: a day-of-coordinator client who said Maddie "literally saved the day."

**Featured/favorite vendors & venues** (logos shown on homepage): Cliffside, Steam Plant, Jorgensen, Arcade — venues Maddie has worked with and recommends.

**Journal couples** (long-form wedding stories): Olivia + Michael, Lauren + Sam, Julia + Cole.

---

## 10. Quick Facts Cheat Sheet

- **Founder:** Madison (Maddie) Westfall — married 2022, founded the company after her own wedding.
- **Core business:** Wedding/event coordination (3 package tiers, $2,200 / $2,500 / $3,250).
- **Secondary businesses:** Still Acre Studio (photography studio, $50/hr) + event décor rentals.
- **Geography:** Dayton / Cincinnati / Columbus, OH; studio at 9358 Fenner Rd, Ludlow Falls, OH.
- **Response time commitment:** 48 hours.
- **Main channels:** Website (maddiewestevents.com) + Instagram (@maddiewestevents, @stillacrestudio).
- **Brand feel:** Timeless, modern, refined; warm and detail-obsessed; calm reassuring presence.

---

## 11. Open Items / Things to Verify

These are unconfirmed or in-flux at the time this summary was compiled — flag rather than assume:
- Final rental **agreement/legal terms** (deposits, damage, cancellation) are placeholder text on the site.
- The deployed **rentals API URL** was marked TODO in production config.
- **Package pricing** recently increased; verify against the live site.
- No public **email/phone** is listed — inquiries are form- and Instagram-based only.
