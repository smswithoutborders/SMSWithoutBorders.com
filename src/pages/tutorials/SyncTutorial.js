import React, { useRef } from "react";
import { Steps } from "intro.js-react";
import { useDeviceDetection } from "hooks";
import { useSelector, useDispatch } from "react-redux";
import { syncTutorialSelector, updateSyncTutorial } from "features";
import "styles/introjs-theme.css";

const SyncTutorial = () => {
  const stepsRef = useRef(null);
  const isMobile = useDeviceDetection();
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
      title: "Tutorial",
      intro: (
        <div className="prose">
          <h3>Learn how to Synchronize with app</h3>
          <p>This tutorial will help you get started</p>
        </div>
      ),
    },
    {
      title: "Instructions",
      element: ".tutorial-instructions",
      intro: "Please read through these instructions to understand better",
      position: isMobile ? "top" : "right",
    },
    {
      title: "Get started",
      element: isMobile ? ".mobile-sync-button" : ".desktop-sync-button",
      intro: "Click the sync button to begin the process",
    },
    {
      title: "Scan QR code",
      element: ".tutorial-qr",
      intro: "Use the app scanner to scan the generated QR code",
      position: isMobile ? "bottom" : "left",
    },
    {
      title: "Enter password",
      intro:
        "Enter your password on the app screen to complete synchronization",
    },
    {
      title: "Get Help",
      element: isMobile
        ? ".mobile-tutorial-button"
        : ".desktop-tutorial-button",
      intro: "You can view this tutorial again by clicking here",
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
