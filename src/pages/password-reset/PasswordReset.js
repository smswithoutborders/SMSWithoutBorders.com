import React from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import { useNewPasswordMutation } from "services";
import { useTranslation } from "react-i18next";
import {
  Loader,
  Label,
  ErrorMessage,
  FormGroup,
  Button,
  PasswordInput,
  PageAnimationWrapper,
  useTitle,
} from "components";

const PasswordReset = () => {
  const { t } = useTranslation();
  useTitle(t("password-recovery.recovery.page-title"));
  const { state } = useLocation();
  const navigate = useNavigate();
  const [newPassword, { isLoading, isSuccess }] = useNewPasswordMutation();

  // form schema
  const schema = yup.object().shape({
    password: yup
      .string()
      .min(8, t("forms.password.validation-errors.min"))
      .required(t("forms.password.validation-errors.required")),
    confirmPassword: yup
      .string()
      .min(8, t("forms.confirm-password.validation-errors.min"))
      .required(t("forms.confirm-password.validation-errors.required"))
      .oneOf(
        [yup.ref("password"), null],
        t("forms.confirm-password.validation-errors.match")
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function handlePasswordReset(data) {
    // build request data
    let request = {
      uid: state?.uid,
      new_password: data.password,
    };

    try {
      await newPassword(request).unwrap();
      toast.success(t("alert-messages.password-changed"));
      // replace clears url state
      navigate("/login", { replace: true });
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
          {t("password-recovery.recovery.heading")}
        </h1>
        <p className=""> {t("password-recovery.recovery.details")}</p>
        <div className="max-w-md mx-auto mt-12 text-left">
          <form onSubmit={handleSubmit(handlePasswordReset)}>
            <FormGroup>
              <Label htmlFor="password" required>
                {t("forms.password.label")}
              </Label>
              <PasswordInput
                name="password"
                {...register("password")}
                error={errors.password}
              />
              {errors.password && (
                <ErrorMessage>{errors.password?.message}</ErrorMessage>
              )}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="confirmPassword" required>
                {t("forms.confirm-password.label")}
              </Label>
              <PasswordInput
                name="confirmPassword"
                placeholder={t("forms.confirm-password.placeholder")}
                {...register("confirmPassword")}
                error={errors.confirmPassword}
              />
              {errors.confirmPassword && (
                <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>
              )}
            </FormGroup>

            <Button className="w-full mt-4">
              {t("labels.password-change")}
            </Button>
          </form>
        </div>
      </div>
    </PageAnimationWrapper>
  );
};

export default PasswordReset;
