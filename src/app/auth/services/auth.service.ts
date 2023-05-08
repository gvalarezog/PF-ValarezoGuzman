import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';
import { Usuario } from 'src/app/core/models';

export interface LoginFormValue {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiBaseUrl: string;
  private authUser$ = new BehaviorSubject<Usuario | null>(null);
  constructor(private router: Router, private httpClient: HttpClient) {
    this.apiBaseUrl = `http://localhost:3000`;
  }

  obtenerUsuarioAutenticado(): Observable<Usuario | null> {
    return this.authUser$.asObservable();
  }

  private establecerUsuarioAutenticado(usuario: Usuario): void {
    this.authUser$.next(usuario);
  }

  login(formValue: LoginFormValue): void {
    let loading = true;
    this.httpClient
      .get<Usuario[]>(`${this.apiBaseUrl}/usuarios`, {
        params: {
          ...formValue,
        },
      })
      .subscribe({
        next: (usuarios) => {
          const usuarioAutenticado = usuarios[0];
          if (usuarioAutenticado) {
            localStorage.setItem('token', usuarioAutenticado.token);
            this.establecerUsuarioAutenticado(usuarioAutenticado);
            this.router.navigate(['dashboard']);
          } else {
            alert('¡Usuario y contraseña incorrectos!');
          }
        },
        complete: () => {
          loading = false;
        },
      });
  }

  logout(): void {
    localStorage.removeItem('token');
    this.authUser$.next(null);
    this.router.navigate(['auth']);
  }

  verificarToken(): Observable<boolean> {
    const token = localStorage.getItem('token');
    return this.httpClient
      .get<Usuario[]>(`${this.apiBaseUrl}/usuarios?token=${token}`, {
        headers: new HttpHeaders({
          Authorization: token || '',
        }),
      })
      .pipe(
        map((usuarios) => {
          const usuarioAutenticado = usuarios[0];
          if (usuarioAutenticado) {
            localStorage.setItem('token', usuarioAutenticado.token);
            this.authUser$.next(usuarioAutenticado);
          }
          return !!usuarioAutenticado;
        }),
        catchError((err) => {
          alert('Falla en la conexion');
          return throwError(() => err);
        })
      );
  }
}
