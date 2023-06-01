import {
  createAction,
  createActionGroup,
  emptyProps,
  props,
} from '@ngrx/store';
import { CreateInscripcionData, InscripcionCompleta } from '../models';

export const InscripcionesActions = createActionGroup({
  source: 'Inscripciones',
  events: {
    'Load Inscripciones': emptyProps(),
    'Load Inscripciones Success': props<{ data: InscripcionCompleta[] }>(),
    'Load Inscripciones Failure': props<{ error: unknown }>(),

    'Load InscripcionesDetalle': props<{ id: number }>(),
    'Load InscripcionesDetalle Success': props<{
      data: InscripcionCompleta[];
    }>(),
    'Load InscripcionesDetalle Failure': props<{ error: unknown }>(),

    'Create Inscripcion': props<{ data: CreateInscripcionData }>(),
    'Create Inscripcion Success': props<{ data: InscripcionCompleta }>(),
    'Create Inscripcion Failure': props<{ error: unknown }>(),

    'Delete Inscripcion': props<{ id: number }>(),
    'Delete Inscripcion Success': props<{ data: number }>(),
    'Delete Inscripcion Failure': props<{ error: unknown }>(),

    'Delete InscripcionPorCurso': props<{ id: number }>(),
    'Delete InscripcionPorCurso Success': props<{ data: number }>(),
    'Delete InscripcionPorCurso Failure': props<{ error: unknown }>(),
  },
});
