import { Component, Inject } from '@angular/core';
import {
  AbstractControl,
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
  // alumnos: any[] = [];

  nombreControl = new FormControl('', [Validators.required]);
  apellidoControl = new FormControl('', [Validators.required]);
  emailControl = new FormControl('', [Validators.email, Validators.required]);

  alumnosForm = new FormGroup({
    nombre: this.nombreControl,
    apellido: this.apellidoControl,
    email: this.emailControl,
  });

  constructor(
    private dialogRef: MatDialogRef<AbmAlumnosComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    if (data) {
      this.nombreControl.setValue(data.alumnoParaEditar.nombre);
      this.apellidoControl.setValue(data.alumnoParaEditar.apellido);
      this.emailControl.setValue(data.alumnoParaEditar.email);
    }
  }

  guardar(): void {
    if (this.alumnosForm.valid) {
      this.dialogRef.close(this.alumnosForm.value);
    } else {
      this.alumnosForm.markAllAsTouched();
    }
  }

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
