import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { AlumnosComponent } from './alumnos.component';
import { RouterModule } from '@angular/router';
import { AlumnoDetalleComponent } from './components/alumno-detalle/alumno-detalle.component';
import { AbmAlumnosComponent } from './components/abm-alumnos/abm-alumnos.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AlumnosComponent, AbmAlumnosComponent, AlumnoDetalleComponent],
  imports: [
    CommonModule,
    MatTableModule,
    SharedModule,
    MatFormFieldModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: AlumnosComponent,
      },
      {
        path: ':id',
        component: AlumnoDetalleComponent,
      },
    ]),
  ],
  exports: [AlumnosComponent],
})
export class AlumnosModule {}
