import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { CursosActions } from './cursos.actions';
import { CursosService } from '../services/cursos.service';

@Injectable()
export class CursosEffects {
  loadCursos$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CursosActions.loadCursos),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.cursosService.obtenerCursosMateria().pipe(
          map((data) => CursosActions.loadCursosSuccess({ data })),
          catchError((error) => of(CursosActions.loadCursosFailure({ error })))
        )
      )
    );
  });

  loadCursoDetalle$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CursosActions.loadCursodetalle),
      concatMap((action) =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.cursosService.obtenerCursoPorId(action.id).pipe(
          map((data) => CursosActions.loadCursodetalleSuccess({ data })),
          catchError((error) =>
            of(CursosActions.loadCursodetalleFailure({ error }))
          )
        )
      )
    );
  });

  createCurso$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CursosActions.createCurso),
      concatMap((action) =>
        this.cursosService.crearCurso(action.data).pipe(
          map((res) => CursosActions.createCursoSuccess({ data: res })),
          catchError((error) => of(CursosActions.createCursoFailure({ error })))
        )
      )
    );
  });

  deleteCurso$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CursosActions.deleteCurso),
      concatMap((action) =>
        this.cursosService.eliminarCurso(action.id).pipe(
          map((data) => CursosActions.deleteCursoSuccess({ data: action.id })),
          catchError((error) => of(CursosActions.deleteCursoFailure({ error })))
        )
      )
    );
  });

  updateCurso$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CursosActions.updateCurso),
      concatMap((action) =>
        this.cursosService.editarCurso(action.data, action.id).pipe(
          map((data) => CursosActions.updateCursoSuccess({ data: data })),
          catchError((error) => of(CursosActions.updateCursoFailure({ error })))
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private cursosService: CursosService
  ) {}
}
