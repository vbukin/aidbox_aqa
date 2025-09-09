import { type Page, type Locator } from "@playwright/test";

export default class ConsolePage {
  readonly page: Page;
  readonly closeBtn: Locator;
  readonly notificationCloseBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.closeBtn = page.locator(
      'button[data-test-id=outline-header__back-button]',
    );
    this.notificationCloseBtn = page.locator('div[class*=forms_alert] button')
  }

  async closeForm() {
    await this.closeBtn.click();
  }
  
  async closeNotification() {
    await this.notificationCloseBtn.click();
  
  }
}
