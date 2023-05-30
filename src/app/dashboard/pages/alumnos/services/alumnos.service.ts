import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  forkJoin,
  map,
  mergeMap,
  of,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Alumno, CrearAlumnoPayload } from '../models';
import { enviroment } from 'src/environments/environments';
import {
  Inscripcion,
  InscripcionEstudiantes,
} from '../../inscripciones/models';

@Injectable({
  providedIn: 'root',
})
export class AlumnosService {
  private alumnos$ = new BehaviorSubject<Alumno[]>([]);

  constructor(private httpClient: HttpClient) {}

  get alumnos(): Observable<Alumno[]> {
    return this.alumnos$.asObservable();
  }

  obtenerAlumnos(): Observable<Alumno[]> {
    return this.httpClient
      .get<Alumno[]>(`${enviroment.apiBaseUrl}/students`)
      .pipe(
        tap((alumnos) => this.alumnos$.next(alumnos)),
        mergeMap(() => this.alumnos$.asObservable())
      );
  }

  obtenerAlumnoPorId(id: number): Observable<Alumno | undefined> {
    return this.httpClient.get<Alumno>(
      `${enviroment.apiBaseUrl}/students/${id}`
    );
  }

  obtenerAlumnosDisponiblesPorCursoId(idCurso: number): Observable<Alumno[]> {
    // Obtener todos los estudiantes
    const estudiantes$: Observable<Alumno[]> = this.httpClient.get<Alumno[]>(
      `${enviroment.apiBaseUrl}/students`
    );

    // Obtener los estudiantes inscritos en el curso
    const inscripciones$: Observable<Inscripcion[]> = this.httpClient.get<
      Inscripcion[]
    >(`${enviroment.apiBaseUrl}/inscriptions?courseId=${idCurso}`);

    // Combinar las llamadas usando forkJoin
    return forkJoin([estudiantes$, inscripciones$]).pipe(
      switchMap(([estudiantes, inscripciones]) => {
        // Obtener los IDs de los estudiantes inscritos en el curso
        const estudiantesInscritosIds = inscripciones.map(
          (inscripcion) => inscripcion.studentId
        );

        // Filtrar los estudiantes que no están inscritos en el curso
        const estudiantesDisponibles = estudiantes.filter(
          (estudiante) => !estudiantesInscritosIds.includes(estudiante.id)
        );

        // Retornar los estudiantes disponibles
        return of(estudiantesDisponibles);
      })
    );
  }

  obtenerAlumnosPorCursoId(idCurso: number): Observable<Alumno[]> {
    return this.httpClient
      .get<InscripcionEstudiantes[]>(
        `${enviroment.apiBaseUrl}/inscriptions?courseId=${idCurso}&_expand=student`
      )
      .pipe(
        map((inscripciones) => {
          return inscripciones.map((inscripcion) => inscripcion.student);
        })
      );
  }

  eliminarAlumno(alumnoId: number): Observable<any> {
    return this.httpClient.delete<any>(
      `${enviroment.apiBaseUrl}/students/${alumnoId}`
    );
    // this.alumnos$.pipe(take(1)).subscribe({
    //   next: (alumno) => {
    //     const alumnosActualizados = alumno.filter(
    //       (alumno) => alumno.id !== alumnoId
    //     );
    //     this.alumnos$.next(alumnosActualizados);
    //   },
    //   complete: () => {},
    //   error: () => {},
    // });
    // return this.alumnos$.asObservable();
  }

  crearAlumno(payload: CrearAlumnoPayload): Observable<Alumno> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    payload.fechaRegistro = new Date();
    return this.httpClient.post<Alumno>(
      `${enviroment.apiBaseUrl}/students`,
      payload,
      {
        headers,
      }
    );
  }

  editarAlumno(payload: Alumno): Observable<Alumno> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.put<Alumno>(
      `${enviroment.apiBaseUrl}/students/${payload.id}`,
      payload,
      {
        headers,
      }
    );
  }
}
