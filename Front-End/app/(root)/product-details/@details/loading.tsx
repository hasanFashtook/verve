import { Skeleton } from '@/components/ui/skeleton'


function loading() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-10 my-10' >
      <div className=' flex-1 w-full '>
        <Skeleton className='rounded-xl mx-0  md:mx-auto h-60 max-w-96 w-full  object-cover' />
      </div>
      <div className="flex flex-col justify-between h-60">
        <Skeleton className=' rounded-lg h-8 w-40 ' />
        <Skeleton className=' rounded-lg h-6 w-14 ' />
        <Skeleton className=' rounded-lg h-16 w-full max-w-96 ' />
        <div className="flex gap-2 items-center">
          <Skeleton className=' w-6 h-6 rounded-2xl ' />
          <Skeleton className=' h-6 w-56 rounded-lg' />
        </div>
        <div className="flex gap-2 items-center">
          <Skeleton className=' w-6 h-6 rounded-2xl ' />
          <Skeleton className=' h-6 w-20 rounded-lg' />
        </div>
        <Skeleton className=' h-8 w-32 rounded-lg' />
      </div>
    </div>
  )
}

export default loading