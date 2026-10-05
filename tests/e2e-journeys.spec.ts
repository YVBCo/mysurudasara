import { test, expect } from '@playwright/test';

test.describe('Mysuru Dasara End-to-End Journeys', () => {
  
  test('A. New visitor -> Home -> search event', async ({ page }) => {
    // Navigate to Home
    await page.goto('http://localhost:3000/');
    
    // Check title
    await expect(page).toHaveTitle(/Mysuru Dasara/);
    
    // Verify hero section is present
    await expect(page.locator('h1').filter({ hasText: 'Mysuru Dasara' })).toBeVisible();
    
    // Navigate to Events
    await page.getByRole('link', { name: 'Events', exact: true }).first().click();
    
    // Verify Events page loads
    await expect(page.locator('h1').filter({ hasText: 'Events & Programs' })).toBeVisible();
    
    // Interact with search (mock)
    const searchInput = page.getByPlaceholder('Search events...');
    await searchInput.fill('Jumbo Savari');
    await expect(searchInput).toHaveValue('Jumbo Savari');
  });

  test('B. Visitor -> Sports -> categories', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    
    // Navigate to Sports
    await page.getByRole('link', { name: 'Sports', exact: true }).first().click();
    
    // Verify Sports page loads
    await expect(page.locator('h1').filter({ hasText: 'Sports Hub' })).toBeVisible();
    
    // Verify traditional sports category exists
    await expect(page.locator('text=Traditional (Nada Kusti)')).toBeVisible();
  });

  test('C. Visitor -> Melas -> stall discovery', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    
    // Navigate to Melas
    await page.getByRole('link', { name: 'Melas', exact: true }).first().click();
    
    // Verify Melas page loads
    await expect(page.locator('h1').filter({ hasText: 'Melas & Stalls' })).toBeVisible();
    
    // Verify featured Aahara Mela is present
    await expect(page.locator('h2').filter({ hasText: 'Aahara Mela' })).toBeVisible();
    
    // Verify specific stall is present
    await expect(page.locator('text=Mylari Dosa')).toBeVisible();
  });

  test('D. Visitor -> Map -> layers', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    
    // Navigate to Map
    await page.getByRole('link', { name: 'Map', exact: true }).first().click();
    
    // Verify Map controls are visible
    await expect(page.locator('h2').filter({ hasText: 'Map Controls' })).toBeVisible();
    
    // Verify layer buttons
    await expect(page.locator('button').filter({ hasText: 'Events' })).toBeVisible();
    await expect(page.locator('button').filter({ hasText: 'Food' })).toBeVisible();
  });
});
