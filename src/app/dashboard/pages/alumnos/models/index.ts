import { Curso } from '../../cursos/models';

export interface Alumno {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  curso: string;
  password: string;
  direccion: string;
  direccion2: string;
  ciudad: string;
  provincia: string;
  zip: string;
  vip: boolean;
}

export interface CrearAlumnoPayload {
  nombre: string;
  apellido: string;
  email: string;
  curso: string;
  password: string;
  direccion: string;
  direccion2: string;
  ciudad: string;
  provincia: string;
  zip: string;
  vip: boolean;
  cursos?: Curso[];
}
