import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, mergeMap, tap } from 'rxjs';
import { Subject } from '../models';
import { HttpClient } from '@angular/common/http';
import { enviroment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root',
})
export class MateriasService {
  private materias$ = new BehaviorSubject<Subject[]>([]);

  constructor(private httpClient: HttpClient) {}

  get materias(): Observable<Subject[]> {
    return this.materias$.asObservable();
  }

  obtenerMaterias(): Observable<Subject[]> {
    return this.httpClient
      .get<Subject[]>(`${enviroment.apiBaseUrl}/subjects`)
      .pipe(
        tap((materia) => this.materias$.next(materia)),
        mergeMap(() => this.materias$.asObservable())
      );
  }
}
