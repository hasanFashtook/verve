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
      <div className="flex flex-1 items-center justify-center">
        <div className="mx-auto max-w-xl px-4 py-8 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            We can&apos;t find that product.
          </h1>

          <p className="mt-2 text-gray-500">
            Try searching again, or return home to start from the beginning.
          </p>

          <Button
            className=' my-4 bg-red-500 hover:bg-red-600'
            onClick={
              () => reset()
            }
          >
            Try searching again
          </Button>
        </div>
      </div>
    </div>
  )
}