import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { AbmAlumnosModule } from './abm-alumnos/abm-alumnos.module';
import { AlumnosComponent } from './alumnos.component';

@NgModule({
  declarations: [AlumnosComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    SharedModule,
    MatIconModule,
    MatButtonModule,
    AbmAlumnosModule,
    MatDialogModule,
  ],
  exports: [AlumnosComponent],
})
export class AlumnosModule {}
