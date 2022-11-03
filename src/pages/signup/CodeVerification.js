import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { BsShieldLock } from "react-icons/bs";
import { useCountDown } from "hooks";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import {
  getCache,
  clearCache,
  useVerifySignupMutation,
  useValidateOTPCodeMutation,
} from "services";

import {
  PageAnimationWrapper,
  Loader,
  Button,
  Input,
  FormGroup,
} from "components";
import Error from "../Error";
import { FiArrowRightCircle } from "react-icons/fi";

const CodeVerification = () => {
  const { t } = useTranslation();
  const cache = getCache();
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
  } = useCountDown(cache);

  // check if phone number and cache is present
  useEffect(() => {
    if (!location.state?.phone_number && cache === null) {
      navigate("../");
    }
  }, [location.state, navigate, cache]);

  // verify code
  async function handleCodeVerification(evt) {
    // prevent default form action
    evt.preventDefault();
    try {
      await validateOTPCode(code).unwrap();
      toast.success(t("alert-messages.code-verified"));
      await handleSignUpVerification();
    } catch (error) {
      // https://redux-toolkit.js.org/rtk-query/usage/error-handling
      const { status, originalStatus } = error;
      if (originalStatus) {
        switch (originalStatus) {
          case 400:
            toast.error(t("error-messages.400"));
            break;
          case 401:
            toast.error(t("error-messages.401"));
            break;
          case 403:
            toast.error(t("error-messages.invalid-code"));
            break;
          case 409:
            toast.error(t("error-messages.409"));
            break;
          case 429:
            toast.error(t("error-messages.429"));
            break;
          case 500:
            toast.error(t("error-messages.500"));
            break;
          default:
            toast.error(t("error-messages.general-error-message"));
        }
      } else if (status === "FETCH_ERROR") {
        toast.error(t("error-messages.network-error"));
      }
    }
  }
  // verify signup
  async function handleSignUpVerification() {
    try {
      await verifySignup().unwrap();
      toast.success(t("signup.code-verification.alerts.account-created"));
      // remove any cached data
      clearCache();
      // handle user redirection if they are from app or otherwise
      // they have to now click on the button because of possible browser blocking intents
      if (cache.redirectURL) {
        setVerified(true);
      } else {
        navigate("/login");
      }
    } catch (error) {
      // https://redux-toolkit.js.org/rtk-query/usage/error-handling
      const { status, originalStatus } = error;
      if (originalStatus) {
        switch (originalStatus) {
          case 400:
            toast.error(t("error-messages.400"));
            break;
          case 401:
            toast.error(t("error-messages.401"));
            break;
          case 403:
            toast.error(t("error-messages.403"));
            break;
          case 409:
            toast.error(t("error-messages.409"));
            break;
          case 429:
            toast.error(t("error-messages.429"));
            break;
          case 500:
            toast.error(t("error-messages.500"));
            break;
          default:
            toast.error(t("error-messages.general-error-message"));
        }
      } else if (status === "FETCH_ERROR") {
        toast.error(t("error-messages.network-error"));
      }
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
  else if (OTPRequestError) {
    return (
      <PageAnimationWrapper>
        <div className="max-w-screen-xl min-h-screen p-8 mx-auto prose text-gray-900">
          <div className="mx-auto my-32">
            <h1>{t("error-messages.general-error-title")}</h1>
            <p>{t("code-verification.error-messages.otp-request")}</p>

            {!isInitialized && (
              <div className="flex max-w-sm space-x-2">
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
  // // if error while verifying signup
  else if (signUpVerificationError) {
    return (
      <Error
        message={t("signup.code-verification.alerts.registration-error")}
        callBack={handleSignUpVerification}
      />
    );
  } else if (verified) {
    return (
      <div className="h-full max-w-md min-h-screen px-6 mx-auto prose text-center pt-36">
        <h3>{t("signup.code-verification.alerts.app-redirect")}</h3>
        <Button
          className="mt-4 open-app-button"
          onClick={() => window.location.replace(cache.redirectURL)}
        >
          <FiArrowRightCircle size={22} />
          <span className="ml-1">{t("labels.open-app")}</span>
        </Button>
      </div>
    );
  } else {
    return (
      <PageAnimationWrapper>
        <div className="max-w-screen-sm min-h-screen px-6 py-20 mx-auto text-center md:px-8">
          <h1 className="inline-flex items-center mb-4 text-4xl font-bold">
            <BsShieldLock size={48} className="mr-2" />
            <span>{t("code-verification.heading")}</span>
          </h1>

          <div className="my-4 prose text-justify">
            <p>{t("code-verification.paragraph-1")}</p>
            <p>{t("code-verification.paragraph-2")}</p>
          </div>

          <div className="max-w-md mx-auto mt-12">
            <form
              className="px-4 mx-auto sm:px-3"
              onSubmit={(evt) => handleCodeVerification(evt)}
            >
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

              <FormGroup className="flex flex-col justify-evenly md:flex-row">
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

                <Button className="" type="submit">
                  {t("labels.continue")}
                </Button>
              </FormGroup>
            </form>
          </div>
        </div>
      </PageAnimationWrapper>
    );
  }
};

export default CodeVerification;
