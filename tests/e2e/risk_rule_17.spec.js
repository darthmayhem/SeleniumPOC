/**
 * Created by cb5rp on 5/26/2017.
 */

var OneStop = require('../utils/OneStopApp');
var Moment = require('moment');

var expect = require('chai').expect,
    test = require('selenium-webdriver/testing'),
    webDriver = require('selenium-webdriver');

//Load the chromedriver
var chrome = require('selenium-webdriver/chrome');
var path = require('chromedriver').path;
var service = new chrome.ServiceBuilder(path).build();
chrome.setDefaultService(service);

var By = webDriver.By;
var until = webDriver.until;

test.describe('Create Application', function () {
    var driver;

    test.before(function (done) {
        driver = new webDriver.Builder()
            .withCapabilities(webDriver.Capabilities.chrome())
            .build();
        driver.manage().deleteAllCookies();

        OneStop.init(webDriver, driver, By, until, 1000, 5000);
        OneStop.login('0054Admin', 'Nala2016', done);
    });

    test.after(function () {
        driver.quit();
    });

    test.describe('happy path', function () {
        test.before(function (done) {
            OneStop.createApplication(done, 'automated_test@aer.ca', 'Yes');
        });

        test.after(function (done) {
            // OneStop.deleteApplication(done);
            done();
        });

        test.describe('contact information', function () {
            test.it('assigns an application number', function () {
                expect(OneStop.getApplicationId()).to.not.be.undefined;
            });

            test.it('saves without error', function () {
                expect(true).to.be.true;
            });
        });

        test.describe('application information', function () {
            test.before(function (done) {
                OneStop.addApplicationInformation(done, 1, 'Automated Test Project: ' + Moment().toDate(), 1);
            });

            test.it('saves without error', function () {
                expect(true).to.be.true;
            });
        });

        test.describe('proposed activity', function () {
            test.before(function (done) {
                OneStop.addProposedActivity(done, 'privateLand', 'proposedPipelinesActivity', 2);
            });

            test.it('saves without error', function () {
                expect(true).to.be.true;
            });
        });

        test.describe('additional information', function () {
            test.before(function (done) {
                OneStop.addAdditionalInformation(done, 1, 1, 1, 1, 1);
            });

            test.it('saves without error', function () {
                expect(true).to.be.true;
            });
        });

        test.describe('activity details', function () {
            test.before(function (done) {
                OneStop.addActivityDetails(done);
            });

            test.it('saves without error', function () {
                expect(true).to.be.true;
            });
        });
    });
});
