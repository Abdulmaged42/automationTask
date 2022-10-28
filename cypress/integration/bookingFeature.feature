Feature: Feature name

  Background: open the page
    Given open the site "https://gthewhite.letsumai.com/widget/kwc-automated"
    Then the title of the page should be "KWC Automated"

  Scenario: verify make valid Reservation
    Given select day to be "tomorrow"
