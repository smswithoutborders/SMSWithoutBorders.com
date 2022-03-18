import React from "react";
import phone from "images/phone.png";
import swobflow from "images/swobflow.gif";
import { PageAnimationWrapper } from "components";
import { DiOpensource } from "react-icons/di";
import { IoAccessibility, IoLogoGooglePlaystore } from "react-icons/io5";
import { GiCheckboxTree } from "react-icons/gi";
import { GoMarkGithub } from "react-icons/go";
import { useTranslation } from "react-i18next";
import {
  FiUserPlus,
  FiLogIn,
  FiDownload,
  FiShield,
  FiSave,
} from "react-icons/fi";

const Landing = () => {
  const { t } = useTranslation();
  return (
    <PageAnimationWrapper>
      <div className="w-full bg-primary-200 lg:py-10">
        <div className="container grid max-w-screen-xl grid-cols-2 mx-auto prose place-items-center">
          <div className="col-span-full lg:col-span-1">
            <img
              src={phone}
              className="h-[550px] w-[280px] mx-auto lg:-rotate-25"
              alt={t("landing.section-1.image-caption")}
            />
          </div>
          <div className="order-first p-8 col-span-full lg:col-span-1 lg:order-last">
            <h1>{t("landing.section-1.heading")}</h1>
            <p>{t("landing.section-1.details")}</p>
            <div className="flex flex-row justify-center w-full mt-4 lg:justify-start">
              <a
                className="inline-flex items-center justify-center px-4 py-2 mb-4 mr-2 font-bold no-underline bg-white rounded-lg appearance-none md:mr-4 hover:shadow-xl"
                href="https://play.google.com/store/apps/details?id=com.afkanerd.sw0b"
                target="_blank"
                rel="noreferrer"
              >
                <IoLogoGooglePlaystore size={28} />
                <div className="ml-2">
                  <small className="my-0 text-xs font-light md:text-base">
                    {t("landing.section-1.cta-button-text")}
                  </small>
                  <p className="my-0">Play Store</p>
                </div>
              </a>
              <a
                className="inline-flex items-center justify-center px-4 py-2 mb-4 font-bold no-underline bg-white rounded-lg appearance-none md:mr-4 hover:shadow-xl"
                href="https://github.com/smswithoutborders/SMSwithoutBorders-Android/releases"
                target="_blank"
                rel="noreferrer"
              >
                <GoMarkGithub size={28} />
                <div className="ml-2">
                  <small className="my-0 text-xs font-light md:text-base">
                    {t("landing.section-1.cta-button-text")}
                  </small>
                  <p className="my-0">GitHub</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-white">
        <div className="container grid max-w-screen-xl grid-cols-2 mx-auto prose place-items-center">
          <div className="px-8 text-center col-span-full">
            <h2 className="text-4xl font-black">
              {t("landing.section-2.heading")}
            </h2>
            <p className="">{t("landing.section-2.details")}</p>
          </div>
          <div className="p-8 col-span-full lg:col-span-1">
            <div className="flex items-center ml-auto">
              <div className="p-8 mr-4 text-blue-800 bg-white rounded-full shadow-xl">
                <FiUserPlus className="w-7 h-7 lg:w-10 lg:h-10" />
              </div>
              <div className="">
                <h3> {t("landing.section-2.steps.1.heading")}</h3>
                <p>{t("landing.section-2.steps.1.details")}</p>
              </div>
            </div>
            <div className="flex items-center ml-auto">
              <div className="p-8 mr-4 text-blue-800 bg-white rounded-full shadow-xl">
                <FiSave className="w-7 h-7 lg:w-10 lg:h-10" />
              </div>
              <div className="">
                <h3> {t("landing.section-2.steps.2.heading")}</h3>
                <p>{t("landing.section-2.steps.2.details")}</p>
              </div>
            </div>
            <div className="flex items-center ml-auto">
              <div className="p-8 mr-4 text-blue-800 bg-white rounded-full shadow-xl">
                <FiDownload className="w-7 h-7 lg:w-10 lg:h-10" />
              </div>
              <div className="">
                <h3> {t("landing.section-2.steps.3.heading")}</h3>
                <p>{t("landing.section-2.steps.3.details")}</p>
              </div>
            </div>
            <div className="flex items-center ml-auto">
              <div className="p-8 mr-4 text-blue-800 bg-white rounded-full shadow-xl">
                <FiLogIn className="w-7 h-7 lg:w-10 lg:h-10" />
              </div>
              <div className="">
                <h3> {t("landing.section-2.steps.4.heading")}</h3>
                <p>{t("landing.section-2.steps.4.details")}</p>
              </div>
            </div>
          </div>
          <div className="col-span-full lg:col-span-1">
            <img
              src={swobflow}
              className="h-[550px] w-[280px] mx-auto"
              alt={t("landing.section-2.image-caption")}
            />
          </div>
        </div>
      </div>

      <div className="w-full py-10 bg-gray-100">
        <div className="container max-w-screen-xl p-8 mx-auto prose">
          <h2 className="text-4xl font-black text-center">
            {t("landing.section-3.heading")}
          </h2>
          <div>
            <div className="flex items-center justify-between">
              <div className="p-8 mr-4 text-blue-800 bg-white rounded-full shadow-xl sm:mr-10">
                <IoAccessibility className="w-7 h-7 lg:w-10 lg:h-10" />
              </div>
              <div className="">
                <h3> {t("landing.section-3.steps.1.heading")}</h3>
                <p>{t("landing.section-3.steps.1.details")}</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="">
                <h3> {t("landing.section-3.steps.2.heading")}</h3>
                <p>{t("landing.section-3.steps.2.details")}</p>
              </div>
              <div className="order-first p-8 mr-4 text-blue-800 bg-white rounded-full shadow-xl sm:ml-10 sm:order-none">
                <FiShield className="w-7 h-7 lg:w-10 lg:h-10" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="p-8 mr-4 text-blue-800 bg-white rounded-full shadow-xl sm:mr-10">
                <DiOpensource className="w-7 h-7 lg:w-12 lg:h-12" />
              </div>
              <div className="">
                <h3> {t("landing.section-3.steps.3.heading")}</h3>
                <p>{t("landing.section-3.steps.3.details")}</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="">
                <h3> {t("landing.section-3.steps.4.heading")}</h3>
                <p>{t("landing.section-3.steps.4.details")}</p>
              </div>
              <div className="order-first p-8 mr-4 text-blue-800 bg-white rounded-full shadow-xl sm:ml-10 sm:order-none">
                <GiCheckboxTree className="w-7 h-7 lg:w-10 lg:h-10" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageAnimationWrapper>
  );
};

export default Landing;
