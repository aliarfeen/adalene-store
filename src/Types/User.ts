export interface User {
  resource: 'user';
  id: string;
  role: "admain"|"customer";
  username: string;
  email: string;
  password?: string;
  avatar?: string | null;
} 
