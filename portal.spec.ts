import { test } from "@playwright/test";
import { config } from "./config";
import { LoginPage } from "./pages/LoginPage";
import { AddProjectPage } from "./pages/AddProjectPage";
import FormsPage from "./pages/FormsPage";
import { ConsolePage } from "./pages/ConsolePage";
import { QuestionnaireImport } from "./pages/QuestionnaireImport";
import FormEditor from "./pages/FormEditor";
import MyCustomReport, { title, threeElementsForm } from "./reports/myCustomReport";
import { SideBar } from "./pages/SideBar";

test.describe("Aidbox Portal", () => {
  let dashboardPageUrl: string;

  test.beforeEach("should sign in and create a new aidbox instance", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    const dashboardPage: AddProjectPage = await loginPage.login(config.username, config.password);

    await dashboardPage.assertOnDashboardPage();
    dashboardPageUrl = page.url();

    const sideBar = new SideBar(page);
    const settings = await sideBar.openSettings();
    settings.deleteProject();

    const consolePage: ConsolePage = await dashboardPage.createNewAidboxInstance("testForm");

    await consolePage.assertOnConsolePage();
    const formsPage: FormsPage = await consolePage.navigateToForms();
    await formsPage.assertOnFormsPage();
  });

  test("Create Form Template", async ({ page }) => {
    const formsPage = new FormsPage(page);

    await formsPage.createTemplateBtnClick();
    const questionnaireImport: QuestionnaireImport = await formsPage.questionnaireBtnClick();

    await questionnaireImport.fillQuestionnaireTextField(threeElementsForm);
    const formEditor: FormEditor = await questionnaireImport.submit();
    await formEditor.closeNotification();
    await formEditor.closeForm();

    await formsPage.checkFormsMoreThen(0);
    await formsPage.checkSelectFormButtonsCount(1);
    await formsPage.previewBtnClick(0);

    const myCustomReport = new MyCustomReport(page);
    await myCustomReport.checkHeader(title);
    await myCustomReport.checkLabelOfElement("Textarea", 0);
    await myCustomReport.textFieldIsEqual("");
    const text = "123asd";
    await myCustomReport.fillTextField(text);
    await myCustomReport.checkLabelOfElement("Integer Input", 1);
    await myCustomReport.intFieldIsEqual("");

    await myCustomReport.assertIntegerFieldRejectsText("abc");
    await myCustomReport.intFieldIsEqual("");

    const intValue = "123";
    await myCustomReport.fillIntegerField(intValue);
    await myCustomReport.intFieldIsEqual(intValue);

    await myCustomReport.checkLabelOfElement("Choice Input", 2);
    await myCustomReport.checkDropdownOptions(["test", "test2"]);
  });
});
