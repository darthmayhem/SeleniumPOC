/**
 * Created by cb5rp on 6/1/2017.
 */

'use strict';

var driver, By, until, applicationId;
var waitShort = 1000;
var waitLong = 5000;

function init(driverIn, ByIn, untilIn, waitShortIn, waitLongIn){
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

function nextPage(pageCount){

    for (var i=0; i<pageCount; i++){
        //Give the page a moment to draw
        driver.sleep(waitShort);

        // move to the next screen
        clickButton('.btn.btn-primary.btn-next');
    }
}

function clickButton(buttonCss){
    driver.wait(until.elementLocated(By.css(buttonCss)), waitLong);
    driver.findElement(By.css(buttonCss)).then(function(element){
        driver.wait(until.elementIsVisible(element), waitLong);
        element.click();
    });
}

function createApplication(done){
    // Go to the new application page
    driver.get('https://onestopuat.aer.ca/onestop/#application');

    // Set the applicant email
    setTextFieldValue('applicant[email]', 'automated_test@aer.ca');

    // Set the primary contact
    setSelectFieldValue('applicant[primaryContact]', 'Yes');

    // Save the application
    clickButton('.btn.btn-success.btn-save');

    // slight pause for page load
    driver.sleep(waitShort);

    // Set the application Id in object
    getElementValueByCSS('#subheader-level-two')
        .then(function(value){
            applicationId = value;
            done();
        })
}

function addApplicationInformation(done){
    // Go to the new application page
    driver.get('https://onestopuat.aer.ca/onestop/#application/'+applicationId);
    nextPage(1);

    // Set the integrationChoice toggle to no
    setRadioFieldIndex('integrationChoice', 1);

    // Set the applicant email
    setTextFieldValue('newIntegrationReferenceName', 'Automated Test Project');

    // Set the existingApprovals toggle to no
    setRadioFieldIndex('existingApprovals', 1);

    // Save the application
    clickButton('.btn.btn-success.btn-save');

    //Give the page a moment to save
    driver.sleep(waitShort);

    done();
}

function addProposedActivity(done){
    // Go to the new application page
    driver.get('https://onestopuat.aer.ca/onestop/#application/'+applicationId);
    nextPage(2);

    // Check Private Land
    setCheckbox('privateLand');

    // Check Pipelines
    setCheckbox('proposedPipelinesActivity');

    // Set the developmentType toggle to Oil and Gas
    setRadioFieldIndex('developmentType', 2);

    // Save the application
    clickButton('.btn.btn-success.btn-save');

    //Give the page a moment to save
    driver.sleep(waitShort);

    done();
}

function addAdditionalInformation(done){
    // Go to the new application page
    driver.get('https://onestopuat.aer.ca/onestop/#application/'+applicationId);
    nextPage(3);

    // Set the stakeholderConcerns toggle to No
    setRadioFieldIndex('stakeholderConcerns', 1);

    // Set the epeaApproval toggle to No
    setRadioFieldIndex('epeaApproval', 1);

    // Set the waterActNotificationSubmitted toggle to No
    setRadioFieldIndex('waterActNotificationSubmitted', 1);

    // Set the waterActApprovalRequired toggle to No
    setRadioFieldIndex('waterActApprovalRequired', 1);

    // Set the waterActLicence toggle to No
    setRadioFieldIndex('waterActLicence', 1);

    // Save the application
    clickButton('.btn.btn-success.btn-save');

    //Give the page a moment to save
    driver.sleep(waitShort);

    done();
}

function addActivityDetails(done){
    // Go to the new application page
    driver.get('https://onestopuat.aer.ca/onestop/#application/'+applicationId);
    nextPage(4);

    // Add a license row
    clickButton('.btn-add-proposed-licence');

    // Click the first cell in the license table
    clickButton('.select-cell:first');

    // Click the second cell in the license table to focus
    clickButton('.select-cell:nth-child(2)');

    // Click the second cell in the license table again to expand
    clickButton('.select-cell:nth-child(2)');

    // send the down arrow key to select second element
    driver.sendKeys(driver.Key.ARROW_DOWN);

    driver.sleep(10000);

    // Save the application
    clickButton('.btn.btn-success.btn-save');

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
    clickButton('.btn.btn-danger.btn-delete-draft');

    // click the yes button
    clickButton('.modal-footer button.btn-yes.btn.btn-success');

    // click the ok button
    clickButton('.modal-footer .btn-close.btn.btn-primary');

    //Give the page a moment to save
    // driver.sleep(waitShort);

    done();
}

module.exports = {
    init: init,
    setApplicationId: setApplicationId,
    getApplicationId: getApplicationId,
    login: login,
    setTextFieldValue: setTextFieldValue,
    setSelectFieldValue: setSelectFieldValue,
    setRadioFieldIndex: setRadioFieldIndex,
    setCheckbox: setCheckbox,
    nextPage: nextPage,
    clickButton: clickButton,
    createApplication: createApplication,
    addApplicationInformation: addApplicationInformation,
    addProposedActivity: addProposedActivity,
    addAdditionalInformation: addAdditionalInformation,
    addActivityDetails: addActivityDetails,
    deleteApplication: deleteApplication
};