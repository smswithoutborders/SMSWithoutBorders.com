import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import { useNewPasswordMutation, getCache, clearCache } from "services";
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
  const cache = getCache();
  const location = useLocation();
  const navigate = useNavigate();
  const [newPassword, { isLoading, isSuccess }] = useNewPasswordMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // check if phone number and cache is present
  useEffect(() => {
    if (!location.state?.phone_number && cache === null) {
      navigate("../");
    }
  }, [location.state, navigate, cache]);

  async function handlePasswordReset(data) {
    // build request data
    let request = {
      uid: cache.uid,
      new_password: data.password,
    };

    try {
      await newPassword(request).unwrap();
      toast.success("Password Changed successfully");
      // remove any cached data
      clearCache();
      navigate("/login");
    } catch (error) {
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
            toast.error("Sorry your session expired. Please start over");
            break;
          case 403:
            toast.error("Forbidden, please check password");
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
      <div className="max-w-screen-sm min-h-screen px-6 py-20 mx-auto text-center md:px-8">
        <h1 className="mb-4 text-3xl font-bold">Pasword Reset</h1>
        <p className="">Set a new password for your account</p>
        <div className="max-w-md mx-auto mt-12 text-left">
          <form
            className="px-4 mx-auto sm:px-3"
            onSubmit={handleSubmit(handlePasswordReset)}
          >
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

            <Button className="w-full">change password</Button>
          </form>
        </div>
      </div>
    </PageAnimationWrapper>
  );
};

export default PasswordReset;
