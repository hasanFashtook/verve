"use client";
import PaymentForm from "@/components/shared/PaymentForm";
import { useCartStore } from "@/providers/cart-store-provider";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";


const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

function Page() {
  const { productsCart } = useCartStore(state => state)
  const totalAmount = productsCart.reduce((pre, curr) => {
    return pre + Number(curr.attributes.products.data[0].attributes.price)
  }, 0);

  return (
    <div className=" flex flex-col justify-center min-h-[calc(100vh-64px)]">
      <Elements options={{ mode: 'payment', amount: totalAmount, currency: 'usd' }} stripe={stripePromise}>
        <PaymentForm  amount={totalAmount} />
      </Elements>
    </div>
  )
}

export default Page