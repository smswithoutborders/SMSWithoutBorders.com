import React, { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import { store } from "./features";
import { Provider } from "react-redux";
import { SplashScreen } from "components";
import "./styles/index.css";
import "./i18n";

const App = lazy(() => import("App"));
const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <StrictMode>
    <Provider store={store}>
      <Suspense fallback={<SplashScreen />}>
        <App />
      </Suspense>
    </Provider>
  </StrictMode>
);
