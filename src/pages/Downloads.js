import React from "react";
import { PageAnimationWrapper } from "components";
import { useTranslation } from "react-i18next";
import { FaGithub } from "react-icons/fa6";
import PlayStoreLogo from "images/playstore.svg";
import { FiDownload } from "react-icons/fi";

const Downloads = () => {
  const { t } = useTranslation();
  return (
    <PageAnimationWrapper>
      <div className="max-w-screen-xl px-8 pt-20 pb-24 mx-auto prose prose-invert md:px-16">
        <h1 className="md:text-5xl">{t("downloads.heading")}</h1>
        <p className="">{t("downloads.details")}</p>
      </div>

      <div className="w-full max-h-screen pt-8 bg-white">
        <div className="max-w-screen-xl p-6 mx-4 -mt-16 prose bg-white md:mx-auto rounded-3xl md:p-12">
          <h2>{t("downloads.section-1.heading")}</h2>
          <p>{t("downloads.section-1.details")}</p>

          <div className="flex max-w-md gap-2">
            <a
              className="inline-flex items-center px-8 py-3 text-white no-underline bg-black appearance-none gap-2 justify-center rounded-3xl"
              href="https://play.google.com/store/apps/details?id=com.afkanerd.sw0b"
              target="_blank"
              rel="noreferrer"
            >
              <img src={PlayStoreLogo} alt="playstore" className="m-0 w-9" />
              <span>Google Play</span>
            </a>
            <a
              className="inline-flex items-center justify-center gap-2 px-8 py-3 text-white no-underline bg-black appearance-none rounded-3xl"
              href="https://github.com/smswithoutborders/SMSwithoutBorders-Android/releases"
              target="_blank"
              rel="noreferrer"
            >
              <FaGithub size={20} />
              <span>{t("labels.download")}</span>
            </a>
          </div>

          <h2>{t("downloads.section-2.heading")}</h2>
          <p>{t("downloads.section-2.details")}</p>

          <a
            download
            className="flex items-center space-x-2 text-blue-800"
            href="https://smswithoutborders.com/images/downloads/swobgc-ubuntu-22.04.1-preinstalled-server-arm64+raspi.img.xz"
          >
            <FiDownload className="w-20 h-20 md:h-8 md:w-8" />
            <span>swobgc-ubuntu-22.04.1-preinstalled-server-arm64+raspi</span>
          </a>
        </div>
      </div>
    </PageAnimationWrapper>
  );
};

export default Downloads;
