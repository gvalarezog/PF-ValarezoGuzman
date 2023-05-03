import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AlumnosComponent } from './dashboard/pages/alumnos/alumnos.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/pages/login/login.component';
import { AlumnoDetalleComponent } from './dashboard/pages/alumnos/components/alumno-detalle/alumno-detalle.component';
import { CursosComponent } from './dashboard/pages/cursos/cursos.component';
import { CursoDetalleComponent } from './dashboard/pages/cursos/components/curso-detalle/curso-detalle.component';
import { InscripcionesComponent } from './dashboard/pages/inscripciones/inscripciones.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        //http://localhost/dashboard/alumnos
        path: 'alumnos',
        children: [
          {
            path: '',
            component: AlumnosComponent,
          },
          {
            path: ':id',
            component: AlumnoDetalleComponent,
          },
        ],
      },
      {
        //http://localhost/dashboard/alumnos
        path: 'cursos',
        children: [
          {
            path: '',
            component: CursosComponent,
          },
          {
            path: ':id',
            component: CursoDetalleComponent,
          },
        ],
      },
      {
        //http://localhost/dashboard/alumnos
        path: 'inscripciones',
        children: [
          {
            path: '',
            component: InscripcionesComponent,
          },
        ],
      },
    ],
  },
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
