'use client'
import Image from "next/image"
import Link from "next/link"
import CartTap from "./CartTap";
import { useSession } from "next-auth/react"
import { signIn, signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Home, ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";

function Header() {
  const { data: user } = useSession()
  return (
    <header className="bg-white shadow">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-1 md:flex md:items-center md:gap-12">
            <Link className="block text-teal-600" href="/">
              <span className="sr-only">Home</span>
              <Image
                src={'/logo.svg'}
                width={78}
                height={30}
                alt="verve logo"
              />
            </Link>
          </div>

          <div className="md:flex md:items-center md:gap-12">
            <nav aria-label="Global" className="hidden md:block">
              <ul className="flex items-center gap-6 text-sm">
                <li>
                  <Link className="text-gray-500 transition hover:text-gray-500/75" href="/"> Home </Link>
                </li>
                <li>
                  <Link className="text-gray-500 transition hover:text-gray-500/75" href="/cart"> Cart </Link>
                </li>
              </ul>
            </nav>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-4">
                {user?.user ?
                  <>
                    <CartTap />
                    <Button onClick={() => signOut()}>
                      logout
                    </Button>
                  </>
                  :
                  <Button onClick={() => signIn()}>
                    login
                  </Button>
                }
              </div>

              <div className="block md:hidden">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button title="trigger" className=" grid place-items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className=" absolute -right-7 top-5 w-60">
                    <DropdownMenuGroup>
                      <DropdownMenuItem asChild>
                        <Link className="text-gray-500 transition hover:text-gray-500/75" href="/">
                          <Home className="mr-2 h-4 w-4" />
                          <span>Home</span>
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem asChild>
                        <Link className="text-gray-500 transition hover:text-gray-500/75" href="/cart">
                          <ShoppingCart className="mr-2 h-4 w-4" />
                          <span>Cart</span>
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header