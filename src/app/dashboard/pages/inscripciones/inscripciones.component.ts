import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AbmInscripcionesComponent } from './components/abm-inscripciones/abm-inscripciones.component';
import { InscripcionesService } from './services/inscripciones.service';
import { Curso } from '../cursos/models';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-inscripciones',
  templateUrl: './inscripciones.component.html',
  styleUrls: ['./inscripciones.component.scss'],
})
export class InscripcionesComponent implements OnInit {
  dataSourceIncripciones = new MatTableDataSource();
  displayedColumns = ['id', 'curso', 'cantidad', 'detalle'];
  curso: Curso | undefined;

  constructor(
    private inscripcionesServicio: InscripcionesService,
    private dialog: MatDialog,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.inscripcionesServicio.obtenerInscripciones().subscribe({
      next: (incripciones) => {
        this.dataSourceIncripciones.data = incripciones;
      },
    });
  }

  crearInscripcion(): void {
    const dialog = this.dialog.open(AbmInscripcionesComponent);
    dialog.afterClosed().subscribe((formValue) => {
      if (formValue) {
        this.inscripcionesServicio.crearInscripcion(formValue);
      }
    });
  }

  irAlDetalle(id: number): void {
    this.router.navigate([id], {
      relativeTo: this.activatedRoute,
    });
  }
}
