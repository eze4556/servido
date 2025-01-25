export interface UserI {
  id: string;
  nombre: string;
  apellido?: string; // Solo para clientes
  email: string;
  tipo_usuario: string; // 'cliente' o 'tienda'
  dni?: string; // Solo para clientes
  telefono?: string; // Para ambos, pero más relevante para clientes
  direccion?: string; // Para tiendas
  nombre_empresa?: string; // Para tiendas
  redes_sociales?: { // Para tiendas
    wsp?: string;
    instagram?: string;
    facebook?: string;
    sitio_web?: string;
  };
  horario_atencion?: string; // Para tiendas
  sobre_nosotros?: string; // Para tiendas
  descripcion?: string; // Para tiendas
  imagenPerfilUrl?: string; // URL de la imagen de perfil
}
