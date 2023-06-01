import { Alumno } from '../../alumnos/models';
import { Curso } from '../../cursos/models';
import { Subject } from '../../materias/models';

export interface Inscripcion {
  id: number;
  studentId: number;
  courseId: number;
  subjectId: number;
  usuario?: string;
  fechaInscripcion?: Date;
}

export interface InscripcionEstudiantes extends Inscripcion {
  student: Alumno;
}

export interface InscripcionMaterias extends Inscripcion {
  subject: Subject;
}

export interface InscripcionCursos extends Inscripcion {
  course: Curso;
}

export interface CreateInscripcionData {
  alumnos: Alumno[];
  courseId: number;
  subjectId: number;
  usuario?: string;
  fechaInscripcion?: Date;
}

export type InscripcionCompleta = InscripcionEstudiantes &
  InscripcionMaterias &
  InscripcionCursos;
