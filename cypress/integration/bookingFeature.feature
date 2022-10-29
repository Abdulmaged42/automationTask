Feature: Feature name

  Background: open the page
    Given open the site "https://gthewhite.letsumai.com/widget/kwc-automated"
    Then the title of the page should be "KWC Automated"

  Scenario Outline: verify make valid Reservation
    Given select day to be "<date>"
    And select the timeslot
    And select the locition in resturent "<location>"
    And verify the selected date and location
    When I fill the form with the following:
      | field                  | value       |
      | um-field--first-name   | randomFname |
      | um-field--last-name    | randomLname |
      | um-field--email        | mail        |
      | um-field--phone-number | phone       |
    And agree to UMAI's Terms of Use & Privacy Policy
    And click on "Confirm Reservation Details"
  # Then the title of the page should be "the reservation created successfully"
  Examples:
      | date |  | location |
      | today | Indoors |
      | 10 | Sky Bar |
      | 09 | Sky Bar |

  Scenario: verify error messages
    Given select day to be "today"
    And select the timeslot
    And select the locition in resturent "Indoors"
    And verify the selected date and location
    When agree to UMAI's Terms of Use & Privacy Policy
    And click on "Confirm Reservation Details"
    Then the error message should appear
