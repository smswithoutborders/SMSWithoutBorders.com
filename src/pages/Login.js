import React, { useEffect } from "react";
import toast from "react-hot-toast";
import logo from "images/logo.png";
import { FiLogIn } from "react-icons/fi";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useLoginMutation } from "services";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { saveAuth, authSelector } from "features";
import {
  Alert,
  Label,
  Loader,
  Button,
  useTitle,
  FormGroup,
  ReCAPTCHA,
  ErrorMessage,
  PasswordInput,
  PhoneNumberInput,
  PageAnimationWrapper,
} from "components";

const Login = () => {
  const { t } = useTranslation();
  useTitle(t("login.page-title"));

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
  });

  const [login, { isLoading, isSuccess }] = useLoginMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const auth = useSelector(authSelector);

  useEffect(() => {
    // if logged in then redirect to dashboard
    if (auth.uid && location.state && location.state.path) {
      /*
        redirect users if they initially tried to access a private route
        without permission
      */
      navigate(location.state.path);
    } else if (auth.uid) {
      navigate("/dashboard");
    }
  }, [setValue, dispatch, navigate, auth.uid, location.state]);

  const handleLogin = async (data) => {
    try {
      const user = await login(data).unwrap();
      toast.success(t("alert-messages.login-successful"));
      // save user credentials to state
      dispatch(saveAuth(user));
    } catch (error) {
      // reset captcha
      setValue("captcha_token", "", {
        shouldValidate: true,
      });
      // https://redux-toolkit.js.org/rtk-query/usage/error-handling
      const { status, originalStatus } = error;
      if (originalStatus) {
        switch (originalStatus) {
          case 400:
            toast.error(t("error-messages.400"));
            break;
          case 401:
            toast.error(t("error-messages.invalid-login"));
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
      <div className="md:min-h-screen md:grid md:place-items-center bg-blend-multiply">
        <div className="container p-8 bg-white md:my-20 md:max-w-md md:shadow-lg md:rounded-xl">
          <div className="mb-8">
            <img src={logo} alt="logo" className="h-32 mx-auto my-6" />
            <h1 className="text-2xl font-bold text-center">
              SMSWithoutBorders
            </h1>
          </div>
          <form onSubmit={handleSubmit(handleLogin)}>
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
              <Label htmlFor="password" required>
                {t("forms.password.label")}
              </Label>
              <PasswordInput
                name="password"
                showStrength={false}
                {...register("password")}
                error={errors.password}
              />
              {errors.password && (
                <ErrorMessage>{errors.password?.message}</ErrorMessage>
              )}
            </FormGroup>

            {ENABLE_RECAPTCHA && process.env.NODE_ENV !== "production" ? (
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
              <FiLogIn />
              <span className="ml-1">{t("login.cta-button-text")}</span>
            </Button>
          </form>
          <Link
            to="/password-reset"
            className="block mt-4 text-center appearance-none cursor-pointer text-primary-800"
          >
            {t("login.forgot-password")}
          </Link>
          <p className="mt-4 text-sm text-center text-gray-600">
            <span>{t("login.account-status")}</span> &nbsp;
            <Link to="/sign-up" className="text-blue-800">
              {t("login.signup-link")}
            </Link>
          </p>
        </div>
      </div>
    </PageAnimationWrapper>
  );
};

export default Login;
