import { type Page, type Locator, expect } from "@playwright/test";
import { QuestionnaireImport } from "./QuestionnaireImport";

export default class FormsPage {
  readonly page: Page;
  readonly formTemplatesHeader: Locator;
  readonly createTemplateBtn: Locator;
  readonly questionnaireBtn: Locator;
  readonly forms: Locator;
  readonly previewBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.formTemplatesHeader = page.locator('span:has-text("Form Templates")');
    this.createTemplateBtn = page.locator(
      '[data-test-id="questionnaire-grid__create-template-button"]',
    );
    this.questionnaireBtn = page.locator(
      '[data-test-id="questionnaire-grid__import-questionnaire-button"]',
    );
    this.forms = page.locator('div[data-test-id= questionnaire-grid__select-form-button]')
    this.previewBtn = page.locator(
      '[data-test-id="questionnaire-grid__preview-button"]',
    );
  }

  async assertOnFormsPage() {
    await expect(this.formTemplatesHeader).toBeVisible();
  }

  async createTemplateBtnClick() {
    this.createTemplateBtn.click();
  }
  async questionnaireBtnClick() {
    this.questionnaireBtn.click();
    return new QuestionnaireImport(this.page);
  }
  
  async checkFormsMoreThen(expectedCount: number) {
    await expect.poll(async () => await this.forms.count(), {
      message: `Ожидал что количество forms станет больше ${expectedCount}`,
    }).toBeGreaterThan(expectedCount);
  }

  
  async checkSelectFormButtonsCount(expectedCount: number) {
    const count = await this.forms.count();
    expect(count).toBe(expectedCount);
  }
  
  async previewBtnClick(index: number) {
    await this.previewBtn.nth(index).click();
  }
}
