import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service';
import { Observable, Subject, takeUntil } from 'rxjs';
import { IUsuario } from '../../models';
import { Store } from '@ngrx/store';
import { State } from '../../store/usuarios.reducer';
import { UsuariosActions } from '../../store/usuarios.actions';
import { selectUsuariosState } from '../../store/usuarios.selectors';

@Component({
  selector: 'app-usuario-detalle',
  templateUrl: './usuario-detalle.component.html',
  styleUrls: ['./usuario-detalle.component.scss'],
})
export class UsuarioDetalleComponent implements OnInit {
  state$: Observable<State>;
  public usuario?: IUsuario;
  constructor(private activatedRoute: ActivatedRoute, private store: Store) {
    this.state$ = this.store.select(selectUsuariosState);
    this.store.dispatch(
      UsuariosActions.loadUsuariosdetalle({
        id: parseInt(this.activatedRoute.snapshot.params['id']),
      })
    );
  }

  ngOnInit(): void {
    this.state$.subscribe((estado) => {
      this.usuario = estado.usuarios[0];
    });
  }
}
