import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { InscripcionesActions } from './inscripciones.actions';
import { InscripcionesService } from '../services/inscripciones.service';

@Injectable()
export class InscripcionesEffects {
  loadInscripciones$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscripcionesActions.loadInscripciones),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.inscripcionesService.getInscripciones().pipe(
          map((data) =>
            InscripcionesActions.loadInscripcionesSuccess({ data })
          ),
          catchError((error) =>
            of(InscripcionesActions.loadInscripcionesFailure({ error }))
          )
        )
      )
    );
  });

  loadInscripcionesDetalle$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscripcionesActions.loadInscripcionesdetalle),
      concatMap((action) =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.inscripcionesService.getInscripcionesPorIdCurso(action.id).pipe(
          map((data) =>
            InscripcionesActions.loadInscripcionesSuccess({ data })
          ),
          catchError((error) =>
            of(InscripcionesActions.loadInscripcionesFailure({ error }))
          )
        )
      )
    );
  });

  createInscripcion$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscripcionesActions.createInscripcion),
      concatMap((action) =>
        this.inscripcionesService.crearInscripcion(action.data).pipe(
          map((res) =>
            InscripcionesActions.createInscripcionSuccess({ data: res })
          ),
          catchError((error) =>
            of(InscripcionesActions.createInscripcionFailure({ error }))
          )
        )
      )
    );
  });

  deleteInscripcion$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscripcionesActions.deleteInscripcion),
      concatMap((action) =>
        this.inscripcionesService.eliminarInscripcionPorId(action.id).pipe(
          map((data) =>
            InscripcionesActions.deleteInscripcionSuccess({ data: action.id })
          ),
          catchError((error) =>
            of(InscripcionesActions.deleteInscripcionFailure({ error }))
          )
        )
      )
    );
  });

  deleteInscripcionPorCurso$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscripcionesActions.deleteInscripcionporcurso),
      concatMap((action) =>
        this.inscripcionesService.eliminarInscripcionCursoPorId(action.id).pipe(
          map((data) =>
            InscripcionesActions.deleteInscripcionporcursoSuccess({
              data: action.id,
            })
          ),
          catchError((error) =>
            of(InscripcionesActions.deleteInscripcionporcursoFailure({ error }))
          )
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private inscripcionesService: InscripcionesService
  ) {}
}
