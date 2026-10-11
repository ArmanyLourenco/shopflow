import { createContext, useCallback, useMemo, useState, type ReactNode } from 'react';
import type { Product } from '../types/product';
type CartItem = { product: Product; quantity: number };
type CartContextValue = { items: CartItem[]; count: number; total: number; add: (product: Product) => void; remove: (id: number) => void; setQuantity: (id: number, quantity: number) => void; clear: () => void };
export const CartContext = createContext<CartContextValue | undefined>(undefined);
export function CartProvider({ children }: { children: ReactNode }) {
 const [items, setItems] = useState<CartItem[]>([]);
 const add = useCallback((product: Product) => setItems(current => { const found = current.find(item => item.product.id === product.id); return found ? current.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item) : [...current, { product, quantity: 1 }]; }), []);
 const remove = useCallback((id: number) => setItems(current => current.filter(item => item.product.id !== id)), []);
 const setQuantity = useCallback((id: number, quantity: number) => setItems(current => quantity < 1 ? current.filter(item => item.product.id !== id) : current.map(item => item.product.id === id ? { ...item, quantity } : item)), []);
 const clear = useCallback(() => setItems([]), []);
 const value = useMemo(() => ({ items, count: items.reduce((sum, item) => sum + item.quantity, 0), total: items.reduce((sum, item) => sum + item.product.price * item.quantity, 0), add, remove, setQuantity, clear }), [items, add, remove, setQuantity, clear]);
 return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
