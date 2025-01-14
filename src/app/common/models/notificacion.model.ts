export interface Notificacion {
  id: string;
  titulo: string;
  descripcion: string;
  imagenUrl?: string;
  fecha: string; // o Date
  leida: boolean;
}
