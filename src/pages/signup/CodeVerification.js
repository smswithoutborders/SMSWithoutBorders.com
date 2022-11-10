import React, { useState } from "react";
import toast from "react-hot-toast";
import Error from "../Error";
import { BsShieldLock } from "react-icons/bs";
import { FiArrowRightCircle } from "react-icons/fi";
import { useCountDown } from "hooks";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import { useVerifySignupMutation, useValidateOTPCodeMutation } from "services";
import {
  Loader,
  Button,
  Input,
  FormGroup,
  PageAnimationWrapper,
} from "components";

const CodeVerification = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [code, setCode] = useState();
  const [verified, setVerified] = useState(false);

  const [
    validateOTPCode,
    { isLoading: OTPValidating, isSuccess: OTPValidated },
  ] = useValidateOTPCodeMutation();

  const [
    verifySignup,
    {
      isLoading: verifyingAccount,
      isSuccess: accountVerified,
      isError: signUpVerificationError,
    },
  ] = useVerifySignupMutation();

  const {
    timer,
    expired,
    isInitialized,
    isRequesting,
    OTPRequestError,
    resendOTPCode,
  } = useCountDown(location.state);

  // verify code
  async function handleCodeVerification(evt) {
    // prevent default form action
    evt.preventDefault();
    try {
      await validateOTPCode(code).unwrap();
      toast.success(t("alert-messages.code-verified"));
      await handleSignUpVerification();
    } catch (error) {
      // handle all other errors in utils/middleware
    }
  }
  // verify signup
  async function handleSignUpVerification() {
    try {
      await verifySignup().unwrap();
      toast.success(t("signup.code-verification.alerts.account-created"));

      /*
       * @param ari(app return url)
       * handle user redirection if they are from app or otherwise
       * they have to now click on the button because of possible browser blocking intents
       */
      if (location.state.ari) {
        setVerified(true);
      } else {
        // replace clears all stored url state
        navigate("/login", {replace: true});
      }
    } catch (error) {
      // handle all api errors in utils/middleware
    }
  }

  /*
    when making requests show loading indicator
    Also maintain after request is successfull to update background state
  */
  if (
    isRequesting ||
    OTPValidating ||
    OTPValidated ||
    verifyingAccount ||
    accountVerified
  ) {
    return <Loader />;
  }
  // if error while requesting OTP code
  if (OTPRequestError) {
    return (
      <PageAnimationWrapper>
        <div className="max-w-screen-xl min-h-screen p-8 mx-auto prose text-gray-900">
          <div className="mx-auto my-32">
            <h2>{t("error-messages.general-error-title")}</h2>
            <p>{t("code-verification.error-messages.otp-request")}</p>

            {!isInitialized && (
              <div className="flex max-w-xs space-x-2">
                <Button outline className="flex-1" onClick={() => navigate(-1)}>
                  {t("labels.back")}
                </Button>
                <Button className="flex-1" onClick={() => resendOTPCode()}>
                  {t("labels.try-again")}
                </Button>
              </div>
            )}

            {isInitialized && expired && (
              <Button
                outline
                className="order-1 mt-3 md:mt-0 md:order-none"
                onClick={() => resendOTPCode()}
              >
                {t("code-verification.resend-button-text")}
              </Button>
            )}

            {isInitialized && !expired && (
              <p className="order-1 py-2 mt-3 md:mt-0 md:order-none">
                <span>{t("code-verification.resend-label")} : </span>
                <span className="font-bold">{timer}</span>
              </p>
            )}
          </div>
        </div>
      </PageAnimationWrapper>
    );
  }
  // if error while verifying signup
  if (signUpVerificationError) {
    return (
      <Error
        message={t("signup.code-verification.alerts.registration-error")}
        callBack={handleSignUpVerification}
      />
    );
  }
  // after code verification user navigates back to avoid intent blocking from mobile platforms
  if (verified) {
    return (
      <div className="h-full max-w-md min-h-screen px-6 mx-auto prose text-center pt-36">
        <h3>{t("signup.code-verification.alerts.app-redirect")}</h3>
        <Button
          className="mt-4 open-app-button"
          onClick={() => navigate(location.state.ari, { replace: true })}
        >
          <FiArrowRightCircle size={22} />
          <span className="ml-1">{t("labels.open-app")}</span>
        </Button>
      </div>
    );
  }

  return (
    <PageAnimationWrapper>
      <div className="max-w-screen-sm min-h-screen px-6 py-20 mx-auto prose text-center md:px-8">
        <h1 className="inline-flex items-center mb-4 font-bold">
          <BsShieldLock size={48} className="mr-2" />
          <span>{t("code-verification.heading")}</span>
        </h1>

        <div className="my-4">
          <p>{t("code-verification.paragraph-1")}</p>
          <details>
            <summary className="text-blue-800 cursor-pointer">
              {t("labels.learn-more")}
            </summary>
            <p>{t("code-verification.paragraph-2")}</p>
          </details>
        </div>

        <div className="max-w-md mx-auto mt-8">
          <form onSubmit={(evt) => handleCodeVerification(evt)}>
            <FormGroup>
              <Input
                type="number"
                name="code"
                min={0}
                required
                placeholder={t("code-verification.form.code.placeholder")}
                onChange={(evt) => setCode(evt.target.value)}
              />
            </FormGroup>

            <FormGroup className="flex flex-col gap-4 mt-8 justify-evenly md:flex-row">
              {isInitialized && expired && (
                <Button
                  outline
                  className="flex-1 order-1 md:order-none"
                  onClick={() => resendOTPCode()}
                >
                  {t("code-verification.resend-button-text")}
                </Button>
              )}

              {isInitialized && !expired && (
                <p className="order-1 py-2 my-0 md:order-none">
                  <span>{t("code-verification.resend-label")} : </span>
                  <span className="font-bold">{timer}</span>
                </p>
              )}

              <Button className="flex-1" type="submit">
                {t("labels.continue")}
              </Button>
            </FormGroup>
          </form>
        </div>
      </div>
    </PageAnimationWrapper>
  );
};

export default CodeVerification;
