import { cancelSubscription } from "@/app/database/queries/cancelSubscription";
import { upsertCustomer } from "@/app/database/queries/upsertCustomer";
import { upsertSubscription } from "@/app/database/queries/upsertSubscription";
import { extractSubscriptionData } from "@/app/helpers/helpers";
import { StripeSubscriptionEvent } from "@/app/helpers/types";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("Webhook recieved");
  if (req.method !== "POST") {
    return res.status(405).end("Method Not Allowed");
  }

  const isValid = verifyStripeSignature(req);
  if (!isValid) {
    return res.status(400).json({ error: "Invalid signature" });
  }

  const event: StripeSubscriptionEvent = req.body;
  const subscription = event.data.object;

  // In real app I would expect that the customer is already created in the databse, so I do not have to create it.
  // For this demo I must create a customer before updating subscription status, because DB stucture has separate cutomer and subscription tables.
  const customerId = subscription.customer;
  await upsertCustomer({ stripeId: customerId });

  switch (event.type) {
    case "customer.subscription.created":
    case "customer.subscription.resumed":
    case "customer.subscription.paused":
      const subscriptionData = extractSubscriptionData(event);

      await upsertSubscription(subscriptionData);
      break;

    case "customer.subscription.deleted":
      // Only for console logging
      const canceledSubscription = await cancelSubscription(subscription.id);
      console.log(
        `Success! Subscription ${subscription.id} was canceled for customer ID: ${customerId}`
      );
      break;

    default:
      console.log("Unhandled event type: " + event.type);
  }

  return res.status(200).json({ received: true });
}

function verifyStripeSignature(req: NextApiRequest): boolean {
  console.log("Validating signature");
  // Would need to verify stripe signature in real app to make sure reuqests do not come fro m a third party.
  return true;
}
