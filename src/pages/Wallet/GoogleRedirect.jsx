import React, { useEffect, useState } from 'react';
import { toaster } from "evergreen-ui";
import { Loader } from "components";
import { savePlatformOauthToken } from 'services/wallet.service';
import { useAppContext } from '~/App';

const WalletRedirect = () => {

    const { state } = useAppContext();
    const [message, setMessage] = useState("Storing token please wait");

    useEffect(() => {
        // get the URL parameters which will include the auth token
        const searchParams = new URLSearchParams(window.location.search);
        const code = searchParams.get("code");

        if (code) {
            savePlatformOauthToken(state.id, state.token, "google", "gmail", code)
                .then(response => {
                    if (response.status === 200) {
                        toaster.success("Token stored successfully", {
                            description: "Please wait while we update your information"
                        });
                        setMessage("You will be redirected shortly");
                        setTimeout(() => {
                            window.location.replace("/dashboard/wallet");
                        }, 2500);
                    }
                }).catch((error) => {
                    console.log(error);
                    if (error.response) {
                        switch (error.response.status) {
                            case 400:
                                toaster.danger("We could not store your token", {
                                    description: "Please Check your network connection and try again"
                                });
                                break;

                            case 401:
                                toaster.danger("An error occured", {
                                    description: "Please log out and login again"
                                });
                                break;

                            case 403:
                                toaster.notify("An error occured", {
                                    description: "Please try again later. If error persists log out and login again"
                                });
                                break;

                            case 409:
                                toaster.notify("Token already stored", {
                                    description: "You will be redirected shortly"
                                });
                                setTimeout(() => {
                                    window.location.replace("/dashboard/wallet");
                                }, 1500);
                                break;

                            case 500:
                                toaster.danger("An error occured", {
                                    description: "Its not you its Us. We are working to resolve it. Please try again"
                                });
                                break;

                            default:
                                toaster.danger("Something went wrong", {
                                    description: "Please try again"
                                });
                        }
                    } else if (error.request) {
                        toaster.danger("Network Error", {
                            description: "Please Check your network connection and try again"
                        });
                    } else {
                        toaster.danger("Profile Error", {
                            description: "An internal error occured. Please log out and login again"
                        });
                    }
                });
        } else {
            window.location.replace("/dashboard/404/")
        }
    }, [state]);
    // some text to show the user
    return <Loader message={message} />;
};
export default WalletRedirect;