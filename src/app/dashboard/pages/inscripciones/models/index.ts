import { Alumno } from '../../alumnos/models';
import { Curso } from '../../cursos/models';

export interface Inscripcion {
  id: number;
  curso: Curso;
  alumnos: Alumno[];
  cantidadAlumnos?: number;
}

export interface CrearInscripcionPayload {
  curso: Curso;
  alumnos: Alumno[];
  cantidadAlumnos?: number;
}
