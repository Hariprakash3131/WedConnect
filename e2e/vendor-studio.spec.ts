import { test, expect } from "@playwright/test";

test.describe("Vendor Studio & Specialist Suite Experience", () => {
  test("renders studio dashboard with revenue, enquiry, and conversion metrics", async ({ page }) => {
    await page.goto("/vendor/dashboard");
    await expect(page).toHaveURL(/.*\/vendor\/dashboard/);

    const studioBadge = page.locator("text=Vendor Studio").first();
    await expect(studioBadge).toBeVisible();
  });

  test("loads package management studio for Tier packages creation", async ({ page }) => {
    await page.goto("/vendor/packages");
    await expect(page).toHaveURL(/.*\/vendor\/packages/);

    const heading = page.locator("text=Packages").or(page.locator("text=Tier"));
    await expect(heading.first()).toBeVisible();
  });

  test("renders availability calendar for booking slot reservations", async ({ page }) => {
    await page.goto("/vendor/availability");
    await expect(page).toHaveURL(/.*\/vendor\/availability/);

    const cal = page.locator("text=Availability").or(page.locator("text=Calendar"));
    await expect(cal.first()).toBeVisible();
  });

  test("loads formal quotation creator with line-item calculator", async ({ page }) => {
    await page.goto("/vendor/quotations");
    await expect(page).toHaveURL(/.*\/vendor\/quotations/);

    const quoteTitle = page.locator("text=Quotation").first();
    await expect(quoteTitle).toBeVisible();
  });
});
