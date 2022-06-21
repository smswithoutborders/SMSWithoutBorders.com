import React, { useEffect } from "react";
import toast from "react-hot-toast";
import telegramLogo from "images/telegram-icon.svg";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { authSelector } from "features";
import { useTranslation } from "react-i18next";
import { useCreateExternalAccountMutation } from "services";
import {
  Loader,
  Label,
  Input,
  Button,
  useTitle,
  FormGroup,
  ErrorMessage,
  PageAnimationWrapper,
} from "components";

const TelegramRegistration = () => {
  const { t } = useTranslation();
  useTitle(t("telegram.registration.page-title"));
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useSelector(authSelector);
  const [createExternalAccount, { isLoading, isSuccess }] =
    useCreateExternalAccountMutation();

  // form schema
  const schema = yup.object().shape({
    first_name: yup
      .string()
      .required(t("telegram.registration.form.first-name.validation-error")),
    last_name: yup
      .string()
      .required(t("telegram.registration.form.last-name.validation-error")),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // check if phone number is present
  useEffect(() => {
    if (!location.state?.phone_number) {
      navigate("../../");
    }
  }, [location.state, navigate]);

  async function handleAccountCreation(data) {
    // build request data
    let request = {
      uid: auth.uid,
      platform: "telegram",
      protocol: "twofactor",
      first_name: data.first_name,
      last_name: data.last_name,
      phone_number: location.state.phone_number,
    };

    try {
      await createExternalAccount(request).unwrap();
      toast.success(t("wallet.alerts.platform-stored"));
      // navigate to wallet page
      navigate("../../", { replace: true });
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
  if (isLoading || isSuccess) {
    return <Loader />;
  }

  return (
    <PageAnimationWrapper>
      <div className="max-w-screen-sm min-h-screen px-6 py-20 mx-auto md:px-8">
        <div className="flex items-center justify-center mb-6">
          <img
            src={telegramLogo}
            alt="telegram logo"
            className="w-12 h-12 my-0 mr-3"
          />
          <h1 className="text-2xl font-bold md:text-3xl">
            {t("telegram.registration.heading")}
          </h1>
        </div>
        <p className="text-center">{t("telegram.registration.details")}</p>
        <form
          className="max-w-md mx-auto mt-12"
          onSubmit={handleSubmit(handleAccountCreation)}
        >
          <FormGroup>
            <Label htmlFor="first_name">
              {t("telegram.registration.form.first-name.label")}
            </Label>
            <Input
              type="text"
              name="first_name"
              placeholder={t(
                "telegram.registration.form.first-name.placeholder"
              )}
              {...register("first_name")}
              error={errors.first_name}
            />
            {errors.first_name && (
              <ErrorMessage>{errors.first_name?.message}</ErrorMessage>
            )}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="last_name">
              {t("telegram.registration.form.last-name.label")}
            </Label>
            <Input
              type="text"
              name="last_name"
              placeholder={t(
                "telegram.registration.form.last-name.placeholder"
              )}
              {...register("last_name")}
              error={errors.last_name}
            />
            {errors.last_name && (
              <ErrorMessage>{errors.last_name.message}</ErrorMessage>
            )}
          </FormGroup>

          <Button className="w-full my-4">
            {t("telegram.registration.form.cta-button-text")}
          </Button>
        </form>
      </div>
    </PageAnimationWrapper>
  );
};

export default TelegramRegistration;
