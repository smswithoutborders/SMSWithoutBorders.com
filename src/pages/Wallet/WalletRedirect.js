import React, {
  useEffect,
  useState,
  Fragment,
  useMemo,
  useCallback,
} from "react";
import { Loader } from "components";
import { useSelector } from "react-redux";
import { authSelector } from "features";
import { useParams, useNavigate } from "react-router-dom";
import { Transition, Dialog } from "@headlessui/react";
import {
  useVerifyTokenStorageMutation,
  getLocalCache,
  clearLocalCache,
} from "services";
import { useTranslation } from "react-i18next";
import { useDeviceDetection } from "hooks";
import toast from "react-hot-toast";
import Error from "../Error";

const WalletRedirect = () => {
  const { t } = useTranslation();
  const auth = useSelector(authSelector);
  const navigate = useNavigate();
  const { platform, protocol } = useParams();
  const [verifyTokenStorage, { isError, error }] =
    useVerifyTokenStorageMutation();
  const [open, setOpen] = useState(false);
  const isMobile = useDeviceDetection();
  // get the URL parameters which will include the auth token
  const searchParams = new URLSearchParams(window.location.search);
  const code = searchParams.get("code");
  const scope = searchParams.get("scope");

  const cAuth = useMemo(() => getLocalCache(), []);

  const handleVerification = useCallback(async () => {
    // build request data
    let data = {
      uid: cAuth ? cAuth.uid : auth.uid,
      code: code,
      scope: scope,
      platform: platform,
      protocol: protocol,
      code_verifier: cAuth ? cAuth.code_verifier : auth.code_verifier,
    };

    try {
      await verifyTokenStorage(data).unwrap();
      toast.success(t("wallet.alerts.platform-stored"));

      if (platform !== "twitter") {
        navigate("/dashboard/wallet", {
          replace: true,
          state: { uid: cAuth ? cAuth.uid : auth.uid },
        });
      } else if (isMobile && platform === "twitter") {
        setOpen(true);
        clearLocalCache();
        window.close();
      } else {
        toast.success(t("alert-messages.redirect"));
        clearLocalCache();
        window.close();
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
          case 422:
            toast.error(t("error-messages.422"));
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
  }, [
    t,
    code,
    auth,
    cAuth,
    scope,
    isMobile,
    platform,
    protocol,
    navigate,
    verifyTokenStorage,
  ]);

  useEffect(() => {
    if (code) {
      handleVerification();
    } else {
      navigate("/dashboard/wallet");
    }
  }, [handleVerification, navigate, code]);

  // handle error messages and retries
  if (isError) {
    if (error?.originalStatus === 422) {
      return (
        <Error
          message={t("error-messages.422")}
          callBack={() => navigate(-1)}
        />
      );
    } else {
      return <Error callBack={handleVerification} />;
    }
  }

  return (
    <Fragment>
      {!open ? (
        <Loader />
      ) : (
        <Transition appear show={open} as={Fragment}>
          <Dialog
            as="div"
            static
            className="relative z-10"
            onClose={() => null}
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
                      {t("wallet.alerts.platform-stored")}
                    </Dialog.Title>
                    <Dialog.Description>
                      {t("alert-messages.close")}
                    </Dialog.Description>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      )}
    </Fragment>
  );
};
export default WalletRedirect;
