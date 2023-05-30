import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { UsuariosActions } from './usuarios.actions';
import { UsuariosService } from '../services/usuarios.service';
import { of } from 'rxjs';

@Injectable()
export class UsuariosEffects {
  loadUsuarioss$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UsuariosActions.loadUsuarios),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.usuariosService.obtenerUsuarios().pipe(
          map((data) => UsuariosActions.loadUsuariosSuccess({ data })),
          catchError((error) =>
            of(UsuariosActions.loadUsuariosFailure({ error }))
          )
        )
      )
    );
  });

  loadUsuariosDetalle$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UsuariosActions.loadUsuariosdetalle),
      concatMap((action) =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.usuariosService.obtenerUsuarioPorId(action.id).pipe(
          map((data) => UsuariosActions.loadUsuariosdetalleSuccess({ data })),
          catchError((error) =>
            of(UsuariosActions.loadUsuariosdetalleFailure({ error }))
          )
        )
      )
    );
  });

  createUsuario$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UsuariosActions.createUsuario),
      concatMap((action) =>
        this.usuariosService.crearUsuario(action.data).pipe(
          map((res) => UsuariosActions.createUsuarioSuccess({ data: res })),
          catchError((error) =>
            of(UsuariosActions.createUsuarioFailure({ error }))
          )
        )
      )
    );
  });

  deleteUsuario$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UsuariosActions.deleteUsuario),
      concatMap((action) =>
        this.usuariosService.eliminarUsuarioPorId(action.id).pipe(
          map((data) =>
            UsuariosActions.deleteUsuarioSuccess({ data: action.id })
          ),
          catchError((error) =>
            of(UsuariosActions.deleteUsuarioFailure({ error }))
          )
        )
      )
    );
  });

  updateUsuario$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UsuariosActions.updateUsuario),
      concatMap((action) =>
        this.usuariosService.editarUsuario(action.data, action.id).pipe(
          map((data) => UsuariosActions.updateUsuarioSuccess({ data: data })),
          catchError((error) =>
            of(UsuariosActions.updateUsuarioFailure({ error }))
          )
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private usuariosService: UsuariosService
  ) {}
}
