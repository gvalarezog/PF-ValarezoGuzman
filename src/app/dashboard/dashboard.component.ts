import { Component, OnInit } from '@angular/core';
import { Observable, filter, map } from 'rxjs';
import links, { NavItem } from './nav-items';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
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
  linksFiltrados: NavItem[] = [];
  componentName: string;

  constructor(
    private router: Router,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) {
    this.authUser$ = this.authService.obtenerUsuarioAutenticado();
    this.componentName = '';
    let userRol;
    this.authUser$.pipe(map((u) => u?.role)).subscribe((rol) => {
      // Aquí tienes acceso a la propiedad 'rol' del usuario
      userRol = rol;
    });
    this.linksFiltrados = this.verLinksPorRol(userRol, links);
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

  verLinksPorRol(rol: any, links: NavItem[]): NavItem[] {
    switch (rol) {
      case 'admin':
        return links;
      case 'user':
        return links.filter((link) => link.role === 'user');
      default:
        return [];
    }
  }

  logout(): void {
    this.authService.logout();
  }
}
