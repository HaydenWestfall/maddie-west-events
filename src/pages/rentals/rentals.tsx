import "./rentals.scss";
import { useRef, useState, useEffect } from "react";
import { ScrollTrigger } from "gsap/all";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useMWETransitionContext } from "../../shared/route-transition/TransitionProvider";
import { env } from "../../config/env";
import { RentalItem, RentalItemsResponse, RentalFilters } from "../../types/rentals";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

const RentalsRoute: React.FC<{ handleNavigation: (path: string) => void }> = ({ handleNavigation }) => {
  const [rentalItems, setRentalItems] = useState<RentalItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [filters, setFilters] = useState<RentalFilters>({
    date: new Date().toISOString().split("T")[0], // Default to today's date
    category: "",
  });
  const itemsPerPage = 16;

  // Available categories - you can fetch this from API or define statically
  const categories = [
    { value: "", label: "All Categories" },
    { value: "glassware", label: "Glassware" },
    { value: "centerpiece", label: "Centerpiece" },
    { value: "barware", label: "Barware" },
    { value: "arbor", label: "Arbor" },
    { value: "signage", label: "Signage" },
    { value: "linen", label: "Linen" },
  ];

  const fetchRentalItems = async (page: number = 1, currentFilters: RentalFilters = filters) => {
    try {
      setLoading(true);
      setError(null);

      // Build query parameters
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: itemsPerPage.toString(),
      });

      // Add date (required parameter)
      if (currentFilters.date) {
        queryParams.append("date", currentFilters.date);
      }

      // Add category if selected
      if (currentFilters.category) {
        queryParams.append("category", currentFilters.category);
      }

      const response = await fetch(`${env.RENTALS_API_BASE_URL}/api/items/available?${queryParams.toString()}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch rental items: ${response.status}`);
      }

      const data: RentalItemsResponse = await response.json();

      if (data.success) {
        console.log(data);
        setRentalItems(data.data);
        setTotalItems(data.total);
      } else {
        throw new Error("Failed to load rental items");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load rental items");
      console.error("Error fetching rental items:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRentalItems(currentPage, filters);
  }, [currentPage, filters]);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFilterChange = (filterType: keyof RentalFilters, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
    // Reset to first page when filters change
    setCurrentPage(1);
  };

  // const { isTransitioning } = useMWETransitionContext();
  // const rentalsContainer = useRef<HTMLDivElement | null>(null);
  // const rentalsHeader = useRef<HTMLDivElement | null>(null);
  // const rentalsSubHeader = useRef<HTMLDivElement | null>(null);

  // useGSAP(() => {}, { dependencies: [isTransitioning], scope: rentalsHeader });

  return (
    <main data-barba="wrapper">
      <div data-barba="container" data-barba-namespace="rentals" className="rentals_route">
        <div className="rentals-header">
          <div className="header">
            DETAILS that make EVERY <br /> moment BEAUTIFUL
          </div>
          <div className="sub-header">
            View our curated collection of event rentals — from bar carts and arbors to glassware, linens, and decor
            details that bring your vision to life. Browse, add your favorites to your cart, and reserve them for your
            special date with ease.
          </div>
        </div>
        <div className="rental-summary"></div>
        <img src="/general/tablescape.png" alt="decorative flourish" className="rental-image" />

        <div className="product-filters-wrapper">
          <div className="product-filters">
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search rental items..."
                onChange={(e) => {
                  const searchTerm = e.target.value.toLowerCase();
                  setRentalItems((prevItems) =>
                    prevItems.filter((item) => item.name.toLowerCase().includes(searchTerm))
                  );
                }}
              />
            </div>
            <div className="filters">
              <div className="filter-group">
                <label htmlFor="event-date">Event Date:</label>
                <input
                  type="date"
                  id="event-date"
                  value={filters.date}
                  onChange={(e) => handleFilterChange("date", e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>

              <div className="filter-group">
                <label htmlFor="category">Category:</label>
                <select
                  id="category"
                  value={filters.category}
                  onChange={(e) => handleFilterChange("category", e.target.value)}
                >
                  {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
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

          {error && (
            <div className="error-state">
              <p>Error: {error}</p>
              <button onClick={() => fetchRentalItems(currentPage, filters)} className="retry-button">
                Try Again
              </button>
            </div>
          )}

          {!loading && !error && rentalItems.length > 0 && (
            <>
              <div className="rental-items-grid">
                {rentalItems.map((item) => (
                  <div key={item._id} className="rental-item">
                    <div className="item-image-wrapper">
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/general/tablescape.png";
                        }}
                      />
                    </div>
                    <div className="item-info">
                      <h3 className="item-name">{item.name}</h3>
                      <p className="item-price">${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="pagination">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="pagination-button"
                  >
                    Previous
                  </button>

                  <div className="page-numbers">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`page-number ${currentPage === page ? "active" : ""}`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="pagination-button"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}

          {!loading && !error && rentalItems.length === 0 && (
            <div className="empty-state">
              <p>No rental items available at the moment.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default RentalsRoute;
