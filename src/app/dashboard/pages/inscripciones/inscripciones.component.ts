import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AbmInscripcionesComponent } from './components/abm-inscripciones/abm-inscripciones.component';
import { InscripcionesService } from './services/inscripciones.service';
import { Curso } from '../cursos/models';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { InscripcionesActions } from './store/inscripciones.actions';
import { Observable } from 'rxjs';
import { State } from './store/inscripciones.reducer';
import { selectInscripcionesState } from './store/inscripciones.selectors';
import { Subject } from '../materias/models';
import { Alumno } from '../alumnos/models';
import { Inscripcion } from './models';

@Component({
  selector: 'app-inscripciones',
  templateUrl: './inscripciones.component.html',
  styleUrls: ['./inscripciones.component.scss'],
})
export class InscripcionesComponent implements OnInit {
  state$: Observable<State>;
  dataSourceIncripciones = new MatTableDataSource();
  displayedColumns = [
    'id',
    'curso',
    'cantidad',
    'detalle',
    'editar',
    'eliminar',
  ];
  curso: Curso | undefined;

  constructor(
    // private inscripcionesServicio: InscripcionesService,
    private store: Store,
    private dialog: MatDialog,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.state$ = this.store.select(selectInscripcionesState);
  }

  ngOnInit(): void {
    this.store.dispatch(InscripcionesActions.loadInscripciones());
    this.state$.subscribe({
      next: (stateIncripciones) => {
        const cursos: {
          course: Curso;
          subject: Subject;
          alumnos: Alumno[];
        }[] = [];
        stateIncripciones.inscripciones.forEach((inscripcion) => {
          const existeCurso = cursos.some(
            (curso) => curso.course.id === inscripcion.course.id
          );
          if (!existeCurso) {
            const alumnos = stateIncripciones.inscripciones
              .filter((insc) => insc.course.id === inscripcion.course.id)
              .map((insc) => insc.student);

            cursos.push({
              course: inscripcion.course,
              subject: inscripcion.subject,
              alumnos: alumnos,
            });
          }
        });

        this.dataSourceIncripciones.data = cursos;
      },
    });
  }

  crearInscripcion(): void {
    this.dialog.open(AbmInscripcionesComponent);
  }

  irAlDetalle(id: number): void {
    this.router.navigate([id], {
      relativeTo: this.activatedRoute,
    });
  }

  eliminarInscripcion(id: number): void {
    if (confirm('Está seguro?')) {
      this.store.dispatch(
        InscripcionesActions.deleteInscripcionporcurso({ id })
      );
    }
  }

  editarInscripcion(inscripcion: Inscripcion): void {
    this.dialog.open(AbmInscripcionesComponent, {
      data: {
        inscripcion,
      },
    });
  }
}
