import React, { useState } from "react";
import toast from "react-hot-toast";
import { useRecoverPasswordMutation } from "services";
import { saveValidationCreds } from "features";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  PageAnimationWrapper,
  PhoneNumberInput,
  ErrorMessage,
  FormGroup,
  Button,
  Loader,
  useTitle,
} from "components";

const PhoneNumberVerification = () => {
  useTitle("password reset");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [number, setNumber] = useState();
  const [error, setError] = useState(false);
  const [recoverPassword, { isLoading, isSuccess }] =
    useRecoverPasswordMutation();

  async function handleVerification(evt) {
    // stop default form action
    evt.preventDefault();
    // validate phone number
    if (!number) {
      toast.error("please provide a valid phone number with country code");
      setError(true);
      return;
    } else {
      setError(false);
    }

    // build request body
    const data = {
      phone_number: number,
    };

    try {
      const response = await recoverPassword(data).unwrap();
      toast.success("A verification code has been sent to your phone");
      // clear validation creds in state
      dispatch(saveValidationCreds(response));
      // redirect to verification page
      navigate("verify");
    } catch (error) {
      switch (error.status) {
        case 400:
          toast.error(
            "Something went wrong \n We are working to resolve this. Please try again"
          );
          break;
        case 401:
          toast.error(
            "Sorry We did not find your account \n please sign up to create one"
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
        <h1 className="mb-4 text-3xl font-bold">Password Reset</h1>
        <p>Please fill in your phone number to begin</p>

        <div className="flex-1 w-full mt-8">
          <form
            className="px-4 mx-auto sm:px-3"
            onSubmit={(evt) => handleVerification(evt)}
          >
            <FormGroup>
              <PhoneNumberInput
                international
                countryCallingCodeEditable={false}
                placeholder="Enter your phone number"
                defaultCountry="CM"
                value={number}
                type="tel"
                required
                onChange={setNumber}
                error={error ? "true" : null}
              />
              {error && (
                <ErrorMessage>
                  please provide a valid phone number with country code
                </ErrorMessage>
              )}
            </FormGroup>
            <div className="flex flex-col justify-evenly md:flex-row">
              <Button type="submit">continue</Button>
            </div>
          </form>
        </div>
      </div>
    </PageAnimationWrapper>
  );
};

export default PhoneNumberVerification;
