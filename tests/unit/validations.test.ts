import { describe, expect, it } from "vitest";
import { contactFormSchema } from "@/lib/validations/contact";
import { newsletterFormSchema } from "@/lib/validations/newsletter";

describe("contactFormSchema", () => {
  it("accepts a valid submission", () => {
    const result = contactFormSchema.safeParse({
      name: "Jordan",
      email: "jordan@example.com",
      subject: "booking",
      message: "Looking to book a show in Bristol next spring.",
    });
    expect(result.success).toBe(true);
  });

  it("rejects an invalid email", () => {
    const result = contactFormSchema.safeParse({
      name: "Jordan",
      email: "not-an-email",
      subject: "general",
      message: "Hello there, this is a message.",
    });
    expect(result.success).toBe(false);
  });

  it("rejects a message that is too short", () => {
    const result = contactFormSchema.safeParse({
      name: "Jordan",
      email: "jordan@example.com",
      subject: "general",
      message: "hi",
    });
    expect(result.success).toBe(false);
  });
});

describe("newsletterFormSchema", () => {
  it("accepts a valid email", () => {
    expect(newsletterFormSchema.safeParse({ email: "fan@example.com" }).success).toBe(true);
  });

  it("rejects an invalid email", () => {
    expect(newsletterFormSchema.safeParse({ email: "nope" }).success).toBe(false);
  });
});
