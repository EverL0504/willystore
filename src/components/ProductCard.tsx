import { Link } from "@tanstack/react-router";
import { formatPrice, type Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  const discounted = product.discount ? Math.round(product.price * (1 - product.discount / 100)) : null;
  return (
    <Link
      to="/producto/$id"
      params={{ id: product.id }}
      className="group block"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-muted rounded-sm">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={768}
          height={1024}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.isNew && (
          <span className="absolute top-3 left-3 bg-navy text-primary-foreground text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-sm">Nuevo</span>
        )}
        {product.discount && (
          <span className="absolute top-3 right-3 bg-destructive text-destructive-foreground text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-sm">-{product.discount}%</span>
        )}
      </div>
      <div className="mt-3 space-y-1">
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{product.brand}</p>
        <h3 className="text-sm font-medium text-foreground group-hover:text-navy transition-colors">{product.name}</h3>
        <div className="flex items-baseline gap-2">
          {discounted ? (
            <>
              <span className="text-sm font-semibold text-destructive">{formatPrice(discounted)}</span>
              <span className="text-xs text-muted-foreground line-through">{formatPrice(product.price)}</span>
            </>
          ) : (
            <span className="text-sm font-semibold">{formatPrice(product.price)}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
