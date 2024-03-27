'use client'
import { useCartStore } from '@/providers/cart-store-provider'
import React, { useEffect } from 'react'
import { Separator } from '../ui/separator'
import { Badge } from "@/components/ui/badge"
import { ShoppingCart } from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import Image from 'next/image'
import { ScrollArea } from '../ui/scroll-area'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { instanceAxios } from '@/utils/instanceAxios'
import { Session } from 'next-auth'
function CartTap() {
  const  data = useSession().data as Session;
  const { productsCart, asyncDataWithBackend } = useCartStore(
    (state) => state,
  )
  useEffect(() => {
    instanceAxios.get(`/carts?populate[products][populate]=panner&filters[email][$eq]=${data.user?.email as string}`, {
      headers: {
        Authorization: 'Bearer ' + data?.jwt as string
      }
    }).then((res) => {
      asyncDataWithBackend(res.data.data)
    })
  }, [data, asyncDataWithBackend]);
  const totalAmount = productsCart.reduce((pre, curr) => {
    return pre + Number(curr.attributes.products.data[0].attributes.price)
  }, 0)
  return (
    <div className=' flex gap-2 items-center relative'>
      <Popover>
        <PopoverTrigger>
          <ShoppingCart />
        </PopoverTrigger>
        <PopoverContent className=' absolute top-5 -left-36 sm:-right-16'>
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Cart</h4>
            <p className="text-sm text-muted-foreground">
              Products added to the cart
            </p>
          </div>

          {/* hyper ui */}

          <div className="mt-4 space-y-6">
            <ScrollArea className="space-y-4 ">
              {productsCart.length == 0
                ? <div className=' grid place-items-center'>
                  <span>Your cart is empty!</span>
                </div>
                : productsCart.map((item, i) => (
                  <div key={i}>
                    <div
                      className="flex items-center gap-4">
                      <Image
                        src={item.attributes.products.data[0].attributes.panner.data.attributes.url}
                        alt={item.attributes.products.data[0].attributes.title}
                        width={150}
                        height={150}
                        className="size-16 rounded object-cover"
                      />

                      <div>
                        <h3 className="text-sm text-gray-900">{item.attributes.products.data[0].attributes.title}</h3>

                        <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                          <div>
                            <dt className="inline capitalize">category: </dt>
                            <dd className="inline">{item.attributes.products.data[0].attributes.category}</dd>
                          </div>

                          <div>
                            <dt className="inline capitalize">price: </dt>
                            <dd className="inline">{item.attributes.products.data[0].attributes.price}</dd>
                          </div>
                        </dl>
                      </div>
                    </div>
                    <Separator className="my-2" />
                  </div>
                ))
              }

            </ScrollArea>

            <div className="space-y-4 text-center">
              <Link
                href="/cart"
                className="block rounded border border-gray-600 px-5 py-3 text-sm text-gray-600 transition hover:ring-1 hover:ring-gray-400"
              >
                View my cart ({productsCart.length})
              </Link>
              {
                totalAmount > 0 &&
                <Link

                  href="/check-out"
                  className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
                >
                  Checkout
                </Link>
              }
            </div>
          </div>


        </PopoverContent>
      </Popover>
      {
        productsCart.length != 0 && <>
          <Separator orientation='vertical' className=' h-4' />
          <Badge>{productsCart.length}</Badge>
        </>
      }
    </div>
  )
}

export default CartTap