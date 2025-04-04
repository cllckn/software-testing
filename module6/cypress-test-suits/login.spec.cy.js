describe("Login Test", () => {
  it("Should log in with valid credentials and redirect based on role - for admin", () => {
    cy.visit("/login.html");

    cy.get("#username").type("admin1"); // Replace with a valid username
    cy.get("#password").type("1"); // Replace with a valid password

    cy.get("#loginBtn").click();

    cy.wait(1000); // Wait for redirection

    cy.url().should("include", "dashboard.html"); // Check if redirected to dashboard
    cy.get("#userinfo").should("contain", "admin1"); // Verify username is displayed
  });

  it("Should log in with valid credentials and redirect based on role - for registered user", () => {
    cy.visit("/login.html");

    cy.get("#username").type("user1"); // Replace with a valid username
    cy.get("#password").type("1"); // Replace with a valid password

    cy.get("#loginBtn").click();

    cy.wait(1000); // Wait for redirection

    cy.url().should("include", "registered-user.html"); // Check if redirected to dashboard
    cy.get("#userinfo").should("contain", "user1"); // Verify username is displayed
  });
});