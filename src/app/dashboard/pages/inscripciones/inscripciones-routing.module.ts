import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InscripcionesComponent } from './inscripciones.component';
import { RouterModule, Routes } from '@angular/router';
import { InscripcionesDetalleComponent } from './components/inscripciones-detalle/inscripciones-detalle.component';

const routes: Routes = [
  {
    // /dashboard/inscripciones
    path: '',
    component: InscripcionesComponent,
  },
  {
    path: ':id',
    component: InscripcionesDetalleComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InscripcionesRoutingModule {}
