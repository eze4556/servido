export interface Producto {
  id?:string;
  title: string;
  category: string;
  price: number;
  description: string;
  stock: number;
  // variants: string[];
  images: string[];   // O cualquier tipo adecuado
  brand: '', // Nueva propiedad para la marca
  userId: string,
  isActive: boolean,
  discountedPrice?: number; // Nuevo campo
  discount?: number;        // Nuevo campo
}
