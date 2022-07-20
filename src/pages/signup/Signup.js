import React, { useEffect } from "react";
import logo from "images/logo.png";
import toast from "react-hot-toast";
import { parsePhoneNumber } from "react-phone-number-input";
import { FiUserPlus } from "react-icons/fi";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { useSignupMutation, setCache, getCache } from "services";
import {
  Input,
  Alert,
  Label,
  Loader,
  Button,
  CheckBox,
  useTitle,
  FormGroup,
  ReCAPTCHA,
  ErrorMessage,
  PasswordInput,
  PhoneNumberInput,
  PageAnimationWrapper,
} from "components";

const Signup = () => {
  const { t, i18n } = useTranslation();
  useTitle(t("signup.page-title"));
  const navigate = useNavigate();
  const { lang } = useParams();
  const [signup, { isLoading, isSuccess }] = useSignupMutation();

  // check if recaptcha is enabled and conditionally add validation
  const ENABLE_RECAPTCHA =
    process.env.REACT_APP_RECAPTCHA === "true" ? true : false;
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

  if (ENABLE_RECAPTCHA) {
    schemaShape.captcha_token = yup
      .string()
      .required(t("forms.recaptcha.validation-error"));
  }
  // final validation schema used by react-hook-form
  const schema = yup.object().shape(schemaShape);

  const {
    control,
    register,
    setValue,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    // check locale
    if (lang === "fr") {
      i18n.changeLanguage("fr");
    }
    const searchParams = new URLSearchParams(window.location.search);
    const redirectURL = searchParams.get("ari");
    if (redirectURL) {
      setCache({ redirectURL });
    }
  }, [i18n, lang]);

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
      /*
       cache data in local storage in case we need it later to resend
       verification codes or signup failed.
       This data will be cleared after code verification
      */
      data.uid = response.uid;
      delete data.password;

      let cache = getCache();
      setCache({
        ...data,
        ...cache,
      });
      // redirect user to code confirmation page
      navigate("verify", { state: { phone_number: data.phone_number } });
    } catch (error) {
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
        <div className="container p-8 bg-white md:my-20 md:max-w-md md:shadow-lg md:rounded-xl">
          <div className="mb-8">
            <img src={logo} alt="logo" className="h-32 mx-auto my-6" />
            <h1 className="text-2xl font-bold text-center">
              SMSWithoutBorders
            </h1>
          </div>
          <form onSubmit={handleSubmit(handleSignUp)}>
            <FormGroup>
              <Label htmlFor="phone_number" required>
                {t("forms.phone-number.label")}
              </Label>
              <Controller
                control={control}
                name="phone_number"
                render={({ field: { value, onChange } }) => (
                  <PhoneNumberInput
                    international
                    countryCallingCodeEditable={false}
                    placeholder={t("forms.phone-number.placeholder")}
                    defaultCountry="CM"
                    value={value}
                    type="tel"
                    onChange={onChange}
                    error={errors.phone_number}
                  />
                )}
              />
              {errors.phone_number && (
                <ErrorMessage>{errors.phone_number.message}</ErrorMessage>
              )}
              <small className="block text-xs text-gray-600">
                {t("forms.phone-number.helper-text")}
              </small>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="name">{t("signup.form.alias.label")}</Label>
              <Input
                type="text"
                name="name"
                placeholder={t("signup.form.alias.placeholder")}
                {...register("name")}
                error={errors.name}
              />
              {errors.name && (
                <ErrorMessage>{errors.name.message}</ErrorMessage>
              )}
              <small className="block mt-2 text-xs text-gray-600">
                {t("signup.form.alias.helper-text")}
              </small>
            </FormGroup>

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

            <FormGroup className="flex items-start mt-8">
              <Controller
                control={control}
                name="acceptTerms"
                render={({ field: { value, onChange } }) => (
                  <CheckBox type="checkbox" value={value} onChange={onChange} />
                )}
              />
              <p className="mb-4 ml-2 text-sm font-light text-gray-600">
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

            {ENABLE_RECAPTCHA ? (
              <FormGroup>
                <ReCAPTCHA setValue={setValue} fieldName="captcha_token" />
                {errors.captcha_token && (
                  <ErrorMessage>{errors.captcha_token?.message}</ErrorMessage>
                )}
              </FormGroup>
            ) : (
              <FormGroup>
                <Alert
                  kind="primary"
                  message={t("alert-messages.recaptcha.disabled")}
                  hideCloseButton
                />
              </FormGroup>
            )}

            <Button className="w-full" disabled={!isValid}>
              <FiUserPlus /> &nbsp;
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
