import { test, expect } from '@playwright/test';

const BASE_URL = 'https://mysurudasara.vercel.app';

test.describe('Full Application Production Flows', () => {

  test('Flow 1-18: Anonymous Browsing, Navigation, & AI Assistant', async ({ page }) => {
    await page.goto(BASE_URL);
    
    // Hero exists
    await expect(page.getByRole('heading', { name: 'Nada Habba Mysuru Dasara' })).toBeVisible({ timeout: 15000 });
    
    // AI Assistant Search
    await page.fill('input[placeholder="Ask anything..."]', 'When is the food festival?');
    await page.click('button:has(svg)');
    await expect(page.getByText('System Database')).toBeVisible({ timeout: 10000 });
    
    // Navigate to Events
    await page.click('a:has-text("Explore Dasara")');
    await expect(page).toHaveURL(/.*events/);
    await expect(page.locator('h1', { hasText: 'Events' })).toBeVisible();
    
    // Check Event Cards
    await expect(page.locator('.glass-panel-solid').first()).toBeVisible();

    // Navigate to Map
    await page.goto(BASE_URL + '/map');
    await expect(page).toHaveURL(/.*map/);
    await expect(page.locator('text=Map Layers')).toBeVisible();
  });

  test('Flow 32-35: Visitor Authentication & Digital Passbook', async ({ page }) => {
    // Login
    await page.goto(BASE_URL + '/login');
    await page.fill('input[type="text"]', 'visitor');
    await page.fill('input[type="password"]', 'password');
    await page.click('button[type="submit"]');

    // Asserts successful redirection
    await expect(page).toHaveURL(/.*my-dasara/);
    
    // Verify Passbook rendering
    await expect(page.locator('text=My Dasara Passbook')).toBeVisible();
    await expect(page.locator('text=Saved Events')).toBeVisible();
    
    // Logout Flow
    await page.click('button[title="Logout"]');
    await expect(page).toHaveURL(BASE_URL + '/');
  });

  test('Flow 36: Vendor Authentication & Dashboard Management', async ({ page }) => {
    await page.goto(BASE_URL + '/login');
    await page.fill('input[type="text"]', 'vendor');
    await page.fill('input[type="password"]', 'password');
    await page.click('button[type="submit"]');

    // Vendor Dashboard Redirection
    await expect(page).toHaveURL(/.*vendor-dashboard/);
    
    // Verify Vendor controls
    await expect(page.locator('text=Vendor Dashboard')).toBeVisible();
    await expect(page.locator('text=Product Inventory')).toBeVisible();
    await expect(page.locator('text=Customer Rating')).toBeVisible();
  });

  test('Flow 38: Admin Authentication & Control Center', async ({ page }) => {
    await page.goto(BASE_URL + '/login');
    await page.fill('input[type="text"]', 'admin');
    await page.fill('input[type="password"]', 'password');
    await page.click('button[type="submit"]');

    // Admin Dashboard Redirection
    await expect(page).toHaveURL(/.*admin/);
    
    // Verify Admin controls
    await expect(page.locator('text=Platform Control Center')).toBeVisible();
    await expect(page.locator('text=Total Visitors')).toBeVisible();
    await expect(page.locator('text=Sync Status')).toBeVisible();
  });
  
  test('Security & Authorization Constraints', async ({ page }) => {
    // Attempt unauthorized admin access
    await page.goto(BASE_URL + '/admin');
    await expect(page).toHaveURL(/.*login/); // Should bounce to login
    
    // Attempt unauthorized vendor access
    await page.goto(BASE_URL + '/vendor-dashboard');
    await expect(page).toHaveURL(/.*login/);
  });
});
