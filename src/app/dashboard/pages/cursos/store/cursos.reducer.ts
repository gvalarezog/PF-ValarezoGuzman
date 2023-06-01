import { createFeature, createReducer, on } from '@ngrx/store';
import { CursosActions } from './cursos.actions';
import { CursoMateria } from '../models';

export const cursosFeatureKey = 'cursos';

export interface State {
  loading: boolean;
  cursosMateria: CursoMateria[];
  error: unknown;
}

export const initialState: State = {
  loading: false,
  cursosMateria: [],
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(CursosActions.loadCursos, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(CursosActions.loadCursosSuccess, (state, action) => {
    return {
      ...state,
      loading: false,
      cursosMateria: action.data,
    };
  }),
  on(CursosActions.loadCursosFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  }),
  on(CursosActions.loadCursodetalle, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(CursosActions.loadCursodetalleSuccess, (state, action) => {
    return {
      ...state,
      loading: false,
      cursosMateria: [action.data],
    };
  }),
  on(CursosActions.loadCursodetalleFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  }),
  on(CursosActions.createCurso, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(CursosActions.createCursoSuccess, (state, action) => {
    const nuevoCurso = action.data;
    return {
      ...state,
      loading: false,
      cursosMateria: [...state.cursosMateria, nuevoCurso],
    };
  }),
  on(CursosActions.createCursoFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  }),
  on(CursosActions.deleteCurso, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(CursosActions.deleteCursoSuccess, (state, action) => {
    return {
      ...state,
      cursosMateria: state.cursosMateria.filter((i) => i.id !== action.data),
      loading: false,
    };
  }),
  on(CursosActions.deleteCursoFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  }),
  on(CursosActions.updateCurso, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(CursosActions.updateCursoSuccess, (state, action) => {
    const cursoEditado = action.data;
    const cursos = state.cursosMateria.map((curso) => {
      if (curso.id === action.data.id) {
        // Sobreescribir el usuario editado
        return cursoEditado;
      } else {
        // Mantener los demás usuarios sin modificar
        return curso;
      }
    });
    return {
      ...state,
      loading: false,
      cursosMateria: cursos,
    };
  }),
  on(CursosActions.updateCursoFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  })
);

export const cursosFeature = createFeature({
  name: cursosFeatureKey,
  reducer,
});
