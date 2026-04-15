# Hands-on Exercise 1

## Task 1
Implement and run the application provided in:
[Module 5, Case Study: E2E Testing of a Sample Web Application](../README.md#case-study-e2e-testing-of-a-sample-web-application)

Ensure:
- The application runs correctly
- Existing Cypress tests pass successfully

---

## Task 2: Extend this application

* Add a New page: ./register.html

* The page must include a **user registration form** with at least the following fields:
  - Username
  - Email
  - Password

* **Form Behavior Requirements:**
  - All fields must be required
  - On form submission:
      - Prevent default page reload
      - Validate that all fields are filled
      - Display an alert with the message `Registration successful!`
      - 
* Add a link or button from the main page ``welcome.html` to `register.html`
* Ensure users can easily access the registration page


## Task 3: E2E Testing with Cypress

You are required to write **End-to-End tests** for the registration feature.

Implement the following test cases in `cypress/e2e/register.cy.js` file:

- Verify that `register.html` loads successfully
- Verify that all required input fields are visible:
  - Username
  - Email
  - Password
- Enter valid input into all fields
- Submit the form
- Verify that:
    - An alert is shown
    - The alert contains the correct message: `Registration successful!`
