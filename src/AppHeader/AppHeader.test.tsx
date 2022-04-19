import { render, screen, within } from "@testing-library/react";
import { composeStories } from "@storybook/testing-react";
import * as stories from "./AppHeader.stories";

const { Default } = composeStories(stories);

it("renders", () => {
  render(<Default />);
  const header = within(screen.getByRole("banner"));
  expect(
    header.getByRole("heading", { name: /application title/i })
  ).toBeInTheDocument();
});
