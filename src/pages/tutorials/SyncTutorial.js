import React, { useRef } from "react";
import { Steps } from "intro.js-react";
import { useSelector, useDispatch } from "react-redux";
import { syncTutorialSelector, updateSyncTutorial } from "features";
import { useTranslation } from "react-i18next";
import "styles/introjs-theme.css";

const SyncTutorial = () => {
  const { t } = useTranslation();
  const stepsRef = useRef(null);
  const dispatch = useDispatch();
  const tutorial = useSelector(syncTutorialSelector);

  function handleClose() {
    dispatch(
      updateSyncTutorial({
        enabled: false,
        showQR: false,
      })
    );
  }

  function handleChange(nextStepIndex) {
    if (nextStepIndex === 3) {
      dispatch(
        updateSyncTutorial({
          showQR: true,
        })
      );
      stepsRef.current.updateStepElement(nextStepIndex);
    } else if (nextStepIndex === 5) {
      dispatch(
        updateSyncTutorial({
          showQR: false,
        })
      );
      stepsRef.current.updateStepElement(nextStepIndex);
    }
  }

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
      element: ".tutorial-instructions",
      title: t("tutorials.sync.steps.2.title"),
      intro: t("tutorials.sync.steps.2.details"),
      position: "right",
    },
    {
      element: ".desktop-sync-button",
      title: t("tutorials.sync.steps.3.title"),
      intro: t("tutorials.sync.steps.3.details"),
    },
    {
      element: ".tutorial-qr",
      title: t("tutorials.sync.steps.4.title"),
      intro: t("tutorials.sync.steps.4.details"),
      position: "left",
    },
    {
      title: t("tutorials.sync.steps.5.title"),
      intro: t("tutorials.sync.steps.5.details"),
    },
    {
      element: ".desktop-tutorial-button",
      title: t("tutorials.sync.steps.6.title"),
      intro: t("tutorials.sync.steps.6.details"),
    },
  ];

  return (
    <Steps
      enabled={tutorial.enabled}
      steps={steps}
      initialStep={0}
      stepsEnabled={true}
      onExit={handleClose}
      onBeforeChange={handleChange}
      ref={stepsRef}
      options={{
        exitOnOverlayClick: false,
        disableInteraction: true,
        scrollToElement: true,
        showBullets: false,
        doneLabel: "Finish",
      }}
    />
  );
};

export default SyncTutorial;
