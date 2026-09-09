import { test, expect } from "@playwright/test";

test("homepage renders hero and key sections", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { level: 1 })).toContainText("Asher");
  await expect(page.getByText("Selected releases")).toBeVisible();
  await expect(page.getByText("Selected Achievements", { exact: false })).toBeVisible();
});

test("listen CTA is reachable", async ({ page, isMobile }) => {
  await page.goto("/");

  if (isMobile) {
    await page.getByRole("button", { name: "Open menu" }).click();
    await expect(page.getByRole("link", { name: /listen/i })).toBeVisible();
  } else {
    await expect(page.getByRole("link", { name: /listen/i }).first()).toBeVisible();
  }
});

test("primary nav links route to the right pages", async ({ page, isMobile }) => {
  test.skip(isMobile, "Desktop nav is hidden below the md breakpoint");
  await page.goto("/");

  await page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Music" }).click();
  await expect(page).toHaveURL(/\/music$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Music");
});
