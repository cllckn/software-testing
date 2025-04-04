describe("Login and Logout Test", () => {

  it("Should log in as admin, then log out and redirect to login page", () => {
    // Login Step
    cy.visit("/login.html");
    cy.get("#username").type("admin1"); // Replace with a valid username
    cy.get("#password").type("1"); // Replace with a valid password
    cy.get("#loginBtn").click();
    cy.url().should("include", "dashboard.html"); // Check if redirected to dashboard

    // Logout Step
    cy.get("#logoutBtn").click(); // Click logout
    cy.url().should("include", "login.html"); // Verify redirection to login
    cy.should(() => {
      expect(localStorage.getItem("token")).to.be.null; // Token should be removed
    });
  });

 /* it("Should log in as registered user, then log out and redirect to login page", () => {
    // Login Step
    cy.visit("/login.html");
    cy.get("#username").type("user1"); // Replace with a valid username
    cy.get("#password").type("1"); // Replace with a valid password
    cy.get("#loginBtn").click();
    cy.url().should("include", "registered-user.html"); // Check if redirected to dashboard

    // Logout Step
    cy.get("#logoutBtn").click(); // Click logout
    cy.url().should("include", "login.html"); // Verify redirection to login
    cy.should(() => {
      expect(localStorage.getItem("token")).to.be.null; // Token should be removed
    });
  });*/
});