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
import { useTwoStepsVerificationMutation } from "services";
import {
  Loader,
  Label,
  Button,
  FormGroup,
  PageAnimationWrapper,
  PasswordInput,
} from "components";
import { useTitle } from "hooks";

const TelegramTwoStepsVerification = () => {
  const { t } = useTranslation();
  useTitle(t("telegram.two-steps-verification.page-title"));
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useSelector(authSelector);
  const [twoStepsVerification, { isLoading, isSuccess }] =
    useTwoStepsVerificationMutation();

  // form schema
  const schema = yup.object().shape({
    password: yup
      .string()
      .required(
        t("telegram.two-steps-verification.form.password.validation-error")
      ),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function handleTwoStepsVerificationValidation(data) {
    // build request data
    let request = {
      uid: auth.uid,
      platform: "telegram",
      protocol: "twofactor",
      password: data.password,
      phone_number: location.state.phone_number,
    };

    try {
      await twoStepsVerification(request).unwrap();
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
            {t("telegram.two-steps-verification.heading")}
          </h1>
        </div>
        <p className="text-center">
          {t("telegram.two-steps-verification.paragraph-1")}
        </p>
        <br />
        <p className="text-center">
          {t("telegram.two-steps-verification.paragraph-2")}
        </p>
        <form
          className="max-w-md mx-auto mt-12"
          onSubmit={handleSubmit(handleTwoStepsVerificationValidation)}
        >
          <FormGroup>
            <Label htmlFor="password" required>
              {t("telegram.two-steps-verification.form.password.label")}
            </Label>
            <PasswordInput
              id="password"
              name="password"
              showStrength={false}
              invalid={errors.password ? true : false}
              invalidText={errors.password?.message}
              {...register("password")}
            />
          </FormGroup>

          <Button className="w-full my-4">
            {t("telegram.two-steps-verification.form.cta-button-text")}
          </Button>
        </form>
      </div>
    </PageAnimationWrapper>
  );
};

export default TelegramTwoStepsVerification;
