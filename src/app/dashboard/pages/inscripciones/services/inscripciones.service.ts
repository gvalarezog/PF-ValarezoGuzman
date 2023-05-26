import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  concatMap,
  delay,
  forkJoin,
  from,
  map,
  mergeMap,
  take,
  tap,
} from 'rxjs';
import {
  CreateInscripcionData,
  Inscripcion,
  InscripcionCompleta,
} from '../models';
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

  getInscripciones(): Observable<InscripcionCompleta[]> {
    return this.httpClient.get<InscripcionCompleta[]>(
      `${enviroment.apiBaseUrl}/inscriptions?_expand=course&_expand=student&_expand=subject`
    );
  }

  crearInscripcion(
    payload: CreateInscripcionData
  ): Observable<InscripcionCompleta> {
    const modifiedPayload = {
      subjectId: payload.subjectId,
      courseId: payload.courseId,
      students: payload.alumnos.map((alumno) => {
        return {
          subjectId: payload.subjectId,
          studentId: alumno.id,
          courseId: payload.courseId,
        };
      }),
    };

    return from(modifiedPayload.students).pipe(
      concatMap(
        (student) =>
          this.httpClient
            .post<Inscripcion>(`${enviroment.apiBaseUrl}/inscriptions`, student)
            .pipe(delay(500)) // Agregar un retraso de 1 segundo entre cada solicitud
      ),
      concatMap((createResponse) =>
        this.getInscripcionCompletaPorId(createResponse.id)
      )
    );
  }

  getInscripcionCompletaPorId(id: number): Observable<InscripcionCompleta> {
    return this.httpClient.get<InscripcionCompleta>(
      `${enviroment.apiBaseUrl}/inscriptions/${id}?_expand=student&_expand=subject&_expand=course`
    );
  }

  getInscripcionCompletaPorAlumnoId(
    idAlumno: number
  ): Observable<InscripcionCompleta[]> {
    return this.httpClient.get<InscripcionCompleta[]>(
      `${enviroment.apiBaseUrl}/inscriptions?studentId=${idAlumno}&_expand=course&_expand=subject&_expand=student`
    );
  }

  getInscripcionesPorIdCurso(
    idCurso: number
  ): Observable<InscripcionCompleta[]> {
    return this.httpClient.get<InscripcionCompleta[]>(
      `${enviroment.apiBaseUrl}/inscriptions?courseId=${idCurso}&_expand=student&_expand=subject&_expand=course`
    );
  }

  eliminarInscripcionPorId(id: number): Observable<unknown> {
    return this.httpClient.delete(
      `${enviroment.apiBaseUrl}/inscriptions/${id}`
    );
  }

  // obtenerInscripcionesPorCursoId(idCurso: number): Observable<Inscripcion[]> {
  //   this.obtenerInscripciones()
  //     .pipe(take(1))
  //     .subscribe({
  //       next: (inscripciones) => {
  //         const inscripcionActualizada = inscripciones.filter(
  //           (inscripcion) => inscripcion.curso.id === idCurso
  //         );
  //         this.inscripciones$.next(inscripcionActualizada);
  //       },
  //     });
  //   return this.inscripciones$.asObservable();
  // }
  // anularInscripcionAlumno(idAlumno: number): Observable<Inscripcion[]> {
  //   this.inscripciones$.asObservable().subscribe({
  //     next: (inscripcion) => {
  //       inscripcion[0].alumnos = inscripcion[0].alumnos.filter(
  //         (alumno) => alumno.id !== idAlumno
  //       );
  //       this.inscripciones$.next(inscripcion);
  //     },
  //   });
  //   return this.inscripciones$.asObservable();
  // }
}
