import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"
const arr = [0, 0, 0, 0];

function ProductsListSkeleton() {
  return (
    <>
      <div className="mx-auto my-10 max-w-screen-xl px-4 sm:px-6 lg:px-8 gap-4  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {
          arr.map((item, i) => (
            <div key={i} className=' w-full max-w-96 mx-auto p-1 '>
              <Skeleton className='rounded-t-xl h-[170px] max-w-full object-cover' />
              <div className='flex items-center justify-between gap-8 p-3 rounded-b-lg'>
                <div className='w-full'>
                  <Skeleton className="h-4 w-full mb-2 rounded-full" />
                  <Skeleton className="h-4 w-16 rounded-full" />
                </div>
                <h2>
                  <Skeleton className="h-8 w-10 " />
                </h2>
              </div>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default ProductsListSkeleton
