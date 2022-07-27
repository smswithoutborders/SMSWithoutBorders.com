import React, { Fragment, Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RequireAuth, ScrollToTop } from "components";
import { Toaster } from "react-hot-toast";
import { FiSettings } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import { Loader } from "components";


const Sync = lazy(() => import("pages/Sync"));
const Contact = lazy(() => import("pages/Contact"));
const Privacy = lazy(() => import("pages/Privacy"));
const Dashboard = lazy(() => import("pages/Dashboard"));
const Landing = lazy(() => import("pages/Landing"));
const Signup = lazy(() => import("pages/signup/Signup"));
const Login = lazy(() => import("pages/Login"));
const Settings = lazy(() => import("pages/settings/Settings"));
const Wallet = lazy(() => import("pages/Wallet/Wallet"));
const NotFound = lazy(() => import("pages/NotFound"));
const WalletRedirect = lazy(() => import("pages/Wallet/WalletRedirect"));
const Website = lazy(() => import("pages/Website"));
const Downloads = lazy(() => import("pages/Downloads"));
const AccountDeletion = lazy(() => import("pages/settings/AccountDeletion"));
const PasswordChange = lazy(() => import("pages/settings/PasswordChange"));
const DashboardLayout = lazy(() => import("pages/DashboardLayout"));
const TelegramRegistration = lazy(() => import("pages/Wallet/telegram/TelegramRegistration"));
const SignupCodeVerification = lazy(() => import("pages/signup/CodeVerification"));
const PhoneNumberVerification = lazy(() => import("pages/password-reset/PhoneNumberVerification"));
const TelegramCodeVerification = lazy(() => import("pages/Wallet/telegram/CodeVerification"));
const TelegramNumberVerification = lazy(() => import("pages/Wallet/telegram/PhoneNumberVerification"));
const PasswordChangeVerification = lazy(() => import("pages/password-reset/CodeVerification"));
const PasswordReset = lazy(() => import("pages/password-reset/PasswordReset"));

// toast notifications: https://uxdesign.cc/toasts-or-snack-bars-design-organic-system-notifications-1236f2883023

const App = () => {
  const { t } = useTranslation();
  return (
    <Fragment>
      <Toaster
        position="top-right"
        containerClassName="mt-20"
        reverseOrder={false}
        toastOptions={{
          duration: 5000,
        }}
      />
      <Suspense fallback={<Loader />}>
      <BrowserRouter>
        <ScrollToTop>
          <Routes>
            <Route path="/" element={<Website />}>
              <Route index element={<Landing />} />
              <Route path="login">
                <Route index element={<Login />} />
                <Route path=":lang" element={<Login />} />
              </Route>
              <Route path="downloads" element={<Downloads />} />
              <Route path="privacy-policy" element={<Privacy />} />
              <Route path="contact-us" element={<Contact />} />
              <Route path="sign-up">
                <Route index element={<Signup />} />
                <Route path=":lang" element={<Signup />} />
                <Route path="verify" element={<SignupCodeVerification />} />
              </Route>
              <Route path="password-reset">
                <Route index element={<PhoneNumberVerification />} />
                <Route path="verify" element={<PasswordChangeVerification />} />
                <Route path="reset" element={<PasswordReset />} />
              </Route>
            </Route>

            <Route
              path="dashboard"
              element={
                <RequireAuth>
                  <DashboardLayout />
                </RequireAuth>
              }
            >
              <Route index element={<Wallet />} />
              <Route path="metrics" element={<Dashboard />} />
              <Route path="sync" element={<Sync />} />
              <Route path="wallet">
                <Route index element={<Wallet />} />
                <Route path="telegram">
                  <Route index element={<TelegramNumberVerification />} />
                  <Route path="verify" element={<TelegramCodeVerification />} />
                  <Route path="register" element={<TelegramRegistration />} />
                </Route>
              </Route>
              <Route path="settings" element={<Settings />}>
                <Route
                  index
                  element={
                    <div className="grid place-items-center">
                      <div className="p-8 text-center h-80">
                        <FiSettings size={100} className="mx-auto mb-4" />
                        <p className="mb-8 text-base leading-relaxed">
                          {t("settings.paragraph")}
                        </p>
                      </div>
                    </div>
                  }
                />
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
        </ScrollToTop>
      </BrowserRouter>
      </Suspense>
    </Fragment>
  );
};

export default App;
