export type SubscriptionData = {
  id: string; // Stripe subscription ID
  customerId: string; // Stripe customer ID
  status: string;
  priceId?: string | null;
  currentPeriodStart?: number | null;
  currentPeriodEnd?: number | null;
  planInterval?: string | null;
  amount?: number | null;
  currency?: string | null;
};

export type StripeSubscriptionEvent = {
  id: string;
  object: "event";
  api_version: string;
  created: number;
  data: {
    object: StripeSubscription;
  };
  livemode: boolean;
  pending_webhooks: number;
  request: {
    id: string | null;
    idempotency_key: string | null;
  };
  type:
    | "customer.subscription.created"
    | "customer.subscription.pending_update_applied"
    | "customer.subscription.deleted"
    | "customer.subscription.paused"
    | "customer.subscription.resumed";
};

export type StripeSubscription = {
  id: string;
  status: string;
  customer: string;
  currency: string;
  items: {
    data: {
      current_period_start: number;
      current_period_end: number;
      price: {
        id: string;
        unit_amount: number;
        currency: string;
        recurring: {
          interval: string;
        };
      };
    }[];
  };
};

export type CustomerData = {
  stripeId: string; // Stripe customer ID
  email?: string | null;
};
