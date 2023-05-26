import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NombreCompletoPipe } from './nombre-completo.pipe';
import { ControlErrorMessagesPipe } from './control-error-messages.pipe';
import { NombreComponentePipe } from './nombre-componente.pipe';

@NgModule({
  declarations: [
    NombreCompletoPipe,
    ControlErrorMessagesPipe,
    NombreComponentePipe,
  ],
  imports: [CommonModule],
  exports: [NombreCompletoPipe, ControlErrorMessagesPipe, NombreComponentePipe],
})
export class PipesModule {}
