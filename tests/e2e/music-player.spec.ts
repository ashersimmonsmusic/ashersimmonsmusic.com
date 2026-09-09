import { test, expect } from "@playwright/test";

test("playing a release opens the global player bar", async ({ page }) => {
  await page.goto("/");

  const heroPlayButton = page.getByRole("button", { name: /^play/i }).first();
  await heroPlayButton.click();

  const player = page.getByRole("region", { name: "Music player" });
  await expect(player).toBeVisible();
  await expect(player.getByRole("button", { name: "Close player" })).toBeVisible();
});

test("release page shows tracklist and streaming links section", async ({ page }) => {
  await page.goto("/release/open-letters-to-god");

  await expect(page.getByRole("heading", { level: 1 })).toContainText("Open Letters to God");
  await expect(page.getByRole("heading", { name: "Tracklist" })).toBeVisible();
});
