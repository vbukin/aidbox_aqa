import { type Page, type Locator, expect } from '@playwright/test';
import FormsPage from "./FormsPage";

export class ConsolePage {
  readonly page: Page;
  readonly aidboxFormsLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.aidboxFormsLink = page.getByRole('link', { name: 'Aidbox Forms' });
  }

  async navigateToForms() {
    const href = await this.aidboxFormsLink.getAttribute('href');
    const base = new URL(await this.page.url());
    const target = new URL(href!, base.origin).toString();
    
    await this.page.goto(target);
    return new FormsPage(this.page);
  }

  async assertOnConsolePage() {
    await expect(this.page).toHaveURL(/console/, {timeout:30_000});
  }
}


