export interface User {
  resource: 'user';
  id: string;
  role: string;
  username: string;
  email: string;
  password?: string;
  avatar?: string | null;
} 
