/**
 * Created by cb5rp on 5/26/2017.
 */

var expect = require('chai').expect,
    test = require('selenium-webdriver/testing'),
    webdriver = require('selenium-webdriver');

//Load the chromedriver
var chrome = require('selenium-webdriver/chrome');
var path = require('chromedriver').path;
var service = new chrome.ServiceBuilder(path).build();
chrome.setDefaultService(service);

test.describe('Google Search', function() {
    test.it('should work', function(done) {
        var driver = new webdriver.Builder().
        withCapabilities(webdriver.Capabilities.chrome()).
        build();
        driver.get('http://www.google.com');
        var searchBox = driver.findElement(webdriver.By.name('q'));
        searchBox.sendKeys('simple programmer');
        searchBox.getAttribute('value').then(function(value) {
            expect(value).to.equal('simple programmer');
            done();
        });
        driver.quit();
    });
});
