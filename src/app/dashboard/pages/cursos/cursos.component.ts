import { Component, OnInit } from '@angular/core';
import { CursosService } from './services/cursos.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss'],
})
export class CursosComponent implements OnInit {
  constructor(private cursosService: CursosService) {}
  ngOnInit(): void {
    this.cursosService.obtenerCurso().subscribe(console.log);
  }
}
