import { Curso } from '../../cursos/models';

export interface Alumno {
  id: number;
  nombre: string;
  apellido: string;
  fechaRegistro: Date;
}

export interface CrearAlumnoPayload {
  nombre: string;
  apellido: string;
  fechaRegistro: Date;
}
