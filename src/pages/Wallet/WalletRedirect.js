import React, { useEffect } from "react";
import { Loader } from "components";
import { useSelector } from "react-redux";
import { authSelector } from "features";
import { useParams, useNavigate } from "react-router-dom";
import { useVerifyTokenStorageMutation } from "services";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

const WalletRedirect = () => {
  const { t } = useTranslation();
  const auth = useSelector(authSelector);
  const navigate = useNavigate();
  const { platform, protocol } = useParams();
  const [verifyTokenStorage] = useVerifyTokenStorageMutation();

  useEffect(() => {
    // get the URL parameters which will include the auth token
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");
    const oauth_token = searchParams.get("oauth_token");
    const oauth_verifier = searchParams.get("oauth_verifier");

    // build request data
    let data = {
      uid: auth.uid,
      code: code,
      platform: platform,
      protocol: protocol,
      oauth_token: oauth_token,
      oauth_verifier: oauth_verifier,
    };

    async function handleVerification() {
      try {
        await verifyTokenStorage(data).unwrap();
        toast.success(t("wallet.alerts.platform-stored"));
        navigate("/dashboard/wallet", { replace: true });
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

    if (code) {
      handleVerification();
    } else if (oauth_token && oauth_verifier) {
      handleVerification();
    } else {
      navigate("/dashboard/wallet");
    }
  }, [auth.uid, platform, protocol, navigate, verifyTokenStorage, t]);

  return <Loader />;
};
export default WalletRedirect;
