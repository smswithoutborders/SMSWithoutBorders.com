import React from "react";
import userEvent from "@testing-library/user-event";
import { render } from "@testing-library/react";
import { store } from "../features";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

// all providers in one place
const ProvidersWrapper = ({ children }) => {
  return (
    <BrowserRouter>
      <Provider store={store}>{children}</Provider>
    </BrowserRouter>
  );
};

// custom renderer using our providers
const customRenderer = (ui, options) =>
  render(ui, { wrapper: ProvidersWrapper, ...options });

// re-export everything
export * from "@testing-library/react";
// overide render with custom
export { customRenderer as render, userEvent };
