describe("opens the home page", () => {
  before(() => {
    cy.visit("/");
    cy.window().should("have.property", "appReady", true);
    cy.findByLabelText(/loading/i).should("exist");
    cy.findByRole("heading", { name: /vehicles/i }).should("exist");
  });

  it("renders the header", () => {
    cy.findByRole("heading", { name: /vehicle manager/i }).should("exist");
  });

  describe("create button", () => {
    context("desktop", () => {
      beforeEach(() => {
        cy.viewport(1024, 768);
        cy.visit("/");
      });

      it("handles the labelled fab", () => {
        cy.findByRole("link", { name: /create/i }).click();
        cy.findByRole("heading", { name: /create new vehicle/i }).should(
          "exist"
        );
      });
    });

    context("mobile", () => {
      beforeEach(() => {
        cy.viewport("iphone-6");
        cy.visit("/");
      });

      it("handles the icon-only fab", () => {
        cy.findByRole("link", { name: /create/i }).click();
        cy.findByRole("heading", { name: /create new vehicle/i }).should(
          "exist"
        );
      });
    });
  });
});
