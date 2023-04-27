import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DirectivesModule } from 'src/app/shared/directives/directives.module';
import { AbmAlumnosModule } from './pages/alumnos/abm-alumnos/abm-alumnos.module';
import { CommonModule } from '@angular/common';
import { AlumnosModule } from './pages/alumnos/alumnos.module';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';

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
  ],
  exports: [DashboardComponent],
})
export class DashboardModule {}
