import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlumnosService } from '../../services/alumnos.service';
import { Subject, takeUntil } from 'rxjs';
import { Alumno } from '../../models';
import { Inscripcion } from '../../../inscripciones/models';
import { InscripcionesService } from '../../../inscripciones/services/inscripciones.service';

@Component({
  selector: 'app-alumno-detalle',
  templateUrl: './alumno-detalle.component.html',
  styleUrls: ['./alumno-detalle.component.scss'],
})
export class AlumnoDetalleComponent implements OnDestroy, OnInit {
  alumno: Alumno | undefined;
  inscripciones: Inscripcion[] | undefined;

  private destroyed$ = new Subject();
  constructor(
    private activatedRoute: ActivatedRoute,
    private alumnosService: AlumnosService,
    private inscripcionService: InscripcionesService
  ) {
    // console.log(parseInt(this.activatedRoute.snapshot.params['id']));
    // this.alumnosService
    //   .obtenerAlumnoPorId(parseInt(this.activatedRoute.snapshot.params['id']))
    //   .pipe(takeUntil(this.destroyed$))
    //   .subscribe((alumno) => (this.alumno = alumno));
  }

  ngOnInit(): void {
    console.log(parseInt(this.activatedRoute.snapshot.params['id']));
    this.alumnosService
      .obtenerAlumnoPorId(parseInt(this.activatedRoute.snapshot.params['id']))
      .pipe(takeUntil(this.destroyed$))
      .subscribe((alumno) => (this.alumno = alumno));
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
  }
}
