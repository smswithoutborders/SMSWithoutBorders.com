import React, { useRef } from "react";
import { Steps } from "intro.js-react";
import { useSelector, useDispatch } from "react-redux";
import { syncTutorialSelector, updateSyncTutorial } from "features";
import "styles/introjs-theme.css";

const MobileSyncTutorial = () => {
  const stepsRef = useRef(null);
  const dispatch = useDispatch();
  const tutorial = useSelector(syncTutorialSelector);

  function handleClose() {
    dispatch(
      updateSyncTutorial({
        enabled: false,
        showButton: false,
      })
    );
  }

  function handleChange(nextStepIndex) {
    if (nextStepIndex === 2) {
      dispatch(
        updateSyncTutorial({
          showButton: true,
        })
      );
      stepsRef.current.updateStepElement(nextStepIndex);
    } else if (nextStepIndex === 4) {
      dispatch(
        updateSyncTutorial({
          showButton: false,
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
      title: "Get started",
      element: ".mobile-sync-button",
      intro: "Click the sync button to begin the process",
    },
    {
      title: "Open App",
      element: ".open-app-button",
      intro: "click on the button to open the app",
      position: "bottom",
    },
    {
      title: "Enter password",
      intro:
        "Enter your password on the app screen to complete synchronization",
    },
    {
      title: "Get Help",
      element: ".mobile-tutorial-button",
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

export default MobileSyncTutorial;
