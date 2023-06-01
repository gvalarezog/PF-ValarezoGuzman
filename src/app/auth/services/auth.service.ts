import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, catchError, map, of } from 'rxjs';
import { Usuario } from 'src/app/core/models';
import { AppState } from 'src/app/store';
import {
  CerrarSesionUsuarioAutenticado,
  EstablecerUsuarioAutenticado,
} from 'src/app/store/auth/auth.actions';
import { selectAuthUser } from 'src/app/store/auth/auth.selectors';
import { environment } from 'src/environments/environments';

export interface LoginFormValue {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private store: Store<AppState>
  ) {}

  obtenerUsuarioAutenticado(): Observable<Usuario | null> {
    return this.store.select(selectAuthUser);
  }

  private establecerUsuarioAutenticado(usuario: Usuario): void {
    this.store.dispatch(EstablecerUsuarioAutenticado({ payload: usuario }));
  }

  login(formValue: LoginFormValue): void {
    let loading = true;
    this.httpClient
      .get<Usuario[]>(`${environment.apiBaseUrl}/users`, {
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
    this.store.dispatch(CerrarSesionUsuarioAutenticado());
    this.router.navigate(['auth']);
  }

  verificarToken(): Observable<boolean> {
    const token = localStorage.getItem('token');
    return this.httpClient
      .get<Usuario[]>(`${environment.apiBaseUrl}/users?token=${token}`, {
        headers: new HttpHeaders({
          Authorization: token || '',
        }),
      })
      .pipe(
        map((usuarios) => {
          const usuarioAutenticado = usuarios[0];
          if (usuarioAutenticado) {
            localStorage.setItem('token', usuarioAutenticado.token);
            // this.authUser$.next(usuarioAutenticado);
            this.establecerUsuarioAutenticado(usuarioAutenticado);
          }
          return !!usuarioAutenticado;
        }),
        catchError((err) => {
          alert('Falla en la conexion');
          return of(false);
        })
      );
  }
}
