import { Component, OnDestroy } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Inscripcion } from '../../models';
import { ActivatedRoute } from '@angular/router';
import { InscripcionesService } from '../../services/inscripciones.service';
import { Store } from '@ngrx/store';
import { State } from '../../store/inscripciones.reducer';
import { selectInscripcionesState } from '../../store/inscripciones.selectors';
import { InscripcionesActions } from '../../store/inscripciones.actions';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmacionDialogComponent } from 'src/app/shared/components/confirmacion-dialog/confirmacion-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-inscripciones-detalle',
  templateUrl: './inscripciones-detalle.component.html',
  styleUrls: ['./inscripciones-detalle.component.scss'],
})
export class InscripcionesDetalleComponent implements OnDestroy {
  state$: Observable<State>;
  private destroyed$ = new Subject();
  inscripcion: Inscripcion | undefined;
  dataSourceIncripciones = new MatTableDataSource();
  displayedColumns = ['nombre', 'eliminar'];

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store,
    private dialog: MatDialog
  ) {
    this.state$ = this.store.select(selectInscripcionesState);
    this.store.dispatch(
      InscripcionesActions.loadInscripcionesdetalle({
        id: parseInt(this.activatedRoute.snapshot.params['id']),
      })
    );
    this.state$.subscribe({
      next: (stateInscripciones) => {
        this.dataSourceIncripciones.data = stateInscripciones.inscripciones;
      },
    });
  }

  eliminarInscripcionPorId(id: number): void {
    const dialogRef = this.dialog.open(ConfirmacionDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(InscripcionesActions.deleteInscripcion({ id }));
      }
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
  }
}
