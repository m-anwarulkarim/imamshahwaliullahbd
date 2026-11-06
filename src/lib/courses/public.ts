import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getDb } from "../db/client";
import { courseEnrollments } from "../../../drizzle/schema/courses";

const enrollmentSchema = z.object({
  full_name: z.string().trim().min(2, "Please enter your full name").max(120),
  email: z.string().trim().email("Please enter a valid email address").max(255),
  phone: z.string().trim().min(6, "Please enter a valid phone number").max(30),
  course: z.string().trim().min(1).max(200),
  education: z.string().trim().max(200).optional().or(z.literal("")),
  message: z.string().trim().max(1000).optional().or(z.literal("")),
});

export const submitCourseEnrollment = createServerFn({ method: "POST" })
  .inputValidator((data) => enrollmentSchema.parse(data))
  .handler(async ({ data }) => {
    const db = getDb();
    await db.insert(courseEnrollments).values({
      fullName: data.full_name,
      email: data.email.toLowerCase(),
      phone: data.phone,
      course: data.course,
      education: data.education || null,
      message: data.message || null,
      status: "pending",
    });
    return { success: true };
  });
