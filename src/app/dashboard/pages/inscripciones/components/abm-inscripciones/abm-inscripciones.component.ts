import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CursosService } from '../../../cursos/services/cursos.service';
import { AlumnosService } from '../../../alumnos/services/alumnos.service';
import { Alumno } from '../../../alumnos/models';
import { SelectionModel } from '@angular/cdk/collections';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject, takeUntil } from 'rxjs';
import {
  CreateInscripcionData,
  Inscripcion,
  InscripcionCompleta,
} from '../../models';
import { Curso, CursoMateria } from '../../../cursos/models/index';
import { Store } from '@ngrx/store';
import { InscripcionesActions } from '../../store/inscripciones.actions';
import { Usuario } from 'src/app/core/models';
import { selectAuthUser } from 'src/app/store/auth/auth.selectors';

@Component({
  selector: 'app-abm-inscripciones',
  templateUrl: './abm-inscripciones.component.html',
  styleUrls: ['./abm-inscripciones.component.scss'],
})
export class AbmInscripcionesComponent implements OnInit, OnDestroy {
  // dataSourceAlumnos = new MatTableDataSource();
  authUser$: Observable<Usuario | null>;
  cursosMateria: CursoMateria[] = [];
  alumnos: Alumno[] = [];
  selectedCourse?: CursoMateria;
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

  selectedCourseControl = new FormControl<CursoMateria | undefined>(undefined);

  courseIdControl = new FormControl();
  alumnoControl = new FormControl<Alumno[] | null>(null);
  subjectIdControl = new FormControl();
  usuarioControl = new FormControl();
  fechaControl = new FormControl<Date>(new Date());

  inscripcionForm = new FormGroup({
    courseId: this.courseIdControl,
    alumnos: this.alumnoControl,
    subjectId: this.subjectIdControl,
    usuario: this.usuarioControl,
    fechaInscripcion: this.fechaControl,
  });

  destroyed$ = new Subject<void>();

  constructor(
    private cursosServicio: CursosService,
    private alumnoService: AlumnosService,
    private dialogRef: MatDialogRef<AbmInscripcionesComponent>,
    private store: Store,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.authUser$ = this.store.select(selectAuthUser);
    this.selectedCourseControl.valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (curso) => {
          if (curso) {
            this.subjectIdControl.setValue(curso.subjectId);
            this.courseIdControl.setValue(curso.id);
            this.alumnoService
              .obtenerAlumnosDisponiblesPorCursoId(curso.id)
              .subscribe({
                next: (alumnos) => {
                  this.alumnos = alumnos;
                  if (
                    this.data &&
                    this.data.inscripcion &&
                    this.data.inscripcion.alumnos
                  ) {
                    const selectedAlumnos = this.alumnos.filter((alumno) =>
                      this.data.inscripcion.alumnos.some(
                        (selectedAlumno: Alumno) =>
                          this.isSameAlumno(alumno, selectedAlumno)
                      )
                    );
                    this.alumnoControl.patchValue(selectedAlumnos);
                  }
                },
              });
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

  // guardarIncripcion() {
  //   this.dialogRef.close(this.inscripcionForm.value);
  // }

  ngOnInit(): void {
    this.cursosServicio.obtenerCursosMateria().subscribe({
      next: (cursos) => {
        this.cursosMateria = cursos;
        if (
          this.data &&
          this.data.inscripcion &&
          this.data.inscripcion.course
        ) {
          const selectedCourse = this.cursosMateria.find((curso) =>
            this.isSameCourse(curso, this.data.inscripcion.course)
          );
          this.selectedCourseControl.setValue(selectedCourse);
        }
      },
    });
  }
  isSameCourse(curso1: Curso, curso2: Curso): boolean {
    return curso1.id === curso2.id;
  }

  isSameAlumno(alumno1: Alumno, alumno2: Alumno): boolean {
    return alumno1.id === alumno2.id;
  }

  onSave(): void {
    if (this.inscripcionForm.value.alumnos) {
      if (this.inscripcionForm.value.alumnos.length > 0) {
        const fechaActual = new Date();
        this.fechaControl.setValue(fechaActual);
        this.authUser$.subscribe((usuarioAutenticado) => {
          this.usuarioControl.setValue(
            usuarioAutenticado?.nombre + ' ' + usuarioAutenticado?.apellido
          );
        });
        this.store.dispatch(
          InscripcionesActions.createInscripcion({
            data: this.inscripcionForm.value as CreateInscripcionData,
          })
        );
      }
    }
    this.dialogRef.close();
  }
}
