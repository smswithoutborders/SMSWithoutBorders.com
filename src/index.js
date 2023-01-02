import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { store } from "./features";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "./styles/index.css";
import "./i18n";
import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
