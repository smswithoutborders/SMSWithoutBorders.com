import React, { StrictMode, Suspense, lazy } from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import { store } from "./features";
import { Provider } from "react-redux";
import { SplashScreen } from "components";

const App = lazy(() => import("App"));

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <Suspense fallback={<SplashScreen />}>
        <App />
      </Suspense>
    </Provider>
  </StrictMode>,
  document.getElementById("root")
);
