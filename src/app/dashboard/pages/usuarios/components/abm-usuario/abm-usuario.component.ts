import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import roles from '../../models';

@Component({
  selector: 'app-abm-usuario',
  templateUrl: './abm-usuario.component.html',
  styleUrls: ['./abm-usuario.component.scss'],
})
export class AbmUsuarioComponent implements OnInit, OnDestroy {
  destroyed$ = new Subject<void>();
  roles = roles;

  nombreControl = new FormControl<string | null>('', [Validators.required]);
  apellidoControl = new FormControl<string | null>('', [Validators.required]);
  emailControl = new FormControl<string | null>('', [
    Validators.email,
    Validators.required,
  ]);
  rolControl = new FormControl<string | null>('', [Validators.required]);
  passwordControl = new FormControl<string | null>('', [
    Validators.required,
    Validators.minLength(8),
  ]);
  tokenControl = new FormControl<string | null>('');

  usuarioForm = new FormGroup({
    nombre: this.nombreControl,
    apellido: this.apellidoControl,
    email: this.emailControl,
    role: this.rolControl,
    password: this.passwordControl,
    token: this.tokenControl,
  });

  constructor(
    private dialogRef: MatDialogRef<AbmUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    if (data) {
      const usuarioParaEditar = data.usuarioParaEditar;
      this.nombreControl.setValue(usuarioParaEditar.nombre);
      this.apellidoControl.setValue(usuarioParaEditar.apellido);
      this.emailControl.setValue(usuarioParaEditar.email);
      this.passwordControl.setValue(usuarioParaEditar.password);
      this.rolControl.setValue(usuarioParaEditar.role);
    }
  }
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
  ngOnInit(): void {}

  guardar(): void {
    if (this.usuarioForm.valid) {
      this.tokenControl.setValue(this.crearToken());
      this.dialogRef.close(this.usuarioForm.value);
    } else {
      this.usuarioForm.markAllAsTouched();
    }
  }

  crearToken(): string {
    const caracteres =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const longitud = 20;
    let token = '';
    for (let i = 0; i < longitud; i++) {
      const indice = Math.floor(Math.random() * caracteres.length);
      token += caracteres.charAt(indice);
    }
    return token;
  }
}
