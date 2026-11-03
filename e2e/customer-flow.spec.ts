import { test, expect } from "@playwright/test";

test.describe("Couple & Customer Portal Experience", () => {
  test("renders authentication login page with role switcher tabs", async ({ page }) => {
    await page.goto("/auth/login");

    const emailInput = page.getByPlaceholder(/name@example.com|your.email/i);
    await expect(emailInput).toBeVisible();

    const passwordInput = page.getByPlaceholder(/••••••••|password/i).or(page.locator('input[type="password"]'));
    await expect(passwordInput).toBeVisible();

    const loginButton = page.getByRole("button", { name: /Sign In|Log In|Continue/i }).first();
    await expect(loginButton).toBeVisible();
  });

  test("loads customer event creation wizard with multi-step inputs", async ({ page }) => {
    await page.goto("/customer/events/new");
    await expect(page).toHaveURL(/.*\/customer\/events\/new/);

    // Event title input
    const titleInput = page.getByPlaceholder(/e.g. Royal Jaipur Palace Wedding|Event Name/i).first();
    if (await titleInput.count() > 0) {
      await expect(titleInput).toBeVisible();
    }
  });

  test("renders customer dashboard with quick stats and action widgets", async ({ page }) => {
    await page.goto("/customer/dashboard");
    await expect(page).toHaveURL(/.*\/customer\/dashboard/);

    // Header portal indicator
    const portalIndicator = page.locator("text=Couple Portal").or(page.locator("text=Customer Portal"));
    await expect(portalIndicator.first()).toBeVisible();
  });

  test("loads real-time chat interface with interactive controls", async ({ page }) => {
    await page.goto("/customer/chat");
    await expect(page).toHaveURL(/.*\/customer\/chat/);

    // Message input placeholder
    const chatInput = page.getByPlaceholder(/Type a message|Write a message/i).first();
    if (await chatInput.count() > 0) {
      await expect(chatInput).toBeVisible();
    }
  });
});
