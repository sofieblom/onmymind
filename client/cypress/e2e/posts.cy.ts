describe("create post", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
    cy.get("[data-test=login-email]").click().type("johndoe@test.com");
    cy.get("[data-test=login-password]").click().type("test123");
    cy.get('[type="submit"]').click();
  });

  it("should be validated", () => {
    cy.get("[data-test=nav-create-new]").click();
    cy.url().should("eq", "http://localhost:3000/posts/create-new");
    cy.get('[type="submit"]').click();
    cy.get("[data-test=create-post-error-title]").should("be.visible");
    cy.get("[data-test=create-post-error-date]").should("be.visible");
    cy.get("[data-test=create-post-error-content]").should("be.visible");
  });

  it("can create and submit a valid form", () => {
    cy.get("[data-test=nav-create-new]").click();
    cy.url().should("eq", "http://localhost:3000/posts/create-new");
    cy.get("[data-test=create-post-form]").should("be.visible");
    cy.get("[data-test=create-post-title]")
      .click()
      .should("be.focused")
      .type("Test");
    cy.get("[data-test=create-post-date]")
      .click("right")
      .type("2022-06-01T08:30", { force: true });
    cy.get("[data-test=create-post-content]")
      .click()
      .should("be.focused")
      .type("Writing a post");
    cy.get('[type="submit"]').click();
    cy.url().should("eq", "http://localhost:3000/home");
  });

  it("it should be possible to edit and delete post", () => {
    cy.get("[data-test=post-wrapper]").should("exist").first().click();
    cy.get("[data-test=post-edit-button]").first().click();
    cy.get("[data-test=edit-post-content]")
      .click()
      .should("be.focused")
      .clear()
      .type("Edit post woho");
    cy.get('[type="submit"]').eq(1).click();
    cy.url().should("not.include", "edit");
    cy.get('[type="submit"]').eq(1).click();
    cy.url().should("eq", "http://localhost:3000/home");
  });
});
