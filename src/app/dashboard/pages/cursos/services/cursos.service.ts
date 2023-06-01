import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  map,
  mergeMap,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { CrearCursoPayload, Curso, CursoMateria } from '../models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { enviroment } from 'src/environments/environments';

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
      .get<CursoMateria[]>(`${enviroment.apiBaseUrl}/courses`)
      .pipe(
        tap((cursoMateria) => this.cursoMateria$.next(cursoMateria)),
        mergeMap(() => this.cursoMateria$.asObservable())
      );
  }

  obtenerCursosMateria(): Observable<CursoMateria[]> {
    return this.httpClient.get<CursoMateria[]>(
      `${enviroment.apiBaseUrl}/courses?_expand=subject`
    );
  }

  editarCurso(data: CursoMateria, id: number): Observable<CursoMateria> {
    return this.httpClient
      .put<CursoMateria>(`${enviroment.apiBaseUrl}/courses/${id}`, data)
      .pipe(
        switchMap((curso: CursoMateria) => {
          return this.obtenerCursoPorId(curso.id);
        })
      );
  }

  // editarCurso(
  //   cursoId: number,
  //   actualizacion: Partial<CursoMateria>
  // ): Observable<CursoMateria[]> {
  //   const headers = new HttpHeaders().set('Content-Type', 'application/json');
  //   this.httpClient
  //     .put<CursoMateria>(
  //       `${enviroment.apiBaseUrl}/courses/${cursoId}`,
  //       actualizacion,
  //       {
  //         headers,
  //       }
  //     )
  //     .subscribe();
  //   return this.obtenerCursosMateria();
  // }

  // eliminarCurso(cursoId: number): Observable<Curso[]> {
  //   const headers = new HttpHeaders().set('Content-Type', 'application/json');
  //   this.httpClient
  //     .delete<CursoMateria>(`${enviroment.apiBaseUrl}/courses/${cursoId}`, {
  //       headers,
  //     })
  //     .subscribe();
  //   this.cursoMateria$.pipe(take(1)).subscribe({
  //     next: (cursoMateria) => {
  //       const cursoMateriaActualizados = cursoMateria.filter(
  //         (curso) => curso.id !== cursoId
  //       );
  //       this.cursoMateria$.next(cursoMateriaActualizados);
  //     },
  //     complete: () => {},
  //     error: () => {},
  //   });
  //   return this.cursoMateria$.asObservable();
  // }

  eliminarCurso(cursoId: number): Observable<unknown> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.delete<CursoMateria>(
      `${enviroment.apiBaseUrl}/courses/${cursoId}`,
      {
        headers,
      }
    );
  }

  obtenerCursoPorId(id: number): Observable<CursoMateria> {
    return this.httpClient.get<CursoMateria>(
      `${enviroment.apiBaseUrl}/courses/${id}?_expand=subject`
    );
  }

  crearCurso(payload: CrearCursoPayload): Observable<CursoMateria> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient
      .post<CursoMateria>(`${enviroment.apiBaseUrl}/courses`, payload, {
        headers,
      })
      .pipe(
        switchMap((curso: CursoMateria) => {
          return this.obtenerCursoPorId(curso.id);
        })
      );
  }
}
