import React, { Fragment } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RequireAuth, RequireSession } from "components";
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
  AccountDeletion,
  WalletRedirect,
  PasswordChange,
  SignupCodeVerification,
  PhoneNumberVerification,
  PasswordChangeVerification,
  PasswordReset,
} from "pages";

const App = () => {
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
            <Route index element={<Wallet />} />
            <Route path="profile" element={<Profile />} />
            <Route path="wallet" element={<Wallet />} />
            <Route path="settings" element={<Settings />}>
              <Route index element={<PasswordChange />} />
              <Route path="change-password" element={<PasswordChange />} />
              <Route path="delete-account" element={<AccountDeletion />} />
            </Route>
          </Route>
          <Route
            path="platforms/:platform/protocols/:protocol/redirect_codes"
            element={<WalletRedirect />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
};

export default App;
