import { createContext } from "react";

import { SnackbarProvider } from "notistack";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { RootStore } from "store";
import { ThemeProvider } from "theme";

import { App } from "./app";

const store = new RootStore();

export const Context = createContext<{ store: RootStore }>({ store });

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <Router>
    <SnackbarProvider maxSnack={3} autoHideDuration={3000} preventDuplicate>
      <Context.Provider value={{ store }}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </Context.Provider>
    </SnackbarProvider>
  </Router>
);
