import React from "react";
import { PageAnimationWrapper, Button } from "components";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useTitle } from "hooks";

// 404 page, uses react-router to move the user back 1 step
const NotFound = () => {
  const { t } = useTranslation();
  useTitle(t("404-page.page-title"));
  const navigate = useNavigate();
  return (
    <PageAnimationWrapper>
      <div className="container grid h-screen px-5 py-12 mx-auto text-center text-gray-900 place-items-center lg:px-16 lg:py-24 lg:mb-36">
        <div className="p-8">
          <h1 className="mb-8 font-black tracking-wider text-8xl">
            4<span className="text-blue-800">0</span>4
          </h1>
          <p className="mb-8 text-base leading-relaxed md:text-lg">
            {t("404-page.error-message")}
          </p>
          <Button className="mx-auto" onClick={() => navigate(-1)}>
            {t("labels.back")}
          </Button>
        </div>
      </div>
    </PageAnimationWrapper>
  );
};

export default NotFound;
