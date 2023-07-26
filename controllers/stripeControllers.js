// const stripe = import("stripe")(process.env.STRIPE_PRIVATE_KEY);

import Stripe from "stripe";

//import stripe from "stripe";
const StripeKey =
  "sk_test_51MMShYSFUzBgeaSd1LBERmf3DSrjctIA9WBaDl46FxkJo40ErNWN9WwDU4SfjYQMzB2FqCVUyFc1Fh1I7Vn5l8H900Y0b6Aglw";
//console.log(StripeKey);
const stripe = Stripe(StripeKey);
export const stripeController = async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map((item) => {
        //console.log(item);
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.name,
            },
            unit_amount: parseInt(item.price * 100),
          },
          quantity: "1",
        };
      }),
      success_url: "http://localhost:3000/",
      cancel_url: "http://localhost:3000/",
      // success_url: `${process.env.CLIENT_URL}`,
      // cancel_url: `${process.env.CLIENT_URL}`,
    });

    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
