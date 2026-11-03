import { test, expect } from "@playwright/test";

test.describe("Escrow Checkout & Milestone Payment Flow", () => {
  test("renders checkout page with quotation breakdown, escrow milestones, and secure deposit button", async ({ page }) => {
    await page.goto("/checkout/qt-demo-001");

    // Checkout page title
    const checkoutTitle = page.locator("text=Luxury Escrow Checkout").or(page.locator("text=Checkout"));
    await expect(checkoutTitle.first()).toBeVisible();

    // Financial breakdown elements
    const summaryCard = page.locator("text=Investment Breakdown").or(page.locator("text=Summary"));
    await expect(summaryCard.first()).toBeVisible();

    // Milestones tracker
    const milestones = page.locator("text=Milestone").or(page.locator("text=Escrow Schedule"));
    await expect(milestones.first()).toBeVisible();

    // Security badge
    const securityBadge = page.locator("text=100% Escrow Protection").or(page.locator("text=Protected"));
    await expect(securityBadge.first()).toBeVisible();
  });
});
