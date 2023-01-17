describe("register and login", () => {
  const random = Math.random().toString();

  it("register form should be validated", () => {
    cy.visit("http://localhost:3000/register");
    cy.get('[type="submit"]').eq(1).click();
    cy.get("[data-test=firstname-input-error]").should("be.visible");
    cy.get("[data-test=lastname-input-error]").should("be.visible");
    cy.get("[data-test=email-input-error]").should("be.visible");
    cy.get("[data-test=password-input-error]").should("be.visible");
    cy.get("[data-test=repeatpassword-input-error]").should("be.visible");
  });

  it("can register a new user", () => {
    cy.visit("http://localhost:3000/register");
    cy.get("[data-test=register-form]").should("be.visible");
    cy.get("[data-test=firstname-input]").click().type("John");
    cy.get("[data-test=lastname-input]").click().type("Doe");
    cy.get("[data-test=email-input]").click().type(`${random}@gmail.com`);
    cy.get("[data-test=password-input]").click().type("test123");
    cy.get("[data-test=repeat-password-input]").click().type("test123");
    cy.get('[type="submit"]').eq(1).click();
  });

  it("login form should have validation", () => {
    cy.visit("http://localhost:3000");

    cy.get("[data-test=login-email]").click().type("johndoeemail.com");
    cy.get("[data-test=login-password]").click().type("test123");
    cy.get('[type="submit"]').click();
    cy.get("[data-test=login-email-error]").should("be.visible");
    cy.get("[data-test=login-email]").click().clear();
    cy.get("[data-test=login-email]").click().type(`${random}@gmail.com`);
    cy.get("[data-test=login-password]").click().clear().type("abc123");
    cy.get('[type="submit"]').click();
    cy.get("[data-test=login-password-error]").should("be.visible");
  });

  it("can submit a valid login form", () => {
    cy.visit("http://localhost:3000");
    cy.get("[data-test=login-email]").click().type(`${random}@gmail.com`);
    cy.get("[data-test=login-password]").click().type("test123");
    cy.get('[type="submit"]').click();
    cy.url().should("eq", "http://localhost:3000/home");
  });
});
