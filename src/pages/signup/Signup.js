import React from "react";
import logo from "images/logo.png";
import toast from "react-hot-toast";
import { parsePhoneNumber } from "react-phone-number-input";
import { FiUserPlus } from "react-icons/fi";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { useSignupMutation } from "services";
import {
  Input,
  Label,
  Loader,
  Button,
  Checkbox,
  FormGroup,
  ReCAPTCHA,
  PasswordInput,
  PhoneNumberInput,
  PageAnimationWrapper,
} from "components";
import { useTitle } from "hooks";

const Signup = () => {
  const { t } = useTranslation();
  useTitle(t("signup.page-title"));
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [signup, { isLoading, isSuccess }] = useSignupMutation();

  // check if recaptcha is enabled and conditionally add validation
  const RECAPTCHA_ENABLE =
    process.env.REACT_APP_RECAPTCHA_ENABLE === "true" ? true : false;
  let schemaShape = {
    name: yup.string(),
    phone_number: yup
      .string()
      .required(t("forms.phone-number.validation-errors.required")),
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
    acceptTerms: yup
      .bool()
      .oneOf([true], t("signup.form.license-terms.validation-error"))
      .required(t("forms.terms.validation-errors.required")),
  };

  if (RECAPTCHA_ENABLE) {
    schemaShape.captcha_token = yup
      .string()
      .required(t("forms.recaptcha.validation-error"));
  }
  // final validation schema used by react-hook-form
  const schema = yup.object().shape(schemaShape);

  const {
    control,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
    },
  });

  // Sign up is a three step process with 2fa verification
  const handleSignUp = async (data) => {
    // seperate phone number into tel anc country code
    let splitNumber = parsePhoneNumber(data.phone_number);
    data.phone_number = splitNumber.nationalNumber;
    data.country_code = "+" + splitNumber.countryCallingCode;
    /*
     remove parts of data not needed for API call
     check API docs for request schema
     */
    delete data.acceptTerms;
    delete data.confirmPassword;

    try {
      const response = await signup(data).unwrap();
      toast.success(t("alert-messages.request-received"));

      data.uid = response.uid;
      delete data.password;

      // attach country code to phone number for OTP
      data.phone_number = data.country_code + data.phone_number;

      /*
       * redirect user to code confirmation page with data stored in history object
       * This data will be cleared after code verification
       * App may optionally pass return url parameter(ari)
       */

      navigate("/sign-up/verify", {
        state: {
          ...Object.fromEntries(searchParams),
          ...data,
        },
      });
    } catch (error) {
      // reset captcha
      setValue("captcha_token", "", {
        shouldValidate: true,
      });

      //reset terms
      setValue("acceptTerms", false, {
        shouldValidate: true,
      });
      // handle all other errors in utils/middleware
    }
  };

  /*
    when making requests show loading indicator
    Also maintain after request is successfull to update background state
  */
  if (isLoading || isSuccess) {
    return <Loader light />;
  }

  return (
    <PageAnimationWrapper>
      <div className="min-h-screen md:grid md:place-items-center">
        <div className="container p-6 mx-auto bg-white md:my-20 md:max-w-md md:shadow-lg md:rounded-xl">
          <div className="mb-8">
            <img src={logo} alt="logo" className="h-32 mx-auto my-6" />
            <h1 className="text-2xl font-bold text-center">
              SMSWithoutBorders
            </h1>
          </div>
          <form onSubmit={handleSubmit(handleSignUp)}>
            <FormGroup legend="phone_number">
              <Label htmlFor="phone_number" required>
                {t("forms.phone-number.label")}
              </Label>
              <Controller
                control={control}
                name="phone_number"
                render={({ field: { value, onChange } }) => (
                  <PhoneNumberInput
                    id="phone_number"
                    value={value}
                    onChange={onChange}
                    invalid={errors.phone_number}
                    invalidText={errors.phone_number?.message}
                    helperText={t("forms.phone-number.helper-text")}
                    placeholder={t("forms.phone-number.placeholder")}
                  />
                )}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="name">{t("signup.form.alias.label")}</Label>
              <Input
                id="name"
                name="name"
                type="text"
                labelText={t("signup.form.alias.label")}
                invalid={errors.name}
                invalidText={errors.name?.message}
                helperText={t("signup.form.alias.helper-text")}
                placeholder={t("signup.form.alias.placeholder")}
                {...register("name")}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="password" required>
                {t("forms.password.label")}
              </Label>
              <PasswordInput
                id="password"
                name="password"
                invalid={errors.password}
                invalidText={errors.password?.message}
                {...register("password")}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="confirmPassword" required>
                {t("forms.confirm-password.label")}
              </Label>
              <PasswordInput
                id="confirmPassword"
                name="confirmPassword"
                invalid={errors.confirmPassword}
                invalidText={errors.confirmPassword?.message}
                placeholder={t("forms.confirm-password.placeholder")}
                {...register("confirmPassword")}
              />
            </FormGroup>

            <FormGroup className="flex items-start gap-2 mt-8">
              <Checkbox
                control={control}
                name="acceptTerms"
                aria-label="policy terms"
              />
              <p className="text-sm text-gray-600">
                <span>{t("signup.form.license-terms.label")} </span>
                <Link
                  to="/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-800 no-underline border-gray-500"
                >
                  {t("signup.form.license-terms.policy-link")}
                </Link>
              </p>
            </FormGroup>

            <FormGroup>
              <ReCAPTCHA control={control} name="captcha_token" />
            </FormGroup>

            <Button className="w-full">
              <FiUserPlus />
              <span>{t("signup.form.cta-button-text")}</span>
            </Button>
          </form>

          <p className="my-8 text-sm text-center text-gray-600">
            <span>{t("signup.account-status")}</span> &nbsp;
            <Link to="/login" className="text-blue-800">
              {t("signup.login-link")}
            </Link>
          </p>
        </div>
      </div>
    </PageAnimationWrapper>
  );
};

export default Signup;
