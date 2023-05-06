import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CursosService } from '../../../cursos/services/cursos.service';
import { AlumnosService } from '../../../alumnos/services/alumnos.service';
import { Alumno } from '../../../alumnos/models';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialogRef } from '@angular/material/dialog';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Inscripcion, CrearInscripcionPayload } from '../../models';
import { Curso } from '../../../cursos/models/index';

@Component({
  selector: 'app-abm-inscripciones',
  templateUrl: './abm-inscripciones.component.html',
  styleUrls: ['./abm-inscripciones.component.scss'],
})
export class AbmInscripcionesComponent implements OnInit {
  // dataSourceAlumnos = new MatTableDataSource();
  cursos?: Curso[];
  alumnos?: Alumno[];
  // cursoSelected: Curso | any;
  panelOpenState = true;
  // selected = 'Escoja el curso';
  step = 0;
  // selectedValue: string;
  // selectedAlumno: string;
  // private destroyed$ = new Subject();
  // displayedColumns: string[] = ['id', 'nombre'];
  // dataSource = new MatTableDataSource<Alumno>();
  // selection = new SelectionModel<Alumno>(true, []);

  cursoControl = new FormControl();
  alumnoControl = new FormControl();
  cantidadAlumnosControl = new FormControl();

  inscripcionForm = new FormGroup({
    curso: this.cursoControl,
    alumnos: this.alumnoControl,
    cantidadAlumnos: this.cantidadAlumnosControl,
  });

  constructor(
    private cursosServicio: CursosService,
    private alumnoService: AlumnosService,
    private dialogRef: MatDialogRef<AbmInscripcionesComponent>
  ) {
    // this.selectedValue = '';
    // this.selectedAlumno = '';
    // this.inscripcionPayload = new CrearInscripcionPayload();
  }

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
    this.dialogRef.close(this.inscripcionForm.value);
  }

  ngOnInit(): void {
    this.cursosServicio.obtenerCurso().subscribe({
      next: (cursos) => {
        this.cursos = cursos;
      },
    });
    this.alumnoService.obtenerAlumnos().subscribe({
      next: (alumnos) => {
        this.alumnos = alumnos;
      },
    });
  }
}
