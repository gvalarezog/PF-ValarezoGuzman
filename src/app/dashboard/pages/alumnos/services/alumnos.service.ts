import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  forkJoin,
  map,
  of,
  switchMap,
} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Alumno, CrearAlumnoPayload } from '../models';
import { environment } from 'src/environments/environments';
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
    return this.httpClient.get<Alumno[]>(`${environment.apiBaseUrl}/students`);
  }

  obtenerAlumnoPorId(id: number): Observable<Alumno> {
    return this.httpClient.get<Alumno>(
      `${environment.apiBaseUrl}/students/${id}`
    );
  }

  obtenerAlumnosDisponiblesPorCursoId(idCurso: number): Observable<Alumno[]> {
    // Obtener todos los estudiantes
    const estudiantes$: Observable<Alumno[]> = this.httpClient.get<Alumno[]>(
      `${environment.apiBaseUrl}/students`
    );

    // Obtener los estudiantes inscritos en el curso
    const inscripciones$: Observable<Inscripcion[]> = this.httpClient.get<
      Inscripcion[]
    >(`${environment.apiBaseUrl}/inscriptions?courseId=${idCurso}`);

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
        `${environment.apiBaseUrl}/inscriptions?courseId=${idCurso}&_expand=student`
      )
      .pipe(
        map((inscripciones) => {
          return inscripciones.map((inscripcion) => inscripcion.student);
        })
      );
  }

  eliminarAlumno(alumnoId: number): Observable<any> {
    return this.httpClient.delete<any>(
      `${environment.apiBaseUrl}/students/${alumnoId}`
    );
  }

  crearAlumno(payload: CrearAlumnoPayload): Observable<Alumno> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.post<Alumno>(
      `${environment.apiBaseUrl}/students`,
      payload,
      {
        headers,
      }
    );
  }

  editarAlumno(payload: Alumno, id: number): Observable<Alumno> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.put<Alumno>(
      `${environment.apiBaseUrl}/students/${id}`,
      payload,
      {
        headers,
      }
    );
  }
}
