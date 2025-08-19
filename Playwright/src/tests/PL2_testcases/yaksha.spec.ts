import { chromium, test } from "playwright/test";
import { Page, Locator, expect } from "@playwright/test";
import LoginPage from "src/pages/LoginPage";
import claimPage from "../../pages/ClaimPage"
import { MyInfoPage } from "src/pages/MyInfoPage";
;

import * as fs from 'fs';
import * as path from 'path';
const downloads = path.resolve(__dirname, '../../downloads');
const data = JSON.parse(JSON.stringify(require("../../Data/login.json")));


test.describe("Yaksha", () => {
  let loginPage: LoginPage;
  let myinfoPage: MyInfoPage;
  let ClaimPage: claimPage;

  test.beforeEach(async ({ page }, testInfo) => {
    await page.goto("https://yakshahrm.makemylabs.in/orangehrm-5.7");
    loginPage = new LoginPage(page);
    myinfoPage = new MyInfoPage(page);
    ClaimPage = new claimPage(page);
    
    await loginPage.performLogin();
  });






  /**
 * Test Case 1: Verify that a new Qualification can be added to a user's record
 *
 * Purpose:
 * Ensures that a user can successfully add a new qualification entry with specified company and job title.
 *
 * Steps:
 * 1. Generate a unique company name for input.
 * 2. Navigate to the "My Info" > Qualifications section.
 * 3. Fill out and submit the form with company and job title.
 * 4. Retrieve the list of qualification entries.
 * 5. Assert that the list contains the newly added company name.
 */

  test("TS_1 Verify New 'Qualification' could be added to the record of user", async ({ page }) => {
  const compnameInput = generateUniqueCompanyName();
  const jobTitle = "bb22";

  const qualifications = await myinfoPage.addQualification(compnameInput, jobTitle);
  expect(qualifications && qualifications.length > 0).toBeTruthy();

  expect(qualifications).toContain(compnameInput);
});






   /**
 * Test Case: Verify New 'Qualification' added could be edited from the record of user
 *
 * Purpose:
 * Ensures that a qualification entry can be edited and the update is reflected in the list.
 *
 * Steps:
 * 1. Navigate to the qualification section.
 * 2. Edit the first entry with new company name.
 * 3. Verify the updated company name appears in the list.
 */


  test("TS-2 Verify New 'Qualification' added could be edited from the record of user ", async ({ page }) => {
    const editInput = generateUniqueEditName();
   const editlist= await myinfoPage.editQualification(editInput);
    expect(editlist && editlist.length > 0).toBeTruthy();

    expect(editlist).toContain(editInput);
    
  });





   /**
 * Test Case: Verify the qualification could be deleted
 *
 * Purpose:
 * Validates that a qualification entry added to the user's record can be deleted successfully.
 *
 * Steps:
 * 1. Generate a unique company name for the qualification.
 * 2. Add the qualification using the generated company name and job title.
 * 3. Locate and trigger the delete action for the added qualification.
 * 4. Confirm the deletion.
 * 5. Retrieve the list of remaining qualifications.
 * 6. Assert that the deleted qualification no longer appears in the list.
 */


  test("TS-3 Verify the qualification could be deleted", async ({
    page,
  }) => {
    const delUser = generateUniqueCompanyName();
    const jobTitle = "bb22";
    const delList= await myinfoPage.deleteQualification(delUser,jobTitle)
    expect(delList && delList.length > 0).toBeTruthy();

    expect(delList).not.toContain(delUser);
  });

 



 /**
 * Test Case: Verify the qualification select delete functionality
 *
 * Purpose:
 * Ensures that multiple qualifications can be selected and deleted successfully.
 *
 * Steps:
 * 1. Navigate to the user's qualification section.
 * 2. Trigger selection of multiple qualifications using checkboxes.
 * 3. Initiate and confirm the delete action.
 * 4. Capture the toast message after deletion.
 * 5. Assert that the success message confirms the deletion.
 */


  test("TS-4 Verify the qualification select delete functionality", async ({ page }) => {
  const successMessage = await myinfoPage.deleteMultiple();
   expect(successMessage && successMessage.length > 0).toBeTruthy();

  expect(successMessage).toContain("SuccessSuccessfully Deleted×");
});





 /**
 * Test Case 5: Verify New 'Education' could be added to the record of user
 *
 * Purpose:
 * Validates that a user can successfully add a new education entry to their qualification record.
 *
 * Steps:
 * 1. Generate a unique GPA value.
 * 2. Navigate to the Education section and fill in required fields.
 * 3. Submit the education form.
 * 4. Capture the updated education list.
 * 5. Assert that the new GPA value appears in the list.
 */


  test("TS-5 Verify New 'Education' could be added to the record of user", async ({
    page,
  }) => {
    const timestamp = Date.now();
    const GPA =`$GPA_${timestamp}`;
   const GPAList =  await myinfoPage.addEducation(GPA);
   expect(GPAList && GPAList.length > 0).toBeTruthy();

    expect(GPAList).toContain(GPA);
   
  });





 /**
 * Test Case: TC-6 Verify Event Tab URL in Claim Configuration
 *
 * Objective:
 * Ensure that navigating to the Claim > Configuration > Event tab
 * leads to the correct URL.
 *
 * Steps:
 * 1. Navigate to Claim > Configuration > Event.
 * 2. Capture the page URL after loading the Event tab.
 * 3. Assert that the URL contains the expected path.
 *
 * Expected:
 * The URL should contain "claim/viewEvents".
 */
test("TC-6 Verify Event tab URL in Claim configuration", async () => {
    const url = await ClaimPage.clickClaimButton();
    expect(url).toContain("https://yakshahrm.makemylabs.in/orangehrm-5.7/web/index.php/claim/viewEvents");
});



 /**
 * Test Case: TS-7 Verify Event creation in Claim configuration
 *
 * Objective:
 * Ensure that a new event can be created in Claim > Configuration > Event,
 * and that the created event appears in the list.
 *
 * Steps:
 * 1. Generate a unique event name.
 * 2. Add the event via Claim configuration.
 * 3. Verify the list contains the newly created event.
 *
 * Expected:
 * The event name should appear in the event list after creation.
 */
test("TS-7 Verify Event creation in Claim configuration", async ({ page }) => {
  const eventName = `Event_${Math.floor(Math.random() * 1000)}`;
  
  const list = await ClaimPage.addevents(eventName);
  expect(list && list.length > 0).toBeTruthy(); // Ensure the list is not empty
  expect(list).toContain(eventName); // Ensure the event name is in the list
});





  /**
 * Test Case: TS-8 Verify Event Deletion in Claim Configuration
 *
 * Objective:
 * Ensure that an event in Claim > Configuration > Event can be deleted
 * and that it no longer appears in the event list.
 *
 * Steps:
 * 1. Create an event with a unique name.
 * 2. Delete the created event.
 * 3. Verify that the event list is not empty and does not contain the deleted event.
 *
 * Expected:
 * The deleted event should no longer appear in the list.
 */
test("TS-8 Verify Event Deletion in Claim Configuration", async ({ page }) => {
  const eventName = `EventD_${Math.floor(Math.random() * 1000)}`;
  const List = await ClaimPage.deleteEvents(eventName);
  expect(List.length).toBeGreaterThan(0);
  expect(List).not.toContain(`${eventName}`);
});







/**
 * Test Case: TS-9 Event Inactive in Claim Configuration
 *
 * Objective:
 * Ensure that an event in Claim > Configuration > Event can be marked as inactive
 * and its status changes accordingly.
 *
 * Steps:
 * 1. Create an event with a unique name.
 * 2. Edit the event and disable the "Active" toggle.
 * 3. Save changes and verify the status is "Inactive".
 *
 * Expected:
 * The event status should display as "Inactive".
 */
test("TS-9 Event Inactive in Claim Configuration", async ({ page }) => {
  const eventName = `Toggle_${Math.floor(Math.random() * 10000)}`;
  const status = await ClaimPage.inactivateEvents(eventName);
  expect(status).toBe("Inactive");
});








/**
 * Test Case: TS-10 Verify that a new Expense Type can be added
 *
 * Objective:
 * Confirm that an expense type can be created under Claim > Configuration > Expense Types,
 * and that the newly added expense appears in the expense type list.
 *
 * Steps:
 * 1. Login with valid credentials.
 * 2. Navigate to Claim tab.
 * 3. Open Configuration sub-tab.
 * 4. Select Expense Types.
 * 5. Add a new expense type with a unique name.
 * 6. Verify the new expense type appears in the list.
 *
 * Expected:
 * The added expense type should be visible in the expense type list.
 */

test("TS-10 Verify that a new Expense Type can be added", async ({ page }) => {
  const expenseName = `Expnse_${Math.floor(Math.random() * 1000)}`;
  
  const list = await ClaimPage.addExpense(expenseName);
  expect(list && list.length > 0).toBeTruthy(); // Ensure the list is not empty
  expect(list).toContain(expenseName);
  });


/**
 * Test Case: TS-11 Delete Skill from My Info
 *
 * Objective:
 * Verify that a skill can be added and then deleted from My Info > Qualifications > Skills,
 * and that it no longer appears in the list.
 *
 * Steps:
 * 1. Add a skill with a unique year value.
 * 2. Delete the added skill.
 * 3. Verify the list is not empty and does not contain the deleted year.
 *
 * Expected:
 * The deleted skill should no longer appear in the skills list.
 */
test("TS-11 Verify the 'Skills' could be deleted from the record", async ({ page }) => {
  const year = Math.floor(Math.random() * 100) - 1;
  const skillList = await myinfoPage.deleteskills(year); 
  expect(skillList.length).toBeGreaterThan(0);
  expect(skillList).not.toContain(year);
});


  
/**
 * Test Case: TS-12 Delete Skill using "Select and Delete" option
 *
 * Objective:
 * Verify that a skill can be added, selected via checkbox, and deleted from 
 * My Info > Qualifications > Skills, ensuring it no longer appears in the list.
 *
 * Steps:
 * 1. Add a skill with a unique year value.
 * 2. Select the skill using its checkbox.
 * 3. Click "Delete Selected" and confirm deletion.
 * 4. Verify the deleted skill does not appear in the updated list.
 *
 * Expected:
 * The deleted skill should not be present in the skills list.
 */
test("TS-12 Verify the 'Skills' could be selected delete functionality", async ({ page }) => {
  const year = Math.floor(Math.random() * 100) - 1;
  const skillList = await myinfoPage.selectDeleteSkills(year); 
  expect(skillList.length).toBeGreaterThan(0);
  expect(skillList).not.toContain(year);
});







/**
 * Test Case: TS-XX Verify that an Expense Type can be edited
 *
 * Objective:
 * Confirm that an existing expense type can be updated under Claim > Configuration > Expense Types,
 * and that the updated details appear in the expense type list.
 *
 * Steps:
 * 1. Login with valid credentials.
 * 2. Navigate to Claim tab.
 * 3. Open Configuration sub-tab.
 * 4. Select Expense Types.
 * 5. Edit an existing expense type by toggling the edit option.
 * 6. Update the details and save.
 * 7. Verify the updated details appear in the list.
 *
 * Expected:
 * The edited expense type should display the updated details in the expense type list.
 */
test("TS-13 Verify that an Expense Type can be edited", async ({ page }) => {
  const EditexpenseName = `EditExp_${Math.floor(Math.random() * 1000)}`;
  
  const list = await ClaimPage.editExpense(EditexpenseName);
  expect(list && list.length > 0).toBeTruthy(); // Ensure the list is not empty
  expect(list).toContain(EditexpenseName);

});

/**
 * Test Case: TS-XX Verify that an Expense Type can be deleted
 *
 * Objective:
 * Confirm that an existing expense type can be deleted under Claim > Configuration > Expense Types,
 * and that the deleted expense no longer appears in the expense type list.
 *
 * Steps:
 * 1. Login with valid credentials.
 * 2. Navigate to Claim tab.
 * 3. Open Configuration sub-tab.
 * 4. Select Expense Types.
 * 5. Click the delete (trash) icon for a specific expense type.
 * 6. Confirm the deletion.
 * 7. Verify that the deleted expense type is no longer in the list.
 *
 * Expected:
 * The selected expense type should not appear in the expense type list after deletion.
 */
  test("TS-14 Verify the Immigrant assign immigration record Delete selected Functionality", async ({ page }) => {
    const EditexpenseName = `delExp_${Math.floor(Math.random() * 1000)}`;    
    const expenseList = await ClaimPage.deleteExpense(EditexpenseName);
    expect(expenseList.length).toBeGreaterThan(0); // Ensure something was deleted
    expect(expenseList).not.toContain(EditexpenseName); // Delete selected
  });


/**
 * Test Case: TS-15 Verify that multiple Expense Types can be selected and deleted
 *
 * Objective:
 * Confirm that multiple expense types can be selected in Claim > Configuration > Expense Types
 * and that all selected expense types are removed from the list after deletion.
 *
 * Steps:
 * 1. Login with valid credentials.
 * 2. Navigate to Claim tab.
 * 3. Open Configuration sub-tab.
 * 4. Select Expense Types.
 * 5. Add expense types for deletion.
 * 6. Select checkboxes for expense types.
 * 7. Click "Delete Selected".
 * 8. Confirm the deletion.
 * 9. Verify that both deleted expense types no longer appear in the list.
 *
 * Expected:
 * The selected expense types should be removed from the expense type list.
 */
test("TC-15 Verify that multiple Expense Types can be selected and deleted", async () => {   
  const EditexpenseName = `delExp_${Math.floor(Math.random() * 1000)}`;                         // Step 1: Unique comment
  const list = await ClaimPage.multipleExpenseDel(EditexpenseName); // Step 2–4
  expect(list && list.length > 0).toBeTruthy(); // Ensure the list is not empty
  expect(list).not.toContain(EditexpenseName); // Step 5: Verify deletion});

});


});

/**
 * ------------------------------------------------------Helper Methods----------------------------------------------------
 */

function verifyDownloadedFileExists(filename: string): boolean {
  const filePath = path.join(downloads, filename);
   const files = fs.readdirSync(downloads); // Get all files in the directory
  return files.includes(filename);
}








//generateUniqueEditName
function generateUniqueEditName() {
  const timestamp = Date.now(); // current time in milliseconds
  const random = Math.floor(Math.random() * 100); // random 4-digit number
  return `Edit${timestamp}${random}`;
}
function generateUniqueCompanyName() {
  const timestamp = Date.now(); // current time in milliseconds
  const random = Math.floor(Math.random() * 100); // random 4-digit number
  return `Cname${timestamp}${random}`;
}

// Closing the test.describe block



