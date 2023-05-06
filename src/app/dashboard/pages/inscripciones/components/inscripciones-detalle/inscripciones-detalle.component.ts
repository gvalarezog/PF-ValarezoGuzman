import { Component, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Inscripcion } from '../../models';
import { ActivatedRoute } from '@angular/router';
import { InscripcionesService } from '../../services/inscripciones.service';

@Component({
  selector: 'app-inscripciones-detalle',
  templateUrl: './inscripciones-detalle.component.html',
  styleUrls: ['./inscripciones-detalle.component.scss'],
})
export class InscripcionesDetalleComponent implements OnDestroy {
  private destroyed$ = new Subject();
  inscripcion: Inscripcion | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private inscripcionServicio: InscripcionesService
  ) {
    this.inscripcionServicio
      .obtenerInscripcionPorId(
        parseInt(this.activatedRoute.snapshot.params['id'])
      )
      .pipe(takeUntil(this.destroyed$))
      .subscribe((inscripcion) => (this.inscripcion = inscripcion));
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
  }
}
