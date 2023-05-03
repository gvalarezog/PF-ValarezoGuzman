import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DirectivesModule } from 'src/app/shared/directives/directives.module';
import { AbmAlumnosModule } from './pages/alumnos/components/abm-alumnos/abm-alumnos.module';
import { CommonModule } from '@angular/common';
import { AlumnosModule } from './pages/alumnos/alumnos.module';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { CursosModule } from './pages/cursos/cursos.module';
import { AbmCursosComponent } from './pages/cursos/components/abm-cursos/abm-cursos.component';
import { InscripcionesModule } from './pages/inscripciones/inscripciones.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    AbmAlumnosModule,
    AlumnosModule,
    DirectivesModule,
    RouterModule,
    MatListModule,
    CursosModule,
    // InscripcionesModule,
    // RouterModule.forChild([
    //   {
    //     // http://localhost:XXXX/dashboard/estudiantes
    //     path: 'alumnos',
    //     loadChildren: () =>
    //       import('./pages/alumnos/alumnos.module').then((m) => m.AlumnosModule),
    //   },
    //   {
    //     path: 'cursos',
    //     loadChildren: () =>
    //       import('./pages/cursos/cursos.module').then((m) => m.CursosModule),
    //   },
    // ]),
  ],
  exports: [DashboardComponent],
})
export class DashboardModule {}
