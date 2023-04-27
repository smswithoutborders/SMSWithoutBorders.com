import React from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { authSelector, logout } from "features";
import { useChangePasswordMutation } from "services";
import {
  Alert,
  Label,
  Button,
  Loader,
  FormGroup,
  PasswordInput,
} from "components";
import { useTitle } from "hooks";

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
      .required(t("forms.password.validation-errors.required-new"))
      .test("lowercase-letters", t("forms.password.validation-errors.lowercase-letters"), (value) => {
        return /[a-z]/.test(value);
      })
      .test("uppercase-letters", t("forms.password.validation-errors.uppercase-letters"), (value) => {
        return /[A-Z]/.test(value);
      })
      .test("numbers", t("forms.password.validation-errors.numbers"), (value) => {
        return /\d/.test(value);
      })
      .test("special-characters", t("forms.password.validation-errors.special-characters"), (value) => {
        return /[!@#$%^&*()_+\-=]/.test(value);
      })
      .test("no-compromised-password", t("forms.password.validation-errors.no-compromised-password"), async (value) => {
        const passwordHash = (await sha1(value)).toLocaleUpperCase();
        const prefix = passwordHash.substring(0, 5);
        const suffix = passwordHash.substring(5);
        const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
        if (!response.ok) {
          return true;  
        }
        const hashList = await response.text();
        const hashLines = hashList.split("\n");
        for (const line of hashLines) {
          const [hashSuffix, ] = line.split(":");
          if (hashSuffix === suffix) {
            return false;
          }
        }
        return true;
      }),
    confirmPassword: yup
      .string()
      .min(8, t("forms.confirm-password.validation-errors.min"))
      .required(t("forms.confirm-password.validation-errors.required"))
      .oneOf(
        [yup.ref("new_password"), null],
        t("forms.confirm-password.validation-errors.match")
      ),
  });

  async function sha1(input) {
    const buffer = new TextEncoder().encode(input);
    const hashBuffer = await crypto.subtle.digest("SHA-1", buffer);
    return arrayBufferToHex(hashBuffer);
  }
  
  function arrayBufferToHex(buffer) {
    const byteArray = new Uint8Array(buffer);
    const hexCodes = [...byteArray].map(value => {
      const hexCode = value.toString(16);
      const paddedHexCode = hexCode.padStart(2, "0");
      return paddedHexCode;
    });
    return hexCodes.join("");
  }

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
      // remove any cached data and reset store/logout user
      dispatch(logout());
      //
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
        {t("password-change.heading")}
      </h1>
      <p className="">{t("password-change.details")}</p>
      <Alert
        kind="warning"
        message={t("password-change.alerts.warning")}
        hideCloseButton
      />
      <div className="max-w-md mx-auto mt-12 text-left">
        <form onSubmit={handleSubmit(handlePasswordChange)}>
          <FormGroup>
            <Label htmlFor="password" required>
              {t("forms.password.labels.current")}
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

          <FormGroup>
            <Label htmlFor="new_password" required>
              {t("forms.password.labels.new")}
            </Label>
            <PasswordInput
              id="new_password"
              name="new_password"
              invalid={errors.new_password ? true : false}
              invalidText={errors.new_password?.message}
              {...register("new_password")}
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="confirmPassword" required>
              {t("forms.confirm-password.label")}
            </Label>
            <PasswordInput
              name="confirmPassword"
              placeholder={t("forms.confirm-password.placeholder")}
              invalid={errors.confirmPassword ? true : false}
              invalidText={errors.confirmPassword?.message}
              {...register("confirmPassword")}
            />
          </FormGroup>

          <Button className="w-full">{t("labels.password-change")}</Button>
        </form>
      </div>
    </div>
  );
};

export default PasswordChange;
