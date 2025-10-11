import type { Product } from './../../Types/Product';

const ProductCard = ({Product} : {Product: Product}) => {
  return (
    <div className='px-5 pb-5 rounded-lg cursor-pointer hover:brightness-95'>
        <img className='rounded-lg brightness-105' src={Product.image} alt={Product.title} />
        <p className='text-lg text-center font-normal text-gray-800 mb-1'>{Product.title}</p>
        <p className='text-lg text-center font-serif font-medium text-red-700 italic'>{Product.price} EGP</p>
      
    </div>
  )
}

export default ProductCard
