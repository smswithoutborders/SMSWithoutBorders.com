import React from "react";
import { Steps } from "intro.js-react";
import PropTypes from "prop-types";
import { useDeviceDetection } from "hooks";
import "styles/introjs-theme.css";

const OnboardingTutorial = ({ start, stopFunc }) => {
  const isMobile = useDeviceDetection();
  console.log(isMobile);
  const steps = [
    {
      title: "Welcome",
      element: "onboarding",
      intro: (
        <div className="prose">
          <h3>learn how to store accounts</h3>
          <p>This tutorial will help you get started</p>
        </div>
      ),
    },
    {
      title: "Available platforms",
      element: ".onboarding-step-1",
      intro:
        "Store access for available platforms by clicking on the store button under each platform",
    },
    {
      title: "Synchronization",
      element: isMobile ? ".mobile-sync-button" : ".desktop-sync-button",
      intro: "Synchronize with the mobile app to start communicating securely",
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
