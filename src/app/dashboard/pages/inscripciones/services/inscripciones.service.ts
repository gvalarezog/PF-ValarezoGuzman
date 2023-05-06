import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, take } from 'rxjs';
import { CrearInscripcionPayload, Inscripcion } from '../models';

const INSCRIPCIONES_MOCKS: Inscripcion[] = [
  {
    id: 1,
    curso: {
      id: 1,
      nombre: 'Angular',
      fecha_fin: new Date(),
      fecha_inicio: new Date(),
    },
    alumnos: [
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
    ],
    cantidadAlumnos: 2,
  },
  {
    id: 2,
    curso: {
      id: 2,
      nombre: 'JavaScript',
      fecha_fin: new Date(),
      fecha_inicio: new Date(),
    },
    alumnos: [
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
    ],
    cantidadAlumnos: 2,
  },
];

@Injectable({
  providedIn: 'root',
})
export class InscripcionesService {
  private inscripciones$ = new BehaviorSubject<Inscripcion[]>([]);

  constructor() {}

  obtenerInscripciones(): Observable<Inscripcion[]> {
    this.inscripciones$.next(INSCRIPCIONES_MOCKS);
    return this.inscripciones$.asObservable();
  }

  crearInscripcion(
    payload: CrearInscripcionPayload
  ): Observable<Inscripcion[]> {
    console.log(payload);
    let loading = true;
    this.inscripciones$.pipe(take(1)).subscribe({
      next: (inscripciones) => {
        this.inscripciones$.next([
          ...inscripciones,
          {
            id: inscripciones.length + 1,
            ...payload,
          },
        ]);
      },
      complete: () => {
        loading = false;
      },
      error: () => {},
    });
    return this.inscripciones$.asObservable();
  }

  obtenerInscripcionPorId(id: number): Observable<Inscripcion | undefined> {
    return this.inscripciones$
      .asObservable()
      .pipe(map((inscripciones) => inscripciones.find((a) => a.id === id)));
  }
}
