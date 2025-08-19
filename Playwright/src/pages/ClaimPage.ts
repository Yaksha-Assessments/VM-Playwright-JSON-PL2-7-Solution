import {test, Locator, Page} from '@playwright/test';
export  default class ClaimPage {

    readonly page: Page;
    private claimButton: Locator;
    private configurationtab: Locator;
    private eventTab: Locator;
    private addBtn: Locator;
    private eventInput: Locator;
    private saveBtn: Locator;
    private deleteToggle: Locator;
    private confirmDel: Locator;
    private checkbox: Locator;
    private expensesubTab: Locator;
    private editExpToggle: Locator;
    private checkboxExpense: Locator;
    private delSelectedbtn: Locator;
    private eventInputt  : Locator;


    constructor(page: Page) {
        this.page = page;
        this.eventInputt = page.locator("//input[@placeholder='Type for hints...']");
        this.delSelectedbtn= page.locator("//button[text()=' Delete Selected ']");
        this.checkboxExpense = page.locator("i.oxd-checkbox-input-icon");
        this.editExpToggle = page.locator("//i[@class='oxd-icon bi-pencil-fill']");
        this.expensesubTab = page.locator("//a[text()='Expense Types']");
        this.checkbox= page.locator("span.oxd-switch-input")
        this.confirmDel = page.locator('//button[text()=" Yes, Delete "]');
        this.deleteToggle = page.locator("//i[@class='oxd-icon bi-trash']")
        this.claimButton = page.locator('//span[text()="Claim"]');
        this.configurationtab = page.locator('//span[text()="Configuration "]');
        this.eventTab = page.locator('//a[text()="Events"]');
        this.addBtn = page.locator('//button[text()=" Add "]');
        this.eventInput = page.locator('//div/input');
        this.saveBtn = page.locator('//button[text()=" Save "]');
        
    }
    

   /**
 * Navigates to the Claim configuration page and opens the Event tab.
 *
 * Steps performed:
 * - Clicks on the Claim menu.
 * - Opens the Configuration sub-tab.
 * - Selects the Event tab.
 * - Waits for the page to load.
 *
 * @returns {Promise<string>} The current page URL after navigating to the Event tab.
 */
async clickClaimButton() {
    await this.claimButton.click();
    await this.page.waitForTimeout(1000);
    await this.configurationtab.click();
    await this.page.waitForTimeout(1000);
    await this.eventTab.click();
    await this.page.waitForTimeout(3000);
    return this.page.url();
}


    



   /**
 * Adds a new event in Claim > Configuration > Event tab.
 * @param eventName - The name of the event to be created.
 * @returns A list of all event names after creation.
 */
async addevents(eventName: string) {
    await this.claimButton.click();
    await this.configurationtab.waitFor({ state: 'visible' });
    await this.configurationtab.click();
    await this.eventTab.waitFor({ state: 'visible' });
    await this.eventTab.click();
    await this.addBtn.waitFor({ state: 'visible' });
    await this.addBtn.click();
    await this.eventInput.nth(1).waitFor({ state: 'visible' });
    await this.eventInput.nth(1).fill(eventName);
    await this.saveBtn.click();
    await this.page.locator("//div[@role='row']/div[2]").locator(`//div[text()='${eventName}']`).waitFor({ state: 'visible' });
    return this.page.locator("//div[@role='row']/div[2]").allInnerTexts();
}

/**
 * Creates an event, deletes it, and returns the updated event list.
 * @param editEventName - Name of the event to add and delete.
 * @returns The list of remaining event names.
 */
async deleteEvents(editEventName: string) {
    await this.claimButton.click();
    await this.configurationtab.waitFor({ state: 'visible' });
    await this.configurationtab.click();
    await this.eventTab.waitFor({ state: 'visible' });
    await this.eventTab.click();
    await this.addBtn.waitFor({ state: 'visible' });
    await this.addBtn.click();
    await this.eventInput.nth(1).waitFor({ state: 'visible' });
    await this.eventInput.nth(1).fill(editEventName);
    await this.saveBtn.click();
    await this.page.waitForTimeout(6000);
    await this.eventInputt.fill(editEventName);
    await this.page.locator("//button[text()=' Search ']").click();
    await this.page.locator(`//div[contains (@class, 'oxd-table-card') and contains(., '${editEventName}')]//i[contains(@class, 'bi-trash')]`).click();
    await this.confirmDel.waitFor({ state: 'visible' });
    await this.confirmDel.click();
    await this.page.waitForTimeout(7000)
    return await this.page.locator("//div[@role='row']/div[2]").allInnerTexts();
}


/**
 * Creates an event, marks it inactive, and returns its status text.
 * @param togEventName - Name of the event to create and inactivate.
 * @returns The status text of the event after inactivation.
 */
async inactivateEvents(togEventName: string) {
    await this.claimButton.click();
    await this.configurationtab.waitFor({ state: 'visible' });
    await this.configurationtab.click();
    await this.eventTab.waitFor({ state: 'visible' });
    await this.eventTab.click();
    await this.addBtn.waitFor({ state: 'visible' });
    await this.addBtn.click();
    await this.eventInput.nth(1).waitFor({ state: 'visible' });
    await this.eventInput.nth(1).fill(togEventName);
    await this.saveBtn.click();
    await this.page.waitForTimeout(6000)
    await this.eventInputt.fill(togEventName);
    await this.page.locator("//button[text()=' Search ']").click();
    await this.page.locator(`//div[contains (@class, 'oxd-table-card') and contains(., '${togEventName}')]//i[contains(@class, 'bi-pencil-fill')]`).click();
    await this.checkbox.waitFor({ state: 'visible' });
    await this.checkbox.click();
    await this.saveBtn.click();
    await this.page.waitForTimeout(6000);
    await this.eventInputt.fill(togEventName);
    await this.page.locator("//button[text()=' Search ']").click();
    return this.page.locator(`//div[contains(@class, 'oxd-table-card') and contains(., '${togEventName}')]/div/div[3]`).innerText();
}


/**
 * Adds a new expense type in Claim > Configuration > Expense Types
 * and returns the updated expense type list.
 * @param expenseName - The unique name for the new expense type.
 * @returns The updated list of expense types.
 */
async addExpense(expenseName: string) {
    await this.claimButton.click();
    await this.configurationtab.waitFor({ state: 'visible' });
    await this.configurationtab.click();
    await this.expensesubTab.waitFor({ state: 'visible' });
    await this.expensesubTab.click();
    await this.addBtn.waitFor({ state: 'visible' });
    await this.addBtn.click();
    await this.eventInput.nth(1).waitFor({ state: 'visible' });
    await this.eventInput.nth(1).fill(expenseName);
    await this.saveBtn.click();
    await this.page.locator("//div[@role='row']/div[2]").locator(`//div[text()='${expenseName}']`).waitFor({ state: 'visible' });
     return this.page.locator("//div[@role='row']/div[2]").allInnerTexts();
}





/**
 * Edits an existing expense type in Claim > Configuration > Expense Types
 * and returns the updated expense type list.
 * @param updatedName - The updated name for the expense type.
 * @returns The updated list of expense types.
 */
async editExpense(editexpenseName: string) {
    await this.claimButton.click();
    await this.configurationtab.waitFor({ state: 'visible' });
    await this.configurationtab.click();
    await this.expensesubTab.waitFor({ state: 'visible' });
    await this.expensesubTab.click();
    await this.editExpToggle.nth(0).waitFor({ state: 'visible' });
    await this.editExpToggle.nth(0).click();
    await this.eventInput.nth(1).waitFor({ state: 'visible' });
    await this.eventInput.nth(1).fill(editexpenseName);
    await this.saveBtn.click();
    await this.page.locator("//div[@role='row']/div[2]").locator(`//div[text()='${editexpenseName}']`).waitFor({ state: 'visible' });
     return this.page.locator("//div[@role='row']/div[2]").allInnerTexts();


}




/**
 * Deletes an existing expense type in Claim > Configuration > Expense Types
 * and returns the updated expense type list.
 * @param expenseName - The name of the expense type to delete.
 * @returns The updated list of expense types.
 */
async deleteExpense(deleteExpenseName: string) {
    await this.claimButton.click();
    await this.configurationtab.waitFor({ state: 'visible' });
    await this.configurationtab.click();
    await this.expensesubTab.waitFor({ state: 'visible' });
    await this.expensesubTab.click();
    await this.addBtn.waitFor({ state: 'visible' });
    await this.addBtn.click();
    await this.eventInput.nth(1).waitFor({ state: 'visible' });
    await this.eventInput.nth(1).fill(deleteExpenseName);
    await this.saveBtn.click();
    await this.page.locator(`//div[contains(@class, 'oxd-table-card') and contains(., '${deleteExpenseName}')]`).waitFor({ state: 'visible' });
    await this.page.locator(`//div[contains (@class, 'oxd-table-card') and contains(., '${deleteExpenseName}')]//i[contains(@class, 'bi-trash')]`).click();
    await this.confirmDel.waitFor({ state: 'visible' });
    await this.confirmDel.click();
    await this.page.locator("//div[@role='row']/div[2]").first().waitFor({ state: 'visible' });
     return this.page.locator("//div[@role='row']/div[2]").allInnerTexts();
}








/**
 * Deletes multiple expense types by selecting their checkboxes and confirming deletion.
 * @param expenseNames - Array of expense type names to delete.
 * @returns Updated expense type list after deletion.
 */
async multipleExpenseDel(deleteExpenseName: string) {
    await this.claimButton.click();
    await this.configurationtab.waitFor({ state: 'visible' });
    await this.configurationtab.click();
    await this.expensesubTab.waitFor({ state: 'visible' });
    await this.expensesubTab.click();
    await this.addBtn.waitFor({ state: 'visible' });
    await this.addBtn.click();
    await this.eventInput.nth(1).waitFor({ state: 'visible' });
    await this.eventInput.nth(1).fill(deleteExpenseName);
    await this.saveBtn.click();
    await this.page.locator("//div[@role='row']/div[2]").locator(`//div[text()='${deleteExpenseName}']`).waitFor({ state: 'visible' });
    await this.checkboxExpense.nth(0).click();
    await this.delSelectedbtn.waitFor({ state: 'visible' });
    await this.delSelectedbtn.click();
    await this.confirmDel.waitFor({ state: 'visible' });
    await this.confirmDel.click();      
    await this.page.locator("//div[@role='row']/div[2]").first().waitFor({ state: 'visible' });
    return this.page.locator("//div[@role='row']/div[2]").allInnerTexts(); 




}

}