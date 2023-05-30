import { Component, OnInit } from '@angular/core';
import { CursosService } from './services/cursos.service';
import { MatTableDataSource } from '@angular/material/table';
import { AbmCursosComponent } from './components/abm-cursos/abm-cursos.component';
import { MatDialog } from '@angular/material/dialog';
import { Curso } from './models';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/core/models';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss'],
})
export class CursosComponent implements OnInit {
  authUser$: Observable<Usuario | null>;
  dataSource = new MatTableDataSource<Curso>();

  displayedColumns = [
    'id',
    'nombre',
    'fecha_inicio',
    'fecha_fin',
    'detalle',
    'editar',
    'eliminar',
  ];

  constructor(
    private cursosService: CursosService,
    private matDialog: MatDialog,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {
    this.authUser$ = this.authService.obtenerUsuarioAutenticado();
    this.cursosService.obtenerCursos().subscribe((cursos) => {
      this.dataSource.data = cursos;
    });
  }

  ngOnInit(): void {
    this.cursosService.obtenerCursosMateria().subscribe({
      next: (cursos) => {
        this.dataSource.data = cursos;
      },
    });
  }

  crearCurso(): void {
    const dialog = this.matDialog.open(AbmCursosComponent);
    dialog.afterClosed().subscribe((formValue) => {
      if (formValue) {
        this.cursosService.crearCurso(formValue).subscribe((cursos) => {
          this.dataSource.data = cursos;
        });
      }
    });
  }

  editarCurso(cursoParaEditar: Curso): void {
    const dialog = this.matDialog.open(AbmCursosComponent, {
      data: {
        cursoParaEditar,
      },
    });
    dialog.afterClosed().subscribe((valorDelFormulario) => {
      if (valorDelFormulario) {
        this.cursosService
          .editarCurso(cursoParaEditar.id, valorDelFormulario)
          .subscribe((cursos) => {
            this.dataSource.data = cursos;
          });
      }
    });
  }

  eliminarCurso(curso: Curso): void {
    if (confirm('Está seguro?')) {
      this.cursosService.eliminarCurso(curso.id);
    }
  }

  aplicarFiltros(ev: Event): void {}

  irAlDetalle(cursoId: number): void {
    this.router.navigate([cursoId], {
      relativeTo: this.activatedRoute,
    });
  }
}
