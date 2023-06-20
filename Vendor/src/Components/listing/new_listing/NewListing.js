import React, { useState } from "react";
import { ProductListing } from "./ProductListing";
import { Box, Divider, Stepper, Step, StepLabel } from "@mui/material";
import { fonts } from "../../../config/config";
import Button from "@mui/material/Button";

export default function NewListing() {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <>
      <Box component="div" padding={"10px"}>
        <h3
          style={{
            fontFamily: fonts.main,
          }}
        >
          Add a single listing
        </h3>
      </Box>
      <Divider color="black" width={"100% "} />

      <Stepper
        activeStep={activeStep}
        alternativeLabel
        sx={{ padding: "10px 0" }}
      >
        <Step>
          <StepLabel>Select a category</StepLabel>
        </Step>
        <Step>
          <StepLabel>Enter product details</StepLabel>
        </Step>
      </Stepper>
      <Divider color="black" width={"100% "} />

      {activeStep === 0 && <ProductListing nextStep={handleNext} />}
      {/* {activeStep === 1 && <Step2Component />} */}
      {/* {activeStep === 2 && <Step3Component />} */}

      <Button disabled={activeStep === 0} onClick={handleBack}>
        Back
      </Button>
      <Button onClick={handleNext}>
        {activeStep === 1 ? "Finish" : "Next"}
      </Button>
    </>
  );
}
