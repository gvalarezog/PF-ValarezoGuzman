import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AbmAlumnosComponent } from './components/abm-alumnos/abm-alumnos.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AlumnosService } from './services/alumnos.service';
import { Alumno, CrearAlumnoPayload } from './models';
import { Usuario } from 'src/app/core/models';
import { Observable } from 'rxjs';
import { selectAuthUser } from 'src/app/store/auth/auth.selectors';
import { Store } from '@ngrx/store';
import { State } from './store/alumnos.reducer';
import { selectAlumnosState } from './store/alumnos.selectors';
import { AlumnosActions } from './store/alumnos.actions';
import { ConfirmacionDialogComponent } from 'src/app/shared/components/confirmacion-dialog/confirmacion-dialog.component';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.scss'],
})
export class AlumnosComponent {
  state$: Observable<State>;
  authUser$: Observable<Usuario | null>;
  displayedColumns: string[] = [
    'id',
    'nombreCompleto',
    'ver_detalle',
    'editar',
    'eliminar',
  ];

  dataSource = new MatTableDataSource<Alumno>();

  aplicarFiltros(ev: Event): void {
    const inputValue = (ev.target as HTMLInputElement)?.value;
    this.dataSource.filter = inputValue?.trim()?.toLocaleLowerCase();
  }

  constructor(
    private dialog: MatDialog,
    private matDialog: MatDialog,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store
  ) {
    this.state$ = this.store.select(selectAlumnosState);
    this.authUser$ = this.store.select(selectAuthUser);
  }

  ngOnInit(): void {
    this.store.dispatch(AlumnosActions.loadAlumnos());
    this.state$.subscribe({
      next: (stateAlumnos) => {
        this.dataSource.data = stateAlumnos.alumnos;
      },
    });
  }

  crearAlumno(): void {
    const dialog = this.matDialog.open(AbmAlumnosComponent);
    dialog.afterClosed().subscribe((formValue) => {
      if (formValue) {
        this.store.dispatch(
          AlumnosActions.createAlumno({
            data: formValue as CrearAlumnoPayload,
          })
        );
      }
    });
  }

  verAlumnoDetalle(alumnoId: number): void {
    this.router.navigate([alumnoId], {
      relativeTo: this.activatedRoute,
    });
  }

  eliminarAlumno(id: number): void {
    const dialogRef = this.dialog.open(ConfirmacionDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(AlumnosActions.deleteAlumno({ id }));
      }
    });
  }

  editarAlumno(alumnoEditar: Alumno): void {
    const dialog = this.matDialog.open(AbmAlumnosComponent, {
      data: {
        alumnoEditar,
      },
    });
    dialog.afterClosed().subscribe((valorDelFormulario) => {
      if (valorDelFormulario) {
        this.store.dispatch(
          AlumnosActions.updateAlumno({
            data: valorDelFormulario as Alumno,
            id: alumnoEditar.id as number,
          })
        );
      }
    });
  }
}
