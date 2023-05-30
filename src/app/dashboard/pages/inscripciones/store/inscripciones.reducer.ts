import { createFeature, createReducer, on } from '@ngrx/store';
import { InscripcionesActions } from './inscripciones.actions';
import { InscripcionCompleta } from '../models';

export const inscripcionesFeatureKey = 'inscripciones';

export interface State {
  loading: boolean;
  inscripciones: InscripcionCompleta[];
  error: unknown;
}

export const initialState: State = {
  loading: false,
  inscripciones: [],
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(InscripcionesActions.loadInscripciones, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(InscripcionesActions.loadInscripcionesSuccess, (state, action) => {
    return {
      ...state,
      loading: false,
      inscripciones: action.data,
    };
  }),
  on(InscripcionesActions.loadInscripcionesFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  }),
  on(InscripcionesActions.loadInscripcionesdetalle, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(InscripcionesActions.loadInscripcionesdetalleSuccess, (state, action) => {
    return {
      ...state,
      loading: false,
      inscripciones: action.data,
    };
  }),
  on(InscripcionesActions.loadInscripcionesdetalleFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  }),
  on(InscripcionesActions.createInscripcion, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),

  on(InscripcionesActions.createInscripcionSuccess, (state, action) => {
    const newInscripcion = action.data;
    return {
      ...state,
      loading: false,
      inscripciones: [...state.inscripciones, newInscripcion],
    };
  }),

  on(InscripcionesActions.createInscripcionFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  }),

  on(InscripcionesActions.deleteInscripcion, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),

  on(InscripcionesActions.deleteInscripcionSuccess, (state, action) => {
    return {
      ...state,
      inscripciones: state.inscripciones.filter((i) => i.id !== action.data),
      loading: false,
    };
  }),

  on(InscripcionesActions.deleteInscripcionFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  }),

  on(InscripcionesActions.deleteInscripcionporcurso, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),

  on(InscripcionesActions.deleteInscripcionporcursoSuccess, (state, action) => {
    return {
      ...state,
      inscripciones: state.inscripciones.filter(
        (i) => i.courseId !== action.data
      ),
      loading: false,
    };
  }),

  on(InscripcionesActions.deleteInscripcionporcursoFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  })
);

export const inscripcionesFeature = createFeature({
  name: inscripcionesFeatureKey,
  reducer,
});
