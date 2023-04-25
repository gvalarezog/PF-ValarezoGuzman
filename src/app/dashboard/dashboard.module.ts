import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CardsModule } from '../layout/pages/cards/cards.module';
import { ButtonsAndInconsModule } from '../layout/pages/buttons-and-incons/buttons-and-incons.module';
import { DirectivesModule } from 'src/app/shared/directives/directives.module';
import { AlumnosModule } from './pages/alumnos/alumnos.module';
import { CommonModule } from '@angular/common';
import { AbmAlumnosModule } from './pages/alumnos/abm-alumnos/abm-alumnos.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    AbmAlumnosModule,
    CardsModule,
    ButtonsAndInconsModule,
    AlumnosModule,
    DirectivesModule,
  ],
  exports: [DashboardComponent],
})
export class DashboardModule {}
