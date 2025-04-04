describe("Unauthorized Access Test", () => {
  it("Should redirect to unauthorized page if accessing dashboard without login", () => {

    // Clear local storage to ensure no token exists
    cy.clearLocalStorage();

    cy.visit("/dashboard.html");

    cy.url().should("include", "login.html");
  });
});
