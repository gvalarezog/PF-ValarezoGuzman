import { createFeature, createReducer, on } from '@ngrx/store';
import { UsuariosActions } from './usuarios.actions';
import { Usuario } from '../models';

export const usuariosFeatureKey = 'usuarios';

export interface State {
  loading: boolean;
  usuarios: Usuario[];
  error: unknown;
}

export const initialState: State = {
  loading: false,
  usuarios: [],
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(UsuariosActions.loadUsuarios, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(UsuariosActions.loadUsuariosSuccess, (state, action) => {
    return {
      ...state,
      loading: false,
      usuarios: action.data,
    };
  }),
  on(UsuariosActions.loadUsuariosFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  }),
  on(UsuariosActions.loadUsuariosdetalle, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(UsuariosActions.loadUsuariosdetalleSuccess, (state, action) => {
    return {
      ...state,
      loading: false,
      usuarios: [action.data],
    };
  }),
  on(UsuariosActions.loadUsuariosFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  }),
  on(UsuariosActions.createUsuario, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(UsuariosActions.createUsuarioSuccess, (state, action) => {
    const nuevoUsuario = action.data;
    return {
      ...state,
      loading: false,
      usuarios: [...state.usuarios, nuevoUsuario],
    };
  }),
  on(UsuariosActions.createUsuarioFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  }),
  on(UsuariosActions.deleteUsuario, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(UsuariosActions.deleteUsuarioSuccess, (state, action) => {
    return {
      ...state,
      usuarios: state.usuarios.filter((i) => i.id !== action.data),
      loading: false,
    };
  }),
  on(UsuariosActions.deleteUsuarioFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  }),
  on(UsuariosActions.updateUsuario, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(UsuariosActions.updateUsuarioSuccess, (state, action) => {
    const usuarioEditado = action.data;
    const usuarios = state.usuarios.map((usuario) => {
      if (usuario.id === action.data.id) {
        // Sobreescribir el usuario editado
        return usuarioEditado;
      } else {
        // Mantener los demás usuarios sin modificar
        return usuario;
      }
    });
    return {
      ...state,
      loading: false,
      usuarios: usuarios,
    };
  }),
  on(UsuariosActions.updateUsuarioFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  })
);

export const usuariosFeature = createFeature({
  name: usuariosFeatureKey,
  reducer,
});
