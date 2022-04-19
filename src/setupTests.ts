// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import mediaQuery from "css-mediaquery";
import { setGlobalConfig } from "@storybook/testing-react";
import { getWorker } from "msw-storybook-addon";

const createMatchMedia =
  (width: number) =>
  (query: string): MediaQueryList => ({
    matches: mediaQuery.match(query, { width }),
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  });

window.matchMedia = createMatchMedia(window.innerWidth);

Object.defineProperty(window, "scrollTo", { value: () => {}, writable: true });

const globalStorybookConfig = require("../.storybook/preview");
setGlobalConfig(globalStorybookConfig);

// @ts-ignore
afterAll(() => getWorker().close());
