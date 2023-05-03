import { Alumno } from '../../alumnos/models';
import { Curso } from '../../cursos/models';

export interface Incripcion {
  id: number;
  Curso: Curso;
  alumnos?: Alumno[];
}
