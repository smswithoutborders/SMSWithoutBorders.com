import React, { useEffect } from "react";
import toast from "react-hot-toast";
import telegramLogo from "images/telegram-icon.svg";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { authSelector } from "features";
import { useCreateExternalAccountMutation } from "services";
import {
  Loader,
  Label,
  Input,
  Button,
  useTitle,
  FormGroup,
  ErrorMessage,
  PageAnimationWrapper,
} from "components";

// form schema
const schema = yup.object().shape({
  first_name: yup.string().required("Please enter your first name"),
  last_name: yup.string().required("Please enter your last name"),
});

const TelegramRegistration = () => {
  useTitle("Telegram Registration");
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useSelector(authSelector);
  const [createExternalAccount, { isLoading, isSuccess }] =
    useCreateExternalAccountMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // check if phone number is present
  useEffect(() => {
    if (!location.state?.phone_number) {
      navigate("../../");
    }
  }, [location.state, navigate]);

  async function handleAccountCreation(data) {
    // build request data
    let request = {
      uid: auth.uid,
      platform: "telegram",
      protocol: "twofactor",
      first_name: data.first_name,
      last_name: data.last_name,
      phone_number: location.state.phone_number,
    };

    try {
      await createExternalAccount(request).unwrap();
      toast.success("Platform stored successfully");
      // navigate to wallet page
      navigate("../../", { replace: true });
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
            toast.error(
              "Sorry you are not authorized. please logout and login"
            );
            break;
          case 403:
            toast.error("Forbidden");
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
      <div className="max-w-screen-sm min-h-screen px-6 py-20 mx-auto md:px-8">
        <div className="flex items-center justify-center mb-6">
          <img
            src={telegramLogo}
            alt="telegram logo"
            className="w-12 h-12 my-0 mr-3"
          />
          <h1 className="text-2xl font-bold md:text-3xl">
            Telegram Registration
          </h1>
        </div>
        <p className="text-center">create a new telegram account</p>
        <form
          className="max-w-md mx-auto mt-12"
          onSubmit={handleSubmit(handleAccountCreation)}
        >
          <FormGroup>
            <Label htmlFor="first_name">First Name</Label>
            <Input
              type="text"
              name="first_name"
              {...register("first_name")}
              error={errors.first_name}
            />
            {errors.first_name && (
              <ErrorMessage>{errors.first_name?.message}</ErrorMessage>
            )}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="last_name">Last Name</Label>
            <Input
              type="text"
              name="last_name"
              placeholder="Last Name"
              {...register("last_name")}
              error={errors.last_name}
            />
            {errors.last_name && (
              <ErrorMessage>{errors.last_name.message}</ErrorMessage>
            )}
          </FormGroup>

          <Button className="w-full my-4">create account</Button>
        </form>
      </div>
    </PageAnimationWrapper>
  );
};

export default TelegramRegistration;
