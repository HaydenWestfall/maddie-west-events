import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "react-toastify";
import { CartItem, RentalDateRange, RentalItem } from "../../../types/rentals";
import { deriveDateRange } from "../rentals.api";

const STORAGE_KEY = "mwe_rental_cart";

interface StoredCart {
  eventDate: string | null;
  items: CartItem[];
}

interface RentalCartContextValue {
  eventDate: string | null;
  dateRange: RentalDateRange | null;
  setEventDate: (date: string) => void;
  items: CartItem[];
  count: number;
  estimatedTotal: number;
  quantityInCart: (itemId: string) => number;
  addItem: (item: RentalItem, quantity: number) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  removeItem: (itemId: string) => void;
  clear: () => void;
  /** Reconcile cart quantities against freshly-loaded availability. */
  revalidate: (availableItems: RentalItem[]) => void;
}

const RentalCartContext = createContext<RentalCartContextValue | null>(null);

const loadStoredCart = (): StoredCart => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { eventDate: null, items: [] };
    const parsed = JSON.parse(raw) as StoredCart;
    return {
      eventDate: parsed.eventDate ?? null,
      items: Array.isArray(parsed.items) ? parsed.items : [],
    };
  } catch {
    return { eventDate: null, items: [] };
  }
};

export const RentalCartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const initial = useRef<StoredCart>(loadStoredCart());
  const [eventDate, setEventDateState] = useState<string | null>(initial.current.eventDate);
  const [items, setItems] = useState<CartItem[]>(initial.current.items);

  // Persist to localStorage on any change.
  useEffect(() => {
    const payload: StoredCart = { eventDate, items };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      /* storage may be unavailable (private mode); non-fatal */
    }
  }, [eventDate, items]);

  const dateRange = useMemo<RentalDateRange | null>(
    () => (eventDate ? deriveDateRange(eventDate) : null),
    [eventDate],
  );

  const setEventDate = useCallback((date: string) => {
    setEventDateState(date);
  }, []);

  const quantityInCart = useCallback(
    (itemId: string) => items.find((ci) => ci.item._id === itemId)?.quantity ?? 0,
    [items],
  );

  const addItem = useCallback((item: RentalItem, quantity: number) => {
    if (quantity < 1) return;
    setItems((prev) => {
      const existing = prev.find((ci) => ci.item._id === item._id);
      const cap = Math.max(item.availableQuantity, 0);
      if (existing) {
        const nextQty = Math.min(existing.quantity + quantity, cap || existing.quantity + quantity);
        return prev.map((ci) =>
          ci.item._id === item._id ? { item, quantity: nextQty } : ci,
        );
      }
      const nextQty = cap ? Math.min(quantity, cap) : quantity;
      return [...prev, { item, quantity: nextQty }];
    });
  }, []);

  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    setItems((prev) => {
      if (quantity < 1) {
        return prev.filter((ci) => ci.item._id !== itemId);
      }
      return prev.map((ci) =>
        ci.item._id === itemId
          ? { ...ci, quantity: Math.min(quantity, Math.max(ci.item.availableQuantity, 1)) }
          : ci,
      );
    });
  }, []);

  const removeItem = useCallback((itemId: string) => {
    setItems((prev) => prev.filter((ci) => ci.item._id !== itemId));
  }, []);

  const clear = useCallback(() => {
    setItems([]);
  }, []);

  const revalidate = useCallback((availableItems: RentalItem[]) => {
    setItems((prev) => {
      if (prev.length === 0) return prev;
      const byId = new Map(availableItems.map((it) => [it._id, it]));
      const removed: string[] = [];
      const capped: string[] = [];

      const next: CartItem[] = [];
      for (const ci of prev) {
        const fresh = byId.get(ci.item._id);
        // Item not present in the freshly-loaded set: keep as-is (it may just
        // be on another page/category filter). Only reconcile items we can see.
        if (!fresh) {
          next.push(ci);
          continue;
        }
        if (fresh.availableQuantity <= 0) {
          removed.push(fresh.name);
          continue;
        }
        if (ci.quantity > fresh.availableQuantity) {
          capped.push(fresh.name);
          next.push({ item: fresh, quantity: fresh.availableQuantity });
        } else {
          next.push({ item: fresh, quantity: ci.quantity });
        }
      }

      if (removed.length) {
        toast.info(
          `${removed.join(", ")} ${removed.length > 1 ? "are" : "is"} no longer available for this date and ${
            removed.length > 1 ? "were" : "was"
          } removed from your cart.`,
        );
      }
      if (capped.length) {
        toast.info(`We reduced the quantity of ${capped.join(", ")} to match what's available for this date.`);
      }
      return next;
    });
  }, []);

  const count = useMemo(() => items.reduce((sum, ci) => sum + ci.quantity, 0), [items]);
  const estimatedTotal = useMemo(
    () => items.reduce((sum, ci) => sum + ci.item.price * ci.quantity, 0),
    [items],
  );

  const value: RentalCartContextValue = {
    eventDate,
    dateRange,
    setEventDate,
    items,
    count,
    estimatedTotal,
    quantityInCart,
    addItem,
    updateQuantity,
    removeItem,
    clear,
    revalidate,
  };

  return <RentalCartContext.Provider value={value}>{children}</RentalCartContext.Provider>;
};

export const useRentalCart = (): RentalCartContextValue => {
  const ctx = useContext(RentalCartContext);
  if (!ctx) {
    throw new Error("useRentalCart must be used within a RentalCartProvider");
  }
  return ctx;
};
