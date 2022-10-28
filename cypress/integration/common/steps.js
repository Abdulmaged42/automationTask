import { Given, When, And, Then } from 'cypress-cucumber-preprocessor/steps';
global.ExpectedText = ''
var faker = require('faker');
global.randomCountry = faker.address.country()
Given(/^open the site "([^"]*)"$/, (url) => {
    cy.visit(`${url}`)
})

Then(/^the title of the page should be "([^"]*)"$/, (title) => {

    cy.get('h1').invoke('text').should('eql', title)

})
Given(/^select day to be "([^"]*)"$/, (day) => {
    if (day == "tomorrow") {
        cy.wait(2000)
        cy.get(':nth-child(2) > .um-tenDateSelector--btn').click();
    }

})
And(/^select the timeslot "([^"]*)"$/, (timeSlote) => {
    cy.get('#timeslot-morning-0').click()
})
When(/^select the locition in resturent "([^"]*)"$/, (locition) => {
    cy.get('#timeslot-morning-0 > .um-timeslot__time').click()
})
And(/^click on "([^"]*)"$/, (text) => {
    cy.contains(`${text}`).click()
})