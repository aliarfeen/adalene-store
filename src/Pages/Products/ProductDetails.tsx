import React from 'react'
import ProductPrieview from '../../Components/ProductDetails/ProductPreview'
import InfoContainer from '../../Components/ProductDetails/InfoColumn'

const ProductDetails = () => {
    
  return (
    <div>
      <ProductPrieview resource={'product'} id={0} title={''} price={0} description={''} image={'https://static.wixstatic.com/media/ea71bb_47c995fa95724f998485903107f14308~mv2_d_2487_3298_s_4_2.jpg/v1/fill/w_330,h_440,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/ea71bb_47c995fa95724f998485903107f14308~mv2_d_2487_3298_s_4_2.jpg'} category={''}      
      />
      <InfoContainer />
    </div>
  )
}

export default ProductDetails
