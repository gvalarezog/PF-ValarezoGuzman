import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, mergeMap, switchMap, tap } from 'rxjs';
import { CrearCursoPayload, Curso, CursoMateria } from '../models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root',
})
export class CursosService {
  private cursoMateria$ = new BehaviorSubject<CursoMateria[]>([]);
  private curso$ = new BehaviorSubject<Curso[]>([]);

  constructor(private httpClient: HttpClient) {}

  get cursoMateria(): Observable<CursoMateria[]> {
    return this.cursoMateria$.asObservable();
  }

  obtenerCursos(): Observable<CursoMateria[]> {
    return this.httpClient
      .get<CursoMateria[]>(`${environment.apiBaseUrl}/courses`)
      .pipe(
        tap((cursoMateria) => this.cursoMateria$.next(cursoMateria)),
        mergeMap(() => this.cursoMateria$.asObservable())
      );
  }

  obtenerCursosMateria(): Observable<CursoMateria[]> {
    return this.httpClient.get<CursoMateria[]>(
      `${environment.apiBaseUrl}/courses?_expand=subject`
    );
  }

  editarCurso(data: CursoMateria, id: number): Observable<CursoMateria> {
    return this.httpClient
      .put<CursoMateria>(`${environment.apiBaseUrl}/courses/${id}`, data)
      .pipe(
        switchMap((curso: CursoMateria) => {
          return this.obtenerCursoPorId(curso.id);
        })
      );
  }

  eliminarCurso(cursoId: number): Observable<unknown> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.delete<CursoMateria>(
      `${environment.apiBaseUrl}/courses/${cursoId}`,
      {
        headers,
      }
    );
  }

  obtenerCursoPorId(id: number): Observable<CursoMateria> {
    return this.httpClient.get<CursoMateria>(
      `${environment.apiBaseUrl}/courses/${id}?_expand=subject`
    );
  }

  crearCurso(payload: CrearCursoPayload): Observable<CursoMateria> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient
      .post<CursoMateria>(`${environment.apiBaseUrl}/courses`, payload, {
        headers,
      })
      .pipe(
        switchMap((curso: CursoMateria) => {
          return this.obtenerCursoPorId(curso.id);
        })
      );
  }
}
