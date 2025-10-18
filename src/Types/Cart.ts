export interface CartItem {
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
}


export interface ShippingData {
id:string;
fullName: string;
email: string;
phone: string;
address: string;
city: string;
postalCode: string;
note: string | "";
resource: string;
}


// export interface Order {
// id: string;
// items: CartItem[];
// total: number;
// shipping: ShippingData;
// status: 'Pending' | 'Confirmed' | 'Delivered';
// }