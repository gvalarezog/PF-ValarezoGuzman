import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CreateUsuarioData, IUsuario } from '../models';

export const UsuariosActions = createActionGroup({
  source: 'Usuarios',
  events: {
    'Load Usuarios': emptyProps(),
    'Load Usuarios Success': props<{ data: IUsuario[] }>(),
    'Load Usuarios Failure': props<{ error: unknown }>(),

    'Load UsuariosDetalle': props<{ id: number }>(),
    'Load UsuariosDetalle Success': props<{ data: IUsuario }>(),
    'Load UsuariosDetalle Failure': props<{ error: unknown }>(),

    'Create Usuario': props<{ data: CreateUsuarioData }>(),
    'Create Usuario Success': props<{ data: IUsuario }>(),
    'Create Usuario Failure': props<{ error: unknown }>(),

    'Delete Usuario': props<{ id: number }>(),
    'Delete Usuario Success': props<{ data: number }>(),
    'Delete Usuario Failure': props<{ error: unknown }>(),

    'Update Usuario': props<{ data: IUsuario; id: number }>(),
    'Update Usuario Success': props<{ data: IUsuario }>(),
    'Update Usuario Failure': props<{ error: unknown }>(),
  },
});
