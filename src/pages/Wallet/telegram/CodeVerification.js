import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { BsShieldLock } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useVerifyTokenStorageMutation } from "services";
import { authSelector } from "features";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import {
  PageAnimationWrapper,
  Loader,
  Button,
  Input,
  FormGroup,
  useTitle,
} from "components";

const CodeVerification = () => {
  const { t } = useTranslation();
  useTitle(t("telegram.code-verification.page-title"));
  const navigate = useNavigate();
  const location = useLocation();
  const [code, setCode] = useState();
  const [verifyTokenStorage, { isLoading, isSuccess }] =
    useVerifyTokenStorageMutation();
  const auth = useSelector(authSelector);

  // check if phone number is present
  useEffect(() => {
    if (!location.state?.phone_number) {
      navigate("../");
    }
  }, [location.state, navigate]);

  async function handleCodeVerification(evt) {
    // prevent default form action
    evt.preventDefault();

    // build request data
    let data = {
      uid: auth.uid,
      code: code,
      platform: "telegram",
      protocol: "twofactor",
      oauth_token: "",
      oauth_verifier: "",
      phone_number: location.state.phone_number,
    };

    try {
      const response = await verifyTokenStorage(data).unwrap();
      switch (response.body.code) {
        case 202:
          toast.success(t("telegram.code-verification.alerts.no-account"));
          // send user to telegram registration
          navigate("../../register", {
            state: { phone_number: location.state.phone_number },
          });
          break;
        default:
          // 200 success
          toast.success(t("wallet.alerts.platform-stored"));
          // navigate to wallet page
          navigate("../../", { replace: true });
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
            toast.error(t("error-messages.invalid-code"));
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
  if (isLoading || isSuccess) {
    return <Loader />;
  }

  return (
    <PageAnimationWrapper>
      <div className="max-w-screen-sm min-h-screen px-6 py-20 mx-auto text-center md:px-8">
        <h1 className="inline-flex items-center mb-4 text-4xl font-bold">
          <BsShieldLock size={48} className="mr-2" />
          <span>{t("code-verification.heading")}</span>
        </h1>

        <div className="my-4 prose text-justify">
          <p>{t("code-verification.paragraph-1")}</p>
          <p>{t("code-verification.paragraph-2")}</p>
        </div>

        <div className="max-w-md mx-auto mt-12">
          <form
            className="px-4 mx-auto sm:px-3"
            onSubmit={(evt) => handleCodeVerification(evt)}
          >
            <FormGroup>
              <Input
                type="number"
                name="code"
                min={0}
                required
                placeholder={t("code-verification.form.code.placeholder")}
                onChange={(evt) => setCode(evt.target.value)}
              />
            </FormGroup>
            <Button className="mx-auto" type="submit">
              {t("labels.continue")}
            </Button>
          </form>
        </div>
      </div>
    </PageAnimationWrapper>
  );
};

export default CodeVerification;
