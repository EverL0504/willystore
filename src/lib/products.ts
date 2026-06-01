import basic1 from "@/assets/products/basic-1.jpg";
import basic2 from "@/assets/products/basic-2.jpg";
import basic3 from "@/assets/products/basic-3.jpg";
import basic4 from "@/assets/products/basic-4.jpg";
import basic5 from "@/assets/products/basic-5.jpg";
import over1 from "@/assets/products/over-1.jpg";
import over2 from "@/assets/products/over-2.jpg";
import over3 from "@/assets/products/over-3.jpg";
import over4 from "@/assets/products/over-4.jpg";
import over5 from "@/assets/products/over-5.jpg";
import shirt1 from "@/assets/products/shirt-1.jpg";
import shirt2 from "@/assets/products/shirt-2.jpg";
import shirt3 from "@/assets/products/shirt-3.jpg";
import shirt4 from "@/assets/products/shirt-4.jpg";
import shirt5 from "@/assets/products/shirt-5.jpg";
import short1 from "@/assets/products/short-1.jpg";
import short2 from "@/assets/products/short-2.jpg";
import short3 from "@/assets/products/short-3.jpg";
import short4 from "@/assets/products/short-4.jpg";
import short5 from "@/assets/products/short-5.jpg";
import jean1 from "@/assets/products/jean-1.jpg";
import jean2 from "@/assets/products/jean-2.jpg";
import jean3 from "@/assets/products/jean-3.jpg";
import jean4 from "@/assets/products/jean-4.jpg";
import jean5 from "@/assets/products/jean-5.jpg";

export type Category = "basicas" | "oversized" | "camisas" | "shorts" | "jeans";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  brand: string;
  color: string;
  style: string;
  image: string;
  sizes: string[];
  stock: number;
  featured?: boolean;
  isNew?: boolean;
  discount?: number;
}

const standardSizes = ["S", "M", "L", "XL", "XXL", "3XL", "4XL", "5XL", "6XL", "7XL"];
const pantSizes = ["28", "30", "32", "34", "36", "38", "40", "42"];

export const products: Product[] = [
  // Básicas — 45.000
  { id: "b1", name: "Nike Urban Essential", description: "Remera básica de algodón premium con corte clásico. Suave al tacto, ideal para uso diario y combinación versátil.", price: 45000, category: "basicas", brand: "Nike", color: "Negro", style: "Casual", image: basic1, sizes: standardSizes, stock: 24, featured: true, isNew: true },
  { id: "b2", name: "Adidas Classic White", description: "Remera básica blanca de algodón peinado, costuras reforzadas. Pieza fundamental en cualquier guardarropa moderno.", price: 45000, category: "basicas", brand: "Adidas", color: "Blanco", style: "Minimalista", image: basic2, sizes: standardSizes, stock: 30, featured: true },
  { id: "b3", name: "Puma Heritage Grey", description: "Remera básica gris jaspeado, tejido transpirable y ligero. Comodidad superior para el día a día.", price: 45000, category: "basicas", brand: "Puma", color: "Gris", style: "Casual", image: basic3, sizes: standardSizes, stock: 18 },
  { id: "b4", name: "Reebok Navy Pocket", description: "Remera básica azul marino con bolsillo en el pecho. Diseño atemporal con detalle utilitario.", price: 45000, category: "basicas", brand: "Reebok", color: "Azul Marino", style: "Premium", image: basic4, sizes: standardSizes, stock: 12, featured: true },
  { id: "b5", name: "New Balance Olive Field", description: "Remera básica en verde militar. Algodón orgánico de alta densidad, color atemporal y elegante.", price: 45000, category: "basicas", brand: "New Balance", color: "Verde Militar", style: "Urbano", image: basic5, sizes: standardSizes, stock: 20, isNew: true },

  // Oversized — 85.000
  { id: "o1", name: "Nike Oversized Premium", description: "Remera oversized en negro lavado con caída boxy y hombros caídos. Estética streetwear premium.", price: 85000, category: "oversized", brand: "Nike", color: "Negro", style: "Streetwear", image: over1, sizes: standardSizes, stock: 15, featured: true, isNew: true },
  { id: "o2", name: "Puma Classic 1998", description: "Oversized vintage color crema con gráfico 1998 estilo universitario. Algodón pesado de 240g.", price: 85000, category: "oversized", brand: "Puma", color: "Beige", style: "Vintage", image: over2, sizes: standardSizes, stock: 10, featured: true },
  { id: "o3", name: "Vans Heritage Wine", description: "Oversized en burdeos con estampa minimalista. Calidad heavy cotton para una caída perfecta.", price: 85000, category: "oversized", brand: "Vans", color: "Burdeos", style: "Premium", image: over3, sizes: standardSizes, stock: 8, discount: 15 },
  { id: "o4", name: "Adidas Retro Club", description: "Oversized azul oscuro con pequeño logo retro. Diseño moderno con esencia clásica.", price: 85000, category: "oversized", brand: "Adidas", color: "Azul Marino", style: "Moderno", image: over4, sizes: standardSizes, stock: 22, isNew: true },
  { id: "o5", name: "Converse Sky Edition", description: "Oversized celeste con gráfico trasero. Tejido premium pesado, corte boxy auténtico.", price: 85000, category: "oversized", brand: "Converse", color: "Celeste", style: "Streetwear", image: over5, sizes: standardSizes, stock: 14 },

  // Camisas — 120.000
  { id: "s1", name: "Under Armour Linen Resort", description: "Camisa de lino beige manga corta. Fresca, elegante y perfecta para climas cálidos.", price: 120000, category: "camisas", brand: "Under Armour", color: "Beige", style: "Elegante", image: shirt1, sizes: standardSizes, stock: 16, featured: true },
  { id: "s2", name: "Nike Oxford White", description: "Camisa oxford blanca manga larga. Versátil para uso formal o casual, calidad superior.", price: 120000, category: "camisas", brand: "Nike", color: "Blanco", style: "Elegante", image: shirt2, sizes: standardSizes, stock: 18, isNew: true },
  { id: "s3", name: "Puma Denim Classic", description: "Camisa denim azul marino. Tejido resistente con caída moderna, un clásico renovado.", price: 120000, category: "camisas", brand: "Puma", color: "Azul Oscuro", style: "Casual", image: shirt3, sizes: standardSizes, stock: 12 },
  { id: "s4", name: "Vans Black Resort", description: "Camisa negra manga corta estilo resort. Minimalista y elegante para ocasiones casuales.", price: 120000, category: "camisas", brand: "Vans", color: "Negro", style: "Minimalista", image: shirt4, sizes: standardSizes, stock: 9, discount: 20 },
  { id: "s5", name: "Reebok Highlands Flannel", description: "Camisa flannel a cuadros verde y negro. Cálida, robusta y con carácter urbano-rústico.", price: 120000, category: "camisas", brand: "Reebok", color: "Verde Militar", style: "Urbano", image: shirt5, sizes: standardSizes, stock: 11 },

  // Shorts — 120.000
  { id: "sh1", name: "Adidas Chino Beige", description: "Short chino color beige, corte por encima de la rodilla. Versatilidad y comodidad para el verano.", price: 120000, category: "shorts", brand: "Adidas", color: "Beige", style: "Casual", image: short1, sizes: pantSizes, stock: 20, featured: true },
  { id: "sh2", name: "Nike Navy Coast", description: "Short de algodón azul marino con cintura elástica. Diseño limpio y moderno.", price: 120000, category: "shorts", brand: "Nike", color: "Azul Marino", style: "Moderno", image: short2, sizes: pantSizes, stock: 15, isNew: true },
  { id: "sh3", name: "Puma Sport Stripe", description: "Short deportivo negro con franjas laterales. Tejido transpirable para alto rendimiento.", price: 120000, category: "shorts", brand: "Puma", color: "Negro", style: "Sporty", image: short3, sizes: pantSizes, stock: 25 },
  { id: "sh4", name: "Vans Cargo Field", description: "Short cargo verde militar con bolsillos laterales. Estilo utilitario urbano.", price: 120000, category: "shorts", brand: "Vans", color: "Verde Militar", style: "Urbano", image: short4, sizes: pantSizes, stock: 10, featured: true },
  { id: "sh5", name: "Reebok Jersey Lounge", description: "Short jersey gris con cordón ajustable. Comodidad absoluta para estar en casa o salir.", price: 120000, category: "shorts", brand: "Reebok", color: "Gris", style: "Casual", image: short5, sizes: pantSizes, stock: 18 },

  // Jeans — 120.000
  { id: "j1", name: "Nike Slim Indigo", description: "Jean slim fit en azul oscuro. Denim premium con elastano para movimiento natural.", price: 120000, category: "jeans", brand: "Nike", color: "Azul Oscuro", style: "Moderno", image: jean1, sizes: pantSizes, stock: 22, featured: true, isNew: true },
  { id: "j2", name: "Adidas Straight Light", description: "Jean recto en lavado claro. Corte clásico que nunca pasa de moda.", price: 120000, category: "jeans", brand: "Adidas", color: "Celeste", style: "Casual", image: jean2, sizes: pantSizes, stock: 16 },
  { id: "j3", name: "Puma Skinny Black", description: "Jean skinny negro de tiro medio. Estructurado y elegante para looks urbanos.", price: 120000, category: "jeans", brand: "Puma", color: "Negro", style: "Urbano", image: jean3, sizes: pantSizes, stock: 14, discount: 10 },
  { id: "j4", name: "Vans Baggy Mid Wash", description: "Jean baggy wide leg en lavado medio. Esencia 90s y comodidad streetwear.", price: 120000, category: "jeans", brand: "Vans", color: "Azul Marino", style: "Streetwear", image: jean4, sizes: pantSizes, stock: 11, isNew: true },
  { id: "j5", name: "New Balance Brown Distressed", description: "Jean marrón con detalles distressed en las rodillas. Pieza única de alto carácter.", price: 120000, category: "jeans", brand: "New Balance", color: "Marrón", style: "Vintage", image: jean5, sizes: pantSizes, stock: 7 },
];

export const categories: { id: Category; label: string; image: string }[] = [
  { id: "basicas", label: "Básicas", image: basic4 },
  { id: "oversized", label: "Oversized", image: over1 },
  { id: "camisas", label: "Camisas", image: shirt1 },
  { id: "shorts", label: "Shorts", image: short1 },
  { id: "jeans", label: "Jeans", image: jean1 },
];

export const brands = ["Nike", "Adidas", "Puma", "Reebok", "New Balance", "Vans", "Converse", "Under Armour"];
export const colors = ["Negro", "Blanco", "Azul Marino", "Gris", "Verde Militar", "Burdeos", "Beige", "Celeste", "Azul Oscuro", "Marrón"];

export const PLUS_SIZES = ["4XL", "5XL", "6XL", "7XL"];
export const PLUS_SIZE_SURCHARGE = 15000;

export function getProduct(id: string) {
  return products.find((p) => p.id === id);
}

export function formatPrice(n: number) {
  return "₲ " + n.toLocaleString("es-PY");
}

export function getEffectivePrice(p: Product, size?: string) {
  let price = p.price;
  if (p.discount) price = price - (price * p.discount) / 100;
  if (size && PLUS_SIZES.includes(size)) price += PLUS_SIZE_SURCHARGE;
  return Math.round(price);
}
