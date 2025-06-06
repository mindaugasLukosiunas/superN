import { SubscriptionData } from "@/app/helpers/types";
import prisma from "../client";

export async function upsertSubscription(data: SubscriptionData) {
  console.log("Upserting subscription");

  const upsertedSubscription = await prisma.subscription.upsert({
    where: { id: data.id },
    create: {
      id: data.id,
      customerId: data.customerId,
      status: data.status,
      priceId: data.priceId ?? null,
      currentPeriodStart: data.currentPeriodStart ?? null,
      currentPeriodEnd: data.currentPeriodEnd ?? null,
      planInterval: data.planInterval ?? null,
      amount: data.amount ?? null,
      currency: data.currency ?? null,
    },
    update: {
      status: data.status,
      priceId: data.priceId ?? null,
      currentPeriodStart: data.currentPeriodStart ?? null,
      currentPeriodEnd: data.currentPeriodEnd ?? null,
      planInterval: data.planInterval ?? null,
      amount: data.amount ?? null,
      currency: data.currency ?? null,
    },
  });

  console.log(
    `Success! Subscription status is ${upsertedSubscription.status} for customer ID: ${upsertedSubscription.customerId}`
  );

  return upsertedSubscription;
}
