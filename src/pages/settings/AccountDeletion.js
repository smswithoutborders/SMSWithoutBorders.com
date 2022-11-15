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

      <div className="max-w-md mx-auto mt-8 text-left">
        <form onSubmit={handleSubmit(handleDeletion)}>
          <FormGroup>
            <Label htmlFor="confirmation" required>
              {t("account-deletion.form.confirmation.label")}
            </Label>
            <Input
              type="text"
              id="confirmation"
              name="confirmation"
              invalid={errors.confirmation}
              invalidText={errors.confirmation?.message}
              placeholder={t("account-deletion.form.confirmation.placeholder")}
              {...register("confirmation")}
            />
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
              id="password"
              name="password"
              showStrength={false}
              invalid={errors.password}
              invalidText={errors.password?.message}
              placeholder={t("forms.password.placeholder")}
              {...register("password")}
            />
          </FormGroup>

          <Button
            type="submit"
            danger
            className="w-full"
          >
            {t("labels.continue")}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AccountDeletion;
