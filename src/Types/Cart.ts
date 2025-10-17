export interface CartItem {
id: string;
title: string;
price: number;
image?: string;
quantity: number;
orderQuantity: number;
category?:string
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