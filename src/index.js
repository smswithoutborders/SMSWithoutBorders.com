import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./App";
import { Loader } from "./components";
import { store } from "./features";
import { Provider } from "react-redux";

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<Loader />}>
      <Provider store={store}>
        <App />
      </Provider>
    </Suspense>
  </React.StrictMode>,
  document.getElementById("root")
);
