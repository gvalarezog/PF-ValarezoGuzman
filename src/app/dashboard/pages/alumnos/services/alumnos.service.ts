import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, mergeMap, take, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Alumno } from '../models';

@Injectable({
  providedIn: 'root',
})
export class AlumnosService {
  private alumnos$ = new BehaviorSubject<Alumno[]>([]);
  private apiBaseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.apiBaseUrl = `http://localhost:3000`;
  }

  get alumnos(): Observable<Alumno[]> {
    return this.alumnos$.asObservable();
  }

  obtenerAlumnos(): Observable<Alumno[]> {
    return this.httpClient.get<Alumno[]>(`${this.apiBaseUrl}/alumnos`).pipe(
      tap((alumnos) => this.alumnos$.next(alumnos)),
      mergeMap(() => this.alumnos$.asObservable())
    );
  }

  obtenerAlumnoPorId(id: number): Observable<Alumno | undefined> {
    return this.alumnos$
      .asObservable()
      .pipe(map((alumnos) => alumnos.find((a) => a.id === id)));
  }

  eliminarAlumono(alumnoId: number): Observable<Alumno[]> {
    this.alumnos$.pipe(take(1)).subscribe({
      next: (alumno) => {
        const alumnosActualizados = alumno.filter(
          (alumno) => alumno.id !== alumnoId
        );
        this.alumnos$.next(alumnosActualizados);
      },
      complete: () => {},
      error: () => {},
    });
    return this.alumnos$.asObservable();
  }
}
