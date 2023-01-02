import React, { useRef } from "react";
import PropTypes from "prop-types";
import { Steps } from "intro.js-react";
import { useDeviceDetection } from "hooks";
import { useTranslation } from "react-i18next";
import "styles/introjs-theme.css";

const SyncTutorial = ({ start, stopFunc }) => {
  const { t } = useTranslation();
  const stepsRef = useRef(null);
  const isMobile = useDeviceDetection();

  const options = {
    nextLabel: t("labels.next"),
    prevLabel: t("labels.back"),
    doneLabel: t("labels.finish"),
    exitOnOverlayClick: false,
    disableInteraction: true,
    scrollToElement: true,
    showBullets: false,
  };

  const steps = [
    {
      title: t("tutorials.sync.steps.1.title"),
      intro: (
        <div className="prose">
          <h3>{t("tutorials.sync.steps.1.heading")}</h3>
          <p>{t("tutorials.sync.steps.1.details")}</p>
        </div>
      ),
    },
    {
      element: ".sync-button",
      title: t("tutorials.sync.steps.2.title"),
      intro: t("tutorials.sync.steps.2.details"),
    },
    {
      element: isMobile ? ".open-app-button" : ".qr-code",
      title: isMobile ? t("tutorials.sync.steps.3-alt.title") : t("tutorials.sync.steps.3.title"),
      intro: isMobile ? t("tutorials.sync.steps.3-alt.details") : t("tutorials.sync.steps.3.details"),
    },
    {
      title: t("tutorials.sync.steps.4.title"),
      intro: t("tutorials.sync.steps.4.details"),
    },
    {
      element: ".tutorial-button",
      title: t("tutorials.sync.steps.5.title"),
      intro: t("tutorials.sync.steps.5.details"),
    },
  ];

  return (
    <Steps
      enabled={start}
      steps={steps}
      initialStep={0}
      stepsEnabled={true}
      onExit={() => stopFunc(false)}
      onComplete={() => stopFunc(false)}
      ref={stepsRef}
      options={options}
    />
  );
};

SyncTutorial.propTypes = {
  start: PropTypes.bool.isRequired,
  stopFunc: PropTypes.func.isRequired,
};

export default SyncTutorial;
