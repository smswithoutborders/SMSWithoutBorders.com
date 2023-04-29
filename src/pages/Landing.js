import React from "react";
import phone3 from "images/phone3.png";
import afkanerdlogo from "images/afkanerdlogo.png";
import internews from "images/Internews.png";
import OpenTF from "images/OTF.png";
import signupIllustration from "images/signup-illustration.svg";
import accountsIllustration from "images/accounts.svg";
import mobileIllustration from "images/mobile-app.svg";
//import gatewayIllustration from "images/gateways.svg";
import { PageAnimationWrapper } from "components";
import { DiOpensource } from "react-icons/di";
import { IoAccessibility } from "react-icons/io5";
import { GiCheckboxTree } from "react-icons/gi";
import { useTranslation } from "react-i18next";
import { FiDownload, FiShield } from "react-icons/fi";
import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2";

const Landing = () => {
  const { t } = useTranslation();
  return (
    <PageAnimationWrapper>
      {/* Hero */}
      <div className="container grid max-w-screen-xl grid-cols-2  mx-auto prose text-white place-items-center lg:h-[640px]">
        <div className="p-8 pt-16 md:pl-16 col-span-full lg:col-span-1">
          <h1 className="text-5xl text-white">
            {t("landing.section-1.heading")}
          </h1>
          <p>{t("landing.section-1.details")}</p>
          <div className="flex flex-col max-w-md gap-4 mt-12 md:flex-row">
            <a
              className="flex items-center justify-center flex-1 gap-2 px-8 py-3 text-lg no-underline bg-white rounded-lg appearance-none group"
              href="#how-it-works"
              rel="noreferrer"
            >
              <span className="">{t("labels.learn-more")}</span>
              <BsArrowRight size={20} className="group-hover:rotate-90" />
            </a>
            <Link
              className="flex items-center justify-center flex-1 gap-2 px-8 py-3 text-lg text-white no-underline border rounded-lg appearance-none group"
              to="downloads"
            >
              <span className="group-hover:mr-4">{t("labels.download")}</span>
              <FiDownload size={20} />
            </Link>
          </div>
        </div>

        <div className="col-span-full lg:col-span-1">
          <img
            src={phone3}
            className="h-[580px] w-[470px] mx-auto lg:-rotate-25 shadow-3xl lg:-mb-16"
            alt={t("landing.section-1.image-caption")}
          />
        </div>
      </div>
      {/* How it works  */}
      <div className="bg-white">
        <div
          id="how-it-works"
          className="max-w-screen-xl mx-auto prose bg-white scroll-mt-8"
        >
          <div className="p-8 md:px-16 col-span-full">
            <h2 className="text-3xl font-black">
              {t("landing.section-2.heading")}
            </h2>
            <p>{t("landing.section-2.details")}</p>
            <p>{t("landing.section-2.paragraph-1")}</p>
            <p>{t("landing.section-2.paragraph-2")}</p>
          </div>
        </div>

        {/* Getting started  */}
        <div
          id="get-started"
          className="max-w-screen-xl mx-auto prose bg-white"
        >
          <div className="p-8 md:px-16 col-span-full">
            <h2 className="text-3xl font-black text-center">
              {t("landing.section-3.heading")}
            </h2>
            <div className="grid grid-cols-2 place-items-center">
              <div className="order-1 col-span-full md:col-span-1">
                <img
                  src={signupIllustration}
                  className="mx-auto"
                  alt={t("landing.section-1.image-caption")}
                />
              </div>
              <div className="order-2 col-span-full md:col-span-1">
                <h3 className="text-2xl">
                  {t("landing.section-3.steps.1.heading")}
                </h3>
                <p>{t("landing.section-3.steps.1.details")}</p>
                <Link
                  className="inline-flex items-center justify-center flex-1 gap-2 px-8 py-3 text-lg text-blue-800 no-underline border border-blue-800 rounded-lg appearance-none group"
                  to="/sign-up"
                >
                  <span className="group-hover:mr-4">{t("menu.signup")}</span>
                  <BsArrowRight size={20} />
                </Link>
              </div>
              <div className="order-4 md:order-3 col-span-full md:col-span-1">
                <h3 className="text-2xl">
                  {t("landing.section-3.steps.2.heading")}
                </h3>
                <p>{t("landing.section-3.steps.2.details")}</p>
                <Link
                  className="inline-flex items-center justify-center flex-1 gap-2 px-8 py-3 text-lg text-blue-800 no-underline border border-blue-800 rounded-lg appearance-none group"
                  to="/privacy-policy"
                >
                  <span className="group-hover:mr-4">
                    {t("labels.learn-more")}
                  </span>
                  <BsArrowRight size={20} />
                </Link>
              </div>
              <div className="order-3 md:order-4 col-span-full md:col-span-1">
                <img
                  src={accountsIllustration}
                  className="mx-auto"
                  alt={t("landing.section-1.image-caption")}
                />
              </div>
              <div className="order-5 col-span-full md:col-span-1">
                <img
                  src={mobileIllustration}
                  className="mx-auto"
                  alt={t("landing.section-1.image-caption")}
                />
              </div>
              <div className="order-6 col-span-full md:col-span-1">
                <h3 className="text-2xl">
                  {t("landing.section-3.steps.3.heading")}
                </h3>
                <p>{t("landing.section-3.steps.3.details")}</p>
                <Link
                  className="inline-flex items-center justify-center flex-1 gap-2 px-8 py-3 text-lg text-blue-800 no-underline border border-blue-800 rounded-lg appearance-none group"
                  to="/downloads"
                >
                  <span className="group-hover:mr-4">
                    {t("labels.download")}
                  </span>
                  <FiDownload size={20} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Why use SWOB */}
      <div className="w-full py-10 bg-white">
        <div className="max-w-screen-xl p-8 mx-auto prose bg-white md:p-16">
          <h2 className="text-3xl font-black text-center">
            {t("landing.section-4.heading")}
          </h2>
          <div>
            <div className="flex items-center justify-between gap-8">
              <div className="p-8 text-blue-800 bg-white border rounded-full shadow-xl">
                <IoAccessibility className="w-7 h-7 lg:w-10 lg:h-10" />
              </div>
              <div className="">
                <h3> {t("landing.section-4.steps.1.heading")}</h3>
                <p>{t("landing.section-4.steps.1.details")}</p>
              </div>
            </div>
            <div className="flex items-center justify-between gap-8">
              <div className="">
                <h3> {t("landing.section-4.steps.2.heading")}</h3>
                <p>{t("landing.section-4.steps.2.details")}</p>
              </div>
              <div className="order-first p-8 text-blue-800 bg-white border rounded-full shadow-xl sm:order-none">
                <FiShield className="w-7 h-7 lg:w-10 lg:h-10" />
              </div>
            </div>
            <div className="flex items-center justify-between gap-8">
              <div className="p-8 text-blue-800 bg-white border rounded-full shadow-xl">
                <DiOpensource className="w-7 h-7 lg:w-12 lg:h-12" />
              </div>
              <div className="">
                <h3> {t("landing.section-4.steps.3.heading")}</h3>
                <p>{t("landing.section-4.steps.3.details")}</p>
              </div>
            </div>
            <div className="flex items-center justify-between gap-8">
              <div className="">
                <h3> {t("landing.section-4.steps.4.heading")}</h3>
                <p>{t("landing.section-4.steps.4.details")}</p>
              </div>
              <div className="order-first p-8 text-blue-800 bg-white border rounded-full shadow-xl sm:order-none">
                <GiCheckboxTree className="w-7 h-7 lg:w-10 lg:h-10" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Partners */}
      <div className="w-full pb-5  bg-white items-center">
        <div className="max-w-screen-xl  mx-auto prose bg-white md:p-5">
          <h2 className="text-3xl font-black text-center">
            {t("partners.heading")}
          </h2>

          <Grid container justifyContent="center">
            <Grid xs={12} md={4} p={5}>
              <img src={internews} className="h-[130px] w-[450px] p-5" />
            </Grid>
            <Grid xs={12} md={4} p={5}>
              <img src={afkanerdlogo} className="h-[120px] w-[450px] p-5" />
            </Grid>
            <Grid xs={12} md={4} p={5}>
              <img src={OpenTF} className="h-[130px] w-[450px] p-5" />
            </Grid>
          </Grid>
        </div>
      </div>
    </PageAnimationWrapper>
  );
};

export default Landing;
