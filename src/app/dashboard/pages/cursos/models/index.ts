import { Subject } from '../../materias/models';

export interface Curso {
  id: number;
  subjectId: number;
  fecha_inicio: Date;
  fecha_fin: Date;
  profesor?: string;
  horas?: number;
  clases?: number;
}

export interface CursoMateria extends Curso {
  subject: Subject;
}

export interface CrearCursoPayload {
  nombre: string;
  subjectId: number;
  fecha_inicio: Date;
  fecha_fin: Date;
  profesor?: string;
  horas?: number;
  clases?: number;
}
