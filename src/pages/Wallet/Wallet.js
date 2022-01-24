import React, { useState, Fragment } from "react";
import clsx from "clsx";
import toast from "react-hot-toast";
import gmailIcon from "images/gmail-icon.svg";
import twitterIcon from "images/twitter-icon.svg";
// import { Button, toaster, Dialog } from "evergreen-ui";
import { FiSave, FiTrash2, FiChevronDown } from "react-icons/fi";
import { IoWalletOutline } from "react-icons/io5";
import { Disclosure } from "@headlessui/react";
import {
  Loader,
  useTitle,
  Button,
  PageAnimationWrapper,
  PasswordInput,
} from "components";
import { useSelector } from "react-redux";
import { authSelector } from "features";
import {
  useGetProvidersQuery,
  useStoreTokenMutation,
  useTokenRevokeMutation,
} from "services";
import { Dialog } from "@headlessui/react";

const Wallet = () => {
  useTitle("Wallet (Store Access)");

  // used for token revoke
  const [isOpen, setIsOpen] = useState(false);
  const [password, setPassword] = useState("");
  // save the platform to be revoked
  const [details, setDetails] = useState({
    provider: "",
    platform: "",
  });

  const auth = useSelector(authSelector);
  // fetch providers with rtk query
  const {
    providers = {},
    storedTokens = {},
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetProvidersQuery(auth, {
    selectFromResult: ({ data }) => ({
      providers: data?.default_provider,
      storedTokens: data?.user_provider,
    }),
  });

  // store token
  const [storeToken, { isLoading: loadingB, isSuccess: successB }] =
    useStoreTokenMutation();
  // token revoke
  const [tokenRevoke, { isLoading: loadingC, isSuccess: successC }] =
    useTokenRevokeMutation();

  /*
    when making requests show loading indicator
    Also maintain after request is successfull to update background state
  */
  if (isLoading || isFetching || loadingB || successB || loadingC || successC) {
    return <Loader />;
  }

  if (isError) {
    return (
      <div className="p-8 my-24 prose">
        <h2>An error occured</h2>
        <p className="">
          Sorry we could not get your providers and platforms. If error
          persists, please contact support
        </p>
        <Button onClick={() => refetch()}>try again</Button>
      </div>
    );
  }

  async function handleTokenStorage(provider, platform) {
    // build request body
    let data = {
      ...auth,
      provider,
      platform,
    };

    try {
      const response = await storeToken(data).unwrap();
      //open authorization window
      window.open(response.url, "_self");
    } catch (error) {
      switch (error.status) {
        case 400:
          toast.error(
            "Something went wrong \n We are working to resolve this. Please try again"
          );
          break;
        case 401:
          toast.error(
            "Forbidden, Account is unauthorized. \n check your phonenumber and password"
          );
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
        // custom error thrown by RTK Query https://redux-toolkit.js.org/rtk-query/usage/error-handling
        case "FETCH_ERROR":
          toast.error("An error occured, please check your network try again");
          break;
        default:
          toast.error("An error occured, please try again");
      }
    }
  }

  async function handleTokenRevoke() {
    // build request body
    let data = {
      ...auth,
      ...details,
      password: password,
    };

    try {
      await tokenRevoke(data).unwrap();
      toast.success(
        "Token deleted successfully \n Please wait while we update your information"
      );
      // reload providers
      refetch();
    } catch (error) {
      switch (error.status) {
        case 400:
          toast.error(
            "Something went wrong \n We are working to resolve this. Please try again"
          );
          break;
        case 401:
          toast.error("wrong password provided");
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
        // custom error thrown by RTK Query https://redux-toolkit.js.org/rtk-query/usage/error-handling
        case "FETCH_ERROR":
          toast.error("An error occured, please check your network try again");
          break;
        default:
          toast.error("An error occured, please try again");
      }
    }
  }

  return (
    <PageAnimationWrapper>
      <div className="max-w-screen-xl p-8 mx-auto my-20 prose text-gray-900">
        <h1 className="inline-flex items-center mb-0 text-4xl font-bold">
          <IoWalletOutline /> &nbsp; Wallet
        </h1>
        <p className="my-0 text-lg">Save your tokens for rainy days</p>

        <div className="flex flex-col lg:flex-row justify-evenly">
          <div className="w-full p-4 lg:w-1/2">
            <h2>Providers</h2>
            {Object.keys(providers).length ? (
              <Fragment>
                {providers.map((item) => (
                  <Disclosure key={item?.provider}>
                    {({ open }) => (
                      <Fragment>
                        <Disclosure.Button className="flex items-center justify-between w-full p-4 mb-4 text-left rounded-lg shadow-md">
                          <div className="flex flex-row items-center">
                            <img
                              src={
                                item?.provider === "google"
                                  ? gmailIcon
                                  : twitterIcon
                              }
                              alt={`${item.provider} logo`}
                              className="w-8 h-8 my-0 mr-4"
                            />
                            <h3 className="my-0 font-normal capitalize">
                              {item?.provider}
                            </h3>
                          </div>
                          <FiChevronDown
                            className={clsx(
                              "w-5 h-5 text-blue-800",
                              open && "transform rotate-180"
                            )}
                          />
                        </Disclosure.Button>
                        <Disclosure.Panel className="p-4 mb-4 shadow">
                          <p>
                            Store your {item?.provider} token which will be used
                            for authentication on your behalf in the event of an
                            internet shutdown.
                          </p>
                          <p>
                            You can define how this token will be used by
                            setting the scopes of access
                          </p>
                          <div className="flex items-center justify-between">
                            <div>
                              <h4>Description</h4>
                              <p>{item?.description}</p>

                              <h4>Platform</h4>
                              <p>{item?.platforms[0].name}</p>

                              <h4>Type</h4>
                              <p>{item?.platforms[0].type}</p>
                            </div>
                            <Button
                              onClick={() =>
                                handleTokenStorage(
                                  item?.provider,
                                  item?.platforms[0].name
                                )
                              }
                            >
                              <FiSave /> &nbsp; store
                            </Button>
                          </div>
                        </Disclosure.Panel>
                      </Fragment>
                    )}
                  </Disclosure>
                ))}
              </Fragment>
            ) : (
              <p>No available providers</p>
            )}
          </div>
          <div className="w-full p-4 lg:w-1/2">
            <h2>Stored tokens</h2>
            {Object.keys(storedTokens).length ? (
              <Fragment>
                {storedTokens.map((item) => (
                  <Disclosure key={item?.provider}>
                    {({ open }) => (
                      <Fragment>
                        <Disclosure.Button className="flex items-center justify-between w-full p-4 mb-4 text-left rounded-lg shadow-md">
                          <div className="flex flex-row items-center">
                            <img
                              src={
                                item?.provider === "google"
                                  ? gmailIcon
                                  : twitterIcon
                              }
                              alt={`${item.provider} logo`}
                              className="w-8 h-8 my-0 mr-4"
                            />
                            <h3 className="my-0 font-normal capitalize">
                              {item?.provider}
                            </h3>
                          </div>
                          <FiChevronDown
                            className={clsx(
                              "w-5 h-5 text-blue-800",
                              open && "transform rotate-180"
                            )}
                          />
                        </Disclosure.Button>
                        <Disclosure.Panel className="p-4 mb-4 shadow">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4>Description</h4>
                              <p>{item?.description}</p>
                              <h4>Platform</h4>
                              <p>{item?.platforms[0].name}</p>
                              {item?.email && (
                                <Fragment>
                                  <h4>Email address</h4>
                                  <p>{item?.email}</p>
                                </Fragment>
                              )}
                              {item?.screen_name && (
                                <Fragment>
                                  <h4>Screen Name</h4>
                                  <p>{item?.screen_name}</p>
                                </Fragment>
                              )}
                            </div>
                            <Button
                              className="bg-red-500 hover:bg-red-700"
                              onClick={() => {
                                setDetails({
                                  provider: item?.provider,
                                  platform: item?.platforms[0].name,
                                });
                                setIsOpen(true);
                              }}
                            >
                              <FiTrash2 /> &nbsp; revoke
                            </Button>
                          </div>
                        </Disclosure.Panel>
                      </Fragment>
                    )}
                  </Disclosure>
                ))}
              </Fragment>
            ) : (
              <p>No stored tokens</p>
            )}
          </div>
        </div>
      </div>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="absolute inset-0 z-10 p-4 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

          <div className="relative max-w-xl p-6 mx-auto prose bg-white rounded-lg">
            <Dialog.Title>Revoke Token</Dialog.Title>
            <Dialog.Description>
              This will permanently remove this token from your account and
              cannot be reversed. Enter your password to Confirm
            </Dialog.Description>

            <PasswordInput
              placeholder="Password"
              minLength="8"
              onChange={(evt) => setPassword(evt.target.value)}
            />

            <div className="flex items-center justify-end mt-8">
              <Button outline onClick={() => setIsOpen(false)}>
                cancel
              </Button>
              <Button
                className="ml-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-300"
                disabled={password.length > 8 ? false : true}
                onClick={() => handleTokenRevoke()}
              >
                confirm revoke
              </Button>
            </div>
          </div>
        </div>
      </Dialog>
    </PageAnimationWrapper>
  );
};

export default Wallet;
