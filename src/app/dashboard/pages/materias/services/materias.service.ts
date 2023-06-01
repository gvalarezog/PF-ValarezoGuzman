import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Subject } from '../models';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root',
})
export class MateriasService {
  private materias$ = new BehaviorSubject<Subject[]>([]);

  constructor(private httpClient: HttpClient) {}

  obtenerMaterias(): Observable<Subject[]> {
    return this.httpClient.get<Subject[]>(`${environment.apiBaseUrl}/subjects`);
  }
}
