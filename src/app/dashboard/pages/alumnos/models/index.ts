export interface Alumno {
  id: number;
  nombre: string;
  apellido: string;
  fechaRegistro: Date;
  perfil?: string;
  sexo?: string;
}

export interface CrearAlumnoPayload {
  nombre: string;
  apellido: string;
  fechaRegistro: Date;
  perfil?: string;
  sexo?: string;
}
