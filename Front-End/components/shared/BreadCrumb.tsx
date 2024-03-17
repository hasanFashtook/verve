'use client'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList
} from '../ui/breadcrumb'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Separator } from '../ui/separator'

function BreadCrumb() {
  const currentPath = usePathname()
  const arrLinks = currentPath.split('/').slice(1);

  return (
    <Breadcrumb className=' border-2 p-4 w-fit rounded-xl border-slate-200'>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <Separator className=' h-4' orientation="vertical" />
        <BreadcrumbItem>
          <BreadcrumbLink>
            products details
          </BreadcrumbLink>
        </BreadcrumbItem>
        <Separator className=' h-4' orientation="vertical" />
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href={`/${arrLinks.join('/')}`}>{arrLinks.pop()}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export default BreadCrumb