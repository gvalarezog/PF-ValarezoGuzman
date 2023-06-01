import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { AlumnosActions } from './alumnos.actions';
import { AlumnosService } from '../services/alumnos.service';

@Injectable()
export class AlumnosEffects {
  loadAlumnoss$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AlumnosActions.loadAlumnos),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.alumnoService.obtenerAlumnos().pipe(
          map((data) => AlumnosActions.loadAlumnosSuccess({ data })),
          catchError((error) =>
            of(AlumnosActions.loadAlumnosFailure({ error }))
          )
        )
      )
    );
  });

  loadAlumnoDetalle$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AlumnosActions.loadAlumnodetalle),
      concatMap((action) =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.alumnoService.obtenerAlumnoPorId(action.id).pipe(
          map((data) => AlumnosActions.loadAlumnodetalleSuccess({ data })),
          catchError((error) =>
            of(AlumnosActions.loadAlumnodetalleFailure({ error }))
          )
        )
      )
    );
  });

  createAlumno$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AlumnosActions.createAlumno),
      concatMap((action) =>
        this.alumnoService.crearAlumno(action.data).pipe(
          map((res) => AlumnosActions.createAlumnoSuccess({ data: res })),
          catchError((error) =>
            of(AlumnosActions.createAlumnoFailure({ error }))
          )
        )
      )
    );
  });

  deleteAlumno$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AlumnosActions.deleteAlumno),
      concatMap((action) =>
        this.alumnoService.eliminarAlumno(action.id).pipe(
          map((data) =>
            AlumnosActions.deleteAlumnoSuccess({ data: action.id })
          ),
          catchError((error) =>
            of(AlumnosActions.deleteAlumnoFailure({ error }))
          )
        )
      )
    );
  });

  updateAlumno$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AlumnosActions.updateAlumno),
      concatMap((action) =>
        this.alumnoService.editarAlumno(action.data, action.id).pipe(
          map((data) => AlumnosActions.updateAlumnoSuccess({ data: data })),
          catchError((error) =>
            of(AlumnosActions.updateAlumnoFailure({ error }))
          )
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private alumnoService: AlumnosService
  ) {}
}
