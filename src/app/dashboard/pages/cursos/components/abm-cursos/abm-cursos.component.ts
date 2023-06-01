import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MateriasService } from '../../../materias/services/materias.service';
import { Subject } from '../../../materias/models';
import { Subject as sub, takeUntil } from 'rxjs';

@Component({
  selector: 'app-abm-cursos',
  templateUrl: './abm-cursos.component.html',
  styleUrls: ['./abm-cursos.component.scss'],
})
export class AbmCursosComponent implements OnInit, OnDestroy {
  selected?: Subject;
  idSelected?: number;
  materias?: Subject[];
  subjectControl = new FormControl<Subject | any>('', [Validators.required]);
  fechaInicioControl = new FormControl('', [Validators.required]);
  fechaFinControl = new FormControl('', [Validators.required]);
  idSubjectControl = new FormControl<number | null>(null, [
    Validators.required,
  ]);

  cursoForm = new FormGroup({
    subjectId: this.idSubjectControl,
    fecha_inicio: this.fechaInicioControl,
    fecha_fin: this.fechaFinControl,
  });

  destroyed$ = new sub<void>();
  constructor(
    private dialogRef: MatDialogRef<AbmCursosComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private materiasServicio: MateriasService
  ) {
    this.subjectControl.valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe((materia) => {
        if (materia) {
          this.idSubjectControl.setValue(materia.id);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  ngOnInit(): void {
    if (this.data && this.data.cursoParaEditar) {
      this.materiasServicio.obtenerMaterias().subscribe((materias) => {
        this.materias = materias;
        const materiaSeleccionada = this.materias.find(
          (materia) => materia.id === this.data.cursoParaEditar.subject.id
        );
        this.subjectControl.setValue(materiaSeleccionada);
        this.fechaInicioControl.setValue(
          this.data.cursoParaEditar.fecha_inicio
        );
        this.fechaFinControl.setValue(this.data.cursoParaEditar.fecha_fin);
      });
    }
  }

  guardar(): void {
    if (this.cursoForm.valid) {
      this.dialogRef.close(this.cursoForm.value);
    } else {
      this.cursoForm.markAllAsTouched();
    }
  }
}
