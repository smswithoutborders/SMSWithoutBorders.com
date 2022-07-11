import React from "react";
import PropTypes from "prop-types";
import { Steps } from "intro.js-react";
import { useDeviceDetection } from "hooks";
import "styles/introjs-theme.css";
import { useTranslation } from "react-i18next";

const OnboardingTutorial = ({ start, stopFunc }) => {
  const { t } = useTranslation();
  const isMobile = useDeviceDetection();
  const steps = [
    {
      element: "onboarding",
      title: t("tutorials.onboarding.steps.1.title"),
      intro: (
        <div className="prose">
          <h3>{t("tutorials.onboarding.steps.1.heading")}</h3>
          <p>{t("tutorials.onboarding.steps.1.details")}</p>
        </div>
      ),
    },
    {
      element: ".onboarding-step-1",
      title: t("tutorials.onboarding.steps.2.heading"),
      intro: t("tutorials.onboarding.steps.2.details"),
    },
    {
      element: isMobile ? ".mobile-sync-button" : ".desktop-sync-button",
      title: t("tutorials.onboarding.steps.3.title"),
      intro: t("tutorials.onboarding.steps.3.details"),
    },
    {
      element: isMobile
        ? ".mobile-tutorial-button"
        : ".desktop-tutorial-button",
      title: t("tutorials.onboarding.steps.4.title"),
      intro: t("tutorials.onboarding.steps.4.details"),
    },
  ];

  return (
    <>
      <Steps
        enabled={start}
        steps={steps}
        initialStep={0}
        stepsEnabled={true}
        onExit={() => stopFunc(false)}
        options={{
          exitOnOverlayClick: false,
          disableInteraction: true,
          scrollToElement: true,
          showBullets: false,
          doneLabel: "Finish",
        }}
      />
    </>
  );
};

OnboardingTutorial.propTypes = {
  start: PropTypes.bool.isRequired,
  stopFunc: PropTypes.func.isRequired,
};

export default OnboardingTutorial;
