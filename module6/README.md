# Module 6: Introduction To End-To-End Testing

<!-- TOC -->
* [Module 6: Introduction To End-To-End Testing](#module-6-introduction-to-end-to-end-testing)
  * [**What Is End-To-End (E2E) Testing?**](#what-is-end-to-end-e2e-testing)
  * [**Overview of Cypress**](#overview-of-cypress)
  * [**Writing Cypress Tests**](#writing-cypress-tests)
    * [E2E Testing of a Sample Web Application](#e2e-testing-of-a-sample-web-application)
  * [**Hands-on Exercise 1**](#hands-on-exercise-1)
<!-- TOC -->

## **What Is End-To-End (E2E) Testing?**

End-to-End (E2E) testing is a software testing methodology that validates the entire application flow, 
from start to finish, to ensure it behaves as expected in real-world scenarios. 

It simulates user interactions with the application and verifies that all integrated components work together correctly.

**Key Characteristics of E2E Testing:**
- Simulates real user scenarios.  It tests workflows from start to finish as a real user would interact with the system.
- Verifies interaction between frontend, backend, database, and external services.
- Identifies issues that unit and integration tests may miss.


**When to Use E2E Testing**

* After unit and integration testing.
* Before releasing a new feature or version.
* When testing critical user flows.
* When working with complex, integrated systems.

**Challenges of E2E Testing:**
- Time-consuming to set up and maintain.
- Can be flaky (unstable) due to dependencies on external systems.
- Requires a robust testing framework.



## **Overview of Cypress**

Cypress is a modern JavaScript-based testing framework specifically designed for web applications. 
It is primarily used for E2E testing but also supports integration and unit tests.


**Key Features of Cypress:**
1. **Real-Time Reloads:** Automatically reloads tests as you make changes.
2. **Time Travel:** Allows you to step back through test execution to debug.
3. **Automatic Waiting:** Waits for elements and assertions without explicit waits.
4. **Network Traffic Control:** Stubs and mocks network requests for consistent testing.
5. **Cross-Browser Testing:** Supports Chrome, Firefox, Edge, and Electron.
6. **Debugging Tools:** Provides detailed error messages and stack traces.

**Why Choose Cypress?**
- Easy to set up and use.
- Built for modern web applications.
- Excellent documentation and community support.
- Integrates well with CI/CD pipelines.


## **Writing Cypress Tests**

**Installation**
Ensure you have Node.js installed, then install Cypress via npm:

```sh
npm install cypress --save-dev
```

**Opening Cypress**
* Go to project's root folder
```sh
npx cypress open
```
* configure cypress (E2E, location, create spec, config file, etc.)
* go to /cypress/e2e/
* write tests in *.spec.cy.js files
* run tests


**Reopening Cypress**
* Go to cypress's root folder - the directory where `cypress.config.js` is located.
```sh
npx cypress open
```
* run tests


**To run all the tests at once**
* Go to cypress's root folder - the directory where `cypress.config.js` is located.
    ```shell
    npx cypress run
    ```

### E2E Testing of a Sample Web Application

[Download the application](https://github.com/cllckn/decision-support-systems/tree/main/module4/exercises/exercise2) and run it.

Download [cypress test suits](./cypress-test-suits) to the cypress testing folder (i.e. /cypress/e2e/)


---
## **Hands-on Exercise 1**

---
