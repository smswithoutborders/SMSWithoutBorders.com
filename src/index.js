import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import GlobalStyles from './styles/GlobalStyles';
import './styles/index.css';
import App from './App';
import { Loader } from "./components";

ReactDOM.render(
  <React.StrictMode>
    <React.Suspense fallback={<Loader />}>
      <GlobalStyles />
      <App />
    </React.Suspense>
  </React.StrictMode>,
  document.getElementById('root')
);

