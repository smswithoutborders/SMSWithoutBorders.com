import React from "react";
import toast from "react-hot-toast";
import { useDeleteAccountMutation } from "services";
import { authSelector, logout } from "features";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import {
  Alert,
  Input,
  Label,
  Button,
  Loader,
  useTitle,
  FormGroup,
  ErrorMessage,
  PasswordInput,
} from "components";

const AccountDeletion = () => {
  const { t } = useTranslation();
  useTitle(t("account-deletion.page-title"));
  const auth = useSelector(authSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [deleteAccount, { isLoading, isSuccess }] = useDeleteAccountMutation();

  const schema = yup.object().shape({
    password: yup
      .string()
      .min(8, t("forms.password.validation-errors.min"))
      .required(t("forms.password.validation-errors.required")),
    confirmation: yup.string().oneOf(
      [t("account-deletion.confirmation.text")],
      t("account-deletion.confirmation.validation-error", {
        confirmation: t("account-deletion.confirmation.text"),
      })
    ),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
    },
  });

  async function handleDeletion(data) {
    // build request body
    const request = {
      ...auth,
      password: data.password,
    };

    try {
      await deleteAccount(request).unwrap();
      toast.success(t("account-deletion.alerts.account-deleted"));
      // clear store/ logout user
      dispatch(logout());
      // redirect to login
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
            toast.error(t("account-deletion.alerts.invalid-password"));
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
        {t("account-deletion.heading")}
      </h1>
      <Alert
        kind="negative"
        message={t("account-deletion.alerts.warning")}
        hideCloseButton
      />
      <p>
        <span>{t("account-deletion.paragraph.part-1")}</span>
        <strong> {t("account-deletion.confirmation.text")} </strong>
        <span>{t("account-deletion.paragraph.part-2")}</span>
      </p>

      <div className="max-w-md mx-auto mt-8">
        <form
          className="px-4 mx-auto text-left sm:px-3"
          onSubmit={handleSubmit(handleDeletion)}
        >
          <FormGroup>
            <Label htmlFor="name" required>
              {t("account-deletion.form.confirmation.label")}
            </Label>
            <Input
              type="text"
              name="confirmation"
              placeholder={t("account-deletion.form.confirmation.placeholder")}
              {...register("confirmation")}
              error={errors.name}
            />
            {errors.confirmation && (
              <ErrorMessage>{errors.confirmation.message}</ErrorMessage>
            )}
            <small className="block mt-2 text-xs text-gray-600">
              <span>{t("account-deletion.form.confirmation.helper-text")}</span>
              <strong> : {t("account-deletion.confirmation.text")}</strong>
            </small>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password" required>
              {t("forms.password.label")}
            </Label>
            <PasswordInput
              name="password"
              placeholder={t("forms.password.placeholder")}
              {...register("password")}
              error={errors.password}
              showStrength={false}
            />
            {errors.password && (
              <ErrorMessage>{errors.password.message}</ErrorMessage>
            )}
          </FormGroup>

          <Button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-500 focus:bg-red-600 disabled:bg-gray-300"
          >
            {t("labels.continue")}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AccountDeletion;
