import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CreateUsuarioData, Usuario } from '../models';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  private usuarios$ = new BehaviorSubject<Usuario[]>([]);
  constructor(private httpClient: HttpClient) {}

  get alumnos(): Observable<Usuario[]> {
    return this.usuarios$.asObservable();
  }

  obtenerUsuarios(): Observable<Usuario[]> {
    return this.httpClient.get<Usuario[]>(`${environment.apiBaseUrl}/users`);
  }

  obtenerUsuarioPorId(id: number): Observable<Usuario> {
    return this.httpClient.get<Usuario>(
      `${environment.apiBaseUrl}/users/${id}`
    );
  }

  crearUsuario(data: CreateUsuarioData): Observable<Usuario> {
    return this.httpClient.post<Usuario>(
      `${environment.apiBaseUrl}/users`,
      data
    );
  }

  editarUsuario(data: Usuario, id: number): Observable<Usuario> {
    return this.httpClient.put<Usuario>(
      `${environment.apiBaseUrl}/users/${id}`,
      data
    );
  }

  eliminarUsuarioPorId(id: number): Observable<unknown> {
    return this.httpClient.delete(`${environment.apiBaseUrl}/users/${id}`);
  }
}
