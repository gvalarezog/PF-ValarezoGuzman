import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosComponent } from './usuarios.component';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { AbmUsuarioComponent } from './components/abm-usuario/abm-usuario.component';
import { UsuarioDetalleComponent } from './components/usuario-detalle/usuario-detalle.component';
import { EffectsModule } from '@ngrx/effects';
import { UsuariosEffects } from './store/usuarios.effects';
import { StoreModule } from '@ngrx/store';
import { usuariosFeature } from './store/usuarios.reducer';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [UsuariosComponent, AbmUsuarioComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    SharedModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSelectModule,
    MatFormFieldModule,
    RouterModule.forChild([
      {
        path: '',
        component: UsuariosComponent,
      },
      {
        path: ':id',
        component: UsuarioDetalleComponent,
      },
    ]),
    EffectsModule.forFeature([UsuariosEffects]),
    StoreModule.forFeature(usuariosFeature),
  ],
  exports: [UsuariosComponent],
})
export class UsuariosModule {}
