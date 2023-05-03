import { Component, OnInit } from '@angular/core';
import { AlumnosService } from '../alumnos/services/alumnos.service';
import { CursosService } from '../cursos/services/cursos.service';
import { Alumno } from '../alumnos/models';
import { MatTableDataSource } from '@angular/material/table';
import { Incripcion } from './models';
import { MatDialog } from '@angular/material/dialog';
import { AbmInscripcionesComponent } from './components/abm-inscripciones/abm-inscripciones.component';

interface CursoNode {
  name: string;
  children?: CursoNode[];
}

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-inscripciones',
  templateUrl: './inscripciones.component.html',
  styleUrls: ['./inscripciones.component.scss'],
})
export class InscripcionesComponent implements OnInit {
  dataSourceAlumnos = new MatTableDataSource();
  dataSourceCursos = new MatTableDataSource();
  displayedColumns = ['id', 'curso'];
  panelOpenState = true;

  // private cursos: Curso[];
  // private alumnos: Alumno[];

  constructor(
    private alumnosServicio: AlumnosService,
    private cursosServicio: CursosService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.cursosServicio.obtenerCurso().subscribe({
      next: (cursos) => {
        this.dataSourceCursos.data = cursos;
      },
    });
  }
  crearCurso(): void {
    const dialog = this.dialog.open(AbmInscripcionesComponent);
    // dialog.afterClosed().subscribe((formValue) => {
    //   if (formValue) {
    //     this.cursosService.crearCurso(formValue);
    //   }
    // });
  }
}
