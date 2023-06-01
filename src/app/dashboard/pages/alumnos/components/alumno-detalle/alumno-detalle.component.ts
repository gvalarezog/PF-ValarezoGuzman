import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlumnosService } from '../../services/alumnos.service';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Alumno } from '../../models';
import {
  Inscripcion,
  InscripcionCompleta,
} from '../../../inscripciones/models';
import { InscripcionesService } from '../../../inscripciones/services/inscripciones.service';
import { MatTableDataSource } from '@angular/material/table';
import { State } from '../../store/alumnos.reducer';
import { selectAlumnosState } from '../../store/alumnos.selectors';
import { Store } from '@ngrx/store';
import { AlumnosActions } from '../../store/alumnos.actions';

@Component({
  selector: 'app-alumno-detalle',
  templateUrl: './alumno-detalle.component.html',
  styleUrls: ['./alumno-detalle.component.scss'],
})
export class AlumnoDetalleComponent implements OnDestroy, OnInit {
  state$: Observable<State>;
  alumno: Alumno | undefined;
  inscripciones: Inscripcion[] | undefined;
  private destroyed$ = new Subject();
  dataSourceCursos = new MatTableDataSource<InscripcionCompleta>();
  existeInscripcion = false;
  displayedColumns: string[] = [
    'id',
    'nombreCurso',
    'fechaInicio',
    'fechaFin',
    'anular',
  ];

  constructor(
    private activatedRoute: ActivatedRoute,
    private alumnosService: AlumnosService,
    private inscripcionesService: InscripcionesService,
    private store: Store
  ) {
    this.state$ = this.store.select(selectAlumnosState);
    this.store.dispatch(
      AlumnosActions.loadAlumnodetalle({
        id: parseInt(this.activatedRoute.snapshot.params['id']),
      })
    );
    this.inscripcionesService
      .getInscripcionCompletaPorAlumnoId(
        parseInt(this.activatedRoute.snapshot.params['id'])
      )
      .pipe(takeUntil(this.destroyed$))
      .subscribe((inscripcion) => {
        if (inscripcion.length > 0) {
          this.existeInscripcion = true;
          this.dataSourceCursos.data = inscripcion;
        } else {
          this.existeInscripcion = false;
        }
      });
  }

  ngOnInit(): void {
    this.state$.pipe(takeUntil(this.destroyed$)).subscribe({
      next: (stateAlumno) => {
        this.alumno = stateAlumno.alumnos[0];
      },
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
  }

  anularInscripcionPorId(idInscripcion: number): void {
    if (confirm('Está seguro?')) {
      this.inscripcionesService
        .eliminarInscripcionPorId(idInscripcion)
        .subscribe((inscripcion) => {
          this.dataSourceCursos.data = this.dataSourceCursos.data.filter(
            (inscripcion) => inscripcion.id !== idInscripcion
          );
          if (this.dataSourceCursos.data.length === 0) {
            this.existeInscripcion = false;
          }
        });
    }
  }
}
