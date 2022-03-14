import React from "react";
import logo from "images/logo.png";
import toast from "react-hot-toast";
import { parsePhoneNumber } from "react-phone-number-input";
import { FiUserPlus } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSignupMutation, setCache } from "services";
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
  AuthContainer,
  PasswordInput,
  PhoneNumberInput,
  PageAnimationWrapper,
} from "components";

// check if recaptcha is enabled and conditionally add validation
const ENABLE_RECAPTCHA =
  process.env.REACT_APP_RECAPTCHA === "true" ? true : false;
let schemaShape = {
  name: yup.string(),
  phone_number: yup.string().required("Phone Number is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .min(8, "password must be at least 8 characters")
    .required("Please confirm your password")
    .oneOf([yup.ref("password"), null], "passwords do not match"),
  acceptTerms: yup
    .bool()
    .oneOf([true], "Please review and accept terms and conditions to proceed"),
};

if (ENABLE_RECAPTCHA) {
  schemaShape.captcha_token = yup
    .string()
    .required("Please prove you are not a robot by solving reCAPTCHA");
}
// final validation schema used by react-hook-form
const schema = yup.object().shape(schemaShape);

const Signup = () => {
  useTitle("Sign Up");
  const navigate = useNavigate();
  const [signup, { isLoading, isSuccess }] = useSignupMutation();

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
      toast.success(`Success your request has been received`);
      /*
       cache data in local storage in case we need it later to resend
       verification codes or signup failed.
       This data will be cleared after code verification
      */
      data.uid = response.uid;
      delete data.password;
      setCache(data);
      // redirect user to code confirmation page
      navigate("verify", { state: { phone_number: data.phone_number } });
    } catch (error) {
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
            toast.error("An account with this number already exists");
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
      <AuthContainer className="bg-gray-100 md:py-20 2xl:py-0 2xl:min-h-screen lg:grid lg:place-items-center">
        <div className="container max-w-md p-8 mx-auto bg-white shadow-lg md:rounded-xl lg:my-10">
          <div className="mb-8">
            <img src={logo} alt="logo" className="h-32 mx-auto my-6" />
            <h1 className="text-2xl font-bold text-center">
              SMSWithoutBorders
            </h1>
          </div>
          <form onSubmit={handleSubmit(handleSignUp)}>
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
              <small className="block text-xs text-gray-600">
                We will send a one time SMS to this number for confirmation
              </small>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="name">Alias</Label>
              <Input
                type="text"
                name="name"
                placeholder="e.g Jane Doe"
                {...register("name")}
                error={errors.name}
              />
              {errors.name && (
                <ErrorMessage>{errors.name.message}</ErrorMessage>
              )}
              <small className="block mt-2 text-xs text-gray-600">
                Choose a name for this account (could be anything)
              </small>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="password" required>
                Password
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
                Confirm Password
              </Label>
              <PasswordInput
                name="confirmPassword"
                placeholder="retype password"
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
                <span>I agree to abide by SMSWithoutBorders </span>
                <Link
                  to="/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-800 no-underline border-gray-500"
                >
                  privacy policy
                </Link>
              </p>
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
                  message="reCAPTCHA has been disabled, you can re-enable it in your project's configuration"
                  hideCloseButton
                />
              </FormGroup>
            )}

            <Button className="w-full" disabled={!isValid}>
              <FiUserPlus /> &nbsp; sign up
            </Button>
          </form>

          <p className="my-8 text-sm text-center text-gray-600">
            Already have an account? &nbsp;
            <Link to="/login" className="text-blue-800">
              Sign In
            </Link>
          </p>
        </div>
      </AuthContainer>
    </PageAnimationWrapper>
  );
};

export default Signup;
