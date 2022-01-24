import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDeleteAccountMutation } from "services";
import { authSelector, resetStore } from "features";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FiTrash2 } from "react-icons/fi";
import {
  PageAnimationWrapper,
  PasswordInput,
  FormGroup,
  Button,
  Loader,
  useTitle,
} from "components";

const AccountDeletion = () => {
  useTitle("password reset");
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
      <div className="max-w-lg p-4 mx-auto text-center">
        <h1 className="mb-4 text-3xl font-bold text-red-600">Delete Account</h1>
        <p>
          This action cannot be reversed. Please enter your password to confirm
        </p>

        <div className="flex-1 w-full mt-8">
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
              />
            </FormGroup>

            <Button
              className="bg-red-600 focus:bg-red-700 disabled:bg-gray-300"
              type="submit"
              disabled={password?.length >= 8 ? false : true}
            >
              <FiTrash2 size={20} /> &nbsp; delete
            </Button>
          </form>
        </div>
      </div>
    </PageAnimationWrapper>
  );
};

export default AccountDeletion;
