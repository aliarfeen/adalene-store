// src/components/YourComponent.tsx

import React, { useState, useEffect } from 'react';
// Assuming your simplified factory file is named 'apiFactory'
import apiFactory from './Api/apiFactory';
import type { User, Product } from './Types';

const App: React.FC = () => {
  // 1. Initialize state with the correct types
  const [users, setUsers] = useState<User[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 2. Call the specific aliases from the 'apiFactory'
        const [userData, productData] = await Promise.all([
          apiFactory.fetchUsers(),
          apiFactory.fetchProducts(),
        ]);
        
        // 3. Update state with the clean, filtered arrays
        setUsers(userData);
        setProducts(productData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []); // Run only once on mount

  // 4. Handle loading/error states and render data
  if (loading) {
    return <div>Loading data...</div>;
  }

  return (
    <div>
      <h1>Products ({products.length})</h1>
      {/* Example: Display the first product's title */}
      <p>{products[0]?.title}</p>
      
      <h2>Users ({users.length})</h2>
      {/* Example: Display the first user's email */}
      <p>{users[0]?.email}</p>
    </div>
  );
};

export default App;