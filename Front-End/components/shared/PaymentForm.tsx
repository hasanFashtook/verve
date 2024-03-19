"use client";

import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { Button } from "../ui/button";
import axios from "axios";
import { StripeError } from "@stripe/stripe-js";
import { UserProduct } from "@/lib/types";
import { useCartStore } from "@/providers/cart-store-provider";
import { useUser } from "@clerk/nextjs";
import { UserResource } from '@clerk/types';
import { instanceAxios } from "@/utils/instanceAxios";
import { LoaderIcon } from "lucide-react";

export default function PaymentForm({ amount }: { amount: number }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { productsCart } = useCartStore(state => state);
  const user = useUser().user;
  const handleSubmit = async (event: React.FormEvent) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();
    setLoading(true)

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const handleError = (error: StripeError) => {
      setLoading(false);
      setErrorMessage(error.message ?? 'stripe error')
    }

    createOrder(user, amount, productsCart);
    sendEmail(user?.primaryEmailAddress?.emailAddress as string)
    const { error: submitError } = await elements.submit();
    if (submitError) {
      handleError(submitError);
      return;
    }

    const { data } = await axios.post("/api/create-payment-intent", {
      data: { amount: amount },
    });


    const clientSecret = data;
    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      clientSecret,
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/payment-confirm",
      },
    });


    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  const sendEmail = async (email: string) => {
    const { data } = await axios.post("/api/send", {
      data: { email: email },
    });
  }
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className="mx-32 md:mx-[320px] flex flex-col">
        <PaymentElement />
        <Button
          className="w-full p-2 mt-4 grid place-items-center"
          disabled={amount <= 1 || loading}
          type="submit"
        >
          {loading ?
            <LoaderIcon className=" animate-spin" />
            : <span>Submit</span>
          }
        </Button>
      </div>
    </form>
  );
}


const createOrder: (user: UserResource | null | undefined, amount: number, productsCart: UserProduct[]) => void = async (user, amount, productsCart) => {
  let productsIdS: number[] = [];
  productsCart.forEach(el => productsIdS.push(el.attributes.products.data[0].id));

  const data = {
    data: {
      email: user?.primaryEmailAddress?.emailAddress,
      username: user?.fullName,
      amount,
      products: productsIdS
    }
  }
  try {
    const res = await instanceAxios.post('orders', data)
    productsCart.forEach(el => {
      instanceAxios.delete(`carts/${el.id}`)
    })
  } catch (err) {
    console.log(err)
    return err
  }
}