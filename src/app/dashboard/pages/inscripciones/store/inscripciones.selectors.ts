import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromInscripciones from './inscripciones.reducer';
import { InscripcionCompleta } from '../models';

export const selectInscripcionesState =
  createFeatureSelector<fromInscripciones.State>(
    fromInscripciones.inscripcionesFeatureKey
  );
