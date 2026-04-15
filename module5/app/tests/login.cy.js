// cypress/e2e/login.cy.js
// ─────────────────────────────────────────────────────────────────────────────
// E2E tests for the login page.
// The server must be running on http://localhost:3000 before Cypress starts.
// Run with:  npx cypress open   (interactive — opens the Cypress Test Runner UI)
//            npx cypress run    (headless   — runs all tests in the terminal)
// ─────────────────────────────────────────────────────────────────────────────

// describe() groups related tests into a named suite.
// All login tests live here so the Cypress UI and terminal output
// show them together under the "Login Page" heading.
describe("Login Page", () => {

  // beforeEach() runs before EVERY individual test in this describe block.
  // Navigating to "/" here means each test always starts from a clean,
  // freshly loaded login page — no leftover state from a previous test.
  beforeEach(() => {
    cy.visit("/"); // Resolves to baseUrl + "/" → http://localhost:3000/
  });

  // ── Happy path ──────────────────────────────────────────────────────────────

  it("login_whenValidCredentialsProvided_redirectsToWelcomePage", () => {
    // cy.get() finds a DOM element using a CSS selector.
    // [data-cy="username"] targets the element with the attribute data-cy="username".
    // "#username" can select the element by id attribute.
    // Using data-cy attributes as selectors is Cypress best practice —
    // they are dedicated test hooks that survive CSS or class name changes.
    cy.get('[data-cy="username"]').type("user");     // .type() simulates keyboard input
    cy.get('[data-cy="password"]').type("password"); // types into the password field
    cy.get('[data-cy="login-btn"]').click();          // .click() simulates a mouse click on the button

    //Select elements using their id attribute
    /*cy.get("#username").type("user");
    cy.get("#password").type("password");
    cy.get("#login-btn").click();*/

    // cy.url() reads the current browser URL after the server responds.
    // .should() is an assertion — the test fails if the condition is not met.
    // "include" checks that the URL contains the given substring.
    // After a valid login the server redirects to /welcome, so the URL must include it.
    cy.url().should("include", "/welcome");
  });

  it("login_whenValidCredentialsProvided_displaysWelcomeMessage", () => {
    cy.get('[data-cy="username"]').type("user");
    cy.get('[data-cy="password"]').type("password");
    cy.get('[data-cy="login-btn"]').click();

    // Chain multiple assertions on the same element using .and()
    // "be.visible" — the element exists in the DOM AND is visible to the user (not hidden by CSS)
    // "contain.text" — the element's text content includes the given string
    cy.get('[data-cy="welcome-message"]')
        .should("be.visible")
        .and("contain.text", "Welcome, user!"); // verifies the correct username appears in the heading
  });

  // ── Unhappy paths ───────────────────────────────────────────────────────────

  it("login_whenInvalidPasswordProvided_staysOnLoginPage", () => {
    cy.get('[data-cy="username"]').type("user");
    cy.get('[data-cy="password"]').type("wrongpassword"); // deliberate wrong password
    cy.get('[data-cy="login-btn"]').click();

    // On a failed login the server redirects back to /?error=1.
    // "include" checks that the error query parameter is present in the URL,
    // confirming the browser stayed on the login page rather than reaching /welcome.
    cy.url().should("include", "/?error=1");
  });

  it("login_whenInvalidPasswordProvided_displaysErrorMessage", () => {
    cy.get('[data-cy="username"]').type("user");
    cy.get('[data-cy="password"]').type("wrongpassword");
    cy.get('[data-cy="login-btn"]').click();

    // Target the error banner by its HTML id attribute (#errorBanner).
    // The banner is hidden by default in CSS and becomes visible only when
    // the page loads with ?error=1 in the URL (toggled by JavaScript in index.html).
    cy.get("#errorBanner")
        .should("be.visible")
        .and("contain.text", "Invalid username or password"); // verify the correct error message text
  });

  it("login_whenInvalidUsernameProvided_displaysErrorMessage", () => {
    cy.get('[data-cy="username"]').type("wronguser"); // deliberate wrong username
    cy.get('[data-cy="password"]').type("password");
    cy.get('[data-cy="login-btn"]').click();

    // Only asserting visibility here — the error message text is already
    // covered in the test above, so this test focuses on a different
    // input combination (wrong username instead of wrong password).
    cy.get("#errorBanner").should("be.visible");
  });

  // ── Sign out ────────────────────────────────────────────────────────────────

  it("logout_whenSignOutClicked_redirectsBackToLoginPage", () => {
    // This test covers a multi-step user journey: login → then sign out.
    // Cypress executes each command in sequence and waits for each to complete
    // before moving to the next — no manual waits or callbacks needed.

    // Step 1 — Log in first so we reach the welcome page
    cy.get('[data-cy="username"]').type("user");
    cy.get('[data-cy="password"]').type("password");
    cy.get('[data-cy="login-btn"]').click();
    cy.url().should("include", "/welcome"); // guard: confirm we actually reached /welcome

    // Step 2 — Click the Sign Out link on the welcome page
    cy.get('[data-cy="logout-btn"]').click();

    // Cypress.config("baseUrl") reads the baseUrl from cypress.config.js → "http://localhost:3000"
    // "eq" asserts an exact match — the URL must be exactly the root,
    // not just contain "/", which would also match "/welcome".
    cy.url().should("eq", Cypress.config("baseUrl") + "/");
  });

});