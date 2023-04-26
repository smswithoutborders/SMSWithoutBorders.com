import React, { useState, useEffect, Fragment } from "react";
import toast from "react-hot-toast";
import { IoMdSync } from "react-icons/io";
import { useSelector } from "react-redux";
import { authSelector } from "features";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";
import { BsShieldLock } from "react-icons/bs";
import { Dialog, Transition } from "@headlessui/react";

import {
  Loader,
  Button,
  PasswordInput,
  PageAnimationWrapper,
  LinkButton,
} from "components";
import {
  setLocalCache,
  useGetPlatformsQuery,
  useStoreTokenMutation,
  useTokenRevokeMutation,
} from "services";
import Error from "../Error";
import OnboardingTutorial from "../tutorials/OnboardingTutorial";
import { PlatformList } from "./components";
import { useTitle, useDeviceDetection } from "hooks";

const Wallet = () => {
  const { t } = useTranslation();
  useTitle(t("wallet.page-title"));
  const [revokeURL, setRevokeURL] = useState("");
  const [showRevokeDialog, setOpenRevokeDialog] = useState(false);
  const [password, setPassword] = useState("");
  const [onboarding, setOnboarding] = useState(false);
  const [prompt, setPrompt] = useState({
    url: "",
    open: false,
    hasApp: false,
  });

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const auth = useSelector(authSelector);
  const isMobile = useDeviceDetection();

  // fetch platforms with rtk query
  const {
    data = {},
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetPlatformsQuery(auth, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  const { unSavedPlatforms = [], savedPlatforms = [] } = data;

  // store token
  const [storeToken, { isLoading: requestingAuthUrl }] =
    useStoreTokenMutation();

  // token revoke
  const [tokenRevoke, { isLoading: revokingToken }] = useTokenRevokeMutation();

  // check and open tutorial
  useEffect(() => {
    const tutorial = searchParams.get("tutorial");
    if (tutorial === "onisErrorboarding") {
      setOnboarding(true);
    }
  }, [searchParams]);

  // control prompts
  function closePrompt() {
    setPrompt({ open: false, hasApp: false, url: "" });
  }

  /*eslint-disable no-console */
  // Helper function to open authorization screen after prompt
  function openAuthScreen() {
    // we can access the previous store token response and reuse the url
    if (prompt.hasApp) {
      window.open(prompt.url, "_blank");
    } else {
      window.open(prompt.url, "_self");
    }
  }

  /*
   * @param name: string
   * @param url: string
   */
  async function handleTokenStorage(name, url) {
    // handle telegram differently
    // pass platform url to phone verification page
    if (name === "telegram") {
      navigate("/dashboard/wallet/telegram", { state: { url: url } });
      return;
    }

    // build request body
    let data = {
      uid: auth.uid,
      url,
    };

    try {
      const { code_verifier, url } = await storeToken(data).unwrap();
      /*
       * Cache auth in localStorage because twitter will use
       * in-app browser and sessionStorage is not accessible
       */
      setLocalCache({
        ...auth,
        code_verifier,
      });

      // check and handle twitter
      if (name === "twitter" && isMobile) {
        setPrompt({ open: true, hasApp: false, url: url });
        return;
      }

      // open auth screen
      window.open(url, "_self");
    } catch (error) {
      // handle all other errors in utils/middleware
    }
  }

  /* save revoke token and prompt for confirmation */
  function initRevoke(url) {
    setRevokeURL(url);
    setOpenRevokeDialog(true);
  }

  /* revoke tokens per platform */
  async function handleTokenRevoke() {
    // build request body
    let data = {
      ...auth,
      url: revokeURL,
      password: password,
    };

    try {
      await tokenRevoke(data).unwrap();
      toast.success(t("wallet.alerts.platform-deleted"));
      // reload providers
      refetch();
    } catch (error) {
      // https://redux-toolkit.js.org/rtk-query/usage/error-handling
      if (error.originalStatus === 403) {
        setPassword("");
        setOpenRevokeDialog(true);
      }
    }
  }

  /*
    when making requests show loading indicator
    Also maintain after request is successfull to update background state
  */
  if (isLoading || isFetching || requestingAuthUrl || revokingToken) {
    return <Loader />;
  }

  // handle errors
  if (isError) {
    return <Error message={t("wallet.alerts.load-error")} callBack={refetch} />;
  }

  /* inform about twitter workaround for mobile devices */
  if (prompt.open) {
    return (
      <Transition appear show as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => closePrompt()}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-md" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-xl p-6 overflow-hidden prose align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                  {!prompt.hasApp ? (
                    <Fragment>
                      <Dialog.Title as="h3" className="mb-4">
                        {t("wallet.prompt-dialog.heading")}
                      </Dialog.Title>
                      <div className="flex items-center justify-start gap-2 mt-8">
                        <Button
                          outline
                          onClick={() => openAuthScreen()}
                          className="flex-1 md:flex-initial"
                        >
                          {t("labels.no")}
                        </Button>
                        <Button
                          className="flex-1 md:flex-initial"
                          onClick={() =>
                            setPrompt((current) => {
                              return {
                                ...current,
                                hasApp: true,
                              };
                            })
                          }
                        >
                          {t("labels.yes")}
                        </Button>
                      </div>
                    </Fragment>
                  ) : (
                    <Fragment>
                      <Dialog.Description>
                        {t("wallet.prompt-dialog.details")}
                      </Dialog.Description>

                      <Button onClick={() => openAuthScreen()}>
                        {t("wallet.prompt-dialog.cta-button-text")}
                      </Button>
                    </Fragment>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    );
  }

  return (
    <PageAnimationWrapper>
      <div className="max-w-screen-xl min-h-screen p-6 mx-auto prose text-gray-900 md:my-10 onboarding">
        {/* show buttons for mobile devices only */}
        <div className="md:hidden">
          <Button
            className="w-full mb-8 mt-8 mobile-tutorial-button"
            onClick={() => setOnboarding(true)}
          >
            {t("labels.tutorial")}
          </Button>
        </div>
        {/*  */}
        <div className="flex justify-between mb-8">
          <h1 className="inline-flex items-center gap-4 mb-0 text-3xl font-bold">
            <BsShieldLock size={42} />
            <span>{t("wallet.heading")}</span>
          </h1>

          <div className="flex items-center gap-2">
            <Button
              outline
              className="hidden md:flex desktop-tutorial-button"
              onClick={() => setOnboarding(true)}
            >
              {t("labels.tutorial")}
            </Button>
            <LinkButton
              to="/dashboard/sync"
              className="hidden md:flex desktop-sync-button"
            >
              <IoMdSync size={22} />
              <span>{t("labels.sync")}</span>
            </LinkButton>
          </div>
        </div>
        <p className="my-0 text-lg">{t("wallet.details")}</p>
        <p className="my-0 text-lg">{t("wallet.instructions1")}</p>

        {/* saved and unsaved platforms  */}
        <div className="grid grid-cols-2 gap-4 lg:gap-8">
          <div className="col-span-full md:col-span-1 onboarding-step-1">
            <h2>{t("wallet.section-1.heading")}</h2>
            <p className="my-0 text-lg pb-1">{t("wallet.instructions3")}</p>
            <i className="my-0 text-lg" style={{ fontSize: "15px" }}>
              {t("wallet.instructions4")}
            </i>
            <PlatformList
              platforms={unSavedPlatforms}
              callbackFn={handleTokenStorage}
            />
          </div>

          <div className="col-span-full md:col-span-1">
            <h2>{t("wallet.section-2.heading")}</h2>
            <p className="my-0 text-lg">{t("wallet.instructions2")}</p>

            <PlatformList
              saved
              platforms={savedPlatforms}
              callbackFn={initRevoke}
            />
          </div>
        </div>

        {/* show buttons for mobile devices only */}
        <div className="md:hidden">
          <LinkButton
            to="/dashboard/sync"
            className="mt-2 mb-8 mobile-sync-button"
          >
            <IoMdSync size={22} />
            <span className="ml-1">{t("labels.sync")}</span>
          </LinkButton>
        </div>
        {/*  */}
      </div>

      {/* revoke dialog */}
      <Transition appear show={showRevokeDialog} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setOpenRevokeDialog(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-md" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-xl p-6 overflow-hidden prose text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                  <Dialog.Title as="h3" className="mb-4">
                    {t("wallet.revoke-dialog.heading")}
                  </Dialog.Title>
                  <Dialog.Description>
                    {t("wallet.revoke-dialog.details")}
                  </Dialog.Description>

                  <PasswordInput
                    autoFocus
                    placeholder={t("forms.password.placeholder")}
                    minLength="8"
                    onChange={(evt) => setPassword(evt.target.value)}
                    showStrength={false}
                  />

                  <div className="flex items-center justify-between gap-2 mt-8 md:justify-end">
                    <Button
                      outline
                      onClick={() => setOpenRevokeDialog(false)}
                      className="flex-1 md:flex-initial"
                    >
                      {t("wallet.revoke-dialog.cancel-button-text")}
                    </Button>
                    <Button
                      danger
                      className="flex-1 md:flex-initial"
                      disabled={password.length >= 8 ? false : true}
                      onClick={() => {
                        handleTokenRevoke();
                        setOpenRevokeDialog(false);
                      }}
                    >
                      {t("wallet.revoke-dialog.cta-button-text")}
                    </Button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* onboarding */}
      <OnboardingTutorial start={onboarding} stopFunc={setOnboarding} />
    </PageAnimationWrapper>
  );
};

export default Wallet;
