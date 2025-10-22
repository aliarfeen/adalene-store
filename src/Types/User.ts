export interface User {
  resource: 'user';
  id: string;
  role: "admin"|"customer";
  username: string;
  email: string;
  password?: string;
  avatar?: string | null;
  adminLevel?:string;
} 
