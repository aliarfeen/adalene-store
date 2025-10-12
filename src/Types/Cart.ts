export interface CartItem {
id: string;
name: string;
price: number;
img?: string;
qty: number;
category?:string
}


export interface ShippingData {
fullName: string;
email: string;
phone: string;
address: string;
city: string;
postalCode: string;
note?: string;
}


// export interface Order {
// id: string;
// items: CartItem[];
// total: number;
// shipping: ShippingData;
// status: 'Pending' | 'Confirmed' | 'Delivered';
// }