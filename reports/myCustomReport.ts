import { type Page, type Locator, expect } from "@playwright/test";
import { Dropdown } from "../elements/dropdown";

export default class MyCustomReport {
  readonly page: Page;
  readonly header: Locator;
  readonly titleOfElement: Locator;
  readonly dropDown: Dropdown;
  readonly textField: Locator;
  readonly integerField: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = page.locator("header h1");
    this.titleOfElement = page.locator("#aidbox-form label  p");
    this.dropDown = new Dropdown(page);
    this.textField = page.locator("#aidbox-form textarea");
    this.integerField = page.locator('#aidbox-form input[label="Integer Input"]');
  }

  async checkHeader(text: string) {
    await expect(this.header).toHaveText(text);
  }

  async checkLabelOfElement(text: string, index: number) {
    await expect(this.titleOfElement.nth(index)).toHaveText(text);
  }

  async fillTextField(text: string) {
    await this.textField.fill(text);
  }

  async textFieldIsEqual(text: string) {
    await expect(this.textField).toHaveText(text);
  }

  async intFieldIsEqual(text: string) {
    await expect(this.integerField).toHaveValue(text);
  }

  async fillIntegerField(text: string) {
    await this.integerField.fill(text);
  }

  async assertIntegerFieldRejectsText(text: string) {
    await expect(this.integerField.fill(text)).rejects.toThrow(/Cannot type text into input\[type=number\]/);
  }

  async checkDropdownOptions(options: string[]) {
    await this.dropDown.checkOptions(options);
  }
}

export const title = "My new Test Form";
export const threeElementsForm = `{
  "resourceType": "Questionnaire",
  "title": "${title}",
  "id": "16ba2bc3-40a5-4553-be79-48775e26070d",
  "status": "draft",
  "url": "http://forms.aidbox.io/questionnaire/new-form",
  "meta": {
    "lastUpdated": "2025-09-03T05:22:00.710015Z",
    "versionId": "21",
    "extension": [
      {
        "url": "https://fhir.aidbox.app/fhir/StructureDefinition/created-at",
        "valueInstant": "2025-09-03T05:22:00.710015Z"
      }
    ]
  },
  "item": [
    {
      "text": "Textarea",
      "type": "text",
      "linkId": "8awMrfUr"
    },
    {
      "text": "Integer Input",
      "type": "integer",
      "linkId": "rd18FrTC"
    },
    {
      "text": "Choice Input",
      "type": "choice",
      "linkId": "sYzeH5Vh",
      "answerOption": [
        {
          "valueCoding": {
            "code": "1",
            "system": "1",
            "display": "test"
          }
        },
        {
          "valueCoding": {
            "code": "2",
            "system": "2",
            "display": "test2"
          }
        }
      ]
    }
  ]
  }`;
