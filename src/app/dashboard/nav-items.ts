interface NavItem {
  path: string;
  title: string;
  icon?: string;
}

const links: NavItem[] = [
  {
    path: 'alumnos',
    title: 'Alumnos',
    icon: 'school',
  },
  {
    path: 'cursos',
    title: 'Cursos',
    icon: 'book',
  },
  {
    path: 'inscripciones',
    title: 'Incripciones',
    icon: 'auto_stories',
  },
  {
    path: 'usuarios',
    title: 'Usuarios',
    icon: 'person',
  },
];

export default links;
