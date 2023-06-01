import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormErrorHelperComponent } from './form-error-helper.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [FormErrorHelperComponent],
  imports: [CommonModule, MatButtonModule, MatDialogModule],
  exports: [FormErrorHelperComponent],
})
export class FormErrorHelperModule {}
