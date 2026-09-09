"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, type ContactFormValues } from "@/lib/validations/contact";
import { submitContactForm } from "@/app/actions/contact";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export function ContactForm({ defaultSubject }: { defaultSubject?: ContactFormValues["subject"] }) {
  const [status, setStatus] = React.useState<"idle" | "success" | "error">("idle");
  const [serverMessage, setServerMessage] = React.useState<string | undefined>();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: defaultSubject ?? "general",
      message: "",
      company: "",
    },
  });

  async function onSubmit(values: ContactFormValues) {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => formData.set(key, value ?? ""));

    const result = await submitContactForm({ status: "idle" }, formData);
    setStatus(result.status);
    setServerMessage(result.message);
    if (result.status === "success") reset({ ...values, name: "", email: "", message: "" });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" className="mt-2" {...register("name")} aria-invalid={!!errors.name} />
          {errors.name && <p className="mt-1 text-sm text-sun">{errors.name.message}</p>}
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            className="mt-2"
            {...register("email")}
            aria-invalid={!!errors.email}
          />
          {errors.email && <p className="mt-1 text-sm text-sun">{errors.email.message}</p>}
        </div>
      </div>

      <div>
        <Label htmlFor="subject">What&apos;s this about?</Label>
        <Select id="subject" className="mt-2" {...register("subject")}>
          <option value="general">General enquiry</option>
          <option value="production">Production / beatmaking / mixing</option>
          <option value="booking">Booking / live</option>
        </Select>
      </div>

      <div>
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" className="mt-2" {...register("message")} aria-invalid={!!errors.message} />
        {errors.message && <p className="mt-1 text-sm text-sun">{errors.message.message}</p>}
      </div>

      <div className="hidden" aria-hidden="true">
        <label htmlFor="company-field">Company</label>
        <input id="company-field" tabIndex={-1} autoComplete="off" {...register("company")} />
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Sending…" : "Send message"}
      </Button>

      <div role="status" aria-live="polite" className="min-h-[1.25rem] text-sm">
        {status === "success" && <p className="text-sun">Message sent — thank you. Asher&apos;s team will be in touch.</p>}
        {status === "error" && <p className="text-sun">{serverMessage}</p>}
      </div>
    </form>
  );
}
