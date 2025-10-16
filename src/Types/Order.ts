import type { Product } from "./Product";

export interface OrderItem {
  id: number;
  image: string;
  title: string;
  price: number;
  orderQuantity: number; 
  quantity: number;      
  resource: 'product';
  description: string;
  category: string;
  bestSeller: boolean;
}

export interface UserInfo {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  postalCode: string;
  address: string;
  city: string;
  note: string; 
}


export interface Order {
  id: string;             
  resource: "order";
  userinfo: UserInfo;     
  items: Product[];     
  total: number;   
  paymentMethod: 'cash' | string;
  date: string;       
}

