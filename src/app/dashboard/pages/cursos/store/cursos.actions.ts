import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CrearCursoPayload, Curso, CursoMateria } from '../models';

export const CursosActions = createActionGroup({
  source: 'Cursos',
  events: {
    'Load Cursos': emptyProps(),
    'Load Cursos Success': props<{ data: CursoMateria[] }>(),
    'Load Cursos Failure': props<{ error: unknown }>(),

    'Load CursoDetalle': props<{ id: number }>(),
    'Load CursoDetalle Success': props<{ data: CursoMateria }>(),
    'Load CursoDetalle Failure': props<{ error: unknown }>(),

    'Create Curso': props<{ data: CrearCursoPayload }>(),
    'Create Curso Success': props<{ data: CursoMateria }>(),
    'Create Curso Failure': props<{ error: unknown }>(),

    'Delete Curso': props<{ id: number }>(),
    'Delete Curso Success': props<{ data: number }>(),
    'Delete Curso Failure': props<{ error: unknown }>(),

    'Update Curso': props<{ data: CursoMateria; id: number }>(),
    'Update Curso Success': props<{ data: CursoMateria }>(),
    'Update Curso Failure': props<{ error: unknown }>(),
  },
});
