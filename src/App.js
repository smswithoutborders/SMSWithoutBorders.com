import React, { useEffect, Fragment } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RequireAuth, RequireSession } from "components";
import { persistState, hydrateState } from "utils";
import { Toaster } from "react-hot-toast";
import {
  Contact,
  Privacy,
  Dashboard,
  Landing,
  Signup,
  Login,
  Settings,
  Profile,
  Wallet,
  NotFound,
  Website,
  TwitterRedirect,
  GoogleRedirect,
  SignupCodeVerification,
  PhoneNumberVerification,
  PasswordChangeVerification,
  PasswordReset,
} from "pages";

const App = () => {
  // persist state
  useEffect(() => {
    persistState();
    hydrateState();
  }, []);

  return (
    <Fragment>
      <Toaster
        position="bottom-right"
        reverseOrder={false}
        toastOptions={{
          duration: 5000,
        }}
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Website />}>
            <Route index element={<Landing />} />
            <Route path="login" element={<Login />} />
            <Route path="privacy-policy" element={<Privacy />} />
            <Route path="contact-us" element={<Contact />} />
            <Route path="sign-up">
              <Route index element={<Signup />} />
              <Route path="verify" element={<SignupCodeVerification />} />
            </Route>
            <Route path="password-reset">
              <Route index element={<PhoneNumberVerification />} />
              <Route
                path="verify"
                element={
                  <RequireSession>
                    <PasswordChangeVerification />
                  </RequireSession>
                }
              />
              <Route
                path="reset"
                element={
                  <RequireSession>
                    <PasswordReset />
                  </RequireSession>
                }
              />
            </Route>
          </Route>

          <Route
            path="dashboard"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          >
            <Route index element={<Profile />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
            <Route path="wallet" element={<Wallet />} />
            <Route
              path="oauth2/google/Tokens/redirect"
              element={<GoogleRedirect />}
            />
            <Route
              path="oauth2/twitter/Tokens/redirect"
              element={<TwitterRedirect />}
            />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
};

export default App;
