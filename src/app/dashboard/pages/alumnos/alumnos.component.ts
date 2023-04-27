import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AbmAlumnosComponent } from './abm-alumnos/abm-alumnos.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AlumnosService } from './services/alumnos.service';

export interface Alumno {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  curso: string;
  password: string;
  // repassword: string;
  direccion: string;
  direccion2: string;
  ciudad: string;
  provincia: string;
  zip: string;
  vip: boolean;
}

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.scss'],
})
export class AlumnosComponent {
  displayedColumns: string[] = [
    'id',
    'nombreCompleto',
    'email',
    'curso',
    'vip',
    'ver_detalle',
    'editar',
    'eliminar',
  ];

  // dataSource = new MatTableDataSource(this.alumnos);
  dataSource = new MatTableDataSource<Alumno>();

  aplicarFiltros(ev: Event): void {
    const inputValue = (ev.target as HTMLInputElement)?.value;
    // inputValue = inputValue.trim(); // Remove whitespace
    // inputValue = inputValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = inputValue?.trim()?.toLocaleLowerCase();
    console.log(ev);
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
        this.dataSource.data = [
          ...this.dataSource.data,
          {
            id: this.dataSource.data.length + 1,
            nombre: valor.nombre,
            apellido: valor.apellido,
            email: valor.email,
            curso: valor.curso,
            password: valor.password,
            direccion: valor.direccion,
            direccion2: valor.direccion2,
            ciudad: valor.ciudad,
            provincia: valor.provincia,
            zip: valor.zip,
            vip: valor.vip,
          },
        ];
      }
    });
  }

  irAlDetalle(alumnoId: number): void {
    this.router.navigate([alumnoId], {
      relativeTo: this.activatedRoute,
    });
  }

  eliminarAlumno(alumnoParaEliminar: Alumno): void {
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
        this.dataSource.data = this.dataSource.data.map((alumnoActual) =>
          alumnoActual.id === alumnoParaEditar.id
            ? { ...alumnoActual, ...valorDelFormulario } // { nombre: 'xxxxxx', apellido: 'xxxxx' }
            : alumnoActual
        );
      }
    });
  }
}
