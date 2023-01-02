import React, { useState } from "react";
import toast from "react-hot-toast";
import { BsShieldLock } from "react-icons/bs";
import { useCountDown } from "hooks";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import { useValidateOTPCodeMutation } from "services";
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

  const [
    validateOTPCode,
    {
      isLoading: OTPValidating,
      isSuccess: OTPValidated,
      isError: OTPValidationError,
    },
  ] = useValidateOTPCodeMutation();

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
      // redirect user to reset password with phone number and uid
      navigate("/password-reset/reset", {
        state: { ...location.state },
      });
    } catch (error) {
      // handle all api errors in utils/middleware
    }
  }

  /*
    when making requests show loading indicator
    Also maintain after request is successfull to update background state
  */
  if (isRequesting || OTPValidating || OTPValidated) {
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
  // if error while validating OTP Code
  if (OTPValidationError) {
    return (
      <div className="max-w-screen-xl p-8 mx-auto my-24 prose">
        <h2>{t("error-messages.general-error-title")}</h2>
        <p className="">
          {t("code-verification.error-messages.otp-validation")}
        </p>
        <Button onClick={() => handleCodeVerification()}>
          {t("labels.try-again")}
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
