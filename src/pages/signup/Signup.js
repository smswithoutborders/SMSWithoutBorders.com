import React from "react";
import logo from "images/logo.png";
import toast from "react-hot-toast";
import PasswordStrengthBar from "react-password-strength-bar";
import { parsePhoneNumber } from "react-phone-number-input";
import { FiUserPlus } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSignupMutation, setCache } from "services";
import { useDispatch } from "react-redux";
import { saveValidationCreds } from "features";
import {
  Loader,
  Button,
  useTitle,
  Label,
  Input,
  CheckBox,
  FormGroup,
  ErrorMessage,
  AuthContainer,
  PasswordInput,
  PhoneNumberInput,
  PageAnimationWrapper,
} from "components";

// sign up schema
const schema = yup.object().shape({
  name: yup.string().required("please provide an alias"),
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
});

const Signup = () => {
  useTitle("Sign Up");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signup, { isLoading, isSuccess }] = useSignupMutation();

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
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

    /*
     cache data in local storage in case we need it later to resend
     verification codes or signup failed.
     This data will be cleared after code verification
    */
    setCache(data);

    try {
      const response = await signup(data).unwrap();
      toast.success(
        `A verification code has been sent to ${
          data.country_code + data.phone_number
        } \n Please check and enter it to verify your account`
      );
      // save 2fa authorization details
      dispatch(saveValidationCreds(response));
      // redirect user to code confirmation page
      navigate("verify");
    } catch (error) {
      switch (error.status) {
        case 400:
          toast.error(
            "Something went wrong \n We are working to resolve this. Please try again"
          );
          break;
        case 409:
          toast.error(
            "An account with this number already exists.Please Log In instead"
          );
          break;
        case 500:
          toast.error("A critical error occured. Please contact support");
          break;
        // custom error thrown by RTK Query https://redux-toolkit.js.org/rtk-query/usage/error-handling
        case "FETCH_ERROR":
          toast.error("An error occured, please check your network try again");
          break;
        default:
          toast.error("An error occured, please try again");
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
          <form onSubmit={handleSubmit(handleSignUp)}>
            <FormGroup>
              <Label htmlFor="phone_number">Phone Number</Label>
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
              <Label htmlFor="password">Password</Label>
              <PasswordInput
                name="password"
                {...register("password")}
                error={errors.password}
              />
              {errors.password && (
                <ErrorMessage>{errors.password?.message}</ErrorMessage>
              )}
              <PasswordStrengthBar password={watch("password")} />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <PasswordInput
                name="confirmPassword"
                placeholder="retype password"
                {...register("confirmPassword")}
                error={errors.confirmPassword}
              />
              {errors.confirmPassword && (
                <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>
              )}
              <PasswordStrengthBar password={watch("confirmPassword")} />
            </FormGroup>

            <FormGroup className="flex items-start">
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

            <Button className="w-full" disabled={!watch("acceptTerms")}>
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
