import { forwardRef, useImperativeHandle, useMemo, useRef, useState } from "react";
import { toast } from "react-toastify";
import Overlay, { OverlayRef } from "../../../shared/overlay";
import Cross from "../../../assets/cross.svg?react";
import { RentalItem } from "../../../types/rentals";
import { useRentalCart } from "../context/RentalCartContext";

export interface RentalItemDetailRef {
  open: (item: RentalItem) => void;
}

const FALLBACK_IMAGE = "/media/general/tablescape.jpg";

const RentalItemDetail = forwardRef<RentalItemDetailRef>((_props, ref) => {
  const overlayRef = useRef<OverlayRef | null>(null);
  const [item, setItem] = useState<RentalItem | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addItem, quantityInCart } = useRentalCart();

  useImperativeHandle(ref, () => ({
    open: (nextItem: RentalItem) => {
      setItem(nextItem);
      setActiveImage(0);
      setQuantity(1);
      overlayRef.current?.show();
    },
  }));

  const alreadyInCart = item ? quantityInCart(item._id) : 0;
  const remaining = item ? Math.max(item.availableQuantity - alreadyInCart, 0) : 0;
  const canAdd = remaining > 0;

  const images = useMemo(() => (item?.images?.length ? item.images : [FALLBACK_IMAGE]), [item]);

  const metadataRows = useMemo(() => {
    if (!item?.metadata) return [];
    const { color, material, dimensions } = item.metadata;
    return [
      { label: "Color", value: color },
      { label: "Material", value: material },
      { label: "Dimensions", value: dimensions },
    ].filter((row) => row.value);
  }, [item]);

  const handleAdd = () => {
    if (!item || !canAdd) return;
    addItem(item, Math.min(quantity, remaining));
    toast.success(`Item added to cart.`);
    overlayRef.current?.hide();
  };

  const clampQuantity = (next: number) => {
    setQuantity(Math.max(1, Math.min(next, Math.max(remaining, 1))));
  };

  return (
    <Overlay ref={overlayRef} className="rental-detail-overlay" id="rental-detail-overlay">
      {item && (
        <div className="rental-detail">
          <button type="button" className="detail-close" onClick={() => overlayRef.current?.hide()} aria-label="Close">
            <Cross />
          </button>

          <div className="detail-gallery">
            <div className="detail-main-image">
              <img
                src={images[activeImage]}
                alt={item.name}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
                }}
              />
            </div>
            {images.length > 1 && (
              <div className="detail-thumbs">
                {images.map((src, idx) => (
                  <button
                    key={src + idx}
                    type="button"
                    className={`detail-thumb ${idx === activeImage ? "active" : ""}`}
                    onClick={() => setActiveImage(idx)}
                    aria-label={`View image ${idx + 1}`}
                  >
                    <img
                      src={src}
                      alt=""
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="detail-info">
            <div className="detail-heading">
              <h2 className="detail-name">{item.name}</h2>
              <p className="detail-price">${item.price.toFixed(2)} each</p>
            </div>

            {item.description && <p className="detail-description">{item.description}</p>}

            {metadataRows.length > 0 && (
              <dl className="detail-meta">
                {metadataRows.map((row) => (
                  <div className="meta-row" key={row.label}>
                    <dt>{row.label}</dt>
                    <dd>{row.value}</dd>
                  </div>
                ))}
              </dl>
            )}

            <p className="detail-availability">
              {item.availableQuantity} available for this date
              {alreadyInCart > 0 && <span className="already"> · {alreadyInCart} in your cart</span>}
            </p>

            <div className="detail-actions">
              <div className="qty-stepper" aria-label="Quantity">
                <button
                  type="button"
                  onClick={() => clampQuantity(quantity - 1)}
                  disabled={!canAdd || quantity <= 1}
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="qty-value">{canAdd ? quantity : 0}</span>
                <button
                  type="button"
                  onClick={() => clampQuantity(quantity + 1)}
                  disabled={!canAdd || quantity >= remaining}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                className="primary-button large light add-to-cart"
                onClick={handleAdd}
                disabled={!canAdd}
              >
                <span>{canAdd ? "Add to cart" : "Max in cart"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </Overlay>
  );
});

RentalItemDetail.displayName = "RentalItemDetail";

export default RentalItemDetail;
