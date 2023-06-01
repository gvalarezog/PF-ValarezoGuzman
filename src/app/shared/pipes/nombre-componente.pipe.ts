import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nombreComponente',
})
export class NombreComponentePipe implements PipeTransform {
  transform(value: string): string {
    // Elimina la palabra "Component" del nombre del componente
    if (value) {
      let componentName = value.replace('Component', '');

      switch (componentName) {
        case 'CursoDetalle':
          componentName = 'Detalle Curso';
          break;
        case 'InscripcionesDetalle':
          componentName = 'Detalle Inscripciones';
          break;
        case 'AlumnoDetalle':
          componentName = 'Detalle Alumnos';
          break;
        case 'UsuarioDetalle':
          componentName = 'Detalle Usuarios';
          break;
        default:
          // Mantén el nombre sin modificar
          break;
      }

      return '- ' + componentName;
    } else {
      return value;
    }
  }
}
