import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CursosComponent } from './cursos.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { RouterModule } from '@angular/router';
import { AbmCursosComponent } from './components/abm-cursos/abm-cursos.component';
import { CursoDetalleComponent } from './components/curso-detalle/curso-detalle.component';

@NgModule({
  declarations: [CursosComponent, AbmCursosComponent, CursoDetalleComponent],
  imports: [
    CommonModule,
    PipesModule,
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    RouterModule.forChild([
      {
        // /dashboard/cursos
        path: '',
        component: CursosComponent,
      },
      {
        // /dashboard/cursos/id
        path: ':id',
        component: CursoDetalleComponent,
      },
    ]),
  ],
})
export class CursosModule {}
