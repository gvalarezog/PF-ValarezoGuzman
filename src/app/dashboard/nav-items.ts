interface NavItem {
  path: string;
  title: string;
  icon?: string;
}

const links: NavItem[] = [
  {
    path: 'alumnos',
    title: 'Alumnos',
    icon: 'person',
  },
  {
    path: 'cursos',
    title: 'Cursos',
    icon: 'book',
  },
  {
    path: 'inscripciones',
    title: 'Incripciones',
  },
];

export default links;
