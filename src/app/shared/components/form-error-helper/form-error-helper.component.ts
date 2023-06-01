import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-form-error-helper',
  templateUrl: './form-error-helper.component.html',
  styleUrls: ['./form-error-helper.component.scss'],
})
export class FormErrorHelperComponent {
  constructor(
    public dialogRef: MatDialogRef<FormErrorHelperComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
}
