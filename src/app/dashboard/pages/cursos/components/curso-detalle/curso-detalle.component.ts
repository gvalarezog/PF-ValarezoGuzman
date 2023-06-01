import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, Subscription, takeUntil } from 'rxjs';
import { CursosService } from '../../services/cursos.service';
import { Curso, CursoMateria } from '../../models';
import { InscripcionesService } from '../../../inscripciones/services/inscripciones.service';
import {
  Inscripcion,
  InscripcionCompleta,
} from '../../../inscripciones/models/index';
import { MatTableDataSource } from '@angular/material/table';
import { Alumno } from '../../../alumnos/models';
import { Store, select } from '@ngrx/store';
import { selectCursosState } from '../../store/cursos.selectors';
import { State } from '../../store/cursos.reducer';
import { CursosActions } from '../../store/cursos.actions';
import { ConfirmacionDialogComponent } from 'src/app/shared/components/confirmacion-dialog/confirmacion-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-curso-detalle',
  templateUrl: './curso-detalle.component.html',
  styleUrls: ['./curso-detalle.component.scss'],
})
export class CursoDetalleComponent implements OnDestroy {
  state$: Observable<State>;
  cursoMateria: CursoMateria | undefined;
  private destroyed$ = new Subject();
  dataSourceAlumnos = new MatTableDataSource<InscripcionCompleta>();
  existeInscripcion = false;

  displayedColumns: string[] = ['id', 'nombreCompleto', 'anular'];

  constructor(
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private inscripcionesService: InscripcionesService,
    private store: Store
  ) {
    this.state$ = this.store.select(selectCursosState);
    this.store.dispatch(
      CursosActions.loadCursodetalle({
        id: parseInt(this.activatedRoute.snapshot.params['id']),
      })
    );
  }

  ngOnInit(): void {
    this.state$.pipe(takeUntil(this.destroyed$)).subscribe({
      next: (stateCursos) => {
        this.cursoMateria = stateCursos.cursosMateria[0];
      },
    });
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
    const dialogRef = this.dialog.open(ConfirmacionDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
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
    });
  }
}
