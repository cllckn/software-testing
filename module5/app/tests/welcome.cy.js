// ─────────────────────────────────────────────────────────────────────────────
// cy.request() as a UI bypass helper
// ─────────────────────────────────────────────────────────────────────────────
//
// Problem: every test that needs to start on the /welcome page must first
// click through the login form. For one test that is fine. For ten tests
// it is slow and fragile — a UI change to the login form breaks unrelated tests.
//
// Solution: use cy.request() to POST the credentials directly to the server,
// then navigate to /welcome. This is faster and bypasses the UI entirely.
// The test below verifies welcome-page behaviour, not login behaviour —
// so skipping the UI login is appropriate here.
//
// Rule of thumb:
//   Use the UI  → when you are testing the login flow itself
//   Use cy.request() → when login is just a prerequisite for testing something else
// ─────────────────────────────────────────────────────────────────────────────

describe("Welcome Page — accessed via cy.request() login bypass", () => {

    beforeEach(() => {
        // cy.request() sends the credentials directly to the server over HTTP —
        // no form fill, no button click, no page render.
        // followRedirect: true (the default) means Cypress follows the 302 automatically,
        // ending up at /welcome — but we do not assert here because we only want the
        // session/cookie to be established. We then navigate with cy.visit().
        cy.request({
            method: "POST",
            url: "/login",
            body: { username: "user", password: "password" },
            form: true, // matches the Content-Type the Express server expects
        });

        // After the request above the server has set any session state.
        // cy.visit() now takes us directly to /welcome without going through the login form.
        cy.visit("/welcome");



        /*
        cy.request({
          method: "POST",
          url: "/login",
          body: { username: "user", password: "password" },
          form: true, // matches the Content-Type the Express server expects
        }).then((response) => {
          // Extract the JWT from the response body.
          // Adjust the property name to match your server's actual response shape:
          //   { token: "eyJ..." }  → response.body.token
          //   { jwt:   "eyJ..." }  → response.body.jwt
          //   { accessToken: "eyJ..." } → response.body.accessToken
          const token = response.body.token;

          // cy.window() accesses the browser's window object —
          // the same object that holds localStorage and sessionStorage.
          // We store the JWT here so the app's JavaScript can read it
          // on the next page load exactly as it would after a real login.
          cy.window().then((win) => {
            // localStorage persists across page navigations within the same origin.
            // Use this when your app reads the token from localStorage.
            win.localStorage.setItem("token", token);

            // ── Alternative: sessionStorage ──────────────────────────────────
            // sessionStorage is cleared when the tab is closed.
            // Use this if your app reads the token from sessionStorage instead.
            // win.sessionStorage.setItem("token", token);

            // ── Alternative: Cypress.env() ───────────────────────────────────
            // Stores the token in Cypress's own environment so it can be read
            // across multiple spec files via Cypress.env("token").
            // Cypress.env("token", token);
          });

        */

    });

    it("welcomePage_whenAccessedAfterLogin_displaysWelcomeMessage", () => {
        // This test is about the welcome page content, not the login process.
        // Using cy.request() in beforeEach means a login form change can never
        // break this test — only a welcome page change can.
        cy.get('[data-cy="welcome-message"]')
          .should("be.visible")
          .and("contain.text", "Welcome, user!");
    });

    it("welcomePage_whenSignOutClicked_redirectsToLoginPage", () => {
        cy.get('[data-cy="logout-btn"]').click();
        cy.url().should("eq", Cypress.config("baseUrl") + "/");
    });

});