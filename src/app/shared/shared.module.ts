import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectivesModule } from './directives/directives.module';
import { PipesModule } from './pipes/pipes.module';
import { ConfirmacionDialogModule } from './components/confirmacion-dialog/confirmacion-dialog.module';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [DirectivesModule, PipesModule, ConfirmacionDialogModule],
})
export class SharedModule {}
