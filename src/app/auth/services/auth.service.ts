import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Usuario } from 'src/app/core/models';

export interface LoginFormValue {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private urlBase: string;
  private authUser$ = new BehaviorSubject<Usuario | null>(null);
  constructor(private router: Router, private httpClient: HttpClient) {
    this.urlBase = `http://localhost:3000/usuarios`;
  }

  obtenerUsuarioAutenticado(): Observable<Usuario | null> {
    return this.authUser$.asObservable();
  }

  private establecerUsuarioAutenticado(usuario: Usuario): void {
    this.authUser$.next(usuario);
  }

  login(formValue: LoginFormValue): void {
    this.httpClient
      .get<Usuario[]>(this.urlBase, {
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
      });
    // const usuario = {
    //   id: 1,
    //   nombre: 'MAOCK',
    //   apellido: 'USER',
    //   password: 'USER',
    //   token: 'USER',
    //   role: 'USER',
    //   email: formValue.email,
    // };
    // localStorage.setItem('auth-user', JSON.stringify(usuario));
    // this.authUser$.next(usuario);
    // this.router.navigate(['dashboard']);
  }

  logout(): void {
    // localStorage.removeItem('token');
    localStorage.removeItem('auth-user');
    this.authUser$.next(null);
    this.router.navigate(['auth']);
  }

  verificarStorage(): void {
    const userStorage = localStorage.getItem('auth-user');
    if (userStorage) {
      const usuario = JSON.parse(userStorage);
      this.authUser$.next(usuario);
    }
  }

  verificarToken(): Observable<boolean> {
    const token = localStorage.getItem('token');
    return this.httpClient
      .get<Usuario[]>(`${this.urlBase}/usuarios?token=${token}`, {
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
        })
      );
  }
}
