import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import { formatPrice } from "@/lib/products";

export const Route = createFileRoute("/exito")({
  head: () => ({ meta: [{ title: "¡Pago exitoso! — Willy Store" }] }),
  component: SuccessPage,
});

function SuccessPage() {
  const [order, setOrder] = useState<any>(null);
  useEffect(() => {
    try {
      const raw = localStorage.getItem("willy-last-order");
      if (raw) setOrder(JSON.parse(raw));
    } catch {}
  }, []);

  return (
    <div className="container-x py-16 max-w-2xl">
      <div className="text-center">
        <CheckCircle2 className="size-20 mx-auto text-green-600" strokeWidth={1.4} />
        <h1 className="font-display text-4xl sm:text-5xl font-bold mt-6">¡Pago Exitoso!</h1>
        <p className="text-muted-foreground mt-3">Gracias por tu compra. Recibirás un email con los detalles.</p>
      </div>

      {order && (
        <div className="mt-10 border border-border rounded-sm bg-card p-6">
          <div className="flex justify-between flex-wrap gap-2 pb-4 border-b border-border">
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Número de orden</p>
              <p className="font-mono font-semibold text-navy">{order.number}</p>
            </div>
            <div className="text-right">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Fecha</p>
              <p className="text-sm">{new Date(order.date).toLocaleString("es-PY")}</p>
            </div>
          </div>

          <h2 className="font-semibold mt-5 mb-3">Resumen</h2>
          <ul className="space-y-2 text-sm">
            {order.items.map((i: any, idx: number) => (
              <li key={idx} className="flex justify-between">
                <span>{i.name} · Talle {i.size} · x{i.qty}</span>
                <span className="font-medium">{formatPrice(i.price * i.qty)}</span>
              </li>
            ))}
          </ul>
          <div className="border-t border-border mt-4 pt-4 flex justify-between font-bold text-lg">
            <span>Total pagado</span><span className="text-navy">{formatPrice(order.total)}</span>
          </div>
        </div>
      )}

      <div className="flex justify-center gap-3 mt-8">
        <Link to="/" className="btn-outline">Volver al inicio</Link>
        <Link to="/catalogo" search={{}} className="btn-primary">Seguir comprando</Link>
      </div>
    </div>
  );
}
