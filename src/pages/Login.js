import React, { useEffect } from "react";
import toast from "react-hot-toast";
import logo from "images/logo.png";
import { FiLogIn } from "react-icons/fi";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useLoginMutation } from "services";
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
  AuthContainer,
  PasswordInput,
  PhoneNumberInput,
  PageAnimationWrapper,
} from "components";

// check if recaptcha is enabled and conditionally add validation
const ENABLE_RECAPTCHA =
  process.env.REACT_APP_RECAPTCHA === "true" ? true : false;
let schemaShape = {
  phone_number: yup.string().required("Please Enter your Phone Number"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Please enter your password"),
};

if (ENABLE_RECAPTCHA) {
  schemaShape.captcha_token = yup
    .string()
    .required("Please prove you are not a robot by solving reCAPTCHA");
}
// final validation schema used by react-hook-form
const schema = yup.object().shape(schemaShape);

const Login = () => {
  useTitle("login");

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
      toast.success("Login successful");
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
            toast.error(
              "Something went wrong \n We are working to resolve this. Please try again"
            );
            break;
          case 401:
            toast.error(
              "Forbidden, Account is unauthorized. \n check your phonenumber and password"
            );
            break;
          case 403:
            toast.error("Forbidden, check your phonenumber and password");
            break;
          case 409:
            toast.error(
              "There is a possible duplicate of this account please contact support"
            );
            break;
          case 429:
            toast.error(
              "Too many failed attempts please wait a while and try again"
            );
            break;
          case 500:
            toast.error("A critical error occured. Please contact support");
            break;
          default:
            toast.error(
              "An error occured, please check your network try again"
            );
        }
      } else if (status === "FETCH_ERROR") {
        toast.error("An error occured, please check your network try again");
      }
    }
  };

  /*
    when making requests show loading indicator
    Also maintain after request is successfull to update background state
  */
  if (isLoading || isSuccess) {
    return <Loader />;
  }

  return (
    <PageAnimationWrapper>
      <AuthContainer className="bg-gray-100 md:py-20 2xl:py-0 2xl:h-screen lg:grid lg:place-items-center">
        <div className="container max-w-md p-8 mx-auto bg-white shadow-lg md:rounded-xl lg:my-10">
          <div className="mb-8">
            <img src={logo} alt="logo" className="h-32 mx-auto my-6" />
            <h1 className="text-2xl font-bold text-center">
              SMSWithoutBorders
            </h1>
          </div>
          <form onSubmit={handleSubmit(handleLogin)}>
            <FormGroup>
              <Label htmlFor="phone_number" required>
                Phone Number
              </Label>
              <Controller
                control={control}
                name="phone_number"
                render={({ field: { value, onChange } }) => (
                  <PhoneNumberInput
                    international
                    countryCallingCodeEditable={false}
                    placeholder="Enter your phone number"
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
            </FormGroup>

            <FormGroup>
              <Label htmlFor="password" required>
                Password
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
                  message="reCAPTCHA has been disabled, you can re-enable it in your project's configuration"
                  hideCloseButton
                />
              </FormGroup>
            )}

            <Button className="w-full" disabled={!isValid}>
              <FiLogIn /> &nbsp; login
            </Button>
          </form>
          <Link
            to="/password-reset"
            className="block mt-4 text-center appearance-none cursor-pointer text-primary-800"
          >
            Forgot Password
          </Link>
          <p className="mt-4 text-sm text-center text-gray-600">
            Dont have an account? &nbsp;
            <Link to="/sign-up" className="text-blue-800">
              Sign Up
            </Link>
          </p>
        </div>
      </AuthContainer>
    </PageAnimationWrapper>
  );
};

export default Login;
