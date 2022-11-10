import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import telegramLogo from "images/telegram-icon.svg";
import { useStoreTokenMutation } from "services";
import { authSelector } from "features";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import {
  PageAnimationWrapper,
  PhoneNumberInput,
  ErrorMessage,
  FormGroup,
  Button,
  Loader,
  useTitle,
} from "components";

const PhoneNumberVerification = () => {
  const { t } = useTranslation();
  useTitle(t("telegram.phone-verification.page-title"));

  const location = useLocation();
  const navigate = useNavigate();
  const auth = useSelector(authSelector);
  const [number, setNumber] = useState();
  const [error, setError] = useState(false);
  // store token
  const [storeToken, { isLoading, isSuccess }] = useStoreTokenMutation();

  // check if url is present
  useEffect(() => {
    if (!location.state?.url) {
      navigate("/dashboard/wallet");
    }
  }, [location.state, navigate]);

  async function handleTokenStorage(evt) {
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
    let data = {
      uid: auth.uid,
      url: location.state.url,
      phone_number: number,
    };

    try {
      const response = await storeToken(data).unwrap();
      switch (response.body) {
        case 201:
          toast.success(t("telegram.phone-verification.alerts.code-sent"));
          // send user to code verification
          navigate("/dashboard/wallet/telegram/verify", {
            state: { phone_number: number },
          });
          break;
        default:
          // 200 success
          toast.error(
            t("telegram.phone-verification.alerts.authorization-error")
          );
          // navigate to wallet page
          navigate("/dashboard/wallet");
      }
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
        <div className="flex items-center justify-center mb-6">
          <img
            src={telegramLogo}
            alt={t("telegram.phone-verification.logo-alt-text")}
            className="w-12 h-12 my-0 mr-3"
          />
          <h1 className="text-3xl font-bold">Telegram</h1>
        </div>
        <p>{t("telegram.phone-verification.details")}</p>

        <div className="max-w-md mx-auto mt-12">
          <form onSubmit={(evt) => handleTokenStorage(evt)}>
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
            <div className="flex flex-col mt-8 justify-evenly md:flex-row">
              <Button type="submit" className="flex-1 md:order-1">
                {t("labels.continue")}
              </Button>
              <Button
                type="button"
                outline
                className="flex-1 my-4 md:my-0 md:order-0 md:mr-2"
                onClick={() => navigate(-1)}
              >
                {t("labels.back")}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </PageAnimationWrapper>
  );
};

export default PhoneNumberVerification;
