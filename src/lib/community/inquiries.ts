import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getDb } from "../db/client";
import { contactMessages, membershipApplications } from "../../../drizzle/schema/community";

const contactSchema = z.object({
  name: z.string().trim().min(2).max(200),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(30).optional(),
  subject: z.string().trim().min(3).max(200),
  message: z.string().trim().min(10).max(5000),
});

export const submitContactMessage = createServerFn({ method: "POST" })
  .inputValidator((data) => contactSchema.parse(data))
  .handler(async ({ data }) => {
    const db = getDb();
    const [row] = await db
      .insert(contactMessages)
      .values({
        name: data.name,
        email: data.email.toLowerCase(),
        phone: data.phone || null,
        subject: data.subject,
        message: data.message,
      })
      .returning({ id: contactMessages.id });
    return { id: row!.id };
  });

const membershipSchema = z.object({
  fullName: z.string().trim().min(2).max(200),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(30).optional(),
  membershipType: z.string().trim().min(2).max(100),
  institution: z.string().trim().max(200).optional(),
  statement: z.string().trim().min(20).max(5000),
});

export const submitMembershipApplication = createServerFn({ method: "POST" })
  .inputValidator((data) => membershipSchema.parse(data))
  .handler(async ({ data }) => {
    const db = getDb();
    const [row] = await db
      .insert(membershipApplications)
      .values({
        fullName: data.fullName,
        email: data.email.toLowerCase(),
        phone: data.phone || null,
        membershipType: data.membershipType,
        institution: data.institution || null,
        statement: data.statement,
        status: "pending",
      })
      .returning({ id: membershipApplications.id });
    return { id: row!.id };
  });
