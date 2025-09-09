import { type Page, type Locator} from "@playwright/test";
import { ProjectSettings } from "./ProjectSettings";

export class SideBar {
  readonly page: Page;
  readonly settings: Locator;

  constructor(page: Page) {
    this.page = page;
    this.settings = page.getByRole('link', { name: 'Settings' });
  }

  async openSettings() {
    await this.settings.click()
    return new ProjectSettings(this.page)
  }
}
