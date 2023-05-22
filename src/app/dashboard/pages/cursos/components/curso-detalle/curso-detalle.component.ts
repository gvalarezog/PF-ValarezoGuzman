import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { CursosService } from '../../services/cursos.service';
import { Curso, CursoMateria } from '../../models';
import { InscripcionesService } from '../../../inscripciones/services/inscripciones.service';
import { Inscripcion } from '../../../inscripciones/models/index';
import { MatTableDataSource } from '@angular/material/table';
import { Alumno } from '../../../alumnos/models';

@Component({
  selector: 'app-curso-detalle',
  templateUrl: './curso-detalle.component.html',
  styleUrls: ['./curso-detalle.component.scss'],
})
export class CursoDetalleComponent implements OnDestroy {
  // curso: Curso | undefined;
  cursoMateria: CursoMateria | undefined;
  private destroyed$ = new Subject();
  dataSourceAlumnos = new MatTableDataSource<Alumno>();
  existeInscripcion = false;

  displayedColumns: string[] = ['id', 'nombreCompleto', 'anular'];

  constructor(
    private activatedRoute: ActivatedRoute,
    private cursoService: CursosService,
    private inscripcionesService: InscripcionesService
  ) {}

  ngOnInit(): void {
    this.cursoService
      .obtenerCursoPorId(parseInt(this.activatedRoute.snapshot.params['id']))
      .pipe(takeUntil(this.destroyed$))
      .subscribe((cursoMateria) => (this.cursoMateria = cursoMateria));

    // this.inscripcionesService
    //   .obtenerInscripcionesPorCursoId(
    //     parseInt(this.activatedRoute.snapshot.params['id'])
    //   )
    //   .pipe(takeUntil(this.destroyed$))
    //   .subscribe((inscripcion) => {
    //     if (inscripcion.length > 0) {
    //       this.existeInscripcion = true;
    //       this.dataSourceAlumnos.data = inscripcion[0].alumnos || [];
    //     } else {
    //       this.existeInscripcion = false;
    //     }
    //   });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
  }

  anularInscripcionAlumno(idAlumno: number): void {
    if (confirm('Está seguro?')) {
      this.inscripcionesService.anularInscripcionAlumno(idAlumno);
    }
  }
}
