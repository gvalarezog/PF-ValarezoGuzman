import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, concatMap, mergeMap, tap } from 'rxjs';
import { CreateUsuarioData, IUsuario } from '../models';
import { HttpClient } from '@angular/common/http';
import { enviroment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  private usuarios$ = new BehaviorSubject<IUsuario[]>([]);
  constructor(private httpClient: HttpClient) {}

  get alumnos(): Observable<IUsuario[]> {
    return this.usuarios$.asObservable();
  }

  obtenerUsuarios(): Observable<IUsuario[]> {
    return this.httpClient.get<IUsuario[]>(`${enviroment.apiBaseUrl}/users`);
  }

  obtenerUsuarioPorId(id: number): Observable<IUsuario> {
    return this.httpClient.get<IUsuario>(
      `${enviroment.apiBaseUrl}/users/${id}`
    );
  }

  crearUsuario(data: CreateUsuarioData): Observable<IUsuario> {
    return this.httpClient.post<IUsuario>(
      `${enviroment.apiBaseUrl}/users`,
      data
    );
  }

  editarUsuario(data: IUsuario, id: number): Observable<IUsuario> {
    return this.httpClient.put<IUsuario>(
      `${enviroment.apiBaseUrl}/users/${id}`,
      data
    );
  }

  eliminarUsuarioPorId(id: number): Observable<unknown> {
    return this.httpClient.delete(`${enviroment.apiBaseUrl}/users/${id}`);
  }
}
