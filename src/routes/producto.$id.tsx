import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { Minus, Plus, ShoppingBag, Check } from "lucide-react";
import { getProduct, formatPrice, getEffectivePrice, PLUS_SIZES, PLUS_SIZE_SURCHARGE, products } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { useToast } from "@/lib/toast";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/producto/$id")({
  loader: ({ params }) => {
    const p = getProduct(params.id);
    if (!p) throw notFound();
    return { product: p };
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [
      { title: `${loaderData.product.name} — Willy Store` },
      { name: "description", content: loaderData.product.description },
      { property: "og:title", content: loaderData.product.name },
      { property: "og:description", content: loaderData.product.description },
      { property: "og:image", content: loaderData.product.image },
    ] : [],
  }),
  notFoundComponent: () => (
    <div className="container-x py-20 text-center">
      <h1 className="font-display text-4xl font-bold">Producto no encontrado</h1>
      <Link to="/catalogo" search={{}} className="btn-primary mt-6">Volver al catálogo</Link>
    </div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const router = useRouter();
  const { addItem } = useCart();
  const { notify } = useToast();
  const [size, setSize] = useState<string | null>(null);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const effPrice = getEffectivePrice(product, size ?? undefined);
  const isPlus = size && PLUS_SIZES.includes(size);

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAdd = () => {
    if (!size) {
      notify("Seleccioná un talle", "error");
      return;
    }
    addItem({ productId: product.id, size, color: product.color, quantity: qty });
    notify(`${product.name} agregado al carrito`);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="container-x py-10">
      <nav className="text-xs text-muted-foreground mb-6">
        <Link to="/" className="hover:text-navy">Inicio</Link> /{" "}
        <Link to="/catalogo" search={{ categoria: product.category }} className="hover:text-navy capitalize">{product.category}</Link> / <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
        <div className="aspect-[3/4] bg-muted rounded-sm overflow-hidden">
          <img src={product.image} alt={product.name} width={768} height={1024} className="h-full w-full object-cover" />
        </div>

        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">{product.brand} · {product.style}</p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold mt-2">{product.name}</h1>
          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-2xl font-semibold text-navy">{formatPrice(effPrice)}</span>
            {isPlus && <span className="text-xs text-muted-foreground">incluye +{formatPrice(PLUS_SIZE_SURCHARGE)} talle especial</span>}
          </div>
          <p className="mt-5 text-sm text-foreground/80 leading-relaxed">{product.description}</p>

          <div className="mt-7">
            <div className="flex justify-between mb-2">
              <h3 className="text-xs uppercase tracking-widest font-semibold">Talle</h3>
              <button className="text-xs underline text-muted-foreground">Guía de talles</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`min-w-[52px] px-3 py-2.5 text-sm font-medium border rounded-sm transition-all ${size === s ? "bg-navy text-primary-foreground border-navy" : "border-border hover:border-navy"}`}
                >
                  {s}
                </button>
              ))}
            </div>
            {isPlus && <p className="text-xs text-muted-foreground mt-2">* Talle {size} incluye un recargo de {formatPrice(PLUS_SIZE_SURCHARGE)}</p>}
          </div>

          <div className="mt-6">
            <h3 className="text-xs uppercase tracking-widest font-semibold mb-2">Color</h3>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 text-sm border border-border rounded-sm">{product.color}</span>
          </div>

          <div className="mt-7 flex items-center gap-4">
            <div className="flex items-center border border-border rounded-sm">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-3 hover:bg-muted" aria-label="Restar"><Minus className="size-4" /></button>
              <span className="w-10 text-center text-sm font-medium">{qty}</span>
              <button onClick={() => setQty(Math.min(product.stock, qty + 1))} className="p-3 hover:bg-muted" aria-label="Sumar"><Plus className="size-4" /></button>
            </div>
            <p className="text-xs text-muted-foreground">{product.stock} disponibles</p>
          </div>

          <div className="mt-7 flex flex-col sm:flex-row gap-3">
            <button onClick={handleAdd} className="btn-primary flex-1">
              {added ? <><Check className="size-4" /> Agregado</> : <><ShoppingBag className="size-4" /> Agregar al carrito</>}
            </button>
            <button
              onClick={() => {
                if (!size) { notify("Seleccioná un talle", "error"); return; }
                addItem({ productId: product.id, size, color: product.color, quantity: qty });
                router.navigate({ to: "/checkout" });
              }}
              className="btn-outline flex-1"
            >
              Comprar ahora
            </button>
          </div>

          <ul className="mt-8 space-y-2 text-sm text-muted-foreground border-t border-border pt-6">
            <li>✓ Envío a todo el país</li>
            <li>✓ Cambios sin cargo en 30 días</li>
            <li>✓ Pago seguro</li>
          </ul>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="font-display text-2xl sm:text-3xl font-bold mb-8">También te puede gustar</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  );
}
