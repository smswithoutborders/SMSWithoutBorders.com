import React, { useState } from "react";
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
} from "components";
import { useTitle } from "hooks";

const CodeVerification = () => {
  const { t } = useTranslation();
  useTitle(t("telegram.code-verification.page-title"));
  const navigate = useNavigate();
  const location = useLocation();
  const [code, setCode] = useState();
  const [verifyTokenStorage, { isLoading, isSuccess }] =
    useVerifyTokenStorageMutation();
  const auth = useSelector(authSelector);

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
          navigate("/dashboard/wallet/telegram/register", {
            state: { phone_number: location.state.phone_number },
          });
          break;
        default:
          // 200 success
          toast.success(t("wallet.alerts.platform-stored"));
          // navigate to wallet page
          navigate("/dashboard/wallet", { replace: true });
      }
    } catch (error) {
      // handle all api errors in utils/middleware
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
      <div className="max-w-screen-sm min-h-screen px-6 py-20 mx-auto prose text-center md:px-8">
        <h1 className="inline-flex items-center mb-4 font-bold">
          <BsShieldLock size={48} className="mr-2" />
          <span>{t("code-verification.heading")}</span>
        </h1>

        <div className="my-4">
          <p>{t("code-verification.paragraph-1")}</p>
          <details>
            <summary className="text-blue-800 cursor-pointer">
              {t("labels.learn-more")}
            </summary>
            <p>{t("code-verification.paragraph-2")}</p>
          </details>
        </div>

        <div className="max-w-md mx-auto mt-8">
          <form onSubmit={(evt) => handleCodeVerification(evt)}>
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
