import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmacionDialogComponent } from './confirmacion-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [ConfirmacionDialogComponent],
  imports: [CommonModule, MatButtonModule, MatDialogModule],
  exports: [ConfirmacionDialogComponent],
})
export class ConfirmacionDialogModule {}
