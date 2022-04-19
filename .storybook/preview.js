import { IntlProvider } from "react-intl";
import { QueryClient, QueryClientProvider, setLogger } from "react-query";
import { initialize, mswDecorator } from "msw-storybook-addon";
import { ThemeProvider, createTheme } from "@mui/material";

// Disable `react-query` error logging when running tests.
if (process.env.NODE_ENV === "test") {
  setLogger({
    error: () => {},
    log: (...params) => console.log(...params),
    warn: (...params) => console.warn(...params),
  });
}

initialize({ onUnhandledRequest: "bypass" });

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  darkMode: {
    stylePreview: true,
  },
  reactIntl: {
    defaultLocale: "en",
    locales: ["en", "fi"],
    messages: {
      en: undefined,
      fi: require("../src/i18n/fi.json"),
    },
  },
  locale: "en",
  locales: {
    en: "English",
    fi: "suomi",
  },
  options: {
    storySort: {
      order: ["App"],
    },
  },
};

export const decorators = [
  mswDecorator,
  (Story) => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          refetchIntervalInBackground: false,
          retry: false,
        },
      },
    });

    return (
      <QueryClientProvider client={queryClient}>
        <IntlProvider locale="en">
          <ThemeProvider
            theme={createTheme({
              components: {
                MuiTextField: { defaultProps: { fullWidth: true } },
              },
            })}
          >
            <Story />
          </ThemeProvider>
        </IntlProvider>
      </QueryClientProvider>
    );
  },
];
