import { test, expect } from '@playwright/test';

test.describe('Todo App UI Tests', () => {
    test('Login with valid credentials', async ({ page }) => {
        await page.goto('/');
        await page.getByPlaceholder('Username').fill('test');
        await page.getByPlaceholder('Password').fill('1234');
        await page.getByRole('button', { name: 'Login' }).click();
        await expect(page.getByText('Todo List')).toBeVisible();
    });

    test('Login with invalid credentials shows error', async ({ page }) => {
        await page.goto('/');
        await page.getByPlaceholder('Username').fill('wrong');
        await page.getByPlaceholder('Password').fill('wrong');
        page.on('dialog', dialog => dialog.accept());
        await page.getByRole('button', { name: 'Login' }).click();
    });
});