import { Time } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Tiempo, TimeService } from 'src/app/core/services/time.service';
import links from './nav-items';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  showFiller = false;
  // horaActual: Tiempo | null = null;

  horaActual$: Observable<string>;

  links = links;

  constructor(private timeService: TimeService, private router: Router) {
    this.horaActual$ = this.timeService.reloj; // this.timeService.reloj.subscribe(
    //   (horaActual) => (this.horaActual = horaActual)
    // );
  }

  logout(): void {
    this.router.navigate(['auth', 'login']);
  }
}
