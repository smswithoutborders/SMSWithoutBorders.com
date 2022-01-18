import React, { useEffect, useState } from "react";
import { Loader } from "components";
import { savePlatformOauthToken } from "services/wallet.service";
import { useAppContext } from "App";
import toast from "react-hot-toast";

const WalletRedirect = () => {
  const { state } = useAppContext();
  const [message, setMessage] = useState("Storing token please wait");

  useEffect(() => {
    // get the URL parameters which will include the auth token
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");

    if (code) {
      savePlatformOauthToken(state.id, state.token, "google", "gmail", code)
        .then((response) => {
          if (response.status === 200) {
            toast.success(
              "Token stored successfully \n Please wait while we update your information"
            );
            setMessage("You will be redirected shortly");
            setTimeout(() => {
              window.location.replace("/dashboard/wallet");
            }, 2500);
          }
        })
        .catch((error) => {
          if (error.response) {
            switch (error.response.status) {
              case 400:
                toast.error(
                  "We could not store your token \n Please Check your network connection and try again"
                );
                break;

              case 401:
                toast.error(
                  "An error occured \n Please log out and login again"
                );
                break;

              case 403:
                toast.error(
                  "An error occured \n Please try again later. If error persists log out and login again"
                );
                break;

              case 409:
                toast("Token already stored \n You will be redirected shortly");
                setTimeout(() => {
                  window.location.replace("/dashboard/wallet");
                }, 1500);
                break;

              case 500:
                toast.error(
                  "An error occured \n Its not you its Us. We are working to resolve it. Please try again"
                );
                break;

              default:
                toast.error("Something went wrong Please try again");
            }
          } else if (error.request) {
            toast.error(
              "Network Error \n Please Check your network connection and try again"
            );
          } else {
            toast.error(
              "Profile Error \n An internal error occured. Please log out and login again"
            );
          }
        });
    } else {
      window.location.replace("/dashboard/404/");
    }
  }, [state]);
  // some text to show the user
  return <Loader message={message} />;
};
export default WalletRedirect;
