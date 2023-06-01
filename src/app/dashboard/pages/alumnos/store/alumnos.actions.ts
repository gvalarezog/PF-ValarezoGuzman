import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Alumno, CrearAlumnoPayload } from '../models';

export const AlumnosActions = createActionGroup({
  source: 'Alumnos',
  events: {
    'Load Alumnos': emptyProps(),
    'Load Alumnos Success': props<{ data: Alumno[] }>(),
    'Load Alumnos Failure': props<{ error: unknown }>(),

    'Load AlumnoDetalle': props<{ id: number }>(),
    'Load AlumnoDetalle Success': props<{ data: Alumno }>(),
    'Load AlumnoDetalle Failure': props<{ error: unknown }>(),

    'Create Alumno': props<{ data: CrearAlumnoPayload }>(),
    'Create Alumno Success': props<{ data: Alumno }>(),
    'Create Alumno Failure': props<{ error: unknown }>(),

    'Delete Alumno': props<{ id: number }>(),
    'Delete Alumno Success': props<{ data: number }>(),
    'Delete Alumno Failure': props<{ error: unknown }>(),

    'Update Alumno': props<{ data: Alumno; id: number }>(),
    'Update Alumno Success': props<{ data: Alumno }>(),
    'Update Alumno Failure': props<{ error: unknown }>(),
  },
});
