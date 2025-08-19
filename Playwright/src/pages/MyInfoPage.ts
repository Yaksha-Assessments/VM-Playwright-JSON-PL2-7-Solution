import { Locator, Page } from "@playwright/test";
import { test, expect } from '@playwright/test';

import path from "path";
const filePath = path.resolve(__dirname, "../../TestImage.jpg");

export class MyInfoPage {
  readonly page: Page;
  private gpa: Locator;
  private table: Locator;
  private languageComment : Locator;
  private editEducationBtn: Locator;
  private selectDropdown : Locator;
  private checkBox : Locator;
  private confirmDel: Locator;
  private editBtn : Locator;
  private saveQualiBtn:Locator;
  private Myinfo: Locator;
  private compInput :Locator;
   private qualificationBtn: Locator;
  private expAddbtn : Locator;
  private title : Locator;
  private delBtn: Locator;
  private delEducationBtn: Locator;
  private skillInput : Locator;
  private yearInput: Locator;
  private tableYear : Locator;
  private delSelected: Locator;
  constructor(page: Page) {
    this.page = page;
    this.delSelected = page.locator("//button[text()=' Delete Selected ']");
    this.tableYear = this.page.locator("(//div[@class='orangehrm-container']//div[@class='oxd-table-card'])[3]//button[@class='oxd-icon-button oxd-table-cell-action-space'][2]");
    this.table = this.page.locator("//div[@class='orangehrm-container']");
    this.languageComment= page.locator("//textarea[@class='oxd-textarea oxd-textarea--active oxd-textarea--resize-vertical']");
    this.yearInput= page.locator("//input[@class='oxd-input oxd-input--active']");
    this.skillInput= page.locator("//div[@class='oxd-select-text-input']");
    this.delEducationBtn = page.locator("(//div[contains(@class,'orangehrm-container')])[2]//div[contains(@class,'oxd-table-card')][1]//i[contains(@class, 'bi-trash')]")
    this.editEducationBtn=page.locator("(//div[contains(@class,'orangehrm-container')])[2]//div[contains(@class,'oxd-table-card')][1]//i[contains(@class, 'oxd-icon bi-pencil-fill')]")
    this.gpa = page.locator("//div[@class='oxd-table-row oxd-table-row--with-border']/div[4]");
    this.selectDropdown = page.locator("//div[text()='-- Select --']");
    this.checkBox= page.locator("//i[@class='oxd-icon bi-check oxd-checkbox-input-icon']");
    this.confirmDel = page.locator("//div[@class='orangehrm-modal-footer']/button[2]");
    this.editBtn= page.locator("//div[@class='oxd-table-cell-actions']/button[2]");
    this.delBtn= page.locator("//div[@class='oxd-table-cell-actions']/button[1]");
    this.title =page.getByLabel('Job Title');
    this.saveQualiBtn = page.locator("//button[text()=' Save ']");
    this.compInput=page.locator("//input[@class='oxd-input oxd-input--active']");
    this.expAddbtn = page.locator("//button[@class='oxd-button oxd-button--medium oxd-button--text']");
    this.Myinfo = page.locator("//span[text()='My Info']");
    
    this.qualificationBtn = page.locator("//a[text()='Qualifications']");
    
  }


  /**
 * Adds a qualification record for the user.
 *
 * Fills company and job title, saves the entry, and returns the updated list.
 *
 * @param compInput - Company name
 * @param jobTitle - Job title
 * @returns List of qualification entries
 */

  async addQualification(compInput: string, jobTitle: string){
    await this.Myinfo.click();
    await this.page.waitForTimeout(2000);
    await this.qualificationBtn.click();
    await this.expAddbtn.nth(0).click();

    await this.compInput.nth(1).fill(compInput);
    await this.page.locator("//label[text()='Job Title']").click();
    await this.compInput.nth(2).fill(jobTitle);
    await this.saveQualiBtn.click();
    await this.page.locator(`//div[contains(@class, 'oxd-table-card') and contains(., '${compInput}')]`).waitFor({ state: 'visible' });
    await this.page.waitForTimeout(3000);
    return this.page.locator("//div[@class='oxd-table']").nth(0).locator("//div/div/div/div[2]").allInnerTexts();

  }


  /**
 * Edits an existing qualification entry.
 *
 * Updates the company name and returns the updated list.
 *
 * @param editInput - Updated company name
 * @returns List of qualification entries
 */

  async editQualification(editInput: string){
    await this.Myinfo.click();
    await this.page.waitForTimeout(2000);
    await this.qualificationBtn.click();
     await this.page.waitForTimeout(2000);
    await this.editBtn.nth(0).click();
    await this.page.waitForTimeout(4000);
    await this.compInput.nth(1).fill(editInput);
    await this.page.waitForTimeout(1000);
    await this.page.locator("//label[text()='Job Title']").click();
    await this.page.waitForTimeout(1000);
    await this.compInput.nth(1).fill(editInput);
    await this.saveQualiBtn.click();
    
    await this.page.waitForTimeout(7000);
    return this.page.locator("//div[@class='oxd-table']").nth(0).locator("//div/div/div/div[2]").allInnerTexts();


    

  }


  /**
 * Adds and deletes a qualification entry.
 *
 * Adds a qualification with the provided company name, deletes it, and returns the updated list.
 *
 * @param delUser - Company name to be added and then deleted
 * @param jobTitle - Job title associated with the qualification
 * @returns List of remaining qualification entries
 */



  async deleteQualification(delUser: string, jobTitle: string){
    await this.Myinfo.click();
    await this.page.waitForTimeout(2000);
    await this.qualificationBtn.click();
    await this.expAddbtn.nth(0).click();

    await this.compInput.nth(1).fill(delUser);
    await this.page.locator("//label[text()='Job Title']").click();
    await this.compInput.nth(2).fill(jobTitle);
    await this.saveQualiBtn.click();
    await this.page.locator(`xpath=//div[text()='${delUser}']/ancestor::div[contains(@class,'oxd-table-row')]//div[@class='oxd-table-cell-actions']/button[1]`).waitFor({ state: 'visible' });
    const deleteBtn = this.page.locator(`xpath=//div[text()='${delUser}']/ancestor::div[contains(@class,'oxd-table-row')]//div[@class='oxd-table-cell-actions']/button[1]`).click();
    await this.page.waitForTimeout(1000);
    await this.confirmDel.click();
    await this.page.waitForTimeout(7000);
    return this.page.locator("//div[@class='oxd-table']").nth(0).locator("//div/div/div/div[2]").allInnerTexts();
    



  }

  /**
 * Deletes multiple selected qualification entries.
 *
 * Selects specific checkboxes, deletes the entries, and returns the toast confirmation message.
 *
 * @returns Success message text after deletion
 */

////div[@class='orangehrm-container']/div/div/div/div/div[2]
  async deleteMultiple(){
    await this.Myinfo.click();
    await this.page.waitForTimeout(2000);
    await this.qualificationBtn.click();
    await this.page.waitForTimeout(2000);
    await this.page.locator("//div[@class='orangehrm-container']").nth(0).locator("//i[@class='oxd-icon bi-check oxd-checkbox-input-icon']").nth(1).click();
    await this.delBtn.nth(0).click();
    await this.confirmDel.click();
   await this.page.locator('.oxd-toast').nth(0).waitFor({ state: 'visible' });
   return await this.page.locator('.oxd-toast').nth(0).textContent();
  }


  /**
 * Adds a new education entry with the given GPA to the user's qualifications.
 *
 * Selects an education level, inputs GPA, and saves the entry.
 *
 * @param GPA - The GPA value to be added.
 * @returns A list of all GPA entries after addition.
 */


  async addEducation(GPA:string){
    await this.Myinfo.click();
    await this.qualificationBtn.waitFor({ state: 'visible' });
    await this.qualificationBtn.click();
    await this.expAddbtn.nth(1).click();
    await this.page.waitForTimeout(2000);
    await this.selectDropdown.click();
    await this.page.keyboard.press('ArrowDown');
    await this.page.keyboard.press('Enter');
    await this.compInput.nth(4).fill(GPA);
    await this.saveQualiBtn.click();
    await this.page.waitForTimeout(7000);
    return this.page.locator("//div[contains(@class, 'orangehrm-container')]").nth(1).locator("//div[@role='row']/div[4]").allInnerTexts();
    


  }


  /**
 * Adds a skill with a given year, deletes it, and returns the updated skills list.
 * @param year - The unique year value to identify the skill.
 * @returns The updated list of skills after deletion.
 */
async deleteskills(year: number) {
    await this.Myinfo.click();
    await this.page.waitForTimeout(2000);
    await this.qualificationBtn.click();
    await this.page.waitForTimeout(1000);
    await this.expAddbtn.nth(2).waitFor({ state: 'visible' });
    await this.expAddbtn.nth(2).click();
    await this.page.waitForTimeout(2000);
    await this.skillInput.scrollIntoViewIfNeeded();
    await this.skillInput.nth(0).click();
    await this.page.waitForTimeout(2000);
    await this.page.keyboard.press('ArrowDown');
    await this.page.keyboard.press('Enter');
    await this.yearInput.nth(1).fill(year.toString());
    await this.saveQualiBtn.nth(0).click();
    await this.page.waitForTimeout(6000);
    await this.page.locator(`//div[contains(@class, 'oxd-table-row--with-border') and contains(.,'${year}')]//i[contains(@class,'bi-trash')]`).nth(0).click();
    await this.page.waitForTimeout(1000);
    await this.confirmDel.click();
    await this.page.waitForTimeout(7000)
    return this.page.locator("//div[contains(@class, 'orangehrm-container')]").nth(2).locator("//div[@role='row']/div[3]/div").allInnerTexts();
}


  /**
 * Adds a skill with a given year, selects it using its checkbox,
 * deletes it via "Delete Selected" option, and returns the updated skills list.
 * @param year - The unique year value to identify the skill.
 * @returns The updated list of skills after deletion.
 */
async selectDeleteSkills(year: number) {
    await this.Myinfo.click();
    await this.page.waitForTimeout(2000);
    await this.qualificationBtn.click();
    await this.expAddbtn.nth(2).waitFor({ state: 'visible' });
    await this.expAddbtn.nth(2).click();
     await this.page.waitForTimeout(1500);
    await this.skillInput.nth(0).waitFor({ state: 'visible' });
    await this.skillInput.scrollIntoViewIfNeeded();
    await this.skillInput.nth(0).click();
   
    await this.page.keyboard.press('ArrowDown');
    await this.page.keyboard.press('Enter');
    await this.yearInput.nth(1).fill(year.toString());
    await this.saveQualiBtn.nth(0).click();
    await this.page.locator(`//div[contains(@class,'oxd-table-row--with-border') and contains(.,'${year}')]`).nth(0).waitFor({ state: 'visible' }); 
    await this.page.locator(`//div[contains(@class, 'oxd-table-row--with-border') and contains(.,'${year}')]//i[contains(@class,'oxd-checkbox-input-icon')]`).nth(0).click();
    await this.page.waitForTimeout(1000);
    await this.delSelected.click();
    await this.confirmDel.click();
    await this.page.waitForTimeout(7000);
    return this.page.locator("//div[contains(@class, 'orangehrm-container')]").nth(2).locator("//div[@role='row']/div[3]/div").allInnerTexts();
}


  




}
