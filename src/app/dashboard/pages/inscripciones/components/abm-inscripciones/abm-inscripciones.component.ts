import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CursosService } from '../../../cursos/services/cursos.service';
import { AlumnosService } from '../../../alumnos/services/alumnos.service';
import { Alumno } from '../../../alumnos/models';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialogRef } from '@angular/material/dialog';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { CreateInscripcionData, Inscripcion } from '../../models';
import { Curso, CursoMateria } from '../../../cursos/models/index';
import { Store } from '@ngrx/store';
import { InscripcionesActions } from '../../store/inscripciones.actions';

@Component({
  selector: 'app-abm-inscripciones',
  templateUrl: './abm-inscripciones.component.html',
  styleUrls: ['./abm-inscripciones.component.scss'],
})
export class AbmInscripcionesComponent implements OnInit, OnDestroy {
  // dataSourceAlumnos = new MatTableDataSource();
  cursosMateria: CursoMateria[] = [];
  alumnos: Alumno[] = [];
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

  selectedCourseControl = new FormControl<Curso | null>(null);

  courseIdControl = new FormControl();
  alumnoControl = new FormControl<Alumno[] | null>(null);
  subjectIdControl = new FormControl();

  inscripcionForm = new FormGroup({
    courseId: this.courseIdControl,
    alumnos: this.alumnoControl,
    subjectId: this.subjectIdControl,
  });

  destroyed$ = new Subject<void>();

  constructor(
    private cursosServicio: CursosService,
    private alumnoService: AlumnosService,
    private dialogRef: MatDialogRef<AbmInscripcionesComponent>,
    private store: Store
  ) {
    this.selectedCourseControl.valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (curso) => {
          if (curso) {
            this.subjectIdControl.setValue(curso.subjectId);
            this.courseIdControl.setValue(curso.id);
          }
        },
      });
  }
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
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
    this.cursosServicio.obtenerCursosMateria().subscribe({
      next: (cursos) => {
        this.cursosMateria = cursos;
      },
    });
    this.alumnoService.obtenerAlumnos().subscribe({
      next: (alumnos) => {
        this.alumnos = alumnos;
      },
    });
  }

  onSave(): void {
    this.store.dispatch(
      InscripcionesActions.createInscripcion({
        data: this.inscripcionForm.value as CreateInscripcionData,
      })
    );
    this.dialogRef.close();
  }
}
