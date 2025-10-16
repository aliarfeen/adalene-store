// src/Types/index.ts

import type { User } from './User';
import type { Product } from './Product';
import type { Order } from './Order';
import type { ShippingData } from './Cart';
// Export the individual types
export * from './User';
export * from './Product';
export * from './Order';
export * from './Cart';


// Define the union type for the combined MockAPI array
export type MockResource = User | Product | ShippingData | Order ;