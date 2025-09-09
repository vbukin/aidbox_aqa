import { type Page, type Locator, expect } from "@playwright/test";
import FormEditor from "./FormEditor";

export class QuestionnaireImport {
  readonly page: Page;

  readonly questionnaireTextField: Locator;
  readonly submitBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.questionnaireTextField = page.locator(".cm-content");
    this.submitBtn = page.locator('button:has-text("Submit")');
  }

  async fillQuestionnaireTextField(text: string) {
    await this.questionnaireTextField.fill(text);
  }

  async submit() {
    await expect(this.submitBtn).toBeEnabled();
    await this.submitBtn.click();
    return new FormEditor(this.page);
  }
}
