import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, mergeMap, take, tap } from 'rxjs';
import { CrearCursoPayload, Curso } from '../models';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CursosService {
  private cursos$ = new BehaviorSubject<Curso[]>([]);
  private apiBaseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.apiBaseUrl = `http://localhost:3000`;
  }

  get cursos(): Observable<Curso[]> {
    return this.cursos$.asObservable();
  }

  obtenerCursos(): Observable<Curso[]> {
    return this.httpClient.get<Curso[]>(`${this.apiBaseUrl}/cursos`).pipe(
      tap((cursos) => this.cursos$.next(cursos)),
      mergeMap(() => this.cursos$.asObservable())
    );
  }

  crearCurso(payload: CrearCursoPayload): Observable<Curso[]> {
    let loading = true;
    this.cursos$.pipe(take(1)).subscribe({
      next: (cursos) => {
        this.cursos$.next([
          ...cursos,
          {
            id: cursos.length + 1,
            ...payload,
          },
        ]);
      },
      complete: () => {
        loading = false;
      },
      error: () => {},
    });
    return this.cursos$.asObservable();
  }

  editarCurso(
    cursoId: number,
    actualizacion: Partial<Curso>
  ): Observable<Curso[]> {
    this.cursos$.pipe(take(1));
    return this.cursos$.asObservable();
  }

  eliminarCurso(cursoId: number): Observable<Curso[]> {
    this.cursos$.pipe(take(1)).subscribe({
      next: (cursos) => {
        const cursosActualizados = cursos.filter(
          (curso) => curso.id !== cursoId
        );
        this.cursos$.next(cursosActualizados);
      },
      complete: () => {},
      error: () => {},
    });
    return this.cursos$.asObservable();
  }

  obtenerCursoPorId(id: number): Observable<Curso | undefined> {
    return this.cursos$
      .asObservable()
      .pipe(map((cursos) => cursos.find((a) => a.id === id)));
  }
}
