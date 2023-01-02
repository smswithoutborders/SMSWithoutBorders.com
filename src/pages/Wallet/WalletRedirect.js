import React, {
  useEffect,
  useState,
  Fragment,
  useMemo,
  useCallback,
} from "react";
import { Loader } from "components";
import { useParams, useNavigate } from "react-router-dom";
import { Transition, Dialog } from "@headlessui/react";
import {
  useVerifyTokenStorageMutation,
  getLocalCache,
  clearLocalCache,
} from "services";
import { useTranslation } from "react-i18next";
import { useDeviceDetection } from "hooks";
import { PageAnimationWrapper, Button } from "components";
import GmailAuthScreen from "images/gmail-auth-screen.png";
import toast from "react-hot-toast";
import Error from "../Error";

// get the URL parameters which will include the auth token
const searchParams = new URLSearchParams(window.location.search);
const code = searchParams.get("code");
const scope = searchParams.get("scope");

const WalletRedirect = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { platform, protocol } = useParams();
  const [verifyTokenStorage, { isError, error }] =
    useVerifyTokenStorageMutation();
  const [open, setOpen] = useState(false);
  const isMobile = useDeviceDetection();

  /*
   * Cache auth in localStorage because twitter will use
   * in-app browser and sessionStorage is not accessible
   */
  const auth = useMemo(() => getLocalCache(), []);

  const handleVerification = useCallback(async () => {
    // build request data
    let data = {
      uid: auth.uid,
      code: code,
      scope: scope,
      platform: platform,
      protocol: protocol,
      code_verifier: auth.code_verifier,
    };

    try {
      await verifyTokenStorage(data).unwrap();
      toast.success(t("wallet.alerts.platform-stored"));

      // remove cache
      clearLocalCache();

      if (isMobile && platform === "twitter") {
        setOpen(true);
        return;
      }

      // node
      toast.success(t("alert-messages.redirect"));
      navigate("/dashboard/wallet", {
        replace: true,
        state: { uid: auth.uid },
      });

    } catch (error) {
      // handle all api errors in utils/middleware
    }
  }, [
    t,
    code,
    auth,
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
        <PageAnimationWrapper>
          <div className="max-w-screen-md min-h-screen p-8 mx-auto prose text-gray-900">
            <div className="mx-auto my-10">
              <h1 className="font-bold">
                {t("alert-messages.missing-permission")}
              </h1>
              <p>{t("error-messages.422")}</p>

              <h3>{t("wallet.labels.how-to-save")}</h3>
              <p>{t("wallet.info.gmail")}</p>
              <img src={GmailAuthScreen} alt="Gmail auth screen" />
              <Button onClick={() => navigate(-1)}>
                {t("labels.try-again")}
              </Button>
            </div>
          </div>
        </PageAnimationWrapper>
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
