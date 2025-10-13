export interface Product {
  resource: 'product';
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
  quantity: number;
  orderQuantity:number;
  bestSeller: boolean;
}