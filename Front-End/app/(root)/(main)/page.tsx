
import { instanceAxios } from '@/utils/instanceAxios';
import ProductItem from '@/components/shared/ProductItem'
import { Product } from '@/types/types';
import React from 'react'

async function page() {
  let products: Product[] = [];
  try {
    const res = await instanceAxios.get(`/products?populate=*`)
    products = res.data.data;
  } catch (err) {
    console.log(err)
  }
  return (
    <div className="mx-auto my-10 max-w-screen-xl px-4 sm:px-6 lg:px-8 gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {
        products.map((item, i) => (
          <ProductItem product={item} key={i} />
        ))
      }
    </div>
  )
}

export default page