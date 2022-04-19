Cypress.Commands.add("fillCreateForm", () => {
  cy.findByLabelText(/make/i).click();
  cy.findByRole("option", { name: /audi/i }).click();
  cy.findByRole("textbox", { name: /model/i }).type("Model");
  cy.findByRole("textbox", { name: /variant/i }).type("Variant");
  cy.findByLabelText(/fuel/i).click();
  cy.findByRole("option", { name: /electric/i }).click();
  cy.findByLabelText(/colour/i).click();
  cy.findByRole("option", { name: /black/i }).click();
  cy.findByRole("textbox", { name: /registration number/i }).type("REGNO");
  cy.findByRole("textbox", { name: /vin/i }).type("VIN");
  cy.findByRole("textbox", { name: /mileage/i }).type("12345");
  cy.findByRole("textbox", { name: /registration date/i }).type("01/01/2000");
});
