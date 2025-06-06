import { StripeSubscriptionEvent, SubscriptionData } from "./types";

export function extractSubscriptionData(
  event: StripeSubscriptionEvent
): SubscriptionData {
  const obj = event.data.object;
  const item = obj.items?.data?.[0];
  const price = item?.price;

  return {
    id: obj.id,
    customerId: obj.customer,
    status: obj.status,
    priceId: price?.id ?? null,
    currentPeriodStart: item?.current_period_start ?? null,
    currentPeriodEnd: item?.current_period_end ?? null,
    planInterval: price?.recurring?.interval ?? null,
    amount: price?.unit_amount ?? null,
    currency: price?.currency ?? null,
  };
}
