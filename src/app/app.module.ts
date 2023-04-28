import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AbmAlumnosModule } from './dashboard/pages/alumnos/components/abm-alumnos/abm-alumnos.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { AppRoutingModule } from './app-routing.module';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/pages/login/login.component';
import { AlumnoDetalleComponent } from './dashboard/pages/alumnos/components/alumno-detalle/alumno-detalle.component';
import { AbmCursosComponent } from './dashboard/pages/cursos/components/abm-cursos/abm-cursos.component';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { AlumnosComponent } from './dashboard/pages/alumnos/alumnos.component';
import { CursosComponent } from './dashboard/pages/cursos/cursos.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    AppRoutingModule,
    AuthModule,
    DashboardModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
