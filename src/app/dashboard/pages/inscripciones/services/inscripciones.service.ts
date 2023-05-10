import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, take } from 'rxjs';
import { CrearInscripcionPayload, Inscripcion } from '../models';

const INSCRIPCIONES_MOCKS: Inscripcion[] = [
  {
    id: 4,
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
      },
      {
        id: 1,
        nombre: 'Guillermo',
        apellido: 'Valarezo',
        email: 'gv@mail.com',
      },
    ],
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
        id: 2,
        nombre: 'Lio',
        apellido: 'Messi',
        email: 'lm@mail.com',
      },
      {
        id: 1,
        nombre: 'Guillermo',
        apellido: 'Valarezo',
        email: 'gv@mail.com',
      },
    ],
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

  obtenerInscripcionesPorCursoId(idCurso: number): Observable<Inscripcion[]> {
    this.obtenerInscripciones()
      .pipe(take(1))
      .subscribe({
        next: (inscripciones) => {
          const inscripcionActualizada = inscripciones.filter(
            (inscripcion) => inscripcion.curso.id === idCurso
          );
          this.inscripciones$.next(inscripcionActualizada);
        },
      });
    return this.inscripciones$.asObservable();
  }
  anularInscripcionAlumno(idAlumno: number): Observable<Inscripcion[]> {
    console.log(this.inscripciones$);
    console.log(idAlumno);
    this.inscripciones$.asObservable().subscribe({
      next: (inscripcion) => {
        const alumnosActualizado = inscripcion[0].alumnos.filter(
          (alumno) => alumno.id !== idAlumno
        );
        console.log(alumnosActualizado);
        const inscripcionActualizada = inscripcion[0].alumnos;
      },
    });
    return this.inscripciones$.asObservable();
  }
}
