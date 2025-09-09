import { type Page, type Locator, expect } from "@playwright/test";
import { ConsolePage } from "./ConsolePage";

export class AddProjectPage {
  readonly page: Page;
  readonly createAidboxButton: Locator;
  readonly licenseNameInput: Locator;
  readonly sandBoxOption: Locator;
  readonly createButton: Locator;
  readonly aidBox: Locator;
  readonly projectRow: Locator;
  constructor(page: Page) {
    this.page = page;
    this.createAidboxButton = page.locator('span:has-text("Create Aidbox")');
    this.licenseNameInput = page.locator(
      '[id="portal.xlicense.form.model/index.create-form.license-name"]',
    );
    this.sandBoxOption = page.locator(
      'span[class*="portal_xlicense"]:has-text("Sandbox")',
    );
    this.createButton = page.locator('span:has-text("Create")');
    this.aidBox = page.locator('span:has-text("Newest version")');
    this.projectRow = page.locator('div[itemprop="name"][class*="xlicense"]');
  }

  async createNewAidboxInstance(licenseName: string) {
    await this.createAidboxButton.click();
    await this.licenseNameInput.fill(licenseName);

    await this.sandBoxOption.click();
    await this.aidBox.click();
    await this.page.waitForTimeout(1000);
    await this.createButton.click();
    return new ConsolePage(this.page);
  }

  async assertOnDashboardPage() {
    await expect(this.page).toHaveURL(/project/);
    await expect(this.createAidboxButton).toBeVisible();
  }

  async deleteProjectClick() {
    await this.projectRow.first().click();
  }
}
