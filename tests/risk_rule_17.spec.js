/**
 * Created by cb5rp on 5/26/2017.
 */

var OneStop = require('./utils/OneStopApp');

var expect = require('chai').expect,
    test = require('selenium-webdriver/testing'),
    webdriver = require('selenium-webdriver');

//Load the chromedriver
var chrome = require('selenium-webdriver/chrome');
var path = require('chromedriver').path;
var service = new chrome.ServiceBuilder(path).build();
chrome.setDefaultService(service);

var By = webdriver.By;
var until = webdriver.until;

test.describe('Create Application', function() {
    var driver;

    test.before(function(done){
        driver = new webdriver.Builder()
            .withCapabilities(webdriver.Capabilities.chrome())
            .build();
        driver.manage().deleteAllCookies();

        OneStop.init(driver, By, until);
        OneStop.login('0054Admin', 'Nala2016', done);
    });

    test.after(function(){
        driver.quit();
    });

    test.describe('happy path', function() {
        test.before(function(done){
            OneStop.createApplication(done);
        });

        test.after(function(done){
            OneStop.deleteApplication(done);
        });

        test.it('assigns an application number', function () {
            expect(OneStop.getApplicationId()).to.not.be.undefined;
        });
    });
});
