import axiosInstance from './axiosInstance';

import type { User, Product, MockResource, Order, Contact} from '../Types';

const ALL_RESOURCES_ENDPOINT: string = import.meta.env.VITE_MOCK_API_ENDPOINT; 
const PRODUCTS_ENDPOINT: string = import.meta.env.VITE_MOCK_API_PRODUCT_ENDPOINT; 



 //Generic Functions ---


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
    const response = await axiosInstance.get<MockResource[]>(PRODUCTS_ENDPOINT);
    const allData = response.data;

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

async function sendProduct<T extends MockResource>(
  resourceType: T['resource'], 
  payload: Omit<T, 'resource'>
): Promise<T> {
  const url = `${PRODUCTS_ENDPOINT}`; 
  
  const resourcePayload = { ...payload, resource: resourceType };
  
  const response = await axiosInstance.post<T>(url, resourcePayload);
  
  return response.data;
}


async function updateResource<T extends MockResource>(
  resource: T
): Promise<T> {
  const url = `${ALL_RESOURCES_ENDPOINT}/${resource.id}`;

  const response = await axiosInstance.put<T>(url, resource);

  return response.data;
}


async function deleteResource<T extends MockResource>(
  resource: T
): Promise<T> {
  const url = `${ALL_RESOURCES_ENDPOINT}/${resource.id}`;

  const response = await axiosInstance.delete<T>(url);

  return response.data;
}

async function updateProduct<T extends MockResource>(
  resource: T
): Promise<T> {
  const url = `/${resource.resource}/${resource.id}`;

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
  fetchContacts: (): Promise<Contact[]> => fetchResource('contact'),//<=

  
  sendOrders: (payload: Order): Promise<Order> => sendResource<Order>('Order', payload),
  sendUser: (payload: User): Promise<User> => sendResource<User>('user', payload),
  sendContact: (payload: Contact): Promise<Contact> =>sendResource<Contact>('contact', payload),//<=
  sendProduct: (payload: Product): Promise<Product> => sendProduct<Product>('products', payload),

  updateProduct: (payload: Product): Promise<Product> => updateProduct<Product>(payload),
  updateOrder: (payload: Order): Promise<Order> => updateResource<Order>(payload),
  updateUser: (payload: User): Promise<User> => updateResource<User>(payload),

  deleteUser : (payload: User): Promise<User> => deleteResource<User>(payload),

};

export default apiFactory;