import prisma from "../client";

export type CustomerData = {
  stripeId: string; // Stripe customer ID
  email?: string | null;
};

export async function cancelSubscription(subscriptionId: string) {
  console.log("Cancelling subscription");
  const cancelSubscription = prisma.subscription.updateMany({
    where: { id: subscriptionId },
    data: { status: "canceled", updatedAt: new Date() },
  });

  return cancelSubscription;
}
