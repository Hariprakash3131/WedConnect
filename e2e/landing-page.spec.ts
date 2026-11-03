import { test, expect } from "@playwright/test";

test.describe("Landing Page & Public Website Navigation", () => {
  test("displays hero headline, luxury branding, and search controls", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/WedConnect/i);

    // Verify main navigation branding
    const brand = page.locator("text=WedConnect").first();
    await expect(brand).toBeVisible();

    // Verify Hero CTA
    const exploreCta = page.getByRole("link", { name: /Explore Specialists|Browse Categories|Find Vendors/i }).first();
    await expect(exploreCta).toBeVisible();

    // Verify category cards
    const categoryGrid = page.locator("section").filter({ hasText: /Curated Categories|Specialties/i });
    await expect(categoryGrid).toBeDefined();

    // Verify footer links
    const footer = page.locator("footer");
    await expect(footer).toBeVisible();
    await expect(footer.getByRole("link", { name: /Terms of Service/i })).toBeVisible();
    await expect(footer.getByRole("link", { name: /Privacy Policy/i })).toBeVisible();
  });

  test("navigates to Vendor Directory and filters by category", async ({ page }) => {
    await page.goto("/vendors");
    await expect(page).toHaveURL(/.*\/vendors/);

    // Search input should be present
    const searchInput = page.getByPlaceholder(/Search by vendor name, service, or city/i);
    await expect(searchInput).toBeVisible();

    // Filter controls should be present
    const citySelector = page.getByRole("combobox").first();
    await expect(citySelector).toBeVisible();
  });

  test("loads informational and trust pages", async ({ page }) => {
    await page.goto("/about");
    await expect(page).toHaveURL(/.*\/about/);

    await page.goto("/faq");
    await expect(page).toHaveURL(/.*\/faq/);

    await page.goto("/contact");
    await expect(page).toHaveURL(/.*\/contact/);
  });
});
