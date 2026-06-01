import { createFileRoute, useRouter, Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Lock } from "lucide-react";
import { useCart } from "@/lib/cart";
import { getProduct, formatPrice, getEffectivePrice } from "@/lib/products";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — Willy Store" }] }),
  component: CheckoutPage,
});

const contactSchema = z.object({
  fullName: z.string().trim().min(2, "Nombre requerido").max(100),
  email: z.string().trim().email("Email inválido").max(255),
  phone: z.string().trim().min(6, "Teléfono inválido").max(30),
  address: z.string().trim().min(3, "Dirección requerida").max(200),
  city: z.string().trim().min(2, "Ciudad requerida").max(100),
  state: z.string().trim().min(2, "Estado/Departamento requerido").max(100),
  postal: z.string().trim().min(2, "Código postal requerido").max(20),
});

const paymentSchema = z.object({
  cardName: z.string().trim().min(2, "Nombre del titular requerido").max(100),
  cardNumber: z.string().trim().regex(/^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/, "Número de tarjeta inválido (16 dígitos)"),
  expiry: z.string().trim().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Fecha inválida (MM/AA)"),
  cvv: z.string().trim().regex(/^\d{3,4}$/, "CVV inválido"),
});

function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clear } = useCart();
  const [step, setStep] = useState<"info" | "pay">("info");
  const [info, setInfo] = useState({ fullName: "", email: "", phone: "", address: "", city: "", state: "", postal: "" });
  const [pay, setPay] = useState({ cardName: "", cardNumber: "", expiry: "", cvv: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [processing, setProcessing] = useState(false);

  if (items.length === 0) {
    return (
      <div className="container-x py-24 text-center">
        <h1 className="font-display text-3xl font-bold">Tu carrito está vacío</h1>
        <Link to="/catalogo" search={{}} className="btn-primary mt-6">Ir al catálogo</Link>
      </div>
    );
  }

  const handleInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const r = contactSchema.safeParse(info);
    if (!r.success) {
      const errs: Record<string, string> = {};
      r.error.issues.forEach((i) => { errs[i.path[0] as string] = i.message; });
      setErrors(errs);
      return;
    }
    setErrors({});
    setStep("pay");
  };

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    const r = paymentSchema.safeParse(pay);
    if (!r.success) {
      const errs: Record<string, string> = {};
      r.error.issues.forEach((i) => { errs[i.path[0] as string] = i.message; });
      setErrors(errs);
      return;
    }
    setErrors({});
    setProcessing(true);

    const orderNumber = "WS-" + Date.now().toString().slice(-8);
    const order = {
      number: orderNumber,
      date: new Date().toISOString(),
      total: subtotal,
      items: items.map((i) => {
        const p = getProduct(i.productId)!;
        return { name: p.name, brand: p.brand, size: i.size, qty: i.quantity, price: getEffectivePrice(p, i.size) };
      }),
      customer: info,
    };
    try { localStorage.setItem("willy-last-order", JSON.stringify(order)); } catch {}
    setTimeout(() => {
      clear();
      router.navigate({ to: "/exito" });
    }, 1200);
  };

  const fmtCard = (v: string) => v.replace(/\D/g, "").slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ");
  const fmtExp = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 4);
    return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
  };

  return (
    <div className="container-x py-10">
      <h1 className="font-display text-4xl font-bold">Checkout</h1>

      <div className="grid lg:grid-cols-[1fr_380px] gap-10 mt-8">
        <div>
          <div className="flex gap-2 mb-6 text-xs uppercase tracking-widest font-semibold">
            <span className={step === "info" ? "text-navy" : "text-muted-foreground"}>1. Datos</span>
            <span className="text-muted-foreground">→</span>
            <span className={step === "pay" ? "text-navy" : "text-muted-foreground"}>2. Pago</span>
          </div>

          {step === "info" ? (
            <form onSubmit={handleInfoSubmit} className="space-y-4" noValidate>
              <Field label="Nombre completo" name="fullName" value={info.fullName} onChange={(v) => setInfo({ ...info, fullName: v })} error={errors.fullName} />
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Email" name="email" type="email" value={info.email} onChange={(v) => setInfo({ ...info, email: v })} error={errors.email} />
                <Field label="Teléfono" name="phone" value={info.phone} onChange={(v) => setInfo({ ...info, phone: v })} error={errors.phone} />
              </div>
              <Field label="Dirección" name="address" value={info.address} onChange={(v) => setInfo({ ...info, address: v })} error={errors.address} />
              <div className="grid sm:grid-cols-3 gap-4">
                <Field label="Ciudad" name="city" value={info.city} onChange={(v) => setInfo({ ...info, city: v })} error={errors.city} />
                <Field label="Departamento" name="state" value={info.state} onChange={(v) => setInfo({ ...info, state: v })} error={errors.state} />
                <Field label="Código postal" name="postal" value={info.postal} onChange={(v) => setInfo({ ...info, postal: v })} error={errors.postal} />
              </div>
              <button type="submit" className="btn-primary w-full mt-2">Continuar al pago</button>
            </form>
          ) : (
            <form onSubmit={handlePay} className="space-y-4" noValidate>
              <div className="rounded-sm bg-muted p-4 text-xs text-muted-foreground flex items-center gap-2">
                <Lock className="size-3.5" /> Esta es una simulación de pago. No se procesarán cargos reales.
              </div>
              <Field label="Nombre en la tarjeta" name="cardName" value={pay.cardName} onChange={(v) => setPay({ ...pay, cardName: v })} error={errors.cardName} />
              <Field label="Número de tarjeta" name="cardNumber" placeholder="1234 5678 9012 3456" value={pay.cardNumber} onChange={(v) => setPay({ ...pay, cardNumber: fmtCard(v) })} error={errors.cardNumber} />
              <div className="grid grid-cols-2 gap-4">
                <Field label="Vencimiento" name="expiry" placeholder="MM/AA" value={pay.expiry} onChange={(v) => setPay({ ...pay, expiry: fmtExp(v) })} error={errors.expiry} />
                <Field label="CVV" name="cvv" placeholder="123" value={pay.cvv} onChange={(v) => setPay({ ...pay, cvv: v.replace(/\D/g, "").slice(0, 4) })} error={errors.cvv} />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setStep("info")} className="btn-outline">Atrás</button>
                <button type="submit" disabled={processing} className="btn-primary flex-1">
                  {processing ? "Procesando..." : `Pagar ${formatPrice(subtotal)}`}
                </button>
              </div>
            </form>
          )}
        </div>

        <aside className="h-fit lg:sticky lg:top-24 p-6 border border-border rounded-sm bg-card">
          <h2 className="font-display text-xl font-bold mb-4">Tu pedido</h2>
          <ul className="space-y-3 mb-4 max-h-64 overflow-auto">
            {items.map((i) => {
              const p = getProduct(i.productId)!;
              const price = getEffectivePrice(p, i.size);
              return (
                <li key={`${i.productId}-${i.size}`} className="flex gap-3 text-sm">
                  <div className="size-14 shrink-0 bg-muted rounded-sm overflow-hidden">
                    <img src={p.image} alt="" className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="truncate font-medium">{p.name}</p>
                    <p className="text-xs text-muted-foreground">Talle {i.size} · x{i.quantity}</p>
                  </div>
                  <span className="text-sm font-semibold">{formatPrice(price * i.quantity)}</span>
                </li>
              );
            })}
          </ul>
          <div className="border-t border-border pt-4 flex justify-between font-bold text-base">
            <span>Total</span><span className="text-navy">{formatPrice(subtotal)}</span>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Field({ label, name, value, onChange, error, type = "text", placeholder }: any) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-widest font-semibold mb-1.5">{label}</span>
      <input
        type={type}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`input-base ${error ? "border-destructive focus:border-destructive focus:ring-destructive/30" : ""}`}
        aria-invalid={!!error}
      />
      {error && <span className="text-xs text-destructive mt-1 block">{error}</span>}
    </label>
  );
}
