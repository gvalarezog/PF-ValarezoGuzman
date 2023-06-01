import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-abm-alumnos',
  templateUrl: './abm-alumnos.component.html',
  styleUrls: ['./abm-alumnos.component.scss'],
})
export class AbmAlumnosComponent {
  nombreControl = new FormControl('', [Validators.required]);
  apellidoControl = new FormControl('', [Validators.required]);
  // idControl = new FormControl();
  fechaRegistroControl = new FormControl<Date>(new Date());

  alumnosForm = new FormGroup({
    nombre: this.nombreControl,
    apellido: this.apellidoControl,
    // id: this.idControl,
    fechaRegistro: this.fechaRegistroControl,
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
      // this.idControl.setValue(data.alumnoParaEditar.id);
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
