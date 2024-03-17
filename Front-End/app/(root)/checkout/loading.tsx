import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

function loading() {
  return (
    <Skeleton className=' h-72 w-72'/>
  )
}

export default loading