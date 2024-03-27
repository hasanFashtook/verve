'use client'
import type Stripe from "stripe";
import React, { useEffect, useState } from "react";
import { createCheckoutSession } from "@/actions/stripe";
import getStripe from "@/utils/get-stripejs";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { useCartStore } from "@/providers/cart-store-provider";
import { instanceAxios } from "@/utils/instanceAxios";
import { useSession } from "next-auth/react";
import { UserProduct } from "@/types/types";
import axios from "axios";
import { Session } from "next-auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface CheckoutFormProps {
  uiMode: Stripe.Checkout.SessionCreateParams.UiMode;
}

export default function CheckoutForm(props: CheckoutFormProps): JSX.Element {
  const { data: session } = useSession();
  const [isChecked, setIsChecked] = useState(false)
  const { productsCart, asyncDataWithBackend } = useCartStore(state => state)
  const totalAmount = productsCart.reduce((pre, curr) => {
    return pre + Number(curr.attributes.products.data[0].attributes.price)
  }, 0);
  const [clientSecret, setClientSecret] = useState<string | null>(null);


  useEffect(() => {
    const formAction = async (uiMode: (string | Blob), amount: number): Promise<void> => {
      const data = new FormData();
      data.append('uiMode', uiMode)
      data.append('amount', `${amount}`);
      const { client_secret, url } = await createCheckoutSession(data);
      if (props.uiMode === "embedded") return setClientSecret(client_secret);
      window.location.assign(url as string);
    };
    if (totalAmount > 0) {
      formAction(props.uiMode, totalAmount);
    }
  }, [props.uiMode, totalAmount])

  return (
    <>
      {clientSecret ? (
        <EmbeddedCheckoutProvider
          stripe={getStripe()}
          options={{
            clientSecret,
            onComplete: () => {
              handleComplate(session as Session, totalAmount, productsCart, asyncDataWithBackend)
              setIsChecked(true)
            }
          }}
        >
          <EmbeddedCheckout className=" my-10" />
        </EmbeddedCheckoutProvider>
      ) : null}
      {isChecked &&
        <Button
          asChild
          className=" bg-green-600 hover:bg-green-500 w-fit mx-auto block">
          <Link href={'/'}>Go to home page</Link>
        </Button>}
    </>
  );
}



function handleComplate(
  session: Session,
  totalAmount: number,
  productsCart: UserProduct[],
  asyncDataWithBackend: (productsCart: UserProduct[]) => void
): void {
  createOrder(session, totalAmount, productsCart,asyncDataWithBackend);
  sendEmail(session?.user?.email as string)
}

const createOrder: (
  user: Session, 
  amount: number, 
  productsCart: UserProduct[],
  asyncDataWithBackend: (productsCart: UserProduct[]) => void
  ) => void = async (user, amount, productsCart,asyncDataWithBackend) => {
  let productsIdS: number[] = [];
  productsCart.forEach(el => productsIdS.push(el.attributes.products.data[0].id));

  const data = {
    data: {
      email: user.user?.email,
      username: user.user?.name,
      amount,
      products: productsIdS
    }
  }
  try {
    // creating order in database
    const res = await instanceAxios.post('/orders', data, {
      headers: {
        Authorization: "Bearer " + user.jwt as string
      }
    })
    // removing cart content from database after checkout
    productsCart.forEach(el => {
      instanceAxios.delete(`/carts/${el.id}`, {
        headers: {
          Authorization: "Bearer " + user.jwt as string
        }
      })
    })

    // re-iniatialize store
    instanceAxios.get(`/carts?populate[products][populate]=panner&filters[email][$eq]=${data.data.email}`, {
      headers: {
        Authorization: 'Bearer ' + user.jwt as string
      }
    }).then((res) => {
      asyncDataWithBackend(res.data.data)
    })
  } catch (err) {
    console.log(err)
    return err
  }
}

const sendEmail = async (email: string) => {
  const { data } = await axios.post("/api/send", {
    data: { email: email },
  });
}