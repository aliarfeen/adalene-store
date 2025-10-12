import React from 'react'
import ProductPrieview from '../../Components/ProductDetails/ProductPreview'
import InfoContainer from '../../Components/ProductDetails/InfoColumn'
import type { Product } from '../../Types';

const ProductDetails = () => {  
  const product : Product = JSON.parse(localStorage.getItem("product") || '{}');

    
  return (
    <div>
      <ProductPrieview  bestSeller={product.bestSeller} resource={'product'} id={product.id} title={product.title} price={product.price} description={product.description} image={product.image} category={''} quantity={product.quantity}      />
      <InfoContainer />
    </div>
  )
}

export default ProductDetails
