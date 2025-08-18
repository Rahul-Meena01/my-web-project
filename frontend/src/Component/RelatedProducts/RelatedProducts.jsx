import React from 'react'
import './RelatedProducts.css'
import related_products from '../Asset/related_products'
import Item from '../Item/Item'

const RelatedProducts = () => {
  return (
    <div className='relatedproducts'>
        <h1>Related Products</h1>
        <hr />
        <div className="relatedproducts-item">
            {related_products.map((item,i)=>{
                return <Item key={i} id={item.id} name = {item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
            })}

        </div>
      
    </div>
  )
}

export default RelatedProducts
