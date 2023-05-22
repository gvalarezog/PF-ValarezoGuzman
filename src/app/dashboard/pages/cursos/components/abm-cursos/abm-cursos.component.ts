import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MateriasService } from '../../../materias/services/materias.service';
import { Subject } from '../../../materias/models';

@Component({
  selector: 'app-abm-cursos',
  templateUrl: './abm-cursos.component.html',
  styleUrls: ['./abm-cursos.component.scss'],
})
export class AbmCursosComponent implements OnInit {
  selected?: Subject;
  idSelected?: number;
  materias?: Subject[];
  idSubjectControl = new FormControl();
  fechaInicioControl = new FormControl('', [Validators.required]);
  fechaFinControl = new FormControl('', [Validators.required]);

  cursoForm = new FormGroup({
    subjectId: this.idSubjectControl,
    fecha_inicio: this.fechaInicioControl,
    fecha_fin: this.fechaFinControl,
  });

  constructor(
    private dialogRef: MatDialogRef<AbmCursosComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private materiasServicio: MateriasService
  ) {
    if (this.data) {
      this.idSubjectControl.setValue(this.data.cursoParaEditar.subject.id);
      this.fechaInicioControl.setValue(this.data.cursoParaEditar.fecha_inicio);
      this.fechaFinControl.setValue(this.data.cursoParaEditar.fecha_fin);
    }
    this.materiasServicio.obtenerMaterias().subscribe({
      next: (materias) => {
        this.materias = materias;
        if (this.data && this.data.cursoParaEditar) {
          const cursoParaEditar = this.data.cursoParaEditar;
          this.idSelected = this.data.cursoParaEditar.subject.id;
        }
      },
    });
  }

  ngOnInit(): void {}

  guardar(): void {
    if (this.cursoForm.valid) {
      this.dialogRef.close(this.cursoForm.value);
    } else {
      this.cursoForm.markAllAsTouched();
    }
  }
}
