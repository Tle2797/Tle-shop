
import ProdcutDetail from '@/components/product-Detail'
import React from 'react'

const ProductDetail = async ({params}) => {

  const {productId} = await params

  return (
    <ProdcutDetail id = {productId}/>
  )
}

export default ProductDetail