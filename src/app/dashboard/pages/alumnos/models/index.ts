import { Curso } from '../../cursos/models';

export interface Alumno {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
}

export interface CrearAlumnoPayload {
  nombre: string;
  apellido: string;
  email: string;
}
