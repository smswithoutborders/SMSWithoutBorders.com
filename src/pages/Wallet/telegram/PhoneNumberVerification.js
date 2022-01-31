import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import telegramLogo from "images/telegram-icon.svg";
import { useStoreTokenMutation } from "services";
import { authSelector } from "features";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
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
  useTitle("Telegram Access");

  const location = useLocation();
  const navigate = useNavigate();
  const auth = useSelector(authSelector);
  const [number, setNumber] = useState();
  const [error, setError] = useState(false);
  // store token
  const [storeToken, { isLoading, isSuccess }] = useStoreTokenMutation();

  // check if url is present
  useEffect(() => {
    if (!location.state?.url) {
      navigate("../../");
    }
  }, [location.state, navigate]);

  async function handleTokenStorage(evt) {
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
    let data = {
      uid: auth.uid,
      url: location.state.url,
      phone_number: number,
    };

    try {
      const response = await storeToken(data).unwrap();
      switch (response.body) {
        case 201:
          toast.success(
            "A verification code has been sent to your phone. Check code in your sms or email inbox"
          );
          // send user to code verification
          navigate("../verify", { state: { phone_number: number } });
          break;
        default:
          // 200 success
          toast.error("Sorry, you are not authorized to make this request");
          // navigate to wallet page
          navigate("../");
      }
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
            toast.error("Forbidden, Account is unauthorized.");
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
        <div className="flex items-center justify-center mb-6">
          <img
            src={telegramLogo}
            alt="telegram logo"
            className="w-12 h-12 my-0 mr-3"
          />
          <h1 className="text-3xl font-bold">Telegram</h1>
        </div>
        <p>Please fill in your phone number to begin</p>

        <div className="max-w-md mx-auto mt-12">
          <form
            className="px-4 mx-auto sm:px-3"
            onSubmit={(evt) => handleTokenStorage(evt)}
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
            <div className="flex flex-col mt-8 justify-evenly md:flex-row">
              <Button type="submit" className="flex-1 md:order-1">
                continue
              </Button>
              <Button
                type="button"
                outline
                className="flex-1 my-4 md:my-0 md:order-0 md:mr-2"
                onClick={() => navigate(-1)}
              >
                back
              </Button>
            </div>
          </form>
        </div>
      </div>
    </PageAnimationWrapper>
  );
};

export default PhoneNumberVerification;
