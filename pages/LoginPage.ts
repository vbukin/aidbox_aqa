import { type Page, type Locator, expect } from '@playwright/test';
import { AddProjectPage } from "./AddProjectPage";

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator('#sign-in-email');
    this.passwordInput = page.locator('input[placeholder="password"]');
    this.loginButton = page.locator('span:has-text("Log in")').first();
  }

  async goto() {
    await this.page.goto('https://aidbox.app/ui/portal#/signin', { waitUntil: 'networkidle' });
  }

  async login(username: string, password?: string) {
    await this.emailInput.fill(username);
    if (password) {
        await this.passwordInput.fill(password);
    }
    await this.loginButton.click();
    await expect(this.page).toHaveURL(/license/);
    return new AddProjectPage(this.page);
  }
}
