import { Given, When, And, Then } from 'cypress-cucumber-preprocessor/steps';
import moment from 'moment'
global.ExpectedDate = ''
var timeSlote
var loc
var numOfPeople
var date
var faker = require('faker');
global.randomCountry = faker.address.country()
global.firstName = faker.name.firstName()
global.mail = faker.internet.email()
global.lastName = faker.name.lastName()
Given(/^open the site "([^"]*)"$/, (url) => {
    cy.visit(`${url}`)
})

Then(/^the title of the page should be "([^"]*)"$/, (title) => {

    cy.get('h1').invoke('text').should('eql', title)

})
Given(/^select day to be "([^"]*)"$/, (day) => {

    cy.wait(2000)
    if (day == "today") {
        cy.get(':nth-child(1) > .um-tenDateSelector--btn')
    }
    else {
        cy.xpath(`(//span[contains(text(),'${day}')])[1]/..`).click({ force: true });

    }

    cy.get('.css-ih2rla-singleValue').then((el) => {
        numOfPeople = el.text()
        cy.log("numOfPeople", numOfPeople)
    })

    cy.get('#um-reservation-date-picker').then((el) => {
        date = el.text()
        var s = date.split(', ')
        cy.log("date3", s[1])
    })

})
And(/^select the timeslot$/, () => {
    cy.xpath(`(//button[@class='um-timeslot__button'])[1]`).click({ force: true })
    cy.xpath(`(//button[@class='um-timeslot__button'])[1]`).then((el) => {
        timeSlote = el.text()
        cy.log("timeSlote", timeSlote)
    })
})

When(/^select the locition in resturent "([^"]*)"$/, (location) => {
    cy.xpath(`//button[contains(text(),'${location}')]`).click()
    loc = location
    cy.log("location", loc)
})
And(/^click on "([^"]*)"$/, (text) => {
    cy.contains(`${text}`).click()
})

And(/^verify the selected date and location$/, () => {
    cy.xpath(`(//span//b)[1]`).should('contain', '2 people')
    cy.xpath(`(//span//b)[2]`).should('contain', `${timeSlote}`)
    cy.xpath(`(//span//b)[3]`).should('contain', loc)

})

And(/^agree to UMAI's Terms of Use & Privacy Policy$/, () => {
    cy.get('#um-field-checkbox').click()
})

function dateFormat(inputDate, format) {
    //parse the input date
    const date = new Date(inputDate);

    //extract the parts of the date
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    //replace the month
    format = format.replace("MM", month.toString().padStart(2, "0"));

    //replace the year
    if (format.indexOf("yyyy") > -1) {
        format = format.replace("yyyy", year.toString());
    } else if (format.indexOf("yy") > -1) {
        format = format.replace("yy", year.toString().substr(2, 2));
    }

    //replace the day
    format = format.replace("dd", day.toString().padStart(2, "0"));

    return format;
}

function fill_field_with(row) {
    const field = row[0]
    const value = row[1]
    switch (value) {
        case 'randomFname':
            cy.get(`#${field}`).type(firstName)
            break;
        case 'randomLname':
            cy.get(`#${field}`).type(lastName)
            break;
        case 'mail':
            cy.get(`#${field}`).type(mail)
            break;
        case 'phone':
            cy.xpath(`//select[@class='PhoneInputCountrySelect']`).select("CA")
            cy.get(`#${field}`).type("+1 437 800 5466")
            break;


    }


}
And(/^I fill the form with the following:$/, dataTable => {

    let data = dataTable.rawTable

    let i;
    for (i of data) {
        fill_field_with(i)
    }
})
And(/^verify the error message "([^"]*)"$/, (message) => {
    cy.xpath(`//div[contains(text(),'${message}')]`)
})
export function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('/');
}
Then(/^the error message should appear$/, () => {
    cy.get('#um-field--phone-number').clear({ force: true })
    cy.get('.um-form-error').each(element => {

        var text = element.text()

        expect(text).contains('required')

    })
})