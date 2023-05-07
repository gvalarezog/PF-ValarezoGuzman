import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuario } from 'src/app/core/models';

export interface LoginFormValue {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUser$ = new BehaviorSubject<Usuario | null>(null);
  constructor(private router: Router) {}

  obtenerUsuarioAutenticado(): Observable<Usuario | null> {
    return this.authUser$.asObservable();
  }

  private establecerUsuarioAutenticado(usuario: Usuario): void {
    this.authUser$.next(usuario);
  }

  login(formValue: LoginFormValue): void {
    const usuario = {
      id: 1,
      nombre: 'MAOCK',
      apellido: 'USER',
      email: formValue.email,
    };
    localStorage.setItem('auth-user', JSON.stringify(usuario));
    this.authUser$.next(usuario);
    this.router.navigate(['dashboard']);
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
}
