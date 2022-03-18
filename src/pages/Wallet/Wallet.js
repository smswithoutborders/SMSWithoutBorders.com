import React, { useState, Fragment } from "react";
import clsx from "clsx";
import toast from "react-hot-toast";
import { IoMdSync } from "react-icons/io";
import { useSelector } from "react-redux";
import { authSelector } from "features";
import { useTranslation } from "react-i18next";
import { useNavigate, Link } from "react-router-dom";
import { FiSave, FiTrash2, FiChevronDown, FiGrid } from "react-icons/fi";
import { IoWalletOutline } from "react-icons/io5";
import { Disclosure, Dialog } from "@headlessui/react";
import {
  Loader,
  useTitle,
  Button,
  PageAnimationWrapper,
  PasswordInput,
} from "components";
import {
  useGetPlatformsQuery,
  useStoreTokenMutation,
  useTokenRevokeMutation,
} from "services";

const Wallet = () => {
  const { t } = useTranslation();
  useTitle(t("wallet.page-title"));

  // used for token revoke
  const [isOpen, setIsOpen] = useState(false);
  const [password, setPassword] = useState("");
  // save the platform to be revoked
  const [revokeURL, setRevokeURL] = useState("");
  const navigate = useNavigate();
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
  });
  const { unSavedPlatforms = [], savedPlatforms = [] } = data;

  // store token
  const [storeToken, { isLoading: loadingB, isSuccess: successB }] =
    useStoreTokenMutation();
  // token revoke
  const [tokenRevoke, { isLoading: loadingC }] = useTokenRevokeMutation();

  // where logos are stored
  const LOGO_HOST = process.env.REACT_APP_API_URL;

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
      const response = await storeToken(data).unwrap();
      //open authorization window
      window.open(response.url, "_self");
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
            setIsOpen(true);
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
  if (isLoading || isFetching || loadingB || successB || loadingC) {
    return <Loader />;
  }

  if (isError) {
    return (
      <div className="max-w-screen-xl p-8 mx-auto my-24 prose">
        <h2>{t("error-messages.general-error-title")}</h2>
        <p className="">{t("wallet.alerts.load-error")}</p>
        <Button onClick={() => refetch()}>{t("labels.try-again")}</Button>
      </div>
    );
  }

  return (
    <PageAnimationWrapper>
      <div className="max-w-screen-xl min-h-screen p-8 mx-auto my-10 prose text-gray-900">
        <div className="">
          <div className="flex justify-between mb-8 ">
            <h1 className="inline-flex items-center mb-0 text-4xl font-bold">
              <IoWalletOutline size={42} />
              <span className="ml-2">{t("wallet.heading")}</span>
            </h1>
            <Link
              to="/dashboard/sync"
              className="inline-flex items-center justify-center px-6 py-2 text-white no-underline bg-blue-800 rounded-lg outline-none focus:outline-none hover:bg-blue-900"
            >
              <IoMdSync size={22} />
              <span className="ml-1">{t("labels.sync")}</span>
            </Link>
          </div>
          <p className="my-0 text-lg">{t("wallet.details")}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:gap-8">
          <div className="col-span-full md:col-span-1">
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
                        <Disclosure.Panel className="p-4 mb-4 shadow">
                          <div className="items-center justify-between md:flex">
                            <div>
                              <h4> {t("wallet.labels.description")}</h4>
                              <p>{item.description}</p>
                            </div>
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
                          </div>
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
                        <Disclosure.Panel className="p-4 mb-4 shadow">
                          <div className="items-center justify-between md:flex">
                            <div>
                              <h4>{t("wallet.labels.description")}</h4>
                              <p>{item.description}</p>
                            </div>
                            <Button
                              className="bg-red-500 hover:bg-red-700"
                              onClick={() => {
                                setRevokeURL(item.initialization_url);
                                setIsOpen(true);
                              }}
                            >
                              <FiTrash2 />
                              <span className="ml-1">
                                {t("wallet.section-2.cta-button-text")}
                              </span>
                            </Button>
                          </div>
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
      </div>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="absolute inset-0 z-10 p-4 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

          <div className="relative max-w-xl p-6 mx-auto prose bg-white rounded-lg">
            <Dialog.Title>{t("wallet.revoke-dialog.heading")}</Dialog.Title>
            <Dialog.Description>
              {t("wallet.revoke-dialog.details")}
            </Dialog.Description>

            <PasswordInput
              placeholder={t("forms.password.placeholder")}
              minLength="8"
              onChange={(evt) => setPassword(evt.target.value)}
              showStrength={false}
            />

            <div className="flex items-center justify-end mt-8">
              <Button outline onClick={() => setIsOpen(false)}>
                {t("wallet.revoke-dialog.cancel-button-text")}
              </Button>
              <Button
                className="ml-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-300"
                disabled={password.length >= 8 ? false : true}
                onClick={() => {
                  handleTokenRevoke();
                  setIsOpen(false);
                }}
              >
                {t("wallet.revoke-dialog.cta-button-text")}
              </Button>
            </div>
          </div>
        </div>
      </Dialog>
    </PageAnimationWrapper>
  );
};

export default Wallet;
