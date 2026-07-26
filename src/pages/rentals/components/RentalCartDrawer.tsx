import { useEffect, useState } from "react";
import Cross from "../../../assets/cross.svg?react";
import { useRentalCart } from "../context/RentalCartContext";
import { formatFriendlyDate } from "../rentals.api";
import RentalInquiryForm from "./RentalInquiryForm";

interface RentalCartDrawerProps {
  onInquirySuccess: () => void;
}

const FALLBACK_IMAGE = "/general/tablescape.jpg";

const RentalCartDrawer: React.FC<RentalCartDrawerProps> = ({ onInquirySuccess }) => {
  const { items, count, estimatedTotal, dateRange, updateQuantity, removeItem } = useRentalCart();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<"cart" | "inquiry">("cart");

  // Lock body scroll while the drawer is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    setStep("cart");
  };

  const handleSuccess = () => {
    close();
    onInquirySuccess();
  };

  return (
    <>
      {count > 0 && (
        <button type="button" className="cart-fab" onClick={() => setOpen(true)} aria-label="Open cart">
          <span className="cart-fab-icon" aria-hidden="true">
            <span className="cart-count">{count}</span>
          </span>
          <span className="cart-fab-label">
            View cart
            <em>${estimatedTotal.toFixed(2)} est.</em>
          </span>
        </button>
      )}

      <div className={`cart-drawer-root ${open ? "open" : ""}`}>
        <div className="cart-backdrop" onClick={close} />
        <aside className="cart-panel" role="dialog" aria-label="Your rental cart">
          <header className="cart-header">
            <div className="cart-title">
              <span className="eyebrow">{step === "cart" ? "Your rentals" : "Request details"}</span>
              {dateRange && (
                <span className="cart-dates">
                  {formatFriendlyDate(dateRange.startDate)} – {formatFriendlyDate(dateRange.endDate)}
                </span>
              )}
            </div>
            <button type="button" className="cart-close" onClick={close} aria-label="Close cart">
              <Cross />
            </button>
          </header>

          {step === "cart" ? (
            <>
              <div className="cart-body">
                {items.length === 0 ? (
                  <div className="cart-empty">
                    <p>Your cart is empty.</p>
                    <button type="button" className="text-button small" onClick={close}>
                      CONTINUE BROWSING
                    </button>
                  </div>
                ) : (
                  <ul className="cart-lines">
                    {items.map(({ item, quantity }) => (
                      <li className="cart-line" key={item._id}>
                        <div className="line-thumb">
                          <img
                            src={item.images?.[0] || FALLBACK_IMAGE}
                            alt={item.name}
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
                            }}
                          />
                        </div>
                        <div className="line-info">
                          <p className="line-name">{item.name}</p>
                          <p className="line-price">${item.price.toFixed(2)} each</p>
                          <div className="line-controls">
                            <div className="qty-stepper small">
                              <button
                                type="button"
                                onClick={() => updateQuantity(item._id, quantity - 1)}
                                aria-label="Decrease quantity"
                              >
                                −
                              </button>
                              <span className="qty-value">{quantity}</span>
                              <button
                                type="button"
                                onClick={() => updateQuantity(item._id, quantity + 1)}
                                disabled={quantity >= item.availableQuantity}
                                aria-label="Increase quantity"
                              >
                                +
                              </button>
                            </div>
                            <button type="button" className="line-remove" onClick={() => removeItem(item._id)}>
                              Remove
                            </button>
                          </div>
                        </div>
                        <div className="line-subtotal">${(item.price * quantity).toFixed(2)}</div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {items.length > 0 && (
                <footer className="cart-footer">
                  <div className="cart-total">
                    <span className="total-label">Subtotal</span>
                    <span className="total-amount">${estimatedTotal.toFixed(2)}</span>
                  </div>
                  <button type="button" className="primary-button large light" onClick={() => setStep("inquiry")}>
                    <span>REQUEST RENTALS</span>
                  </button>
                </footer>
              )}
            </>
          ) : (
            <div className="cart-body inquiry">
              <RentalInquiryForm onSuccess={handleSuccess} onBack={() => setStep("cart")} />
            </div>
          )}
        </aside>
      </div>
    </>
  );
};

export default RentalCartDrawer;
