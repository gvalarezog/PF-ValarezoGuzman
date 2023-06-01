export interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  password: string;
  role: string;
  email: string;
  token: string;
}

export interface CreateUsuarioData {
  nombre: string;
  apellido: string;
  password: string;
  role: string;
  email: string;
  token: string;
}

export interface Rol {
  id: string;
  nombre: string;
}

const roles: Rol[] = [
  { id: 'admin', nombre: 'admin' },
  { id: 'user', nombre: 'user' },
];

export default roles;
