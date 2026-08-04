export type UserRole = 'estudiante' | 'director' | 'docente' | 'admin';

export interface User {
  email: string;
  role: UserRole;
}