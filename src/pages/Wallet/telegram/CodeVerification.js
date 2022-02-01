import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useVerifyTokenStorageMutation } from "services";
import { authSelector } from "features";
import { useLocation, useNavigate } from "react-router-dom";
import {
  PageAnimationWrapper,
  Loader,
  Button,
  Input,
  FormGroup,
  useTitle,
} from "components";

const CodeVerification = () => {
  useTitle("Telegram Code Verification");
  const navigate = useNavigate();
  const location = useLocation();
  const [code, setCode] = useState();
  const [verifyTokenStorage, { isLoading, isSuccess }] =
    useVerifyTokenStorageMutation();
  const auth = useSelector(authSelector);

  // check if phone number is present
  useEffect(() => {
    if (!location.state?.phone_number) {
      navigate("../");
    }
  }, [location.state, navigate]);

  async function handleCodeVerification(evt) {
    // prevent default form action
    evt.preventDefault();

    // build request data
    let data = {
      uid: auth.uid,
      code: code,
      platform: "telegram",
      protocol: "twofactor",
      oauth_token: "",
      oauth_verifier: "",
      phone_number: location.state.phone_number,
    };

    try {
      const response = await verifyTokenStorage(data).unwrap();
      switch (response.body.code) {
        case 202:
          toast.success(
            "You do not have a telegram account, please fill the form to create one"
          );
          // send user to telegram registration
          navigate("../../register", {
            state: { phone_number: location.state.phone_number },
          });
          break;
        default:
          // 200 success
          toast.success("Platform stored successfully");
          // navigate to wallet page
          navigate("../../", { replace: true });
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
  if (isLoading || isSuccess) {
    return <Loader />;
  }

  return (
    <PageAnimationWrapper>
      <div className="max-w-screen-sm min-h-screen px-6 py-20 mx-auto text-center md:px-8">
        <h1 className="mb-4 text-3xl font-bold">Enter verification code</h1>
        <p className="mt-8">A verification code has been sent to your phone</p>

        <small className="my-4">Lorem Ipsum Dolor consecutar eh errrhhhm</small>

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
                placeholder="2FA CODE"
                onChange={(evt) => setCode(evt.target.value)}
              />
            </FormGroup>
            <Button className="mx-auto" type="submit">
              continue
            </Button>
          </form>
        </div>
      </div>
    </PageAnimationWrapper>
  );
};

export default CodeVerification;
