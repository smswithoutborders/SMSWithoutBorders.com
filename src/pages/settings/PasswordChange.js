import React from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { authSelector, resetStore } from "features";
import {
  useChangePasswordMutation,
  clearCache,
  clearPersistedState,
} from "services";
import {
  Alert,
  Label,
  Button,
  Loader,
  useTitle,
  FormGroup,
  ErrorMessage,
  PasswordInput,
} from "components";

const PasswordChange = () => {
  const { t } = useTranslation();
  useTitle(t("password-change.page-title"));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector(authSelector);
  const [changePassword, { isLoading, isSuccess }] =
    useChangePasswordMutation();

  // form schema
  const schema = yup.object().shape({
    password: yup
      .string()
      .min(8, t("forms.password.validation-errors.min"))
      .required(t("forms.password.validation-errors.required")),
    new_password: yup
      .string()
      .min(8, t("forms.password.validation-errors.min"))
      .required(t("forms.password.validation-errors.required-new")),
    confirmPassword: yup
      .string()
      .min(8, t("forms.confirm-password.validation-errors.min"))
      .required(t("forms.confirm-password.validation-errors.required"))
      .oneOf(
        [yup.ref("new_password"), null],
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

  async function handlePasswordChange(data) {
    // build request data
    let request = {
      ...auth,
      password: data.password,
      new_password: data.new_password,
    };

    try {
      await changePassword(request).unwrap();
      toast.success(t("alert-messages.password-changed"));
      // remove any cached data
      clearCache();
      // reset store/logout user
      dispatch(resetStore());
      clearPersistedState();
      navigate("/login");
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
            toast.error(t("error-messages.invalid-password"));
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
    <div className="max-w-screen-sm py-20 mx-auto text-center lg:py-0 md:px-8">
      <h1 className="mb-4 text-3xl font-bold">
        {t("password-change.heading")}
      </h1>
      <p className="">{t("password-change.details")}</p>
      <Alert
        kind="warning"
        message={t("password-change.alerts.warning")}
        hideCloseButton
      />
      <div className="max-w-md mx-auto mt-12 text-left">
        <form
          className="px-4 mx-auto sm:px-3"
          onSubmit={handleSubmit(handlePasswordChange)}
        >
          <FormGroup>
            <Label htmlFor="password" required>
              {t("forms.password.labels.current")}
            </Label>
            <PasswordInput
              name="password"
              {...register("password")}
              error={errors.password}
              showStrength={false}
            />
            {errors.password && (
              <ErrorMessage>{errors.password?.message}</ErrorMessage>
            )}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="new_password" required>
              {t("forms.password.labels.new")}
            </Label>
            <PasswordInput
              name="new_password"
              {...register("new_password")}
              error={errors.new_password}
            />
            {errors.new_password && (
              <ErrorMessage>{errors.new_password?.message}</ErrorMessage>
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

          <Button className="w-full">{t("labels.password-change")}</Button>
        </form>
      </div>
    </div>
  );
};

export default PasswordChange;
