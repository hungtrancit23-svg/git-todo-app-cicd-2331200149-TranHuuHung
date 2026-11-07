const { test, expect, _electron: electron } = require('@playwright/test');

test('End-to-end user workflow', async () => {
    const electronApp = await electron.launch({ args: ['.'] });
    const window = await electronApp.firstWindow();
    await window.waitForLoadState('domcontentloaded');

    const taskText = 'My new E2E test task';

    const input = window.locator('#todo-input, input[type="text"]');
    await input.fill(taskText);
    
    const addButton = window.locator('button:has-text("Add"), #add-btn').first();
    await addButton.click();

    const todoItem = window.locator('.todo-item, li', { hasText: taskText }).first();
    await expect(todoItem).toBeVisible();

    const checkbox = todoItem.locator('input[type="checkbox"]');
    await checkbox.click();
    await expect(todoItem).toHaveClass(/completed/);

    const deleteButton = todoItem.locator('.delete-btn, button:has-text("Delete")').first();
    await deleteButton.click();
    await expect(deleteButton).not.toBeVisible();

    await electronApp.close();
});