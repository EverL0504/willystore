import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-navy text-primary-foreground mt-20">
      <div className="container-x py-14 grid gap-10 md:grid-cols-4">
        <div>
          <div className="font-display text-2xl font-bold">WILLY STORE</div>
          <p className="mt-3 text-sm text-primary-foreground/70 max-w-xs">
            Ropa masculina premium. Calidad, estilo y comodidad para todos los talles.
          </p>
          <div className="mt-5 flex gap-3">
            <a href="https://instagram.com/willystore_" target="_blank" rel="noopener noreferrer" className="size-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors" aria-label="Instagram"><Instagram className="size-4" /></a>
            <a href="https://facebook.com/willystore" target="_blank" rel="noopener noreferrer" className="size-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors" aria-label="Facebook"><Facebook className="size-4" /></a>
            <a href="mailto:willystore@gmail.com" className="size-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors" aria-label="Email"><Mail className="size-4" /></a>
          </div>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-widest font-semibold mb-4">Tienda</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/80">
            <li><Link to="/catalogo" search={{ categoria: "basicas" }} className="hover:text-white">Básicas</Link></li>
            <li><Link to="/catalogo" search={{ categoria: "oversized" }} className="hover:text-white">Oversized</Link></li>
            <li><Link to="/catalogo" search={{ categoria: "camisas" }} className="hover:text-white">Camisas</Link></li>
            <li><Link to="/catalogo" search={{ categoria: "shorts" }} className="hover:text-white">Shorts</Link></li>
            <li><Link to="/catalogo" search={{ categoria: "jeans" }} className="hover:text-white">Jeans</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-widest font-semibold mb-4">Ayuda</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/80">
            <li><Link to="/contacto" className="hover:text-white">Contacto</Link></li>
            <li>Guía de talles</li>
            <li>Envíos y entregas</li>
            <li>Cambios y devoluciones</li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-widest font-semibold mb-4">Contacto</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/80">
            <li>Instagram: @willystore_</li>
            <li>Facebook: Willy Store</li>
            <li>willystore@gmail.com</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x py-5 text-xs text-primary-foreground/60 flex flex-wrap justify-between gap-2">
          <span>© {new Date().getFullYear()} Willy Store. Todos los derechos reservados.</span>
          <span>Paraguay</span>
        </div>
      </div>
    </footer>
  );
}
