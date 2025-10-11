// src/Types/index.ts

import type { User } from './User';
import type { Product } from './Product';

// Export the individual types
export * from './User';
export * from './Product';

// Define the union type for the combined MockAPI array
export type MockResource = User | Product;