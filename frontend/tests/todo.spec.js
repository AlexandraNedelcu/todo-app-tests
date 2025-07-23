import { test, expect, request } from '@playwright/test';

const BASE_API_URL = 'http://localhost:4000';

async function clearTodos() {
  const apiContext = await request.newContext();
  const response = await apiContext.delete(`${BASE_API_URL}/items`);
  await apiContext.dispose();
}

test.describe('Todo App UI Tests', () => {
    test.beforeEach(async ({ page }) => {
        await clearTodos();
        await page.goto('/');
        await page.getByPlaceholder('Username').fill('test');
        await page.getByPlaceholder('Password').fill('1234');
        await page.getByRole('button', { name: 'Login' }).click();
    });

    test('Create a new todo item', async ({ page }) => {
        await page.getByPlaceholder('New Todo').fill('Playwright test item');
        await page.getByRole('button', { name: 'Add' }).click();
        await expect(page.getByText('Playwright test item')).toBeVisible();
    });

    test('Edit an existing todo item', async ({ page }) => {
        await page.getByPlaceholder('New Todo').fill('Playwright edit item');
        await page.getByRole('button', { name: 'Add' }).click();
        await expect(page.getByText('Playwright edit item')).toBeVisible();

        const todoItem = page.locator('li', { hasText: 'Playwright edit item' });

        page.on('dialog', async dialog => {
            expect(dialog.type()).toBe('prompt');
            await dialog.accept('Updated item');
        });

        await todoItem.getByRole('button', { name: 'Edit' }).click();
        await expect(page.getByText('Updated item')).toBeVisible();
    });

    test('Delete an existing todo item', async ({ page }) => {
        await page.getByPlaceholder('New Todo').fill('Playwright delete item');
        await page.getByRole('button', { name: 'Add' }).click();
        await expect(page.getByText('Playwright delete item')).toBeVisible();

        const todoItem = page.locator('li', { hasText: 'Playwright delete item' });
        await todoItem.getByRole('button', { name: 'Delete' }).click();
        await expect(page.getByText('Playwright delete item')).toHaveCount(0);
    });
});
