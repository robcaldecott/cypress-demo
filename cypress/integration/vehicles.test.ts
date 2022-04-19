import { DefaultRequestBody, PathParams } from "msw";
import { Vehicle } from "../../src/queries";

const vehicles: Vehicle[] = [
  {
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
  },
  {
    id: "76156b22-516e-44e7-b38b-3bacd47e34fa",
    manufacturer: "Ferrari",
    model: "Challenger",
    type: "Passenger Van",
    fuel: "Hybrid",
    vin: "8PE1CGGMU9G882341",
    color: "orchid",
    mileage: 48410,
    registrationDate: "2004-05-15T23:10:44.873Z",
    registrationNumber: "WY24 DGE",
  },
];

describe("vehicles", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.window().should("have.property", "appReady", true);
  });

  it("renders in the loading state", () => {
    cy.findByLabelText(/loading vehicles/i).should("exist");
  });

  it("renders vehicles", () => {
    cy.window().then((window) => {
      const { worker, rest } = window.msw;
      worker.use(
        rest.get<DefaultRequestBody, PathParams, Vehicle[]>(
          "/api/vehicles",
          (req, res, ctx) => {
            return res(ctx.json(vehicles));
          }
        )
      );
    });
    cy.findByLabelText(/loading vehicles/i).should("exist");
    cy.findByRole("heading", { name: /vehicles/i }).should("exist");
    cy.findByText("2").should("exist");
    cy.findByRole("list").within(() => {
      // Check the vehicles
      cy.findByRole("link", { name: /te52 hww/i }).should("exist");
      cy.findByText(/volkswagen explorer cargo van gasoline/i).should("exist");

      cy.findByRole("link", { name: /wy24 dge/i }).should("exist");
      cy.findByText(/ferrari challenger passenger van hybrid/i).should("exist");
    });
  });

  it("handles an API error", () => {
    cy.window().then((window) => {
      const { worker, rest } = window.msw;
      worker.use(
        rest.get<DefaultRequestBody, PathParams, Vehicle[]>(
          "/api/vehicles",
          (req, res, ctx) => {
            return res(ctx.delay(), ctx.status(500));
          }
        )
      );
    });
    cy.findByRole("heading", { name: /something went wrong!/i }).should(
      "exist"
    );
    cy.findByText(/500: internal server error/i).should("exist");
    cy.findByRole("button", { name: /try again/i }).click();
    // Loading
    cy.findByLabelText(/loading vehicles/i).should("exist");
  });

  it("handles no vehicles", () => {
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
    cy.findByRole("heading", { name: /no matching vehicles found\./i }).should(
      "exist"
    );
    cy.findByText(/please try a different filter\./i).should("exist");
  });

  it("filters", () => {
    cy.window().then((window) => {
      const { worker, rest } = window.msw;
      worker.use(
        rest.get<DefaultRequestBody, PathParams, Vehicle[]>(
          "/api/vehicles",
          (req, res, ctx) => {
            return res(ctx.json(vehicles));
          }
        )
      );
    });
    cy.findByRole("textbox").type("volks");
    cy.findByText("1").should("exist");
    cy.findByRole("list").within(() => {
      cy.findAllByRole("link").should("have.length", 1);
      cy.findByText(/volkswagen explorer cargo van gasoline/i).should("exist");
    });
    // Clear the filter
    cy.findByRole("button", { name: /clear/i }).click();
    cy.findByText("2").should("exist");
    cy.findByRole("list").within(() => {
      cy.findAllByRole("link").should("have.length", 2);
      cy.findByText(/volkswagen explorer cargo van gasoline/i).should("exist");
      cy.findByText(/ferrari challenger passenger van hybrid/i).should("exist");
    });
  });
});
