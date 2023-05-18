import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, mergeMap, take, tap } from 'rxjs';
import { CrearInscripcionPayload, Inscripcion } from '../models';
import { HttpClient } from '@angular/common/http';
import { enviroment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root',
})
export class InscripcionesService {
  private inscripciones$ = new BehaviorSubject<Inscripcion[]>([]);

  constructor(private httpClient: HttpClient) {}

  get inscripciones(): Observable<Inscripcion[]> {
    return this.inscripciones$.asObservable();
  }

  obtenerInscripciones(): Observable<Inscripcion[]> {
    return this.httpClient
      .get<Inscripcion[]>(`${enviroment.apiBaseUrl}/inscriptions`)
      .pipe(
        tap((inscripcion) => this.inscripciones$.next(inscripcion)),
        mergeMap(() => this.inscripciones$.asObservable())
      );
  }

  crearInscripcion(
    payload: CrearInscripcionPayload
  ): Observable<Inscripcion[]> {
    console.log(payload);
    let loading = true;
    this.inscripciones$.pipe(take(1)).subscribe({
      next: (inscripciones) => {
        this.inscripciones$.next([
          ...inscripciones,
          {
            id: inscripciones.length + 1,
            ...payload,
          },
        ]);
      },
      complete: () => {
        loading = false;
      },
      error: () => {},
    });
    return this.inscripciones$.asObservable();
  }

  obtenerInscripcionPorId(id: number): Observable<Inscripcion | undefined> {
    return this.inscripciones$
      .asObservable()
      .pipe(map((inscripciones) => inscripciones.find((a) => a.id === id)));
  }

  obtenerInscripcionesPorCursoId(idCurso: number): Observable<Inscripcion[]> {
    this.obtenerInscripciones()
      .pipe(take(1))
      .subscribe({
        next: (inscripciones) => {
          const inscripcionActualizada = inscripciones.filter(
            (inscripcion) => inscripcion.curso.id === idCurso
          );
          this.inscripciones$.next(inscripcionActualizada);
        },
      });
    return this.inscripciones$.asObservable();
  }
  anularInscripcionAlumno(idAlumno: number): Observable<Inscripcion[]> {
    this.inscripciones$.asObservable().subscribe({
      next: (inscripcion) => {
        inscripcion[0].alumnos = inscripcion[0].alumnos.filter(
          (alumno) => alumno.id !== idAlumno
        );
        this.inscripciones$.next(inscripcion);
      },
    });
    return this.inscripciones$.asObservable();
  }
}
