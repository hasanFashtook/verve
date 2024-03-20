import AddToCartButton from '@/components/shared/AddToCartButton'
import { Product } from '@/lib/types'
import { instanceAxios } from '@/app/_utils/instanceAxios'
import { BadgeAlert, BadgeCheck, BadgeDollarSign } from 'lucide-react'
import Image from 'next/image'


async function page({
  params
}: {
  params: {
    id: string
  }
}) {
  let productDetails: Product;

  try {
    const { data } = await instanceAxios.get(`products/${params.id}?populate=*`)
    productDetails = data.data
  } catch (err) {
    throw new Error('somting went wrong')
  }

  return (
    <>
      <div className='flex flex-col md:flex-row justify-between items-center gap-10 my-10 mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8' >
        <div className=' flex-1'>
          <Image
            src={productDetails.attributes.panner.data.attributes.url}
            width={400}
            height={400}
            alt={productDetails.attributes.title}
            className='rounded-xl mx-auto h-60 w-96 object-cover'
          />
        </div>
        <div className="flex flex-1 flex-col gap-1">
          <h1 className=' text-xl font-bold capitalize'>{productDetails.attributes.title}</h1>
          <span className=' font-semibold text-lg text-gray-400'>{productDetails.attributes.category}</span>
          <p className=' text-slate-900 font-medium'>{productDetails.attributes.description[0].children[0].text}</p>
          <div className="flex gap-2 items-center">
            {
              productDetails.attributes.instantDeliverey
                ? <BadgeCheck className=' w-8 h-8 text-xs text-green-500' />
                : <BadgeAlert className='w-8 h-8 text-slate-500' />
            }
            <span className=' text-slate-500'>Eligible For Instant Delivery</span>
          </div>
          <dl className=' flex items-center gap-2'>
            <dt><BadgeDollarSign className=' w-8 h-8 text-slate-800' /></dt>
            <dd className=' text-xl font-semibold text-slate-800'>{productDetails.attributes.price}</dd>
          </dl>
          <AddToCartButton productDetails={productDetails} />
        </div>
      </div>
    </>
  )
}

export default page


