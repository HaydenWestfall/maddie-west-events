import "./rentals.scss";
import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/all";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Player } from "@lottiefiles/react-lottie-player";
import { env } from "../../config/env";
import { RentalItem } from "../../types/rentals";
import { componentOnLoadAnimationDelay, mweNavigate, TransitionState } from "../../shared/utility";
import { useMWETransitionContext } from "../../shared/route-transition/TransitionProvider";
import Overlay, { OverlayRef } from "../../shared/overlay";
import Angle from "../../assets/angle.svg?react";
import { RentalCartProvider, useRentalCart } from "./context/RentalCartContext";
import { getAvailableItems, getCategories } from "./rentals.api";
import RentalDateSelector from "./components/RentalDateSelector";
import RentalItemCard from "./components/RentalItemCard";
import RentalItemDetail, { RentalItemDetailRef } from "./components/RentalItemDetail";
import RentalCartDrawer from "./components/RentalCartDrawer";
import RentalGuidelines from "./components/RentalGuidelines";
import Seo from "../../seo/Seo";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

const ITEMS_PER_PAGE = 16;

const RentalsContent: React.FC<{ handleNavigation: (path: string) => void }> = ({ handleNavigation }) => {
  const { eventDate, dateRange, setEventDate, quantityInCart, revalidate, count, clear } = useRentalCart();
  const { isTransitioning } = useMWETransitionContext();

  const [items, setItems] = useState<RentalItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [retryKey, setRetryKey] = useState(0);

  const [categories, setCategories] = useState<string[]>([]);
  const [category, setCategory] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [name, setName] = useState("");

  const containerRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const filtersRef = useRef<HTMLDivElement | null>(null);
  const detailRef = useRef<RentalItemDetailRef | null>(null);
  const confirmationRef = useRef<OverlayRef | null>(null);

  // Header entrance animation (consistent with the contact page).
  useGSAP(
    () => {
      if (isTransitioning === TransitionState.DoneTransitioning) {
        gsap.fromTo(
          headerRef.current,
          { y: "60px", opacity: 0 },
          { y: "0", opacity: 1, duration: 0.7, delay: componentOnLoadAnimationDelay },
        );
      }
    },
    { dependencies: [isTransitioning], scope: containerRef },
  );

  // Load the full category list once (date-independent).
  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch(() => setCategories([]));
  }, []);

  // Debounce the search input into the active `name` filter.
  useEffect(() => {
    const handle = setTimeout(() => {
      setName(searchInput.trim());
      setCurrentPage(1);
    }, 350);
    return () => clearTimeout(handle);
  }, [searchInput]);

  // Fetch available items whenever the date, filters, or page change.
  useEffect(() => {
    if (!dateRange) {
      setItems([]);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getAvailableItems({
          dateRange,
          category: category || undefined,
          name: name || undefined,
          page: currentPage,
          limit: ITEMS_PER_PAGE,
        });
        if (cancelled) return;
        setItems(data.data);
        setTotalPages(data.pagination?.pages ?? 1);
        revalidate(data.data);
      } catch (err) {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : "Failed to load rental items.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateRange?.startDate, dateRange?.endDate, category, name, currentPage, retryKey]);

  const handleDateChange = (date: string) => {
    if (date === eventDate) return;
    setEventDate(date);
    // Availability is scoped to a single date, so a date change can't carry
    // the cart forward. Confirmation happens upstream in RentalDateSelector;
    // by the time we get here it's a no-op if the cart was already empty.
    clear();
    setCurrentPage(1);
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    filtersRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main data-barba="wrapper">
      <Seo route="/rentals" />
      <div ref={containerRef} data-barba="container" data-barba-namespace="rentals" className="rentals_route">
        <h1 className="sr-only">Event &amp; Wedding Décor Rentals — Maddie West Events</h1>
        <div className="rentals-header">
          <div className="header-content" ref={headerRef}>
            <div className="header">RENTALS</div>
            <div className="sub-header">CURATED PIECES FOR YOUR SPECIAL DAY</div>
          </div>
        </div>

        {!eventDate ? (
          <section className="rental-date-gate">
            <div className="gate-content">
              <h2>When is your event?</h2>
              <p>Tell us your date and we'll show you exact availability for our items.</p>
              <RentalDateSelector eventDate={eventDate} onChange={handleDateChange} variant="hero" cartCount={count} />
              {/*
                The date they pick isn't the date they collect on, so state the
                window up front — it's the thing that decides whether a date
                works for them at all.
              */}
              <ul className="gate-notes">
                <li>Pick up the day before</li>
                <li>Return the day after</li>
                <li>Ludlow Falls, OH</li>
              </ul>
            </div>
          </section>
        ) : (
          <>
            <div className="product-filters-wrapper" ref={filtersRef}>
              <div className="product-filters">
                <div className="search-bar">
                  <input
                    type="text"
                    placeholder="Search rental items..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                  />
                </div>
                <div className="filters">
                  <RentalDateSelector
                    eventDate={eventDate}
                    onChange={handleDateChange}
                    variant="compact"
                    cartCount={count}
                  />

                  <div className="filter-group">
                    <label className="filter-label" htmlFor="category">
                      Category:
                    </label>
                    {/*
                      The native select is layered invisibly over a styled span so the
                      closed control matches the event-date field, while the open picker
                      stays the OS-native list.
                    */}
                    <div className="select-field">
                      <span className="select-display">{category || "All Categories"}</span>
                      <Angle className="angle-icon" />
                      <select id="category" value={category} onChange={(e) => handleCategoryChange(e.target.value)}>
                        <option value="">All Categories</option>
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rental-items-section">
              {loading && (
                <div className="loading-state">
                  <p>Loading rental items...</p>
                </div>
              )}

              {error && !loading && (
                <div className="error-state">
                  <p>Something went wrong while loading rentals. Please check your connection and try again.</p>
                  <button onClick={() => setRetryKey((key) => key + 1)} className="retry-button">
                    Try again
                  </button>
                </div>
              )}

              {!loading && !error && items.length > 0 && (
                <>
                  <div className="rental-items-grid">
                    {items.map((item) => (
                      <RentalItemCard
                        key={item._id}
                        item={item}
                        inCart={quantityInCart(item._id)}
                        onSelect={(selected) => detailRef.current?.open(selected)}
                      />
                    ))}
                  </div>

                  {totalPages > 1 && (
                    <div className="pagination">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="pagination-button"
                      >
                        <Angle className="angle-icon" />
                      </button>

                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`page-button ${currentPage === page ? "current-page" : ""}`}
                        >
                          {page}
                        </button>
                      ))}

                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="pagination-button"
                      >
                        <Angle className="angle-icon" />
                      </button>
                    </div>
                  )}
                </>
              )}

              {!loading && !error && items.length === 0 && (
                <div className="empty-state">
                  <p>No rentals match your search for this date. Try another category or date.</p>
                </div>
              )}
            </div>
          </>
        )}

        {/* Shown on both the date gate and the browse view — the questions it
            answers come up in either place. */}
        <RentalGuidelines />

        <RentalItemDetail ref={detailRef} />
        <RentalCartDrawer onInquirySuccess={() => confirmationRef.current?.show()} />

        <Overlay ref={confirmationRef} className="thank-you-overlay" id="rental-confirmation-overlay">
          <div className="thank-you-modal" id="modal">
            <div className="header">
              <span>REQUEST SENT</span>
              <Player id="fireworks" src={env.LOTTIE_FIREWORKS_URL} speed={0.7} loop autoplay />
            </div>
            <div className="body">
              Your rental request has been sent to Maddie West and is pending review. We've emailed you a confirmation —
              Maddie will follow up to confirm availability and final pricing.
            </div>
            <a
              href="/"
              className="text-button small"
              onClick={(e: any) => {
                confirmationRef.current?.hide();
                mweNavigate(e, handleNavigation, "/");
              }}
            >
              HOME
            </a>
          </div>
        </Overlay>
      </div>
    </main>
  );
};

const RentalsRoute: React.FC<{ handleNavigation: (path: string) => void }> = ({ handleNavigation }) => (
  <RentalCartProvider>
    <RentalsContent handleNavigation={handleNavigation} />
  </RentalCartProvider>
);

export default RentalsRoute;
