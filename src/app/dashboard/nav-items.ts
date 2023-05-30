export interface NavItem {
  path: string;
  title: string;
  role?: string;
  icon?: string;
}

let links: NavItem[] = [
  {
    path: 'alumnos',
    title: 'Alumnos',
    icon: 'school',
    role: 'user',
  },
  {
    path: 'cursos',
    title: 'Cursos',
    icon: 'book',
    role: 'user',
  },
  {
    path: 'inscripciones',
    title: 'Incripciones',
    icon: 'auto_stories',
    role: 'user',
  },
  {
    path: 'usuarios',
    title: 'Usuarios',
    icon: 'person',
    role: 'admin',
  },
];

export default links;
