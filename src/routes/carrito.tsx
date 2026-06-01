import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart";
import { getProduct, formatPrice, getEffectivePrice } from "@/lib/products";

export const Route = createFileRoute("/carrito")({
  head: () => ({ meta: [{ title: "Carrito — Willy Store" }] }),
  component: CartPage,
});

function CartPage() {
  const { items, updateQty, removeItem, clear, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="container-x py-24 text-center">
        <ShoppingBag className="size-14 mx-auto text-muted-foreground mb-4" strokeWidth={1.2} />
        <h1 className="font-display text-3xl sm:text-4xl font-bold">Tu carrito está vacío</h1>
        <p className="text-muted-foreground mt-3">Descubrí nuestra colección y sumá tus favoritos.</p>
        <Link to="/catalogo" search={{}} className="btn-primary mt-7">Ir al catálogo</Link>
      </div>
    );
  }

  return (
    <div className="container-x py-10">
      <h1 className="font-display text-4xl sm:text-5xl font-bold">Carrito</h1>
      <p className="text-muted-foreground mt-1">{items.length} producto{items.length === 1 ? "" : "s"}</p>

      <div className="grid lg:grid-cols-[1fr_360px] gap-10 mt-8">
        <div className="space-y-4">
          {items.map((item) => {
            const p = getProduct(item.productId);
            if (!p) return null;
            const price = getEffectivePrice(p, item.size);
            return (
              <div key={`${item.productId}-${item.size}`} className="flex gap-4 p-4 border border-border rounded-sm bg-card">
                <Link to="/producto/$id" params={{ id: p.id }} className="w-24 sm:w-28 shrink-0 aspect-[3/4] bg-muted rounded-sm overflow-hidden">
                  <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
                </Link>
                <div className="flex-1 flex flex-col">
                  <div className="flex justify-between gap-3">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{p.brand}</p>
                      <Link to="/producto/$id" params={{ id: p.id }} className="font-medium hover:text-navy">{p.name}</Link>
                      <p className="text-xs text-muted-foreground mt-1">Talle {item.size} · {item.color}</p>
                    </div>
                    <button onClick={() => removeItem(item.productId, item.size)} className="text-muted-foreground hover:text-destructive" aria-label="Eliminar"><Trash2 className="size-4" /></button>
                  </div>
                  <div className="mt-auto flex items-center justify-between pt-3">
                    <div className="flex items-center border border-border rounded-sm">
                      <button onClick={() => updateQty(item.productId, item.size, item.quantity - 1)} className="p-2 hover:bg-muted" aria-label="Restar"><Minus className="size-3.5" /></button>
                      <span className="w-8 text-center text-sm">{item.quantity}</span>
                      <button onClick={() => updateQty(item.productId, item.size, item.quantity + 1)} className="p-2 hover:bg-muted" aria-label="Sumar"><Plus className="size-3.5" /></button>
                    </div>
                    <span className="font-semibold">{formatPrice(price * item.quantity)}</span>
                  </div>
                </div>
              </div>
            );
          })}

          <button onClick={clear} className="text-xs uppercase tracking-widest text-muted-foreground hover:text-destructive font-semibold">Vaciar carrito</button>
        </div>

        <aside className="h-fit lg:sticky lg:top-24 p-6 border border-border rounded-sm bg-card">
          <h2 className="font-display text-xl font-bold mb-4">Resumen</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{formatPrice(subtotal)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Envío</span><span className="text-muted-foreground">A calcular</span></div>
            <div className="flex justify-between pt-3 border-t border-border text-base"><span className="font-semibold">Total</span><span className="font-bold text-navy">{formatPrice(subtotal)}</span></div>
          </div>
          <Link to="/checkout" className="btn-primary w-full mt-5">Finalizar compra</Link>
          <Link to="/catalogo" search={{}} className="block text-center text-xs uppercase tracking-widest font-semibold text-muted-foreground hover:text-navy mt-4">Seguir comprando</Link>
        </aside>
      </div>
    </div>
  );
}
