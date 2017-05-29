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

var By = webdriver.By;
var until = webdriver.until;

test.describe('Internal Login', function() {
    var driver;

    test.beforeEach(function(){
        driver = new webdriver.Builder()
            .withCapabilities(webdriver.Capabilities.chrome())
            .build();
    });

    test.afterEach(function(){
        driver.quit();
    });

    test.it('proper login for a50wadmin user', function(done) {
        driver.get('https://onestopuat.aer.ca/onestop/');

        driver.findElement(By.name('username'))
            .sendKeys('a50wadmin');
        driver.findElement(By.name('password'))
            .sendKeys('Nala2017');

        // login user
        driver.findElement(By.css('button.btn.btn-default.btn-login'))
            .click();

        // wait for login response
        driver.wait(function(){
            return driver.findElement(By.css('button.btn.btn-success.agree')).then(function(element) {
                    return element.isDisplayed().then(function(resp){
                        return resp;
                    });
                },
                function (error){
                    return false;
                });
        }, 5000);

        driver.findElement(By.css('button.btn.btn-success.agree')).then(function(element) {
            element.click();

            // wait for page load
            driver.wait(function(){
                return driver.findElement(By.css('.navbar-right label')).then(function(element) {
                        return element.isDisplayed().then(function(resp){
                            return resp;
                        });
                    },
                    function (error){
                        return false;
                    });
            }, 5000);

            // verify proper username is displayed
            driver.findElement(By.css('.navbar-right label')).then(function(element) {
                element.getText().then(function(text){
                    expect(text.indexOf('A50wAdmin') >= 0).to.be.true;
                    done();
                });
            });
        });
    });

    test.it('proper login for Readonly user', function(done) {
        driver.get('https://onestopuat.aer.ca/onestop/');

        driver.findElement(By.name('username'))
            .sendKeys('CBPLRO');
        driver.findElement(By.name('password'))
            .sendKeys('Nala@2017');

        // login user
        driver.findElement(By.css('button.btn.btn-default.btn-login'))
            .click();

        // wait for login response
        driver.wait(function(){
            return driver.findElement(By.css('button.btn.btn-success.agree')).then(function(element) {
                    return element.isDisplayed().then(function(resp){
                        return resp;
                    });
                },
                function (error){
                    return false;
                });
        }, 5000);

        driver.findElement(By.css('button.btn.btn-success.agree')).then(function(element) {
            element.click();

            // wait for page load
            driver.wait(function(){
                return driver.findElement(By.css('.navbar-right label')).then(function(element) {
                        return element.isDisplayed().then(function(resp){
                            return resp;
                        });
                    },
                    function (error){
                        return false;
                    });
            }, 5000);

            // verify proper username is displayed
            driver.findElement(By.css('.navbar-right label')).then(function(element) {
                element.getText().then(function(text){
                    expect(text.indexOf('Pipeline ReadOnly') >= 0).to.be.true;
                    done();
                });
            });
        });
    });

    test.it('proper login for All Roles user', function(done) {
        driver.get('https://onestopuat.aer.ca/onestop/');

        driver.findElement(By.name('username'))
            .sendKeys('CBPLSU');
        driver.findElement(By.name('password'))
            .sendKeys('Nala@2017');

        // login user
        driver.findElement(By.css('button.btn.btn-default.btn-login'))
            .click();

        // wait for login response
        driver.wait(function(){
            return driver.findElement(By.css('button.btn.btn-success.agree')).then(function(element) {
                    return element.isDisplayed().then(function(resp){
                        return resp;
                    });
                },
                function (error){
                    return false;
                });
        }, 5000);

        driver.findElement(By.css('button.btn.btn-success.agree')).then(function(element) {
            element.click();

            // wait for page load
            driver.wait(function(){
                return driver.findElement(By.css('.navbar-right label')).then(function(element) {
                        return element.isDisplayed().then(function(resp){
                            return resp;
                        });
                    },
                    function (error){
                        return false;
                    });
            }, 5000);

            // verify proper username is displayed
            driver.findElement(By.css('.navbar-right label')).then(function(element) {
                element.getText().then(function(text){
                    expect(text.indexOf('Pipeline SuperUser') >= 0).to.be.true;
                    done();
                });
            });
        });
    });

    test.it('proper login for Pipeline-Auditor user', function(done) {
        driver.get('https://onestopuat.aer.ca/onestop/');

        driver.findElement(By.name('username'))
            .sendKeys('CBPLAU');
        driver.findElement(By.name('password'))
            .sendKeys('Nala@2017');

        // login user
        driver.findElement(By.css('button.btn.btn-default.btn-login'))
            .click();

        // wait for login response
        driver.wait(function(){
            return driver.findElement(By.css('button.btn.btn-success.agree')).then(function(element) {
                    return element.isDisplayed().then(function(resp){
                        return resp;
                    });
                },
                function (error){
                    return false;
                });
        }, 5000);

        driver.findElement(By.css('button.btn.btn-success.agree')).then(function(element) {
            element.click();

            // wait for page load
            driver.wait(function(){
                return driver.findElement(By.css('.navbar-right label')).then(function(element) {
                        return element.isDisplayed().then(function(resp){
                            return resp;
                        });
                    },
                    function (error){
                        return false;
                    });
            }, 5000);

            // verify proper username is displayed
            driver.findElement(By.css('.navbar-right label')).then(function(element) {
                element.getText().then(function(text){
                    expect(text.indexOf('Pipeline Auditor') >= 0).to.be.true;
                    done();
                });
            });
        });
    });

    test.it('proper login for Pipeline-Business Administrator user', function(done) {
        driver.get('https://onestopuat.aer.ca/onestop/');

        driver.findElement(By.name('username'))
            .sendKeys('CBPLBA');
        driver.findElement(By.name('password'))
            .sendKeys('Nala@2017');

        // login user
        driver.findElement(By.css('button.btn.btn-default.btn-login'))
            .click();

        // wait for login response
        driver.wait(function(){
            return driver.findElement(By.css('button.btn.btn-success.agree')).then(function(element) {
                    return element.isDisplayed().then(function(resp){
                        return resp;
                    });
                },
                function (error){
                    return false;
                });
        }, 5000);

        driver.findElement(By.css('button.btn.btn-success.agree')).then(function(element) {
            element.click();

            // wait for page load
            driver.wait(function(){
                return driver.findElement(By.css('.navbar-right label')).then(function(element) {
                        return element.isDisplayed().then(function(resp){
                            return resp;
                        });
                    },
                    function (error){
                        return false;
                    });
            }, 5000);

            // verify proper username is displayed
            driver.findElement(By.css('.navbar-right label')).then(function(element) {
                element.getText().then(function(text){
                    expect(text.indexOf('Pipeline BusinessAdministrator') >= 0).to.be.true;
                    done();
                });
            });
        });
    });

    test.it('proper login for Pipeline-Coordinator user', function(done) {
        driver.get('https://onestopuat.aer.ca/onestop/');

        driver.findElement(By.name('username'))
            .sendKeys('CBPLCO');
        driver.findElement(By.name('password'))
            .sendKeys('Nala@2017');

        // login user
        driver.findElement(By.css('button.btn.btn-default.btn-login'))
            .click();

        // wait for login response
        driver.wait(function(){
            return driver.findElement(By.css('button.btn.btn-success.agree')).then(function(element) {
                    return element.isDisplayed().then(function(resp){
                        return resp;
                    });
                },
                function (error){
                    return false;
                });
        }, 5000);

        driver.findElement(By.css('button.btn.btn-success.agree')).then(function(element) {
            element.click();

            // wait for page load
            driver.wait(function(){
                return driver.findElement(By.css('.navbar-right label')).then(function(element) {
                        return element.isDisplayed().then(function(resp){
                            return resp;
                        });
                    },
                    function (error){
                        return false;
                    });
            }, 5000);

            // verify proper username is displayed
            driver.findElement(By.css('.navbar-right label')).then(function(element) {
                element.getText().then(function(text){
                    expect(text.indexOf('Pipeline Coordinator') >= 0).to.be.true;
                    done();
                });
            });
        });
    });

    test.it('proper login for Pipeline-Decision Maker user', function(done) {
        driver.get('https://onestopuat.aer.ca/onestop/');

        driver.findElement(By.name('username'))
            .sendKeys('CBPLDM');
        driver.findElement(By.name('password'))
            .sendKeys('Nala@2017');

        // login user
        driver.findElement(By.css('button.btn.btn-default.btn-login'))
            .click();

        // wait for login response
        driver.wait(function(){
            return driver.findElement(By.css('button.btn.btn-success.agree')).then(function(element) {
                    return element.isDisplayed().then(function(resp){
                        return resp;
                    });
                },
                function (error){
                    return false;
                });
        }, 5000);

        driver.findElement(By.css('button.btn.btn-success.agree')).then(function(element) {
            element.click();

            // wait for page load
            driver.wait(function(){
                return driver.findElement(By.css('.navbar-right label')).then(function(element) {
                        return element.isDisplayed().then(function(resp){
                            return resp;
                        });
                    },
                    function (error){
                        return false;
                    });
            }, 5000);

            // verify proper username is displayed
            driver.findElement(By.css('.navbar-right label')).then(function(element) {
                element.getText().then(function(text){
                    expect(text.indexOf('Pipeline DecisionMaker') >= 0).to.be.true;
                    done();
                });
            });
        });
    });

    test.it('proper login for Pipeline-Lead Reviewer user', function(done) {
        driver.get('https://onestopuat.aer.ca/onestop/');

        driver.findElement(By.name('username'))
            .sendKeys('CBPLLR');
        driver.findElement(By.name('password'))
            .sendKeys('Nala@2017');

        // login user
        driver.findElement(By.css('button.btn.btn-default.btn-login'))
            .click();

        // wait for login response
        driver.wait(function(){
            return driver.findElement(By.css('button.btn.btn-success.agree')).then(function(element) {
                    return element.isDisplayed().then(function(resp){
                        return resp;
                    });
                },
                function (error){
                    return false;
                });
        }, 5000);

        driver.findElement(By.css('button.btn.btn-success.agree')).then(function(element) {
            element.click();

            // wait for page load
            driver.wait(function(){
                return driver.findElement(By.css('.navbar-right label')).then(function(element) {
                        return element.isDisplayed().then(function(resp){
                            return resp;
                        });
                    },
                    function (error){
                        return false;
                    });
            }, 5000);

            // verify proper username is displayed
            driver.findElement(By.css('.navbar-right label')).then(function(element) {
                element.getText().then(function(text){
                    expect(text.indexOf('Pipeline LeadReviewer') >= 0).to.be.true;
                    done();
                });
            });
        });
    });

    test.it('proper login for Pipeline-Reviewer user', function(done) {
        driver.get('https://onestopuat.aer.ca/onestop/');

        driver.findElement(By.name('username'))
            .sendKeys('CBPLPR');
        driver.findElement(By.name('password'))
            .sendKeys('Nala@2017');

        // login user
        driver.findElement(By.css('button.btn.btn-default.btn-login'))
            .click();

        // wait for login response
        driver.wait(function(){
            return driver.findElement(By.css('button.btn.btn-success.agree')).then(function(element) {
                    return element.isDisplayed().then(function(resp){
                        return resp;
                    });
                },
                function (error){
                    return false;
                });
        }, 5000);

        driver.findElement(By.css('button.btn.btn-success.agree')).then(function(element) {
            element.click();

            // wait for page load
            driver.wait(function(){
                return driver.findElement(By.css('.navbar-right label')).then(function(element) {
                        return element.isDisplayed().then(function(resp){
                            return resp;
                        });
                    },
                    function (error){
                        return false;
                    });
            }, 5000);

            // verify proper username is displayed
            driver.findElement(By.css('.navbar-right label')).then(function(element) {
                element.getText().then(function(text){
                    expect(text.indexOf('Pipeline Reviewer') >= 0).to.be.true;
                    done();
                });
            });
        });
    });

    test.it('proper login for Pipeline-Readonly user', function(done) {
        driver.get('https://onestopuat.aer.ca/onestop/');

        driver.findElement(By.name('username'))
            .sendKeys('CBPLRO');
        driver.findElement(By.name('password'))
            .sendKeys('Nala@2017');

        // login user
        driver.findElement(By.css('button.btn.btn-default.btn-login'))
            .click();

        // wait for login response
        driver.wait(function(){
            return driver.findElement(By.css('button.btn.btn-success.agree')).then(function(element) {
                    return element.isDisplayed().then(function(resp){
                        return resp;
                    });
                },
                function (error){
                    return false;
                });
        }, 5000);

        driver.findElement(By.css('button.btn.btn-success.agree')).then(function(element) {
            element.click();

            // wait for page load
            driver.wait(function(){
                return driver.findElement(By.css('.navbar-right label')).then(function(element) {
                        return element.isDisplayed().then(function(resp){
                            return resp;
                        });
                    },
                    function (error){
                        return false;
                    });
            }, 5000);

            // verify proper username is displayed
            driver.findElement(By.css('.navbar-right label')).then(function(element) {
                element.getText().then(function(text){
                    expect(text.indexOf('Pipeline ReadOnly') >= 0).to.be.true;
                    done();
                });
            });
        });
    });

    test.it('proper login for Pipeline - Super USER user', function(done) {
        driver.get('https://onestopuat.aer.ca/onestop/');

        driver.findElement(By.name('username'))
            .sendKeys('CBPLSU');
        driver.findElement(By.name('password'))
            .sendKeys('Nala@2017');

        // login user
        driver.findElement(By.css('button.btn.btn-default.btn-login'))
            .click();

        // wait for login response
        driver.wait(function(){
            return driver.findElement(By.css('button.btn.btn-success.agree')).then(function(element) {
                    return element.isDisplayed().then(function(resp){
                        return resp;
                    });
                },
                function (error){
                    return false;
                });
        }, 5000);

        driver.findElement(By.css('button.btn.btn-success.agree')).then(function(element) {
            element.click();

            // wait for page load
            driver.wait(function(){
                return driver.findElement(By.css('.navbar-right label')).then(function(element) {
                        return element.isDisplayed().then(function(resp){
                            return resp;
                        });
                    },
                    function (error){
                        return false;
                    });
            }, 5000);

            // verify proper username is displayed
            driver.findElement(By.css('.navbar-right label')).then(function(element) {
                element.getText().then(function(text){
                    expect(text.indexOf('Pipeline SuperUser') >= 0).to.be.true;
                    done();
                });
            });
        });
    });
});
