import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getDb } from "../db/client";
import { newsletterSubscribers } from "../../../drizzle/schema/community";

export const subscribeToNewsletter = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => z.object({ email: z.string().email().max(255) }).parse(data))
  .handler(async ({ data }) => {
    const db = getDb();
    const email = data.email.toLowerCase().trim();

    try {
      await db.insert(newsletterSubscribers).values({ email });
      return { success: true, alreadySubscribed: false };
    } catch (err: unknown) {
      const code = (err as { code?: string })?.code;
      if (code === "23505") {
        return { success: true, alreadySubscribed: true };
      }
      throw err;
    }
  });
