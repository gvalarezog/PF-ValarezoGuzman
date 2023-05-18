import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AbmAlumnosComponent } from './components/abm-alumnos/abm-alumnos.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AlumnosService } from './services/alumnos.service';
import { Alumno } from './models';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.scss'],
})
export class AlumnosComponent {
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
    private matDialog: MatDialog,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private alumnoService: AlumnosService
  ) {
    this.alumnoService.obtenerAlumnos().subscribe((alumnos) => {
      this.dataSource.data = alumnos;
    });
  }

  abrirABMAlumnos(): void {
    const dialog = this.matDialog.open(AbmAlumnosComponent);
    dialog.afterClosed().subscribe((valor) => {
      if (valor) {
        this.alumnoService.crearAlumno(valor).subscribe((alumno) => {
          this.dataSource.data = [
            ...this.dataSource.data,
            {
              ...alumno,
            },
          ];
        });
      }
    });
  }

  irAlDetalle(alumnoId: number): void {
    this.router.navigate([alumnoId], {
      relativeTo: this.activatedRoute,
    });
  }

  eliminarAlumno(alumnoParaEliminar: Alumno): void {
    this.alumnoService.eliminarAlumno(alumnoParaEliminar.id).subscribe();
    this.dataSource.data = this.dataSource.data.filter(
      (alumnoActual) => alumnoActual.id !== alumnoParaEliminar.id
    );
  }

  editarAlumno(alumnoParaEditar: Alumno): void {
    const dialog = this.matDialog.open(AbmAlumnosComponent, {
      data: {
        alumnoParaEditar,
      },
    });
    dialog.afterClosed().subscribe((valorDelFormulario) => {
      if (valorDelFormulario) {
        this.alumnoService
          .editarAlumno(valorDelFormulario)
          .subscribe((alumno) => {
            this.dataSource.data = this.dataSource.data.map((alumnoActual) =>
              alumnoActual.id === alumno.id
                ? { ...alumnoActual, ...alumno }
                : alumnoActual
            );
          });
      }
    });
  }
}
