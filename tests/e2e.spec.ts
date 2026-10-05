import { test, expect } from '@playwright/test';

// Use the production deployed URL as demanded in Phase 27
const BASE_URL = 'https://mysurudasara.vercel.app';

test.describe('Phase 20 - E2E Flows', () => {

  test('Anonymous User Journey', async ({ page }) => {
    // Navigate to Home
    await page.goto(BASE_URL);
    await expect(page).toHaveTitle(/Mysuru Dasara/);
    
    // Check Hero and Navigation
    await expect(page.getByRole('heading', { name: 'Nada Habba Mysuru Dasara' })).toBeVisible({ timeout: 15000 });

    // Navigate to Events
    await page.click('a:has-text("Explore Dasara")');
    await expect(page).toHaveURL(/.*events/);
    await expect(page.locator('h1', { hasText: 'Events' })).toBeVisible();

    // Check Map
    await page.click('text=Map');
    await expect(page).toHaveURL(/.*map/);
    
    // Check AI Assistant
    await page.goto(BASE_URL);
    await page.fill('input[placeholder="Ask anything..."]', 'What is happening today?');
    await page.click('button:has(svg)');
    await expect(page.getByText('System Database')).toBeVisible({ timeout: 10000 });
  });

  test('Visitor Authentication Flow', async ({ page }) => {
    // Login
    await page.goto(BASE_URL + '/login');
    await page.fill('input[type="email"]', 'visitor');
    await page.fill('input[type="password"]', 'password');
    await page.click('button[type="submit"]');

    // Should redirect to My Dasara
    await expect(page).toHaveURL(/.*my-dasara/);
    await expect(page.locator('text=My Digital Passbook')).toBeVisible();
    
    // Logout
    await page.click('button[title="Logout"]');
    await expect(page).toHaveURL(BASE_URL + '/');
  });

  test('Admin Authentication Flow', async ({ page }) => {
    // Login
    await page.goto(BASE_URL + '/login');
    await page.fill('input[type="email"]', 'admin');
    await page.fill('input[type="password"]', 'password');
    await page.click('button[type="submit"]');

    // Should redirect to Admin Dashboard
    await expect(page).toHaveURL(/.*admin/);
    await expect(page.locator('text=Platform Control Center')).toBeVisible();
  });
  
  test('Unauthorized access fails', async ({ page }) => {
    // Direct URL access to admin when not logged in
    await page.goto(BASE_URL + '/admin');
    
    // Should be redirected or show unauthorized
    // Next.js layout checks session, so if there's no session, they get bounced to login
    await expect(page).toHaveURL(/.*login/);
  });
});
