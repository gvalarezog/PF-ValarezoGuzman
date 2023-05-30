import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateUsuarioData, IUsuario } from './models';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State } from './store/usuarios.reducer';
import { selectUsuariosState } from './store/usuarios.selectors';
import { UsuariosActions } from './store/usuarios.actions';
import { AbmUsuarioComponent } from './components/abm-usuario/abm-usuario.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
})
export class UsuariosComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'nombreCompleto',
    'email',
    'rol',
    'ver_detalle',
    'editar',
    'eliminar',
  ];
  state$: Observable<State>;
  dataSource = new MatTableDataSource<IUsuario>();

  constructor(
    private matDialog: MatDialog,
    private store: Store,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.state$ = this.store.select(selectUsuariosState);
  }
  ngOnInit(): void {
    this.store.dispatch(UsuariosActions.loadUsuarios());
    this.state$.subscribe({
      next: (stateUsuarios) => {
        this.dataSource.data = stateUsuarios.usuarios;
      },
    });
  }

  aplicarFiltros(ev: Event): void {
    const inputValue = (ev.target as HTMLInputElement)?.value;
    this.dataSource.filter = inputValue?.trim()?.toLocaleLowerCase();
  }

  crearUsuario(): void {
    const dialog = this.matDialog.open(AbmUsuarioComponent);
    dialog.afterClosed().subscribe((formValue) => {
      if (formValue) {
        this.store.dispatch(
          UsuariosActions.createUsuario({
            data: formValue as CreateUsuarioData,
          })
        );
      }
    });
  }

  eliminarUsuario(id: number): void {
    this.store.dispatch(UsuariosActions.deleteUsuario({ id }));
  }

  editarUsuario(usuarioParaEditar: IUsuario): void {
    const dialog = this.matDialog.open(AbmUsuarioComponent, {
      data: {
        usuarioParaEditar,
      },
    });
    dialog.afterClosed().subscribe((formValue) => {
      if (formValue) {
        this.store.dispatch(
          UsuariosActions.updateUsuario({
            data: formValue as IUsuario,
            id: usuarioParaEditar.id as number,
          })
        );
      }
    });
  }

  verUsuario(usuarioId: number): void {
    this.router.navigate([usuarioId], {
      relativeTo: this.activatedRoute,
    });
  }
}
