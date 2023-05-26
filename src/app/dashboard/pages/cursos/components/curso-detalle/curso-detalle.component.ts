import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { CursosService } from '../../services/cursos.service';
import { Curso, CursoMateria } from '../../models';
import { InscripcionesService } from '../../../inscripciones/services/inscripciones.service';
import {
  Inscripcion,
  InscripcionCompleta,
} from '../../../inscripciones/models/index';
import { MatTableDataSource } from '@angular/material/table';
import { Alumno } from '../../../alumnos/models';
import { Store } from '@ngrx/store';
import { State } from '../../../inscripciones/store/inscripciones.reducer';
import { selectInscripcionesState } from '../../../inscripciones/store/inscripciones.selectors';
import { InscripcionesActions } from '../../../inscripciones/store/inscripciones.actions';

@Component({
  selector: 'app-curso-detalle',
  templateUrl: './curso-detalle.component.html',
  styleUrls: ['./curso-detalle.component.scss'],
})
export class CursoDetalleComponent implements OnDestroy {
  // curso: Curso | undefined;
  cursoMateria: CursoMateria | undefined;
  private destroyed$ = new Subject();
  dataSourceAlumnos = new MatTableDataSource<InscripcionCompleta>();
  existeInscripcion = false;

  displayedColumns: string[] = ['id', 'nombreCompleto', 'anular'];

  constructor(
    private activatedRoute: ActivatedRoute,
    private cursoService: CursosService,
    private inscripcionesService: InscripcionesService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.cursoService
      .obtenerCursoPorId(parseInt(this.activatedRoute.snapshot.params['id']))
      .pipe(takeUntil(this.destroyed$))
      .subscribe((cursoMateria) => (this.cursoMateria = cursoMateria));

    this.inscripcionesService
      .getInscripcionesPorIdCurso(
        parseInt(this.activatedRoute.snapshot.params['id'])
      )
      .pipe(takeUntil(this.destroyed$))
      .subscribe((inscripcion) => {
        if (inscripcion.length > 0) {
          this.existeInscripcion = true;
          this.dataSourceAlumnos.data = inscripcion;
        } else {
          this.existeInscripcion = false;
        }
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
          this.dataSourceAlumnos.data = this.dataSourceAlumnos.data.filter(
            (inscripcion) => inscripcion.id !== idInscripcion
          );
          if (this.dataSourceAlumnos.data.length === 0) {
            this.existeInscripcion = false;
          }
        });
    }
  }
}
