import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, map } from 'rxjs';
import { Alumno } from '../alumnos.component';

@Injectable({
  providedIn: 'root',
})
export class AlumnosService {
  private alumnos$ = new BehaviorSubject<Alumno[]>([
    {
      id: 1,
      nombre: 'Guillermo',
      apellido: 'Valarezo',
      email: 'gv@mail.com',
      curso: 'Node',
      password: '',
      direccion: '',
      direccion2: '',
      ciudad: '',
      provincia: '',
      zip: '',
      vip: false,
    },
    {
      id: 2,
      nombre: 'Leo',
      apellido: 'Messi',
      email: 'lm@mail.com',
      curso: 'Python',
      password: '',
      direccion: '',
      direccion2: '',
      ciudad: '',
      provincia: '',
      zip: '',
      vip: false,
    },
    {
      id: 3,
      nombre: 'Fideo',
      apellido: 'Di Maria',
      email: 'fd@mail.com',
      curso: 'Java',
      password: '',
      direccion: 'Avenida',
      direccion2: 'Calle',
      ciudad: 'Rosario',
      provincia: 'Guayas',
      zip: '00023',
      vip: true,
    },
  ]);

  constructor() {}

  obtenerAlumnos(): Observable<Alumno[]> {
    return this.alumnos$.asObservable();
  }

  obtenerAlumnoPorId(id: number): Observable<Alumno | undefined> {
    return this.alumnos$
      .asObservable()
      .pipe(map((alumnos) => alumnos.find((a) => a.id === id)));
  }
}
