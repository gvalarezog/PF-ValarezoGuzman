import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CursosService } from '../../../cursos/services/cursos.service';
import { Curso } from '../../../cursos/models';
import { AlumnosService } from '../../../alumnos/services/alumnos.service';
import { Alumno } from '../../../alumnos/models';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-abm-inscripciones',
  templateUrl: './abm-inscripciones.component.html',
  styleUrls: ['./abm-inscripciones.component.scss'],
})
export class AbmInscripcionesComponent implements OnInit {
  dataSourceAlumnos = new MatTableDataSource();
  cursos?: Curso[];
  panelOpenState = true;
  selected = 'Escoja el curso';
  step = 0;

  nombreCursoControl = new FormControl('', [Validators.required]);
  fechaInicioControl = new FormControl('', [Validators.required]);
  fechaFinControl = new FormControl('', [Validators.required]);

  inscripcionForm = new FormGroup({
    nombreCurso: this.nombreCursoControl,
    fecha_inicio: this.fechaInicioControl,
    fecha_fin: this.fechaInicioControl,
  });

  constructor(
    private cursosServicio: CursosService,
    private alumnoService: AlumnosService,
    private dialogRef: MatDialogRef<AbmInscripcionesComponent>
  ) {}

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  guardarIncripcion() {
    if (this.inscripcionForm.valid) {
      this.dialogRef.close(this.inscripcionForm.value);
    } else {
      this.inscripcionForm.markAllAsTouched();
    }
  }

  displayedColumns: string[] = ['select', 'id', 'nombre', 'apellido'];
  dataSource = new MatTableDataSource<Alumno>();
  selection = new SelectionModel<Alumno>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Alumno): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.id + 1
    }`;
  }

  ngOnInit(): void {
    this.cursosServicio.obtenerCurso().subscribe({
      next: (cursos) => {
        this.cursos = cursos;
      },
    });
    this.alumnoService.obtenerAlumnos().subscribe({
      next: (alumnos) => {
        this.dataSourceAlumnos.data = alumnos;
      },
    });
  }
}
