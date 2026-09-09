import { test, expect } from "@playwright/test";

test("contact form validates required fields before submitting", async ({ page }) => {
  await page.goto("/contact");

  await page.getByRole("button", { name: "Send message" }).click();

  await expect(page.getByText("Please enter your name.")).toBeVisible();
  await expect(page.getByText("Please enter a valid email address.")).toBeVisible();
});

test("mobile nav opens and closes", async ({ page, isMobile }) => {
  test.skip(!isMobile, "Mobile nav only renders below the md breakpoint");
  await page.goto("/");

  await page.getByRole("button", { name: "Open menu" }).click();
  await expect(page.getByRole("dialog", { name: "Site navigation" })).toBeVisible();

  await page.getByRole("button", { name: "Close menu" }).click();
  await expect(page.getByRole("dialog", { name: "Site navigation" })).toBeHidden();
});
