import { RentalItem } from "../../../types/rentals";

interface RentalItemCardProps {
  item: RentalItem;
  inCart: number;
  onSelect: (item: RentalItem) => void;
}

const FALLBACK_IMAGE = "/general/tablescape.jpg";

const RentalItemCard: React.FC<RentalItemCardProps> = ({ item, inCart, onSelect }) => {
  const soldOut = item.availableQuantity <= 0;

  return (
    <button
      type="button"
      className={`rental-item ${soldOut ? "sold-out" : ""}`}
      onClick={() => !soldOut && onSelect(item)}
      disabled={soldOut}
      aria-label={`View ${item.name}`}
    >
      <div className="item-image-wrapper">
        <img
          src={item.images?.[0] || FALLBACK_IMAGE}
          alt={item.name}
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
          }}
        />
        <div className="item-badges">
          {!soldOut && <span className="item-availability">{item.availableQuantity} available</span>}
          {inCart > 0 && <span className="in-cart-badge">{inCart} in cart</span>}
        </div>
        {soldOut && <span className="sold-out-badge">Unavailable</span>}
      </div>
      <div className="item-info">
        <h3 className="item-name">{item.name}</h3>
        <p className="item-price-wrapper">
          <span className="item-price">${item.price.toFixed(2)}</span>
        </p>
      </div>
    </button>
  );
};

export default RentalItemCard;
