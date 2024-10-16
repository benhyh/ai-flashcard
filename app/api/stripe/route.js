import { NextResponse } from "next/server";
import Stripe from "stripe";

const formatAmountForStripe = (amount) => {
  return Math.round(amount * 100);
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-09-30.acacia",
});

export async function POST(req) {
  const plans = [
    {
      title: "Power 1",
      price: 0.99,
    },
    {
      title: "Power 10",
      price: 9.99,
    },
    {
      title: "Power 20",
      price: 19.99,
    },
  ];
  const { productId } = await req.json();

  try {
    const params = {
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: plans[productId].title,
            },
            unit_amount: formatAmountForStripe(plans[productId].price, "usd"), // $
            recurring: {
              interval: "month",
              interval_count: 1,
            },
          },
          quantity: 1,
        },
      ],
      success_url: `${req.headers.get(
        "Referer"
      )}payment?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("Referer")}?#pricing`,
      // cancel_url: `${req.headers.get("Origin")}?#pricing`
    };

    const checkoutSession = await stripe.checkout.sessions.create(params);

    return NextResponse.json(checkoutSession, {
      status: 200,
    });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return new NextResponse(
      JSON.stringify({ error: { message: error.message } }),
      {
        status: 500,
      }
    );
  }
}

export async function GET(req) {
  const searchParams = req.nextUrl.searchParams;
  const session_id = searchParams.get("session_id");

  try {
    if (!session_id) {
      throw new Error("Session ID is required");
    }

    const checkoutSession = await stripe.checkout.sessions.retrieve(session_id);

    return NextResponse.json(checkoutSession);
  } catch (error) {
    console.error("Error retrieving checkout session:", error);
    return NextResponse.json(
      { error: { message: error.message } },
      { status: 500 }
    );
  }
}
