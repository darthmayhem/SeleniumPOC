/**
 * Created by cb5rp on 6/1/2017.
 */

'use strict';

var webDriver, driver, By, until, applicationId;
var waitShort = 1000;
var waitLong = 5000;

function init(webDriverIn, driverIn, ByIn, untilIn, waitShortIn, waitLongIn){
    webDriver = webDriverIn;
    driver = driverIn;
    By = ByIn;
    until = untilIn;
    if (waitShortIn){
        waitShort = waitShortIn;
    }
    if (waitLongIn){
        waitLong = waitLongIn;
    }
}

function setApplicationId(appId) {
    applicationId = appId;
}

function getApplicationId() {
    return applicationId;
}

function login(username, password, done){
    driver.get('https://onestopuat.aer.ca/onestop/');

    driver.findElement(By.name('username')).sendKeys('0054Admin');
    driver.findElement(By.name('password')).sendKeys('Nala2016');

    // login user
    driver.findElement(By.css('button.btn.btn-default.btn-login')).click();

    // wait for the disclaimer to appear
    driver.wait(until.elementLocated(By.css('button.btn.btn-success.agree')), waitLong);
    driver.findElement(By.css('button.btn.btn-success.agree')).then(function(element) {
        driver.wait(until.elementIsVisible(element), waitShort);
        element.click();

        // wait for the navbar to redraw
        driver.wait(until.elementLocated(By.css('.navbar-right label')), waitLong);

        done();
    });
}

function setTextFieldValue (fieldName, value) {
    driver.wait(until.elementLocated(By.name(fieldName)), waitLong);
    driver.findElement(By.name(fieldName)).then(function(element) {
        driver.wait(until.elementIsVisible(element), waitShort);
        element.sendKeys(value);
    });
}

function setSelectFieldValue (fieldName, txtValue) {
    driver.wait(until.elementLocated(By.name(fieldName)), waitLong);
    driver.findElement(By.name(fieldName)).then(function(element){
        driver.wait(until.elementIsVisible(element), waitShort);
        element.click();
        element.sendKeys(txtValue);
        element.sendKeys('\n');
    });
}

function setRadioFieldIndex (fieldName, index) {
    driver.wait(until.elementLocated(By.name(fieldName)), waitLong);
    driver.findElements(By.name(fieldName)).then(function(elements){
        driver.wait(until.elementIsVisible(elements[index]), waitShort);
        elements[index].findElement(By.xpath('..')).then(function(element){
            element.click();
        });
    });
}

function setCheckbox (fieldName) {
    driver.wait(until.elementLocated(By.name(fieldName)), waitLong);
    driver.findElement(By.name(fieldName)).then(function(element){
        driver.wait(until.elementIsVisible(element), waitShort);
        element.findElement(By.xpath('..')).then(function(element){
            element.click();
        });
    });
}

function getElementValueByCSS(elementCSS){
    driver.wait(until.elementLocated(By.css(elementCSS)), waitLong);
    return driver.findElement(By.css(elementCSS)).getText();
}

function clickElement(elementCss){
    driver.wait(until.elementLocated(By.css(elementCss)), waitLong);
    driver.findElement(By.css(elementCss)).then(function(element){
        driver.wait(until.elementIsVisible(element), waitLong);
        element.click();
    });
}

function setBackGridSelect(elementCss, index, selectIndex){
    driver.wait(until.elementLocated(By.css(elementCss)), waitLong);
    driver.findElements(By.css(elementCss)).then(function(elements){
        elements[index].click();
        elements[index].findElements(By.css('option')).then(function(elements){
            elements[selectIndex].click();
        });
    });
}

function clickNthElement(elementCss, index){
    driver.wait(until.elementLocated(By.css(elementCss)), waitLong);
    driver.findElements(By.css(elementCss)).then(function(elements){
        elements[index].click();
    });
}

function createApplication(done, email, primaryContact){
    // Go to the new application page
    driver.get('https://onestopuat.aer.ca/onestop/#application');

    // Set the applicant email
    setTextFieldValue('applicant[email]', email);

    // Set the primary contact
    setSelectFieldValue('applicant[primaryContact]', primaryContact);

    // Save the application
    clickElement('.btn.btn-success.btn-save');

    // slight pause for page load
    driver.sleep(waitShort);

    // Set the application Id in object
    getElementValueByCSS('#subheader-level-two')
        .then(function(value){
            applicationId = value;
            done();
        })
}

function addApplicationInformation(done, integrationChoice, newIntegrationReferenceName, existingApprovals){
    // Go to the new application page
    driver.get('https://onestopuat.aer.ca/onestop/#application/'+applicationId);

    //Give the page a moment to save
    driver.sleep(waitShort);

    // Click the application information nav link
    clickElement('a[data-id="generalTab:applicationInfo"]');

    // slight pause for page load
    driver.sleep(waitShort);

    // Set the integrationChoice toggle to no
    setRadioFieldIndex('integrationChoice', integrationChoice);

    // Set the applicant email
    setTextFieldValue('newIntegrationReferenceName', newIntegrationReferenceName);

    // Set the existingApprovals toggle to no
    setRadioFieldIndex('existingApprovals', existingApprovals);

    // slight pause for page load
    driver.sleep(waitShort);

    // Save the application
    clickElement('.btn.btn-success.btn-save');

    //Give the page a moment to save
    driver.sleep(waitShort);

    done();
}

function addProposedActivity(done, privateLand, proposedPipelinesActivity, developmentType){
    // Go to the new application page
    driver.get('https://onestopuat.aer.ca/onestop/#application/'+applicationId);

    // Click the proposed activity nav link
    clickElement('a[data-id="generalTab:proposedActivity"]');

    // slight pause for page load
    driver.sleep(waitShort);

    // Check Private Land
    setCheckbox('privateLand');

    // Check Pipelines
    setCheckbox('proposedPipelinesActivity');

    // Set the developmentType toggle to Oil and Gas
    setRadioFieldIndex('developmentType', developmentType);

    // slight pause for page load
    driver.sleep(waitShort);

    // Save the application
    clickElement('.btn.btn-success.btn-save');

    //Give the page a moment to save
    driver.sleep(waitShort);

    done();
}

function addAdditionalInformation(
    done,
    stakeholderConcerns,
    epeaApproval,
    waterActNotificationSubmitted,
    waterActApprovalRequired,
    waterActLicence){
    // Go to the new application page
    driver.get('https://onestopuat.aer.ca/onestop/#application/'+applicationId);

    // Click the additional information nav link
    clickElement('a[data-id="generalTab:additionalInfo"]');

    // slight pause for page load
    driver.sleep(waitShort);

    // Set the stakeholderConcerns toggle to No
    setRadioFieldIndex('stakeholderConcerns', stakeholderConcerns);

    // Set the epeaApproval toggle to No
    setRadioFieldIndex('epeaApproval', epeaApproval);

    // Set the waterActNotificationSubmitted toggle to No
    setRadioFieldIndex('waterActNotificationSubmitted', waterActNotificationSubmitted);

    // Set the waterActApprovalRequired toggle to No
    setRadioFieldIndex('waterActApprovalRequired', waterActApprovalRequired);

    // Set the waterActLicence toggle to No
    setRadioFieldIndex('waterActLicence', waterActLicence);

    // slight pause for page load
    driver.sleep(waitShort);

    // Save the application
    clickElement('.btn.btn-success.btn-save');

    //Give the page a moment to save
    driver.sleep(waitShort);

    done();
}

function addActivityDetails(done){
    // Go to the new application page
    driver.get('https://onestopuat.aer.ca/onestop/#application/'+applicationId);

    // Click the activity details nav link
    clickElement('a[data-id="generalTab:activityDetails"]');

    // slight pause for page load
    driver.sleep(waitShort);

    // Add a license row
    clickElement('.btn-add-proposed-licence');

    // Click the first cell in the license table
    clickElement('td.select-cell.editable');

    // Click the second cell in the license table to focus
    // clickNthElement('td.select-cell.editable', 1);

    // Click the second cell in the license table again to expand
    setBackGridSelect('td.select-cell.editable', 1, 1);
    // clickNthElement('td.select-cell.editable', 1);

    // send the down arrow key to select second element
    // driver.sleep(10000);
    // elementSendKey('.select-cell:nth-child(2)', driver.key(40));
    // sendKeysNthElement('td.select-cell.editable', 1, webDriver.Key.ARROW_DOWN);

    // slight pause for page load
    driver.sleep(waitShort);

    // Save the application
    clickElement('.btn.btn-success.btn-save');

    //Give the page a moment to save
    driver.sleep(waitShort);

    done();
}

function deleteApplication(done){
    // Go to the draft application
    driver.get('https://onestopuat.aer.ca/onestop/#application/'+applicationId);

    // slight delay for page render
    driver.sleep(waitShort);

    // click the delete draft button
    clickElement('.btn.btn-danger.btn-delete-draft');

    // click the yes button
    clickElement('.modal-footer button.btn-yes.btn.btn-success');

    // click the ok button
    clickElement('.modal-footer .btn-close.btn.btn-primary');

    done();
}

module.exports = {
    init: init,
    setApplicationId: setApplicationId,
    getApplicationId: getApplicationId,
    login: login,
    // setTextFieldValue: setTextFieldValue,
    // setSelectFieldValue: setSelectFieldValue,
    // setRadioFieldIndex: setRadioFieldIndex,
    // setCheckbox: setCheckbox,
    // clickElement: clickElement,
    createApplication: createApplication,
    addApplicationInformation: addApplicationInformation,
    addProposedActivity: addProposedActivity,
    addAdditionalInformation: addAdditionalInformation,
    addActivityDetails: addActivityDetails,
    deleteApplication: deleteApplication
};