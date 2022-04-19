import { DefaultRequestBody, PathParams } from "msw";
import { Vehicle } from "../../src/queries";

let vehicle: Vehicle = {
  id: "5e0562c5-a50b-42ff-83e5-4c004c5b639a",
  manufacturer: "Volkswagen",
  model: "Explorer",
  type: "Cargo Van",
  fuel: "Gasoline",
  vin: "1USTAN9Z5MNT86399",
  color: "teal",
  mileage: 70609,
  registrationDate: "2005-07-08T16:58:36.380Z",
  registrationNumber: "TE52 HWW",
};

describe("details", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.window().should("have.property", "appReady", true);
    cy.window().then((window) => {
      const { worker, rest } = window.msw;
      worker.use(
        rest.get<DefaultRequestBody, PathParams, Vehicle[]>(
          "/api/vehicles",
          (req, res, ctx) => res(ctx.json([vehicle]))
        ),
        rest.get<DefaultRequestBody, PathParams, Vehicle>(
          "/api/vehicles/:vehicleId",
          (req, res, ctx) => res(ctx.delay(), ctx.json(vehicle))
        ),
        rest.delete<DefaultRequestBody, PathParams, { id: string }>(
          "/api/vehicles/:vehicleId",
          (req, res, ctx) => res(ctx.json({ id: vehicle.id }))
        )
      );
    });
  });

  it("renders vehicle details", () => {
    cy.findByRole("link", { name: /te52 hww/i }).click();
    // Loading
    cy.findByLabelText(/loading vehicle/i).should("exist");
    // Wait for the load to complete
    cy.findByLabelText(/vehicle details/i).should("exist");
    // Breadcrumbs
    cy.findByRole("navigation").within(() => {
      cy.findByRole("link", { name: /home/i }).should("exist");
      cy.findByText(/te52 hww/i).should("exist");
    });
    // Card
    cy.findByLabelText(/vehicle details/i).within(() => {
      // Title
      cy.findByText(/volkswagen explorer cargo van/i).should("exist");
      cy.findByText(/te52 hww/i).should("exist");
      // Fields
      cy.findByLabelText(/colour/i)
        .invoke("text")
        .should("match", /teal/i);
      cy.findByLabelText(/fuel/i)
        .invoke("text")
        .should("match", /gasoline/i);
      cy.findByLabelText(/vin/i)
        .invoke("text")
        .should("match", /1ustan9z5mnt86399/i);
      cy.findByLabelText(/mileage/i).should("have.text", "70,609");
      cy.findByLabelText(/registration date/i)
        .invoke("text")
        .should("match", /friday, 8 july 2005/i);
      // Delete button
      cy.findByRole("button", { name: /delete vehicle/i }).should("exist");
    });
  });

  it("deletes the vehicle", () => {
    cy.findByRole("link", { name: /te52 hww/i }).click();
    cy.findByRole("button", { name: /delete vehicle/i }).click();
    cy.window().then((window) => {
      const { worker, rest } = window.msw;
      worker.use(
        rest.get<DefaultRequestBody, PathParams, Vehicle[]>(
          "/api/vehicles",
          (req, res, ctx) => {
            return res(ctx.json([]));
          }
        )
      );
    });
    cy.findByRole("dialog", { name: /delete vehicle/i }).within(() => {
      cy.findByText(
        /are you really sure you want to delete this vehicle\?/i
      ).should("exist");
      cy.findByRole("button", { name: /delete/i }).click();
    });
    // Should be back on the home page
    cy.findByRole("heading", { name: /^vehicles$/i }).should("exist");
    cy.findByRole("heading", { name: /no matching vehicles found\./i }).should(
      "exist"
    );
  });

  it("cancels the delete dialog", () => {
    cy.findByRole("link", { name: /te52 hww/i }).click();
    cy.findByRole("button", { name: /delete vehicle/i }).click();
    cy.findByRole("dialog", { name: /delete vehicle/i }).within(() => {
      cy.findByRole("button", { name: /cancel/i }).click();
    });
  });

  it("handles errors deleting the vehicle", () => {
    cy.findByRole("link", { name: /te52 hww/i }).click();
    cy.findByRole("button", { name: /delete vehicle/i }).click();
    cy.window().then((window) => {
      const { worker, rest } = window.msw;
      worker.use(
        rest.delete<DefaultRequestBody, PathParams, { id: string }>(
          "/api/vehicles/:vehicleId",
          (req, res, ctx) => res(ctx.status(500))
        )
      );
    });
    cy.findByRole("dialog", { name: /delete vehicle/i }).within(() => {
      cy.findByRole("button", { name: /delete/i }).click();
    });
    cy.findByLabelText(/vehicle details/i).within(() => {
      // Error should appear
      cy.findByText(/500: internal server error/i).should("exist");
      // Delete vehicle button should be gone
      cy.findByRole("button", { name: /delete vehicle/i }).should("not.exist");
      // Clear the error
      cy.findByRole("button", { name: /close/i }).click();
      // Delete button is back
      cy.findByRole("button", { name: /delete vehicle/i }).should("exist");
    });
  });
});
