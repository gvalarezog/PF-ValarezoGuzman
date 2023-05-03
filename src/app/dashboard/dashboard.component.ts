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
  links = links;

  constructor(private router: Router) {}

  logout(): void {
    this.router.navigate(['auth', 'login']);
  }
}
