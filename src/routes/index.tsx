import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Truck, ShieldCheck, RefreshCw, Sparkles } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { products, categories } from "@/lib/products";
import heroImg from "@/assets/hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Willy Store — Vestí con confianza" },
      { name: "description", content: "La mejor ropa masculina al mejor precio. Calidad, estilo y comodidad para todos los talles." },
      { property: "og:title", content: "Willy Store" },
      { property: "og:description", content: "Vestí con confianza, vestí con Willy Store." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const featured = products.filter((p) => p.featured).slice(0, 8);
  const nuevos = products.filter((p) => p.isNew).slice(0, 4);

  return (
    <div>
      {/* HERO */}
      <section className="relative h-[88vh] min-h-[600px] max-h-[840px] overflow-hidden">
        <img src={heroImg} alt="Willy Store" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
        <div className="relative container-x h-full flex items-center">
          <div className="max-w-xl text-white animate-fade-up">
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] mb-5">
              <Sparkles className="size-3.5" /> Nueva colección
            </span>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05]">
              Vestí con confianza,<br />vestí con <span className="italic">Willy</span>.
            </h1>
            <p className="mt-5 text-base sm:text-lg text-white/85 max-w-md">
              La mejor ropa masculina al mejor precio. Calidad, estilo y comodidad para todos los talles.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/catalogo" search={{}} className="btn-primary bg-white text-navy hover:bg-white/90">
                Ver catálogo <ArrowRight className="size-4" />
              </Link>
              <Link to="/catalogo" search={{ categoria: "oversized" }} className="btn-outline border-white text-white hover:bg-white hover:text-navy">
                Comprar ahora
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="bg-card border-b border-border">
        <div className="container-x py-10 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: Truck, t: "Envío rápido", d: "A todo el país" },
            { icon: ShieldCheck, t: "Calidad garantizada", d: "Prendas que duran" },
            { icon: RefreshCw, t: "Cambios fáciles", d: "30 días para cambios" },
            { icon: Sparkles, t: "Todos los talles", d: "Desde S hasta 7XL" },
          ].map((b) => (
            <div key={b.t} className="flex items-center gap-3">
              <b.icon className="size-7 text-navy shrink-0" strokeWidth={1.5} />
              <div>
                <p className="text-sm font-semibold">{b.t}</p>
                <p className="text-xs text-muted-foreground">{b.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="container-x py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold">Comprar por categoría</h2>
            <p className="text-muted-foreground mt-1">Elegí tu estilo</p>
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 lg:gap-4">
          {categories.map((c) => (
            <Link key={c.id} to="/catalogo" search={{ categoria: c.id }} className="group relative aspect-[3/4] overflow-hidden rounded-sm bg-muted">
              <img src={c.image} alt={c.label} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <h3 className="font-display text-xl font-bold text-white uppercase tracking-wider">{c.label}</h3>
                <span className="text-xs text-white/80 uppercase tracking-widest">Ver todo →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <section className="container-x py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold">Destacados</h2>
            <p className="text-muted-foreground mt-1">Los favoritos de nuestros clientes</p>
          </div>
          <Link to="/catalogo" search={{}} className="text-xs uppercase tracking-widest font-semibold hover:text-navy">Ver todos →</Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10">
          {featured.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* PROMO BANNER */}
      <section className="bg-navy text-primary-foreground py-16">
        <div className="container-x text-center">
          <h2 className="font-display text-3xl sm:text-5xl font-bold">Inclusivo en todos los talles</h2>
          <p className="mt-3 text-primary-foreground/80 max-w-xl mx-auto">Encontrá tu talle perfecto. Desde S hasta 7XL, vestimos a todos los cuerpos con el mismo estilo.</p>
          <Link to="/catalogo" search={{}} className="btn-primary bg-white text-navy hover:bg-white/90 mt-7">Explorar catálogo</Link>
        </div>
      </section>

      {/* NEW ARRIVALS */}
      {nuevos.length > 0 && (
        <section className="container-x py-16">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold">Recién llegados</h2>
              <p className="text-muted-foreground mt-1">Nuevos diseños para vos</p>
            </div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10">
            {nuevos.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  );
}
