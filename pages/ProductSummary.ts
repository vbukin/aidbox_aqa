import { type Page, type Locator, expect } from "@playwright/test";

export class ProductSummary {
  readonly page: Page;
  readonly deleteBoxBtn: Locator;
  readonly deleteBoxField: Locator;

  constructor(page: Page) {
    this.page = page;
    this.deleteBoxBtn = page
      .locator('button[class*="portal_xlicense_summary_view"]')
      .last();
    this.deleteBoxField = page.locator('input[id*="identifier.delete-form"]');
  }

  async deleteBox(productName: string) {
    await this.deleteBoxBtn.click();
    await this.deleteBoxField.fill(productName);
    await this.deleteBoxBtn.click();
  }
}
