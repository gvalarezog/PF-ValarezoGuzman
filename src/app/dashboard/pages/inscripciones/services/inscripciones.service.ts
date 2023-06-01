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
  of,
  switchMap,
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
      usuario: payload.usuario,
      fechaInscripcion: payload.fechaInscripcion,
      students: payload.alumnos.map((alumno) => {
        return {
          subjectId: payload.subjectId,
          studentId: alumno.id,
          courseId: payload.courseId,
          usuario: payload.usuario,
          fechaInscripcion: payload.fechaInscripcion,
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

  eliminarInscripcionCursoPorId(id: number): Observable<unknown> {
    return this.httpClient
      .get<Inscripcion[]>(
        `${enviroment.apiBaseUrl}/inscriptions?courseId=${id}`
      )
      .pipe(
        switchMap((inscripciones) => {
          const ids = inscripciones.map((inscripcion) => inscripcion.id);
          const deleteRequests = ids.map((inscripcionId, index) =>
            this.httpClient
              .delete(`${enviroment.apiBaseUrl}/inscriptions/${inscripcionId}`)
              .pipe(
                delay(index * 750) // Ajusta el tiempo de retraso aquí (en milisegundos)
              )
          );
          return forkJoin(deleteRequests);
        })
      );
  }
}
