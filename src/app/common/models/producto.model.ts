export interface Producto {
  title: string;
  category: string;
  price: number;
  description: string;
  stock: number;
  variants: string[]; // O cualquier tipo adecuado
  images: string[];   // O cualquier tipo adecuado
}
