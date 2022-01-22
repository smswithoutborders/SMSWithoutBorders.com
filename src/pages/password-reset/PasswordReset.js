import React from "react";
import toast from "react-hot-toast";
import PasswordStrengthBar from "react-password-strength-bar";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { validationSelector, clearValidationCreds } from "features";
import { useNewPasswordMutation, clearCache } from "services";
import {
  Loader,
  Label,
  ErrorMessage,
  FormGroup,
  Button,
  PasswordInput,
  PageAnimationWrapper,
  useTitle,
} from "components";

// form schema
const schema = yup.object().shape({
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Please enter password"),
  confirmPassword: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Please confirm your password")
    .oneOf([yup.ref("password"), null], "Passwords do not match"),
});

const PasswordReset = () => {
  useTitle("Password Reset");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const creds = useSelector(validationSelector);
  const [newPassword, { isLoading, isSuccess }] = useNewPasswordMutation();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function handlePasswordReset(data) {
    // build request data
    let request = {
      auth_key: creds.auth_key,
      new_password: data.password,
    };

    try {
      await newPassword(request).unwrap();
      toast.success("Password Changed successfully");
      // remove any cached data
      clearCache();
      // clear validation creds in state
      dispatch(clearValidationCreds());
      navigate("/login");
    } catch (error) {
      switch (error.status) {
        case 400:
          toast.error(
            "Something went wrong \n We are working to resolve this. Please try again"
          );
          break;
        case 401:
          toast.error("Invalid code provided \n please try again");
          break;

        case 403:
          toast("Account already verified \n Please login");
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
  }

  /*
    when making requests show loading indicator
    Also maintain after request is successfull to update background state
  */
  if (isLoading || isSuccess) {
    return <Loader />;
  }

  return (
    <PageAnimationWrapper>
      <div className="px-6 py-20 mx-auto text-center md:px-8 md:w-2/3 lg:w-1/3">
        <h1 className="mb-4 text-3xl font-bold">Pasword Reset</h1>
        <p className="">Set a new password for your account</p>
        <div className="flex-1 w-full mt-8 text-left">
          <form
            className="px-4 mx-auto sm:px-3"
            onSubmit={handleSubmit(handlePasswordReset)}
          >
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

            <Button className="w-full">change password</Button>
          </form>
        </div>
      </div>
    </PageAnimationWrapper>
  );
};

export default PasswordReset;
