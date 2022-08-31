import React, { useState, Fragment, useEffect } from "react";
import clsx from "clsx";
import toast from "react-hot-toast";
import { IoMdSync } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { authSelector, saveAuth } from "features";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FiSave, FiTrash2, FiChevronDown, FiGrid } from "react-icons/fi";
import { BsShieldLock } from "react-icons/bs";
import { Disclosure, Dialog, Transition } from "@headlessui/react";
import {
  Loader,
  useTitle,
  Button,
  PageAnimationWrapper,
  PasswordInput,
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
import { capitalize } from "utils";

const Wallet = () => {
  const { t, i18n } = useTranslation();
  useTitle(t("wallet.page-title"));
  const [revokeURL, setRevokeURL] = useState("");
  const [showRevokeDialog, setOpenRevokeDialog] = useState(false);
  const [password, setPassword] = useState("");
  const [onboarding, setOnboarding] = useState(false);
  const [isTwitter, setIsTwitter] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const auth = useSelector(authSelector);
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
  const [storeToken, { isLoading: loadingB, isSuccess: successB }] =
    useStoreTokenMutation();
  // token revoke
  const [tokenRevoke, { isLoading: loadingC }] = useTokenRevokeMutation();

  // where logos are stored
  const LOGO_HOST = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const tutorial = searchParams.get("tutorial");
    if (tutorial === "onboarding") {
      setOnboarding(true);
    }
  }, [searchParams]);

  async function handleTokenStorage(name, url) {
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
      //open authorization window
      if (name !== "twitter") {
        window.open(url, "_self");
      } else {
        dispatch(
          saveAuth({
            ...auth,
            code_verifier,
          })
        );
        setLocalCache({
          ...auth,
          code_verifier,
        });

        setIsTwitter(true);
        window.open(url, "SWOB-TWITTER-ACCESS");
      }
    } catch (error) {
      // https://redux-toolkit.js.org/rtk-query/usage/error-handling
      const { status, originalStatus } = error;
      if (originalStatus) {
        switch (originalStatus) {
          case 400:
            toast.error(t("error-messages.400"));
            break;
          case 401:
            toast.error(t("error-messages.401"));
            break;
          case 403:
            toast.error(t("error-messages.403"));
            break;
          case 409:
            toast.error(t("error-messages.409"));
            break;
          case 429:
            toast.error(t("error-messages.429"));
            break;
          case 500:
            toast.error(t("error-messages.500"));
            break;
          default:
            toast.error(t("error-messages.general-error-message"));
        }
      } else if (status === "FETCH_ERROR") {
        toast.error(t("error-messages.network-error"));
      }
    }
  }

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
      const { status, originalStatus } = error;
      if (originalStatus) {
        switch (originalStatus) {
          case 400:
            toast.error(t("error-messages.400"));
            break;
          case 401:
            toast.error(t("error-messages.401"));
            break;
          case 403:
            setPassword("");
            setOpenRevokeDialog(true);
            toast.error(t("error-messages.invalid-password"));
            break;
          case 409:
            toast.error(t("error-messages.409"));
            break;
          case 429:
            toast.error(t("error-messages.429"));
            break;
          case 500:
            toast.error(t("error-messages.500"));
            break;
          default:
            toast.error(t("error-messages.general-error-message"));
        }
      } else if (status === "FETCH_ERROR") {
        toast.error(t("error-messages.network-error"));
      }
    }
  }

  /*
    when making requests show loading indicator
    Also maintain after request is successfull to update background state
  */
  if (
    isLoading ||
    isFetching ||
    loadingB ||
    (successB && !isTwitter) ||
    loadingC
  ) {
    return <Loader />;
  }

  if (isError) {
    return <Error message={t("wallet.alerts.load-error")} callBack={refetch} />;
  }

  return (
    <PageAnimationWrapper>
      <div className="max-w-screen-xl min-h-screen p-6 mx-auto prose text-gray-900 md:my-10 onboarding">
        <div className="flex justify-between mb-8">
          <h1 className="inline-flex items-center mb-0 space-x-4 text-3xl font-bold">
            <BsShieldLock size={42} />
            <span className="ml-2">{t("wallet.heading")}</span>
          </h1>
          <div className="flex items-center space-x-2">
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
              <span className="ml-1">{t("labels.sync")}</span>
            </LinkButton>
          </div>
        </div>
        <p className="my-0 text-lg">{t("wallet.details")}</p>

        <div className="grid grid-cols-2 gap-4 lg:gap-8">
          <div className="col-span-full md:col-span-1 onboarding-step-1">
            <h2>{t("wallet.section-1.heading")}</h2>
            {Object.keys(unSavedPlatforms).length ? (
              <Fragment>
                {unSavedPlatforms.map((item) => (
                  <Disclosure key={item.name}>
                    {({ open }) => (
                      <Fragment>
                        <Disclosure.Button className="flex items-center justify-between w-full p-4 mb-4 text-left rounded-lg shadow-md">
                          <div className="flex flex-row items-center">
                            {item.logo ? (
                              <img
                                src={`${LOGO_HOST}${item.logo}`}
                                alt={`${item.name} logo`}
                                className="w-8 h-8 my-0 mr-4"
                              />
                            ) : (
                              <FiGrid
                                title={`${item.name} logo`}
                                className="w-8 h-8 my-0 mr-4"
                              />
                            )}
                            <h3 className="my-0 font-normal capitalize">
                              {item.name}
                            </h3>
                          </div>
                          <FiChevronDown
                            className={clsx(
                              "w-5 h-5 text-blue-800",
                              open && "transform rotate-180"
                            )}
                          />
                        </Disclosure.Button>
                        <Disclosure.Panel className="p-4 mb-4 border border-gray-100 rounded-lg shadow">
                          <h3 className="mt-0"> {t("wallet.labels.description")}</h3>
                          <p>
                            {capitalize(
                              item.description[i18n?.resolvedLanguage]
                            )}
                          </p>
                          <Button
                            onClick={() =>
                              handleTokenStorage(
                                item.name,
                                item.initialization_url
                              )
                            }
                          >
                            <FiSave />
                            <span className="ml-1">
                              {t("wallet.section-1.cta-button-text")}
                            </span>
                          </Button>
                        </Disclosure.Panel>
                      </Fragment>
                    )}
                  </Disclosure>
                ))}
              </Fragment>
            ) : (
              <p>{t("wallet.alerts.no-available-platforms")}</p>
            )}
          </div>
          <div className="col-span-full md:col-span-1">
            <h2>{t("wallet.section-2.heading")}</h2>
            {Object.keys(savedPlatforms).length ? (
              <Fragment>
                {savedPlatforms.map((item) => (
                  <Disclosure key={item.name}>
                    {({ open }) => (
                      <Fragment>
                        <Disclosure.Button className="flex items-center justify-between w-full p-4 mb-4 text-left rounded-lg shadow-md">
                          <div className="flex flex-row items-center">
                            {item.logo ? (
                              <img
                                src={`${LOGO_HOST}${item.logo}`}
                                alt={`${item.name} logo`}
                                className="w-8 h-8 my-0 mr-4"
                              />
                            ) : (
                              <FiGrid
                                title={`${item.name} logo`}
                                className="w-8 h-8 my-0 mr-4"
                              />
                            )}
                            <h3 className="my-0 font-normal capitalize">
                              {item.name}
                            </h3>
                          </div>
                          <FiChevronDown
                            className={clsx(
                              "w-5 h-5 text-blue-800",
                              open && "transform rotate-180"
                            )}
                          />
                        </Disclosure.Button>
                        <Disclosure.Panel className="p-4 mb-4 border border-gray-100 rounded-lg shadow">
                          <h3 className="mt-0">{t("wallet.labels.description")}</h3>
                          <p>
                            {capitalize(
                              item.description[i18n?.resolvedLanguage]
                            )}
                          </p>
                          <Button
                            danger
                            onClick={() => {
                              setRevokeURL(item.initialization_url);
                              setOpenRevokeDialog(true);
                            }}
                          >
                            <FiTrash2 />
                            <span className="ml-1">
                              {t("wallet.section-2.cta-button-text")}
                            </span>
                          </Button>
                        </Disclosure.Panel>
                      </Fragment>
                    )}
                  </Disclosure>
                ))}
              </Fragment>
            ) : (
              <p>{t("wallet.alerts.no-saved-platforms")}</p>
            )}
          </div>
        </div>
        <Button
          outline
          className="w-full mt-8 md:hidden mobile-tutorial-button"
          onClick={() => setOnboarding(true)}
        >
          {t("labels.tutorial")}
        </Button>
        <LinkButton
          to="/dashboard/sync"
          className="mt-2 mb-8 md:hidden mobile-sync-button"
        >
          <IoMdSync size={22} />
          <span className="ml-1">{t("labels.sync")}</span>
        </LinkButton>
      </div>

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
            <div className="fixed inset-0 bg-black bg-opacity-25" />
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
                    placeholder={t("forms.password.placeholder")}
                    minLength="8"
                    onChange={(evt) => setPassword(evt.target.value)}
                    showStrength={false}
                  />

                  <div className="flex items-center justify-end mt-8 space-x-2">
                    <Button outline onClick={() => setOpenRevokeDialog(false)}>
                      {t("wallet.revoke-dialog.cancel-button-text")}
                    </Button>
                    <Button
                      danger
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

      <OnboardingTutorial start={onboarding} stopFunc={setOnboarding} />
    </PageAnimationWrapper>
  );
};

export default Wallet;
