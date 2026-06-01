import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { getProduct, getEffectivePrice, type Product } from "./products";

export interface CartItem {
  productId: string;
  size: string;
  color: string;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, size: string) => void;
  updateQty: (productId: string, size: string, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "willy-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const addItem = (item: CartItem) => {
    setItems((prev) => {
      const idx = prev.findIndex((i) => i.productId === item.productId && i.size === item.size);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], quantity: next[idx].quantity + item.quantity };
        return next;
      }
      return [...prev, item];
    });
  };

  const removeItem = (productId: string, size: string) =>
    setItems((prev) => prev.filter((i) => !(i.productId === productId && i.size === size)));

  const updateQty = (productId: string, size: string, qty: number) =>
    setItems((prev) =>
      prev.map((i) =>
        i.productId === productId && i.size === size ? { ...i, quantity: Math.max(1, qty) } : i,
      ),
    );

  const clear = () => setItems([]);

  const count = items.reduce((s, i) => s + i.quantity, 0);
  const subtotal = items.reduce((s, i) => {
    const p = getProduct(i.productId);
    if (!p) return s;
    return s + getEffectivePrice(p, i.size) * i.quantity;
  }, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQty, clear, count, subtotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export function getCartProduct(item: CartItem): Product | undefined {
  return getProduct(item.productId);
}
