import ReactDOM from "react-dom";
import { IntlProvider } from "react-intl";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";
import { App } from "./App";

import("./mocks/browser").then(({ worker }) => {
  // Mock the API
  worker.start({ onUnhandledRequest: "bypass" });
  // Create the query client
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // Disable automatic retries
        retry: false,
      },
    },
  });
  // Signal to Cypress that the app is ready.
  // Required as we don't want the tests to run
  // until MSW has started.
  if (window.Cypress) {
    window.appReady = true;
  }
  // Render the app
  ReactDOM.render(
    <QueryClientProvider client={queryClient}>
      <IntlProvider locale="en-GB" defaultLocale="en-GB">
        <Router basename={process.env.PUBLIC_URL}>
          <ThemeProvider
            theme={createTheme({
              components: {
                MuiTextField: { defaultProps: { fullWidth: true } },
              },
            })}
          >
            <CssBaseline />
            <App />
          </ThemeProvider>
        </Router>
      </IntlProvider>
    </QueryClientProvider>,
    document.getElementById("root")
  );
});
