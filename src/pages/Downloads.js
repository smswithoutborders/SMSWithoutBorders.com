import React from "react";
import { PageAnimationWrapper } from "components";
import { useTranslation } from "react-i18next";
import { GoMarkGithub } from "react-icons/go";
import PlayStoreLogo from "images/playstore.svg";
import { FiDisc } from "react-icons/fi";

const Downloads = () => {
  const { t } = useTranslation();
  return (
    <PageAnimationWrapper>
      <div className="min-h-screen">
        <div className="max-w-full px-8 pt-20 pb-24 mx-auto prose prose-invert md:px-16 bg-gradient-to-br from-blue-800 to-blue-400 ">
          <h1 className="md:text-5xl">{t("downloads.heading")}</h1>
          <p className="">{t("downloads.details")}</p>
        </div>

        <div className="max-w-screen-xl p-6 mx-4 -mt-16 prose bg-white md:mx-12 rounded-3xl md:p-12">
          <h2>{t("downloads.section-1.heading")}</h2>
          <p>{t("downloads.section-1.details")}</p>

          <div className="max-w-md space-y-2 md:space-x-2">
            <a
              className="inline-flex items-center justify-center px-8 py-3 text-white no-underline bg-black appearance-none rounded-3xl"
              href="https://play.google.com/store/apps/details?id=com.afkanerd.sw0b"
              target="_blank"
              rel="noreferrer"
            >
              <img src={PlayStoreLogo} alt="playstore" className="m-0 w-9" />
              <span>Google Play</span>
            </a>
            <a
              className="inline-flex items-center justify-center px-8 py-3 text-white no-underline bg-black appearance-none rounded-3xl"
              href="https://github.com/smswithoutborders/SMSwithoutBorders-Android/releases"
              target="_blank"
              rel="noreferrer"
            >
              <GoMarkGithub size={20} />
              <span className="ml-2">{t("labels.download")}</span>
            </a>
          </div>

          <h2>{t("downloads.section-2.heading")}</h2>
          <p>{t("downloads.section-2.details")}</p>

          <a
            className="flex flex-row items-center max-w-md my-2 text-blue-800"
            download
            href="https://releases.ubuntu.com/20.04.4/ubuntu-20.04.4-desktop-amd64.iso"
          >
            <FiDisc size={24} />
            <span className="ml-2">ubuntu-20.04.4-desktop-amd64.iso</span>
          </a>

          <a
            className="flex flex-row items-center max-w-md my-2 text-blue-800"
            download
            href="https://releases.ubuntu.com/20.04.4/ubuntu-20.04.4-desktop-amd64.iso"
          >
            <FiDisc size={24} />
            <span className="ml-2">ubuntu-20.04.4-desktop-amd64.iso</span>
          </a>
        </div>
      </div>
    </PageAnimationWrapper>
  );
};

export default Downloads;
