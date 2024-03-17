'use client'

import { Button } from '@/components/ui/button'
import { XCircle } from 'lucide-react'
import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
  return (
    <div className='flex flex-col items-center gap-3 mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8'>
      <XCircle className=' w-10 h-10 text-red-500' />
      <h1 className=' text-xl text-red-500'>Something went wrong!</h1>
      <Button
        className=' bg-red-500 hover:bg-red-600'
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </Button>
    </div>
  )
}