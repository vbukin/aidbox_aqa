import { type Page, type Locator } from "@playwright/test";

export class ProjectSettings {
  readonly page: Page;
  readonly deleteProjectBtn: Locator;
  readonly deleteProjectConfirmBtn: Locator;
  constructor(page: Page) {
    this.page = page;
    this.deleteProjectBtn = page.locator("#delete-project-button");
    this.deleteProjectConfirmBtn = page.locator("#confirm-delete-project-button");
  }

  async deleteProject() {
    await this.deleteProjectBtn.click();
    await this.deleteProjectConfirmBtn.click();
  }
}
