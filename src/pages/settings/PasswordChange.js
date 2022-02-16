import React from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authSelector, resetStore } from "features";
import {
  useChangePasswordMutation,
  clearCache,
  clearPersistedState,
} from "services";
import {
  Alert,
  Label,
  Button,
  Loader,
  useTitle,
  FormGroup,
  ErrorMessage,
  PasswordInput,
} from "components";

// form schema
const schema = yup.object().shape({
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Please enter current password"),
  new_password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Please enter new password"),
  confirmPassword: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Please confirm your password")
    .oneOf([yup.ref("new_password"), null], "Passwords do not match"),
});

const PasswordChange = () => {
  useTitle("Password Change");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector(authSelector);
  const [changePassword, { isLoading, isSuccess }] =
    useChangePasswordMutation();
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
      toast.success("Password Changed successfully");
      // remove any cached data
      clearCache();
      // reset store/logout user
      dispatch(resetStore());
      clearPersistedState();
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
            toast.error("Sorry you are unauthorized. Please login");
            break;
          case 403:
            toast.error("Forbidden, current password is invalid");
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
    <div className="max-w-screen-sm py-20 mx-auto text-center lg:py-0 md:px-8">
      <h1 className="mb-4 text-3xl font-bold">Password Change</h1>
      <p className="">Set a new password for your account</p>
      <Alert
        kind="warning"
        message="This action will delete all currently saved tokens in your wallet and you will be logged out"
        hideCloseButton
      />
      <div className="max-w-md mx-auto mt-12 text-left">
        <form
          className="px-4 mx-auto sm:px-3"
          onSubmit={handleSubmit(handlePasswordChange)}
        >
          <FormGroup>
            <Label htmlFor="password">Current Password</Label>
            <PasswordInput
              name="password"
              {...register("password")}
              error={errors.password}
              showStrength={false}
            />
            {errors.password && (
              <ErrorMessage>{errors.password?.message}</ErrorMessage>
            )}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="new_password">New Password</Label>
            <PasswordInput
              name="new_password"
              {...register("new_password")}
              error={errors.new_password}
            />
            {errors.new_password && (
              <ErrorMessage>{errors.new_password?.message}</ErrorMessage>
            )}
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
          </FormGroup>

          <Button className="w-full">change password</Button>
        </form>
      </div>
    </div>
  );
};

export default PasswordChange;
