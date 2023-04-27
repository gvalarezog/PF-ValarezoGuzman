import { Component, Inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-abm-alumnos',
  templateUrl: './abm-alumnos.component.html',
  styleUrls: ['./abm-alumnos.component.scss'],
})
export class AbmAlumnosComponent {
  alumnos: any[] = [];

  nombreControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(10),
  ]);
  apellidoControl = new FormControl('', [Validators.required]);
  emailControl = new FormControl('', [Validators.email, Validators.required]);
  cursoControl = new FormControl('', [
    Validators.required,
    this.noEscogerValidator(),
  ]);
  passwordControl = new FormControl('', [Validators.required]);
  repasswordControl = new FormControl('', [Validators.required]);
  direccionControl = new FormControl('', [Validators.required]);
  direccion2Control = new FormControl();
  ciudadControl = new FormControl('', [Validators.required]);
  provinciaControl = new FormControl('', [
    Validators.required,
    this.noEscogerValidator(),
  ]);
  zipControl = new FormControl();
  vipControl = new FormControl(false);

  registerForm = new FormGroup({
    nombre: this.nombreControl,
    apellido: this.apellidoControl,
    email: this.emailControl,
    curso: this.cursoControl,
    password: this.passwordControl,
    direccion: this.direccionControl,
    direccion2: this.direccion2Control,
    ciudad: this.ciudadControl,
    provincia: this.provinciaControl,
    zip: this.zipControl,
    vip: this.vipControl,
  });

  constructor(
    private dialogRef: MatDialogRef<AbmAlumnosComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    if (data) {
      this.nombreControl.setValue(data.alumnoParaEditar.nombre);
      this.apellidoControl.setValue(data.alumnoParaEditar.apellido);
      this.cursoControl.setValue(data.alumnoParaEditar.curso);
      this.vipControl.setValue(data.alumnoParaEditar.vip);
      this.emailControl.setValue(data.alumnoParaEditar.email);
      this.provinciaControl.setValue(data.alumnoParaEditar.provincia);
      this.direccionControl.setValue(data.alumnoParaEditar.direccion);
      this.direccion2Control.setValue(data.alumnoParaEditar.direccion2);
      this.zipControl.setValue(data.alumnoParaEditar.zip);
      this.passwordControl.setValue(data.alumnoParaEditar.password);
      this.ciudadControl.setValue(data.alumnoParaEditar.ciudad);
    }
  }

  guardar(): void {
    if (this.registerForm.valid) {
      this.dialogRef.close(this.registerForm.value);
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  // onSubmit(): void {
  //   if (this.registerForm.valid) {
  //     this.alumnos.push(this.registerForm.value);
  //     this.registerForm.reset();
  //   } else {
  //     this.registerForm.markAllAsTouched();
  //   }
  // }

  noEscogerValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value?.toLowerCase().includes('Escoger...')) {
        return {
          noEscoger: true,
        };
      }
      return null;
    };
  }
}
