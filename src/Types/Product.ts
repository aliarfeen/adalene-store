export interface Product {
  resource: 'products';
  id: string;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
  quantity: number;
  orderQuantity:number;
  bestSeller: boolean;
  sold?: number;
}