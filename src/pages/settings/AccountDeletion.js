import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDeleteAccountMutation } from "services";
import { authSelector, resetStore } from "features";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  Button,
  Loader,
  useTitle,
  FormGroup,
  PasswordInput,
} from "components";

const AccountDeletion = () => {
  useTitle("Account Deletion");
  const auth = useSelector(authSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [password, setPassword] = useState();
  const [deleteAccount, { isLoading, isSuccess }] = useDeleteAccountMutation();

  async function handleDeletion(evt) {
    // stop default form action
    evt.preventDefault();
    // build request body
    const data = {
      ...auth,
      password: password,
    };

    try {
      await deleteAccount(data).unwrap();
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
    <div className="max-w-screen-sm py-20 mx-auto text-center md:px-8">
      <h1 className="mb-4 text-3xl font-bold">Delete Account</h1>
      <Alert
        kind="negative"
        message="This action cannot be reversed. All your tokens will be lost"
        hideCloseButton
      />
      <p>Please enter your password to confirm</p>

      <div className="max-w-md mx-auto mt-12">
        <form
          className="px-4 mx-auto sm:px-3"
          onSubmit={(evt) => handleDeletion(evt)}
        >
          <FormGroup>
            <PasswordInput
              name="password"
              placeholder="password"
              min={8}
              required
              onChange={(evt) => setPassword(evt.target.value)}
              showStrength={false}
            />
          </FormGroup>

          <Button
            className="bg-red-600 hover:bg-red-500 focus:bg-red-700 disabled:bg-gray-300"
            type="submit"
            disabled={password?.length >= 8 ? false : true}
          >
            continue
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AccountDeletion;
