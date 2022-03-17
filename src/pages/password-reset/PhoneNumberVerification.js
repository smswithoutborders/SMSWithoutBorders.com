import React, { useState } from "react";
import toast from "react-hot-toast";
import { parsePhoneNumber } from "react-phone-number-input";
import { setCache, useRecoverPasswordMutation } from "services";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  PageAnimationWrapper,
  PhoneNumberInput,
  ErrorMessage,
  FormGroup,
  Button,
  Loader,
  useTitle,
  Alert,
} from "components";

const PhoneNumberVerification = () => {
  const { t } = useTranslation();
  useTitle(t("password-recovery.verification.page-title"));
  const navigate = useNavigate();
  const [number, setNumber] = useState();
  const [error, setError] = useState(false);
  const [recoverPassword, { isLoading, isSuccess }] =
    useRecoverPasswordMutation();

  async function handleVerification(evt) {
    // stop default form action
    evt.preventDefault();
    // validate phone number
    if (!number) {
      toast.error(t("forms.phone-number.validation-errors.invalid"));
      setError(true);
      return;
    } else {
      setError(false);
    }

    // build request body

    try {
      let response = await recoverPassword(number).unwrap();
      toast.success("Phone number verified successully");
      // seperate phone number into tel anc country code
      const splitNumber = parsePhoneNumber(number);
      const data = {
        uid: response.uid,
        phone_number: splitNumber.nationalNumber,
        country_code: "+" + splitNumber.countryCallingCode,
      };
      // cache data to be used on verification page
      setCache(data);
      // redirect to verification page
      navigate("verify", { state: { phone_number: number } });
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
            toast.error(t("error-messages.invalid-number"));
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
  if (isLoading || isSuccess) {
    return <Loader />;
  }

  return (
    <PageAnimationWrapper>
      <div className="max-w-screen-sm min-h-screen px-6 py-20 mx-auto text-center md:px-8">
        <h1 className="mb-4 text-3xl font-bold">
          {t("password-recovery.verification.heading")}
        </h1>
        <Alert
          kind="warning"
          message="This action will delete all currently saved tokens in your wallet"
          hideCloseButton
        />
        <p className="mt-4">{t("password-recovery.verification.details")}</p>

        <div className="max-w-md mx-auto mt-12">
          <form
            className="px-4 mx-auto sm:px-3"
            onSubmit={(evt) => handleVerification(evt)}
          >
            <FormGroup>
              <PhoneNumberInput
                international
                countryCallingCodeEditable={false}
                placeholder={t("forms.phone-number.placeholder")}
                defaultCountry="CM"
                value={number}
                type="tel"
                required
                onChange={setNumber}
                error={error ? "true" : null}
              />
              {error && (
                <ErrorMessage>
                  {t("forms.phone-number.validation-errors.invalid")}
                </ErrorMessage>
              )}
            </FormGroup>
            <div className="flex flex-col justify-evenly md:flex-row">
              <Button type="submit">{t("labels.continue")}</Button>
            </div>
          </form>
        </div>
      </div>
    </PageAnimationWrapper>
  );
};

export default PhoneNumberVerification;
