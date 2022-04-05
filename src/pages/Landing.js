import React from "react";
import phone from "images/phone.png";
import { PageAnimationWrapper } from "components";
import { DiOpensource } from "react-icons/di";
import { IoAccessibility } from "react-icons/io5";
import { GiCheckboxTree } from "react-icons/gi";
import { useTranslation } from "react-i18next";
import { FiDownload, FiShield } from "react-icons/fi";
import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";

const Landing = () => {
  const { t } = useTranslation();
  return (
    <PageAnimationWrapper>
      <div className="w-full overflow-hidden bg-gradient-to-br from-blue-800 to-blue-400 lg:py-10">
        <div className="container grid max-w-screen-xl grid-cols-2 gap-4 mx-auto prose text-white place-items-center lg:h-[640px]">
          <div className="p-8 pt-16 md:pl-16 col-span-full lg:col-span-1">
            <h1 className="text-white md:text-5xl">
              {t("landing.section-1.heading")}
            </h1>
            <p>{t("landing.section-1.details")}</p>
            <div className="flex flex-row justify-center max-w-md mt-12 space-x-2 lg:justify-start">
              <a
                className="inline-flex items-center justify-center flex-1 py-3 text-lg no-underline bg-white appearance-none group rounded-3xl"
                href={process.env.REACT_APP_TUTORIAL_URL}
                target="_blank"
                rel="noreferrer"
              >
                <span className="mr-2 group-hover:mr-4">
                  {t("labels.get-started")}
                </span>
                <BsArrowRight size={20} />
              </a>
              <Link
                className="inline-flex items-center justify-center flex-1 py-3 text-lg text-white no-underline border appearance-none group rounded-3xl"
                to="downloads"
              >
                <span className="mr-2 group-hover:mr-4">
                  {t("labels.download")}
                </span>
                <FiDownload size={20} />
              </Link>
            </div>
          </div>

          <div className="col-span-full lg:col-span-1">
            <img
              src={phone}
              className="h-[550px] w-[280px] mx-auto lg:-rotate-25 shadow-3xl lg:-mb-16"
              alt={t("landing.section-1.image-caption")}
            />
          </div>
        </div>
      </div>

      <div className="w-full">
        <div className="container grid max-w-screen-xl grid-cols-2 mx-auto mb-20 -mt-20 prose bg-white rounded-t-3xl">
          <div className="px-8 md:px-16 col-span-full">
            <h2 className="text-3xl font-black">
              {t("landing.section-2.heading")}
            </h2>
            <p>{t("landing.section-2.details")}</p>
            <p>{t("landing.section-2.paragraph-1")}</p>
            <p>{t("landing.section-2.paragraph-2")}</p>

            <div className="flex flex-col md:flex-row lg:space-x-4">
              <div className="flex-1 p-8 border border-gray-300 shadow-xl lg:py-12 rounded-2xl">
                <span className="font-light">Tutorial</span>
                <h3 className="my-4">
                  Learn how to setup your your account and app
                </h3>
                <a
                  className="flex items-center justify-between py-3 text-lg text-blue-800 no-underline appearance-none group"
                  href={process.env.REACT_APP_TUTORIAL_URL}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="mr-2 group-hover:mr-4">
                    {t("labels.get-started")}
                  </span>
                  <BsArrowRight size={20} />
                </a>
              </div>

              <div className="flex-1 p-8 border border-gray-300 shadow-xl lg:py-12 rounded-2xl">
                <span className="font-light">Tutorial</span>
                <h3 className="my-4">Learn how to setup gateway clients</h3>
                <a
                  className="flex items-center justify-between py-3 text-lg text-blue-800 no-underline appearance-none group"
                  href={process.env.REACT_APP_GATEWAY_TUTORIAL_URL}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="mr-2 group-hover:mr-4">
                    {t("labels.get-started")}
                  </span>
                  <BsArrowRight size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full py-10 bg-gray-100">
        <div className="container max-w-screen-xl p-8 mx-auto -mt-20 prose bg-gray-100 lg:py-16 rounded-t-3xl">
          <h2 className="text-3xl font-black text-center">
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
