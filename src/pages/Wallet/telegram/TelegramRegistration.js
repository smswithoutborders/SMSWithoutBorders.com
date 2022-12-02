import React from "react";
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
  FormGroup,
  PageAnimationWrapper,
} from "components";
import { useTitle } from "hooks";

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
      navigate("/dashboard/wallet", { replace: true });
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
              id="first_name"
              name="first_name"
              placeholder={t(
                "telegram.registration.form.first-name.placeholder"
              )}
              invalid={errors.first_name}
              invalidText={errors.first_name?.message}
              {...register("first_name")}
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="last_name">
              {t("telegram.registration.form.last-name.label")}
            </Label>
            <Input
              type="text"
              id="last_name"
              name="last_name"
              placeholder={t(
                "telegram.registration.form.last-name.placeholder"
              )}
              invalid={errors.last_name}
              invalidText={errors.last_name?.message}
              {...register("last_name")}
            />
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
