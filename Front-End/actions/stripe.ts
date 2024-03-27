"use server";

import type { Stripe } from "stripe";

import { headers } from "next/headers";

import { CURRENCY } from "@/config";
import { formatAmountForStripe } from "@/utils/stripe-helpers";
import { stripe } from "@/lib/stripe";

export async function createCheckoutSession(
  data: FormData,
): Promise<{ client_secret: string | null; url: string | null }> {
  const ui_mode = data.get(
    "uiMode",
  ) as Stripe.Checkout.SessionCreateParams.UiMode;

  const origin: string = headers().get("origin") as string;

  const checkoutSession: Stripe.Checkout.Session =
    await stripe.checkout.sessions.create({
      mode: "payment",
      submit_type: "pay",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: CURRENCY,
            product_data: {
              name: "Custom amount",
            },
            unit_amount: formatAmountForStripe(
              Number(data.get("amount") as string),
              CURRENCY,
            ),
          },
        },
      ],
      ...(ui_mode === "embedded" && {
        // return_url: `${origin}/check-out`,
        redirect_on_completion: "never"
      }),
      ui_mode,
    });
  return {
    client_secret: checkoutSession.client_secret,
    url: checkoutSession.url,
  };
}