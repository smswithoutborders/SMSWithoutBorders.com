import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";

const steps = [
  {
    labelKey: "dashboard.label2",
    descriptionKey: "dashboard.description2",
    link: "/dashboard/Wallet",
  },
  {
    labelKey: "dashboard.label3",
    descriptionKey: "dashboard.description3",
    link: "/downloads",
  },
  {
    labelKey: "dashboard.label4",
    descriptionKey: "dashboard.description4",
    link: "/dashboard/sync",
  },
];

const ACTIVE_STEP_KEY = "activeStep";

export default function VerticalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(() => {
    const storedStep = localStorage.getItem(ACTIVE_STEP_KEY);
    return storedStep !== null ? parseInt(storedStep, 10) : 0;
  });
  const { t } = useTranslation();

  React.useEffect(() => {
    localStorage.setItem(ACTIVE_STEP_KEY, activeStep);
  }, [activeStep]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleLinkClick = (link) => {
    const currentUrl = window.location.href;
    localStorage.setItem("previousUrl", currentUrl); // Store the current URL
    window.location.href = link;
    handleNext();
  };

  return (
    <Box sx={{ maxWidth: 400, margin: "auto" }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.labelKey}>
            <StepLabel
              optional={
                index === 2 ? (
                  <Typography variant="caption">Last step</Typography>
                ) : null
              }
            >
              {t(step.labelKey)}
            </StepLabel>
            <StepContent>
              <Typography>{t(step.descriptionKey)}</Typography>
              <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                    variant="contained"
                    onClick={() => handleLinkClick(step.link)}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {index === steps.length - 1
                      ? t("dashboard.finish")
                      : t("dashboard.continue")}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {t("dashboard.back")}
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>{t("dashboard.completed")}</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            {t("dashboard.reset")}
          </Button>
        </Paper>
      )}
    </Box>
  );
}
