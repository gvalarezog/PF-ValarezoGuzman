import { createReducer, on } from '@ngrx/store';
import { Usuario } from 'src/app/core/models';
import {
  CerrarSesionUsuarioAutenticado,
  EstablecerUsuarioAutenticado,
} from './auth.actions';

export const authFeatureKey = 'auth';

export interface AuthState {
  authUser: Usuario | null;
}

const initialState: AuthState = {
  authUser: null,
};

export const authReducer = createReducer(
  initialState,
  on(EstablecerUsuarioAutenticado, (currentState, { payload }) => {
    return { authUser: payload };
  }),

  on(CerrarSesionUsuarioAutenticado, (currentState) => {
    return initialState;
  })
);
