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
  Label,
  Loader,
  Button,
  FormGroup,
  ReCAPTCHA,
  PasswordInput,
  PhoneNumberInput,
  PageAnimationWrapper,
} from "components";
import { useTitle } from "hooks";

const Login = () => {
  const { t } = useTranslation();
  useTitle(t("login.page-title"));

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
      .required(t("forms.password.validation-errors.required")),
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
    register,
    setValue,
    handleSubmit,
    formState: { errors },
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
    /*
     * if logged in then redirect to dashboard else redirect to previous location
     * path will be available if user previously accessed a protected route
     * and got redirected here
     */
    if (auth.uid && location.state && location.state.path) {
      /*
        redirect users if they initially tried to access a private route
        without permission
      */
      navigate(location.state.path);
    } else if (auth.uid) {
      navigate("/dashboard/metrics");
    }
  }, [navigate, auth.uid, location.state]);

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
      <div className="md:min-h-screen md:grid md:place-items-center bg-blend-multiply">
        <div className="container p-6 mx-auto bg-white md:my-20 md:max-w-md md:shadow-lg md:rounded-xl">
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
                    id="phone_number"
                    value={value}
                    onChange={onChange}
                    invalid={errors.phone_number ? true : false}
                    invalidText={errors.phone_number?.message}
                    helperText={t("forms.phone-number.helper-text")}
                    placeholder={t("forms.phone-number.placeholder")}
                  />
                )}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="password" required>
                {t("forms.password.label")}
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
              <ReCAPTCHA control={control} name="captcha_token" />
            </FormGroup>

            <Button className="w-full">
              <FiLogIn />
              <span>{t("login.cta-button-text")}</span>
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
