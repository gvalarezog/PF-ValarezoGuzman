import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InscripcionesComponent } from './inscripciones.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatTreeModule } from '@angular/material/tree';
import { MatExpansionModule } from '@angular/material/expansion';
import { AbmInscripcionesComponent } from './components/abm-inscripciones/abm-inscripciones.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InscripcionesDetalleComponent } from './components/inscripciones-detalle/inscripciones-detalle.component';
import { RouterModule } from '@angular/router';
import { InscripcionesRoutingModule } from './inscripciones-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { InscripcionesEffects } from './store/inscripciones.effects';
import { StoreModule } from '@ngrx/store';
import { inscripcionesFeature } from './store/inscripciones.reducer';

@NgModule({
  declarations: [
    InscripcionesComponent,
    AbmInscripcionesComponent,
    InscripcionesDetalleComponent,
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatTreeModule,
    MatExpansionModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatCheckboxModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    InscripcionesRoutingModule,
    StoreModule.forFeature(inscripcionesFeature),
    EffectsModule.forFeature([InscripcionesEffects]),
    // RouterModule.forChild([
    //   {
    //     // /dashboard/cursos
    //     path: '',
    //     component: InscripcionesComponent,
    //   },
    //   {
    //     // /dashboard/cursos
    //     path: ':id',
    //     component: InscripcionesDetalleComponent,
    //   },
    // ]),
  ],
})
export class InscripcionesModule {}
