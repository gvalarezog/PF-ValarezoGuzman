import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-abm-alumnos',
  templateUrl: './abm-alumnos.component.html',
  styleUrls: ['./abm-alumnos.component.scss'],
})
export class AbmAlumnosComponent {
  sexo = [{ sexo: 'Hombre' }, { sexo: 'Mujer' }];

  perfiles = [
    { nombre: 'Desarrollador' },
    { nombre: 'Usuario Final' },
    { nombre: 'I.T.' },
  ];

  nombreControl = new FormControl('', [Validators.required]);
  apellidoControl = new FormControl('', [Validators.required]);
  perfilControl = new FormControl<string | null>('', [Validators.required]);
  fechaRegistroControl = new FormControl<Date>(new Date());
  sexoControl = new FormControl<string | null>('', [Validators.required]);

  alumnosForm = new FormGroup({
    nombre: this.nombreControl,
    apellido: this.apellidoControl,
    perfil: this.perfilControl,
    fechaRegistro: this.fechaRegistroControl,
    sexo: this.sexoControl,
  });

  constructor(
    private dialogRef: MatDialogRef<AbmAlumnosComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    if (this.data && this.data.alumnoEditar) {
      this.nombreControl.setValue(data.alumnoEditar.nombre);
      this.apellidoControl.setValue(data.alumnoEditar.apellido);
      const fechaActual = new Date();
      this.fechaRegistroControl.setValue(fechaActual);
      this.perfilControl.setValue(data.alumnoEditar.perfil);
      this.sexoControl.setValue(data.alumnoEditar.sexo);
    }
  }

  guardar(): void {
    if (this.alumnosForm.valid) {
      this.dialogRef.close(this.alumnosForm.value);
    } else {
      this.alumnosForm.markAllAsTouched();
    }
  }

  // noEscogerValidator(): ValidatorFn {
  //   return (control: AbstractControl): ValidationErrors | null => {
  //     if (control.value?.toLowerCase().includes('Escoger...')) {
  //       return {
  //         noEscoger: true,
  //       };
  //     }
  //     return null;
  //   };
  // }
}
