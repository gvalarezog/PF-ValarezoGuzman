import { Time } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Tiempo, TimeService } from 'src/app/core/services/time.service';
import links from './nav-items';
import { Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { Usuario } from '../core/models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  showFiller = false;
  authUser$: Observable<Usuario | null>;
  links = links;

  constructor(private router: Router, private authService: AuthService) {
    this.authUser$ = this.authService.obtenerUsuarioAutenticado();
  }

  logout(): void {
    // this.router.navigate(['auth', 'login']);
    this.authService.logout();
  }
}
