export interface User {
  resource: 'user';
  id: number;
  username: string;
  email: string;
  password?: string;
}