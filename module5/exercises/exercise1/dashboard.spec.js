// cypress/integration/dashboard.spec.js

describe("Dashboard Page Tests", () => {

  beforeEach(() => {
    // Assuming authentication is required, log in first
    cy.visit("/login.html");
    cy.get("#username").type("admin");
    cy.get("#password").type("password123");
    cy.get("#loginBtn").click();

    // Ensure redirect to dashboard
    cy.url().should("include", "/dashboard.html");
  });

  it("should have the correct title", () => {
    cy.title().should("eq", "Dashboard"); // Check page title
  });

  it("should display left sidebar options", () => {
    cy.get(".sidebar").should("be.visible"); // Check sidebar is visible
    cy.get(".sidebar").within(() => {
      cy.contains("Home").should("exist");
      cy.contains("Customers").should("exist");
      cy.contains("Orders").should("exist");
      cy.contains("Settings").should("exist");
    });
  });

  it("should navigate to Customers List when clicking the link", () => {
    cy.contains("Customers").click();
    cy.url().should("include", "/customers.html"); // Ensure correct navigation
    cy.get("h1").should("contain", "Customers List"); // Verify heading
  });

});
