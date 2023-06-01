import { createFeature, createReducer, on } from '@ngrx/store';
import { AlumnosActions } from './alumnos.actions';
import { Alumno } from '../models';

export const alumnosFeatureKey = 'alumnos';

export interface State {
  loading: boolean;
  alumnos: Alumno[];
  error: unknown;
}

export const initialState: State = {
  loading: false,
  alumnos: [],
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(AlumnosActions.loadAlumnos, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(AlumnosActions.loadAlumnosSuccess, (state, action) => {
    return {
      ...state,
      loading: false,
      alumnos: action.data,
    };
  }),
  on(AlumnosActions.loadAlumnosFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  }),
  on(AlumnosActions.loadAlumnodetalle, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(AlumnosActions.loadAlumnodetalleSuccess, (state, action) => {
    return {
      ...state,
      loading: false,
      alumnos: [action.data],
    };
  }),
  on(AlumnosActions.loadAlumnodetalleFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  }),
  on(AlumnosActions.createAlumno, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(AlumnosActions.createAlumnoSuccess, (state, action) => {
    const nuevoAlumno = action.data;
    return {
      ...state,
      loading: false,
      alumnos: [...state.alumnos, nuevoAlumno],
    };
  }),
  on(AlumnosActions.createAlumnoFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  }),
  on(AlumnosActions.deleteAlumno, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(AlumnosActions.deleteAlumnoSuccess, (state, action) => {
    return {
      ...state,
      alumnos: state.alumnos.filter((i) => i.id !== action.data),
      loading: false,
    };
  }),
  on(AlumnosActions.deleteAlumnoFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  }),
  on(AlumnosActions.updateAlumno, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(AlumnosActions.updateAlumnoSuccess, (state, action) => {
    const alumnoEditado = action.data;
    const alumnos = state.alumnos.map((alumno) => {
      if (alumno.id === action.data.id) {
        // Sobreescribir el usuario editado
        return alumnoEditado;
      } else {
        // Mantener los demás usuarios sin modificar
        return alumno;
      }
    });
    return {
      ...state,
      loading: false,
      alumnos: alumnos,
    };
  }),
  on(AlumnosActions.updateAlumnoFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  })
);

export const alumnosFeature = createFeature({
  name: alumnosFeatureKey,
  reducer,
});
