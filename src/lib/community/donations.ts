import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getDb } from "../db/client";
import { donations } from "../../../drizzle/schema/community";

const donationSchema = z.object({
  fullName: z.string().trim().min(2).max(200),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(6).max(30),
  amount: z.number().positive(),
  donationType: z.string().trim().min(1).max(100),
  message: z.string().trim().max(1000).optional(),
});

export const submitDonation = createServerFn({ method: "POST" })
  .inputValidator((data) => donationSchema.parse(data))
  .handler(async ({ data }) => {
    const db = getDb();

    const [row] = await db
      .insert(donations)
      .values({
        fullName: data.fullName,
        email: data.email.toLowerCase(),
        phone: data.phone,
        amount: data.amount,
        donationType: data.donationType,
        message: data.message || null,
        status: "pending",
      })
      .returning({ id: donations.id });

    return { id: row!.id };
  });
