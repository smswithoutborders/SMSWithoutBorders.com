import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { BsShieldLock } from "react-icons/bs";
import { useCountDown } from "hooks";
import { useNavigate, useLocation } from "react-router-dom";
import { getCache, useValidateOTPCodeMutation } from "services";

import {
  PageAnimationWrapper,
  Loader,
  Button,
  Input,
  FormGroup,
} from "components";

const CodeVerification = () => {
  const cache = getCache();
  const navigate = useNavigate();
  const location = useLocation();
  const [code, setCode] = useState();

  const [
    validateOTPCode,
    {
      isLoading: OTPValidating,
      isSuccess: OTPValidated,
      isError: OTPValidationError,
    },
  ] = useValidateOTPCodeMutation();

  const {
    timer,
    expired,
    isInitialized,
    isRequesting,
    OTPRequestError,
    resendOTPCode,
  } = useCountDown(cache);

  // check if phone number and cache is present
  useEffect(() => {
    if (!location.state?.phone_number && cache === null) {
      navigate("../");
    }
  }, [location.state, navigate, cache]);

  // verify code
  async function handleCodeVerification(evt) {
    // prevent default form action
    evt.preventDefault();
    try {
      await validateOTPCode(code).unwrap();
      toast.success("Code verified successfully");
      /*
      redirect user to reset password in a route one level up check routing in App.js
      relative routing works like a file system
      https://stackoverflow.com/questions/55858176/go-up-one-level-in-react-router-using-link
      */
      navigate("../reset", {
        state: { phone_number: location.state?.phone_number },
      });
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
            toast.error("Forbidden, Invalid code provided");
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
  if (isRequesting || OTPValidating || OTPValidated) {
    return <Loader />;
  }

  // if error while requesting OTP code
  if (OTPRequestError) {
    return (
      <div className="max-w-screen-xl p-8 mx-auto my-24 prose">
        <h2>An error occured</h2>
        <p className="">
          Sorry we could not verify your phone number. If error persists, please
          contact support
        </p>
        <Button onClick={() => resendOTPCode()}>try again</Button>
      </div>
    );
  }

  // if error while validating OTP Code
  else if (OTPValidationError) {
    return (
      <div className="max-w-screen-xl p-8 mx-auto my-24 prose">
        <h2>An error occured</h2>
        <p className="">
          Sorry we could not verify your code. If error persists, please contact
          support
        </p>
        <Button onClick={() => handleCodeVerification()}>try again</Button>
      </div>
    );
  } else {
    return (
      <PageAnimationWrapper>
        <div className="max-w-screen-sm min-h-screen px-6 py-20 mx-auto text-center md:px-8">
          <h1 className="inline-flex items-center mb-4 text-4xl font-bold">
            <BsShieldLock size={48} className="mr-2" /> Verification
          </h1>

          <div className="my-4 prose text-justify">
            <p>
              A verification code has been sent to your phone. Please enter it
              below. This process confirms the number provided is active and can
              be used for communication when the time comes.
            </p>

            <p>
              We also require you to provide the code sent to you by SMS as a
              means of guaranteeing you have the necessary (own) rights to the
              required phone number. This will help us prevent actors from using
              non consented phone numbers to create accounts - preventing the
              owners from further doing so
            </p>
          </div>

          <div className="max-w-md mx-auto mt-12">
            <form
              className="px-4 mx-auto sm:px-3"
              onSubmit={(evt) => handleCodeVerification(evt)}
            >
              <FormGroup>
                <Input
                  type="number"
                  name="code"
                  min={0}
                  required
                  placeholder="SMS Verification Code"
                  onChange={(evt) => setCode(evt.target.value)}
                />
              </FormGroup>

              <FormGroup className="flex flex-col justify-evenly md:flex-row">
                {isInitialized && expired && (
                  <Button
                    outline
                    className="order-1 mt-3 md:mt-0 md:order-none"
                    onClick={() => resendOTPCode()}
                  >
                    resend code
                  </Button>
                )}

                {isInitialized && !expired && (
                  <p className="order-1 py-2 mt-3 md:mt-0 md:order-none">
                    Resend in: <span className="font-bold">{timer}</span>
                  </p>
                )}

                <Button className="" type="submit">
                  continue
                </Button>
              </FormGroup>
            </form>
          </div>
        </div>
      </PageAnimationWrapper>
    );
  }
};

export default CodeVerification;
