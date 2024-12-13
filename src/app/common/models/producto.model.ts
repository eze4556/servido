import { DocumentReference } from '@angular/fire/firestore';

export interface Producto {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  descuento?:number;
  precioFinal?: number; // Opcional si no hay descuento
  codigo: string;
  etiqueta: string;
  categoria: { id: string, nombre: string }; // Referencia a la categoría con nombre
  marca: { id: string, nombre: string };
  imagen: string;              // URL de la imagen
  envio:boolean;
}
