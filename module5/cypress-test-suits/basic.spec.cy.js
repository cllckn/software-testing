describe("Login Page Tests", () => {
  it("Should load the login page successfully", () => {
    cy.visit("/login.html"); // Visit login page

    cy.title().should("eq", "Login"); // Verify page title

    cy.request("/login.html").its("status").should("eq", 200); // Check status code
  });

  it("Should contain login form elements", () => {
    cy.visit("/login.html"); // Visit login page

    cy.get("h2").should("contain", "Login"); // Verify header text
    cy.get("#username").should("be.visible"); // Check username input
    cy.get("#password").should("be.visible"); // Check password input
    cy.get("#loginBtn").should("be.visible").and("contain", "Login"); // Check button
  });
});