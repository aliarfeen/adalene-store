// src/api/apiFactory.ts

import axiosInstance from './axiosInstance';

import type { User, Product, MockResource, Order } from '../Types'; 

const ALL_RESOURCES_ENDPOINT: string = import.meta.env.VITE_MOCK_API_ENDPOINT; 
const PRODUCTS_ENDPOINT: string = import.meta.env.VITE_MOCK_API_PRODUCT_ENDPOINT; 



 //Generic Fetch Function ---

/**
 * Fetches all data from the single MockAPI endpoint and filters it 
 * to return only the requested resource type (User, Product, etc.).
 * @param resourceType - The value of the 'resource' field to filter by ('user' or 'product').
 */
async function fetchResource<T extends MockResource>(resourceType: T['resource']): Promise<T[]> {
  try {
    // 1. Fetch the entire combined array of mixed resources
    const response = await axiosInstance.get<MockResource[]>(ALL_RESOURCES_ENDPOINT);
    const allData = response.data;

    // 2. Filter the array based on the 'resource' field and assert the type
    const filteredData = allData.filter((item) => item.resource === resourceType) as T[];

    return filteredData;
  } catch (error) {
    console.error(`Error fetching or filtering ${resourceType} data:`, error);
    throw error;
  }
}

async function fetchAllProducts<T extends MockResource>(resourceType: T['resource']): Promise<T[]> {
  try {
    // 1. Fetch the entire combined array of mixed resources
    const response = await axiosInstance.get<MockResource[]>(PRODUCTS_ENDPOINT);
    const allData = response.data;

    // 2. Filter the array based on the 'resource' field and assert the type
    const filteredData = allData.filter((item) => item.resource === resourceType) as T[];

    return filteredData;
  } catch (error) {
    console.error(`Error fetching or filtering ${resourceType} data:`, error);
    throw error;
  }
}



async function sendResource<T extends MockResource>(
  resourceType: T['resource'], 
  payload: Omit<T, 'resource'>
): Promise<T> {
  const url = `${ALL_RESOURCES_ENDPOINT}`; 
  
  const resourcePayload = { ...payload, resource: resourceType };
  
  const response = await axiosInstance.post<T>(url, resourcePayload);
  
  return response.data;
}


async function updateResource<T extends MockResource>(
  resource: T
): Promise<T> {
  const url = `/${resource.resource}/${resource.id}`;

  // 2. The payload for PUT is the entire resource object (T).
  const response = await axiosInstance.put<T>(url, resource);

  return response.data;
}


const apiFactory = {
  // Primary, reusable function
  fetchResource, 
  fetchAllProducts,
  sendResource,
  updateResource,

  // Simple aliases for type clarity and ease of use in components
  fetchUsers: (): Promise<User[]> => fetchResource('user'),
  fetchProducts: (): Promise<Product[]> => fetchAllProducts('products'),
  fetchOrders: (): Promise<Order[]> => fetchResource('Order'),
  
  sendOrders: (payload: Order): Promise<Order> => sendResource<Order>('Order', payload),
  
  updateProduct: (payload: Product): Promise<Product> => updateResource<Product>(payload),
  updateOrder: (payload: Order): Promise<Order> => updateResource<Order>(payload),

  // Example of a more complex product filter built on the base function
  fetchProductsByCategory: async (category: string): Promise<Product[]> => {
    const allProducts = await fetchResource<Product>('products');
    return allProducts.filter(p => p.category === category);
  }
};

export default apiFactory;