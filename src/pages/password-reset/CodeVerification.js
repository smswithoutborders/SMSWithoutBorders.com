import React, { useState } from "react";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { useVerifyRecoveryCodeMutation } from "services";
import { validationSelector, saveValidationCreds } from "features";
import { useNavigate } from "react-router-dom";
import {
  PageAnimationWrapper,
  Loader,
  Button,
  Input,
  FormGroup,
} from "components";

const CodeVerification = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [code, setCode] = useState();
  const [verifyRecoveryCode, { isLoading, isSuccess }] =
    useVerifyRecoveryCodeMutation();
  const creds = useSelector(validationSelector);

  async function handleCodeVerification(evt) {
    // prevent default form action
    evt.preventDefault();

    // build request data
    let data = {
      ...creds,
      code: code,
    };

    try {
      const response = await verifyRecoveryCode(data).unwrap();
      toast.success(`Success, Code Verified`);
      // save validation creds in state
      dispatch(saveValidationCreds(response));
      /* 
      redirect user to reset password in a route one level up check routing in App.js
      relative routing works like a file system
      https://stackoverflow.com/questions/55858176/go-up-one-level-in-react-router-using-link
      */
      navigate("../reset");
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
        <h1 className="mb-4 text-3xl font-bold">Enter verification code</h1>
        <p className="mt-8">A verification code has been sent to your phone</p>

        <small className="my-2">Lorem Ipsum Dolor consecutar eh errrhhh</small>

        <div className="flex-1 w-full mt-8">
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
