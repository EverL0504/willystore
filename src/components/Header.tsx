import { Link } from "@tanstack/react-router";
import { Search, ShoppingBag, Menu, X, Instagram, Facebook, Mail } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart";

const NAV = [
  { to: "/", label: "Inicio" },
  { to: "/catalogo", label: "Catálogo", search: { categoria: undefined } },
  { to: "/catalogo", label: "Básicas", search: { categoria: "basicas" } },
  { to: "/catalogo", label: "Oversized", search: { categoria: "oversized" } },
  { to: "/catalogo", label: "Camisas", search: { categoria: "camisas" } },
  { to: "/catalogo", label: "Shorts", search: { categoria: "shorts" } },
  { to: "/catalogo", label: "Jeans", search: { categoria: "jeans" } },
  { to: "/contacto", label: "Contacto" },
] as const;

export function Header() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState("");

  return (
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border">
      <div className="bg-navy text-primary-foreground text-xs">
        <div className="container-x flex h-9 items-center justify-between gap-4">
          <p className="hidden sm:block tracking-wider uppercase">Envío gratis en compras superiores a ₲ 500.000</p>
          <p className="sm:hidden tracking-wider uppercase">Envío gratis +₲500.000</p>
          <div className="flex items-center gap-3">
            <a href="https://instagram.com/willystore_" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram className="size-3.5" /></a>
            <a href="https://facebook.com/willystore" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><Facebook className="size-3.5" /></a>
            <a href="mailto:willystore@gmail.com" aria-label="Email"><Mail className="size-3.5" /></a>
          </div>
        </div>
      </div>

      <div className="container-x flex h-16 lg:h-20 items-center justify-between gap-4">
        <button className="lg:hidden p-2 -ml-2" onClick={() => setOpen(true)} aria-label="Abrir menú">
          <Menu className="size-6" />
        </button>

        <Link to="/" className="flex items-center gap-1 font-display text-xl lg:text-2xl font-bold tracking-tight text-navy">
          WILLY<span className="font-sans text-[10px] font-medium tracking-[0.3em] mt-1">STORE</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          {NAV.map((n) => (
            <Link
              key={n.label}
              to={n.to}
              search={(n as any).search ?? {}}
              className="text-xs font-semibold uppercase tracking-wider text-foreground/80 hover:text-navy transition-colors"
              activeOptions={{ exact: n.to === "/" }}
              activeProps={{ className: "text-navy" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <button onClick={() => setSearchOpen((s) => !s)} className="p-2 hover:text-navy" aria-label="Buscar">
            <Search className="size-5" />
          </button>
          <Link to="/carrito" className="relative p-2 hover:text-navy" aria-label="Carrito">
            <ShoppingBag className="size-5" />
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 size-5 rounded-full bg-navy text-primary-foreground text-[10px] font-bold flex items-center justify-center">{count}</span>
            )}
          </Link>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-border bg-card">
          <form
            className="container-x py-4 flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              setSearchOpen(false);
              if (q.trim()) {
                window.location.href = `/catalogo?q=${encodeURIComponent(q.trim())}`;
              }
            }}
          >
            <input
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscar productos..."
              className="input-base"
            />
            <button type="submit" className="btn-primary">Buscar</button>
          </form>
        </div>
      )}

      {open && (
        <div className="fixed inset-0 z-[100] bg-black/50 lg:hidden" onClick={() => setOpen(false)}>
          <div className="absolute left-0 top-0 h-full w-[88vw] max-w-md bg-white shadow-2xl p-6 overflow-y-auto animate-slide-in-left" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-8">
              <span className="font-display font-bold text-xl text-navy">WILLY STORE</span>
              <button onClick={() => setOpen(false)} aria-label="Cerrar"><X className="size-5" /></button>
            </div>
            <nav className="flex flex-col gap-1">
              {NAV.map((n) => (
                <Link
                  key={n.label}
                  to={n.to}
                  search={(n as any).search ?? {}}
                  onClick={() => setOpen(false)}
                  className="py-3 text-sm font-semibold uppercase tracking-wider border-b border-border"
                >
                  {n.label}
                </Link>
              ))}
            </nav>
            <div className="mt-8 flex gap-3 text-muted-foreground">
              <a href="https://instagram.com/willystore_" target="_blank" rel="noopener noreferrer"><Instagram className="size-5" /></a>
              <a href="https://facebook.com/willystore" target="_blank" rel="noopener noreferrer"><Facebook className="size-5" /></a>
              <a href="mailto:willystore@gmail.com"><Mail className="size-5" /></a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
