import React from "react";
import { PageAnimationWrapper } from "components";
import { Link } from "react-router-dom";
import PlayStoreLogo from "images/playstore.svg";
import Wallet from "images/wallet-mobile.png";
import AppPlayStore from "images/app-playstore.jpg";
import AppHome from "images/app-home.jpg";
import AppSync from "images/app-sync.jpg";
import WalletSync from "images/wallet-sync.jpg";
import AppSyncButton from "images/sync-button.jpg";
import { useTranslation } from "react-i18next";

const Downloads = () => {
  // use keyPrefix to avoid typing beta-testing everywhere
  // https://react.i18next.com/latest/usetranslation-hook
  const { t } = useTranslation("translation", { keyPrefix: "beta-testing" });
  return (
    <PageAnimationWrapper>
      <div className="max-w-screen-xl px-8 pt-20 pb-24 mx-auto prose prose-invert md:px-16">
        <h1 className="md:text-5xl">{t("heading")}</h1>
        <p className="">{t("details")}</p>
      </div>

      <div className="w-full min-h-screen pt-8 bg-white">
        <div className="max-w-screen-xl p-6 mx-4 -mt-16 prose bg-white md:mx-auto rounded-3xl md:p-12">
          <h2>1&#41; {t("steps.1.heading")}</h2>
          <p>
            {t("steps.1.details.part-1")} &nbsp;
            <Link className="text-blue-800" to="/sign-up" target="_blank">
              {t("steps.1.details.link-text")}
            </Link>
            &nbsp; {t("steps.1.details.part-2")}
          </p>
          <h2>2&#41; {t("steps.2.heading")}</h2>
          <p>
            {t("steps.2.details.part-1")} &nbsp;
            <Link className="text-blue-800" to="/login" target="_blank">
              {t("steps.2.details.link-text")}
            </Link>
            &nbsp;
          </p>
          <h2>3&#41; {t("steps.3.heading")}</h2>
          <p>{t("steps.3.details.part-1")}</p>
          <p>
            <span className="p-3 font-bold text-white bg-blue-800">
              {t("steps.3.details.caption")}
            </span>{" "}
            {t("steps.3.details.part-2")}
          </p>
          <img src={Wallet} alt="wallet page" />
          <h2>4&#41; {t("steps.4.heading")}</h2>
          <p>{t("steps.4.details.part-1")}</p>
          <a
            className="inline-flex items-center justify-center px-8 py-3 text-white no-underline bg-black appearance-none rounded-3xl"
            href="https://play.google.com/store/apps/details?id=com.afkanerd.sw0b"
            target="_blank"
            rel="noreferrer"
          >
            <img src={PlayStoreLogo} alt="playstore" className="m-0 w-9" />
            <span>Google Play</span>
          </a>
          <p> {t("steps.4.details.part-2")}</p>
          <img src={AppPlayStore} alt="google play store" />
          <p>{t("steps.4.details.part-3")}</p>
          <img src={AppHome} alt="app home page" />
          <h2>5&#41; {t("steps.5.heading")}</h2>
          <p>{t("steps.5.details.part-1")}</p>
          <img src={AppSync} alt="app home page" />
          <img src={WalletSync} alt="app home page" />
          <p>{t("steps.5.details.part-2")}</p>
          <img src={AppSyncButton} alt="app home page" />
          <p>{t("steps.5.details.part-3")}</p>

          <h2>6&#41; {t("steps.6.heading")}</h2>
          <p>{t("steps.6.details")}</p>

          <h2>7&#41; {t("steps.7.heading")}</h2>
          <p>{t("steps.7.details.part-1")}</p>
          <p>
            <span>{t("steps.7.details.part-2")} </span>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSffQxtaWNAPOoN-XAdEorCDVchFRsINGTTrYc9Pboa3jC67ZA/viewform"
              target="_blank"
              rel="noreferrer"
              className="text-blue-800"
            >
              {t("steps.7.details.link-text")}
            </a>
            <span> {t("steps.7.details.part-3")}</span>
          </p>
        </div>
      </div>
    </PageAnimationWrapper>
  );
};

export default Downloads;
