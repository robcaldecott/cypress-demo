describe("create", () => {
  beforeEach(() => {
    cy.visit("/create");
    cy.window().should("have.property", "appReady", true);
  });

  it("creates a new vehicle", () => {
    // Complete the form
    cy.fillCreateForm();
    // Create
    cy.findByRole("button", { name: /create/i }).click();
    // Check the vehicle is in the list
    cy.findByRole("heading", { name: /vehicles/i }).should("exist");
    cy.findByRole("list").within(() => {
      // Check the vehicles
      cy.findByRole("link", { name: /regno/i }).should("exist");
      cy.findByText(/audi model variant electric/i)
        .should("exist")
        .scrollIntoView();
    });
  });

  it("validates the fields", () => {
    cy.findByRole("button", { name: /create/i }).click();
    // Check the validation messages
    cy.findByText(/please select a make/i).should("exist");
    cy.findByText(/please enter the model/i).should("exist");
    cy.findByText(/please enter the variant/i).should("exist");
    cy.findByText(/please select a fuel type/i).should("exist");
    cy.findByText(/please select a colour/i).should("exist");
    cy.findByText(/please enter the registration number/i).should("exist");
    cy.findByText(/please enter the vin/i).should("exist");
    cy.findByText(/please enter the mileage/i).should("exist");
    cy.findByText(/please enter the registration date/i).should("exist");
  });

  it("resets the form", () => {
    cy.fillCreateForm();
    cy.findByRole("button", { name: /reset/i }).click();
    // Check the form is empty
    cy.findByRole("button", { name: /audi/i }).should("not.exist");
    cy.findByLabelText(/model/i).should("have.value", "");
    cy.findByLabelText(/variant/i).should("have.value", "");
    cy.findByRole("button", { name: /electric/i }).should("not.exist");
    cy.findByRole("button", { name: /black/i }).should("not.exist");
    cy.findByLabelText(/registration number/i).should("have.value", "");
    cy.findByLabelText(/vin/i).should("have.value", "");
    cy.findByLabelText(/mileage/i).should("have.value", "");
    cy.findByLabelText(/registration date/i).should("have.value", "");
  });

  it("validates the mileage", () => {
    cy.findByRole("textbox", { name: /mileage/i }).type("abc");
    cy.findByRole("button", { name: /create/i }).click();
    cy.findByText(/please enter a valid mileage/i).should("exist");
  });

  it("validates the registration date", () => {
    cy.findByRole("textbox", { name: /registration date/i }).type("01");
    cy.findByRole("button", { name: /create/i }).click();
    cy.findByText(/please enter a valid registration date/i).should("exist");
  });

  it("navigates to the home page", () => {
    cy.findByRole("link", { name: /home/i }).click();
    cy.findByRole("heading", { name: /vehicles/i }).should("exist");
  });

  it("cancels the form", () => {
    cy.findByRole("link", { name: /cancel/i }).click();
    cy.findByRole("heading", { name: /vehicles/i }).should("exist");
  });
});
