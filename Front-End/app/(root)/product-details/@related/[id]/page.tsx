import ProductItem from '@/components/shared/ProductItem'
import { Product } from '@/lib/types'
import { instanceAxios } from '@/app/_utils/instanceAxios'

async function page({
  params
}: {
  params: {
    id: string
  }
}) {

  let products: Product[]

  try {
    const identifyProduct = await instanceAxios.get(`products/${params.id}?populate=*`)
    const { data } = identifyProduct
    const { category } = data.data.attributes
    const res = await instanceAxios.get(`products?filters[category][$eq]=${category}&populate=*`)
    products = res.data.data
  } catch (err) {
    throw new Error('something went wrong')
  }
  return (
    <>
      <div className=' gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-5'>
        {
          products.map((item, i) => (
            <ProductItem product={item} key={i} />
          ))
        }
      </div>
    </>
  )
}

export default page