import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

function loading() {
  return (
    <div className='flex flex-col items-start md:flex-row justify-between gap-10 my-10' >
      <div className=' flex-1'>
        <Skeleton className='rounded-xl mx-auto h-60 w-96 object-cover' />
      </div>
      <div className="flex flex-1 flex-col gap-1">
        <Skeleton className=' rounded-lg h-8 w-40 ' />
        <Skeleton className=' rounded-lg h-6 w-14 ' />
        <Skeleton className=' rounded-lg h-20 w-96 ' />
        <div className="flex gap-2 items-center">
          <Skeleton className=' w-8 h-8 rounded-2xl ' />
          <Skeleton className=' h-8 w-56 rounded-lg' />
        </div>
        <div className="flex gap-2 items-center">
          <Skeleton className=' w-8 h-8 rounded-2xl ' />
          <Skeleton className=' h-8 w-20 rounded-lg' />
        </div>
        <Skeleton className=' my-4 h-12 w-32 rounded-lg' />
      </div>
    </div>
  )
}

export default loading