import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import type { ReactNode } from "react";

import appCss from "../styles.css?url";
import { CartProvider } from "@/lib/cart";
import { ToastProvider } from "@/lib/toast";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl font-bold text-navy">404</h1>
        <p className="mt-3 text-muted-foreground">Esta página no existe.</p>
        <Link to="/" className="btn-primary mt-6">Volver al inicio</Link>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Willy Store — Ropa masculina premium" },
      { name: "description", content: "Tienda online de ropa masculina premium. Remeras, camisas, shorts y jeans para todos los talles." },
      { name: "theme-color", content: "#15224a" },
      { property: "og:title", content: "Willy Store — Ropa masculina premium" },
      { name: "twitter:title", content: "Willy Store — Ropa masculina premium" },
      { property: "og:description", content: "Tienda online de ropa masculina premium. Remeras, camisas, shorts y jeans para todos los talles." },
      { name: "twitter:description", content: "Tienda online de ropa masculina premium. Remeras, camisas, shorts y jeans para todos los talles." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/7efb2a26-a377-4c6e-a2a3-4134b36464f2/id-preview-5f236ac4--d7faa71d-f148-44cf-8118-5691b3a56386.lovable.app-1780340285270.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/7efb2a26-a377-4c6e-a2a3-4134b36464f2/id-preview-5f236ac4--d7faa71d-f148-44cf-8118-5691b3a56386.lovable.app-1780340285270.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@600;700;800&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <CartProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">
              <Outlet />
            </main>
            <Footer />
          </div>
        </CartProvider>
      </ToastProvider>
    </QueryClientProvider>
  );
}
