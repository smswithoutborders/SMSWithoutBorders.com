import React, { useState } from "react";
import toast from "react-hot-toast";
import { useRecoverPasswordMutation } from "services";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Button,
  Loader,
  Alert,
  FormGroup,
  PageAnimationWrapper,
  PhoneNumberInput,
} from "components";
import { useTitle } from "hooks";

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
      setError(true);
      return;
    } else {
      setError(false);
    }

    // build request body

    try {
      let response = await recoverPassword(number).unwrap();
      toast.success(t("password-recovery.alert-messages.account-verified"));
      // redirect to verification page with phone number and uid from response
      navigate("/password-reset/verify", {
        state: { phone_number: number, ...response },
      });
    } catch (error) {
      // handle all api errors in utils/middleware
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
          <form onSubmit={(evt) => handleVerification(evt)}>
            <FormGroup>
              <PhoneNumberInput
                id="phone_number"
                placeholder={t("forms.phone-number.placeholder")}
                value={number}
                onChange={setNumber}
                invalid={error ? true : false}
                invalidText={t("forms.phone-number.validation-errors.invalid")}
              />
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
