import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { z } from "zod";
import { SlidersHorizontal, X } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { products, brands, colors, type Category } from "@/lib/products";

const search = z.object({
  categoria: z.enum(["basicas", "oversized", "camisas", "shorts", "jeans"]).optional(),
  q: z.coerce.string().optional(),
});

export const Route = createFileRoute("/catalogo")({
  validateSearch: search,
  head: () => ({
    meta: [
      { title: "Catálogo — Willy Store" },
      { name: "description", content: "Descubrí toda la colección de Willy Store: básicas, oversized, camisas, shorts y jeans." },
    ],
  }),
  component: CatalogPage,
});

const CATEGORY_LABEL: Record<Category, string> = {
  basicas: "Básicas",
  oversized: "Oversized",
  camisas: "Camisas",
  shorts: "Shorts",
  jeans: "Jeans",
};

function CatalogPage() {
  const { categoria, q } = Route.useSearch();
  const [brand, setBrand] = useState<string | null>(null);
  const [color, setColor] = useState<string | null>(null);
  const [priceMax, setPriceMax] = useState(150000);
  const [size, setSize] = useState<string | null>(null);
  const [openFilters, setOpenFilters] = useState(false);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (categoria && p.category !== categoria) return false;
      if (brand && p.brand !== brand) return false;
      if (color && p.color !== color) return false;
      if (size && !p.sizes.includes(size)) return false;
      if (p.price > priceMax) return false;
      if (q) {
        const needle = q.toLowerCase();
        if (!`${p.name} ${p.brand} ${p.description} ${p.color}`.toLowerCase().includes(needle)) return false;
      }
      return true;
    });
  }, [categoria, brand, color, size, priceMax, q]);

  const allSizes = Array.from(new Set(products.flatMap((p) => p.sizes)));

  const clearAll = () => { setBrand(null); setColor(null); setSize(null); setPriceMax(150000); };

  return (
    <div className="container-x py-10">
      <header className="mb-8">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">Tienda</p>
        <h1 className="font-display text-4xl sm:text-5xl font-bold mt-1">
          {categoria ? CATEGORY_LABEL[categoria as Category] : q ? `Resultados: "${q}"` : "Catálogo"}
        </h1>
        <p className="text-muted-foreground mt-2">{filtered.length} producto{filtered.length === 1 ? "" : "s"}</p>
      </header>

      <div className="lg:hidden mb-4">
        <button onClick={() => setOpenFilters(true)} className="btn-outline w-full">
          <SlidersHorizontal className="size-4" /> Filtros
        </button>
      </div>

      <div className="grid lg:grid-cols-[240px_1fr] gap-8">
        <aside className={`${openFilters ? "fixed inset-0 z-50 bg-background p-6 overflow-auto" : "hidden"} lg:block lg:static lg:p-0 lg:bg-transparent`}>
          <div className="lg:hidden flex justify-between mb-4">
            <h2 className="font-display text-2xl font-bold">Filtros</h2>
            <button onClick={() => setOpenFilters(false)}><X className="size-5" /></button>
          </div>
          <Filters
            brand={brand} setBrand={setBrand}
            color={color} setColor={setColor}
            size={size} setSize={setSize}
            priceMax={priceMax} setPriceMax={setPriceMax}
            allSizes={allSizes} clearAll={clearAll}
          />
          <div className="lg:hidden mt-6">
            <button onClick={() => setOpenFilters(false)} className="btn-primary w-full">Ver {filtered.length} productos</button>
          </div>
        </aside>

        <div>
          {filtered.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-muted-foreground">No se encontraron productos.</p>
              <button onClick={clearAll} className="btn-outline mt-5">Limpiar filtros</button>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-10">
              {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Filters({ brand, setBrand, color, setColor, size, setSize, priceMax, setPriceMax, allSizes, clearAll }: any) {
  return (
    <div className="space-y-7">
      <FilterGroup title="Marca">
        <div className="flex flex-wrap gap-2">
          {brands.map((b) => (
            <button key={b} onClick={() => setBrand(brand === b ? null : b)} className={`px-3 py-1.5 text-xs border rounded-sm transition-colors ${brand === b ? "bg-navy text-primary-foreground border-navy" : "border-border hover:border-navy"}`}>{b}</button>
          ))}
        </div>
      </FilterGroup>
      <FilterGroup title="Color">
        <div className="flex flex-wrap gap-2">
          {colors.map((c) => (
            <button key={c} onClick={() => setColor(color === c ? null : c)} className={`px-3 py-1.5 text-xs border rounded-sm transition-colors ${color === c ? "bg-navy text-primary-foreground border-navy" : "border-border hover:border-navy"}`}>{c}</button>
          ))}
        </div>
      </FilterGroup>
      <FilterGroup title="Talle">
        <div className="flex flex-wrap gap-2">
          {allSizes.map((s: string) => (
            <button key={s} onClick={() => setSize(size === s ? null : s)} className={`min-w-[44px] px-3 py-1.5 text-xs border rounded-sm transition-colors ${size === s ? "bg-navy text-primary-foreground border-navy" : "border-border hover:border-navy"}`}>{s}</button>
          ))}
        </div>
      </FilterGroup>
      <FilterGroup title={`Precio máximo: ₲ ${priceMax.toLocaleString("es-PY")}`}>
        <input type="range" min={45000} max={150000} step={5000} value={priceMax} onChange={(e) => setPriceMax(Number(e.target.value))} className="w-full accent-navy" />
      </FilterGroup>
      <button onClick={clearAll} className="text-xs uppercase tracking-widest font-semibold text-muted-foreground hover:text-navy">Limpiar filtros</button>
      <Link to="/catalogo" search={{}} className="block text-xs uppercase tracking-widest font-semibold text-muted-foreground hover:text-navy">Ver todo</Link>
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-xs uppercase tracking-widest font-semibold mb-3">{title}</h3>
      {children}
    </div>
  );
}
