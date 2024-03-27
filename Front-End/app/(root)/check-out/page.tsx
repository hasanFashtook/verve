import type { Metadata } from "next";
import CheckoutForm from "@/components/shared/CheckoutForm";

export const metadata: Metadata = {
  title: "Check out with stripe",
};

export default function PaymentElementPage({
  searchParams,
}: {
  searchParams?: { payment_intent_client_secret?: string };
}): JSX.Element {
  return (
    <div className="min-h-[calc(100vh-64px)]">
      <CheckoutForm uiMode="embedded" />
    </div>
  );
}