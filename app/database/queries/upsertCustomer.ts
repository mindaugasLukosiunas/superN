import { CustomerData } from "@/app/helpers/types";
import prisma from "../client";

export async function upsertCustomer(data: CustomerData) {
  console.log("Upserting customer");

  return prisma.customer.upsert({
    where: { stripeId: data.stripeId },
    create: {
      stripeId: data.stripeId,
    },
    update: {
      // Here could update customer data such as emails, etc.
    },
  });
}
