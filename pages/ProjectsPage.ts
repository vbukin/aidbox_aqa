import { type Page, type Locator, expect } from "@playwright/test";
import { ProductSummary } from "./ProductSummary";

export class ProjectsPage {
  readonly page: Page;
  readonly statusBtn: Locator;
  readonly row: Locator;
  constructor(page: Page) {
    this.page = page;
    this.statusBtn = page.locator(".licenses-grid").getByText("Active");
    this.row = page.locator('div[itemtype="licenses-grid"] > a');
  }

  async openProductSummary(index: number) {
    await this.row.nth(index).click();
    return new ProductSummary(this.page)
  }
  
  async checkProjectsEqual(expectedCount: number) {
    await expect.poll(
      async () => await this.row.count(),
      {
        message: `Ожидается, что количество forms станет равно ${expectedCount}`,
      }
    ).toEqual(expectedCount);
    
    await expect(this.page.locator('.skeleton-loader, .error-icon')).toHaveCount(0);

  }

}
