import React from "react";
import toast from "react-hot-toast";
import { useDeleteAccountMutation } from "services";
import { authSelector, resetStore } from "features";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Alert,
  Input,
  Label,
  Button,
  Loader,
  useTitle,
  FormGroup,
  ErrorMessage,
  PasswordInput,
} from "components";

const schema = yup.object().shape({
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmation: yup
    .string()
    .oneOf(
      ["IConfirmThisAction"],
      "please enter IConfirmThisAction to confirm"
    ),
});

const AccountDeletion = () => {
  useTitle("Account Deletion");
  const auth = useSelector(authSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [deleteAccount, { isLoading, isSuccess }] = useDeleteAccountMutation();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
    },
  });

  async function handleDeletion(data) {
    // build request body
    const request = {
      ...auth,
      password: data.password,
    };
    
    try {
      await deleteAccount(request).unwrap();
      toast.success("Your account has been deleted. Sad to see you go");
      // clear store/ logout user
      dispatch(resetStore());
      // redirect to login
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
            toast.error("Forbidden, password is invalid");
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
      <h1 className="mb-4 text-3xl font-bold">Delete Account</h1>
      <Alert
        kind="negative"
        message="This action cannot be reversed. All your tokens will be lost"
        hideCloseButton
      />
      <p>
        Please enter <strong>IConfirmThisAction</strong> and your password to
        proceed
      </p>

      <div className="max-w-md mx-auto mt-8">
        <form
          className="px-4 mx-auto text-left sm:px-3"
          onSubmit={handleSubmit(handleDeletion)}
        >
          <FormGroup>
            <Label htmlFor="name" required>
              Confirmation
            </Label>
            <Input
              type="text"
              name="confirmation"
              placeholder="enter confirmation"
              {...register("confirmation")}
              error={errors.name}
            />
            {errors.confirmation && (
              <ErrorMessage>{errors.confirmation.message}</ErrorMessage>
            )}
            <small className="block mt-2 text-xs text-gray-600">
              Enter <strong>IConfirmThisAction</strong>
            </small>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password" required>
              Password
            </Label>
            <PasswordInput
              name="password"
              placeholder="password"
              {...register("password")}
              error={errors.password}
              showStrength={false}
            />
            {errors.password && (
              <ErrorMessage>{errors.password.message}</ErrorMessage>
            )}
          </FormGroup>

          <Button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-500 focus:bg-red-600 disabled:bg-gray-300"
          >
            continue
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AccountDeletion;
