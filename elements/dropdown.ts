import { Locator, Page, expect } from "@playwright/test";

export class Dropdown {
  private readonly page: Page;
  private readonly input: Locator;
  private readonly options: Locator;

  constructor(page: Page, comboboxSelector: string = 'input[role="combobox"]') {
    this.page = page;
    this.input = page.locator(comboboxSelector);
    this.options = page.locator(".truncate");
  }

  async open() {
    await this.input.click();
    await expect(this.options.first()).toBeVisible();
  }

  async selectOption(optionText: string) {
    await this.open();
    await this.page.locator(".truncate", { hasText: optionText }).click();
    await expect(this.input).toHaveValue(optionText);
  }

  async getValue(): Promise<string> {
    return this.input.inputValue();
  }

  async checkOptions(expected: string[]) {
    await this.open();
   
     // ждём пока появятся хотя бы какие-то элементы
     await expect(this.options.first()).toBeVisible({ timeout: 5000 });
   
     const count = await this.options.count();
     console.log(`Найдено ${count} элементов`);
     await this.page.screenshot({ path: 'debug-dropdown.png', fullPage: true });
     
   
     const actual = await this.options.allTextContents();
      console.log(`actual ${count} элементов`);
     const normalized = actual.map(x => x.trim()).filter(Boolean);
   
     expect([...new Set(normalized)].sort())
       .toEqual([...new Set(expected)].sort());
    
    
    // await this.open();
    // await expect(this.options.first()).toBeVisible();
    // const actual = await this.options.allTextContents();
    // const normalized = actual.map((x) => x.trim()).filter(Boolean);
    // expect(new Set(normalized)).toEqual(new Set(expected));
  }
}
