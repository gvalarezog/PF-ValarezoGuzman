import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable, filter, map } from 'rxjs';
import links from './nav-items';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  NavigationEnd,
  Router,
} from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { Usuario } from '../core/models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  showFiller = false;
  authUser$: Observable<Usuario | null>;
  links = links;
  // snapshot: ActivatedRouteSnapshot | null;
  componentName: string;

  constructor(
    private router: Router,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) {
    this.authUser$ = this.authService.obtenerUsuarioAutenticado();
    this.componentName = '';
  }
  ngOnInit(): void {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          let route = this.activatedRoute;
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        map((route) => route.routeConfig?.component?.name)
      )
      .subscribe((componentName) => {
        if (componentName) {
          this.componentName = componentName;
        }
      });
  }

  logout(): void {
    this.authService.logout();
  }
}
