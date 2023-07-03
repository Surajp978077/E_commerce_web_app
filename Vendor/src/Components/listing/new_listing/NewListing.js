import React, { useEffect, useState, useContext } from "react";
import { ProductListing } from "./ProductListing";
import { Box, Divider, Stepper, Step, StepLabel } from "@mui/material";
import { fonts } from "../../../config/config";
import Button from "@mui/material/Button";
import NewProduct from "./NewProduct";
import { categoriesInstance } from "../../../api/axios";
import ErrroPage from "../../../components/ErrorPage";
import { VendorInfoContext } from "../../context_api/vendorInfo/VendorInfoContext";
import FinalProductDetails from "./FinalProductDetails";

export default function NewListing() {
  const [activeStep, setActiveStep] = useState(0);
  const [categorySelectedLeaf, setCategorySelectedLeaf] = useState(null);
  const [categoriesNested, setCategoriesNested] = useState([]);
  const [categoriesSelected, setCategoriesSelected] = useState([]);
  const [categorySelected, setCategorySelected] = useState(null); // to get the basic and optional details of the category
  const [errorMessage, setErrorMessage] = useState(null);
  const { userInfo } = useContext(VendorInfoContext);
  const [isInputFilled, setIsInputFilled] = useState(true); // to check if the input fields are filled or not
  const [qcData, setQcData] = useState({
    product: {},
    BasicDetails: {},
    OptionalDetails: {},
    CategoryId: null,
    CategoryName: null,
    productVendor: {},
    VendorId: userInfo.vendor.VendorId,
    VendorName: userInfo.vendor.VendorName,
  });

  const fetchCategories = async () => {
    try {
      const response = await categoriesInstance.get(
        `/${categorySelectedLeaf.CategoryId}`
      );
      if (response.status === 200 && response.data) {
        setCategorySelected(response.data);
        setQcData({
          ...qcData,
          CategoryId: response.data.CategoryId,
          CategoryName: response.data.Name,
        });
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    if (categorySelectedLeaf) {
      fetchCategories();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categorySelectedLeaf]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  if (errorMessage) {
    return <ErrroPage desc={errorMessage} />;
  }

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

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 10px",
          backgroundColor: "#ebeae8",
          height: "100px",
        }}
      >
        <Stepper
          activeStep={activeStep}
          alternativeLabel
          sx={{
            width: "100%",
            position: "relative",
            right: "15%",
            padding: "10px 10px",
          }}
        >
          <Step>
            <StepLabel>
              Select a category
              <br />
              <span
                style={{
                  fontSize: "12px",
                  color: "grey",
                  fontFamily: fonts.tertiary,
                  // maxWidth: "20px",
                }}
              >
                {categorySelectedLeaf
                  ? categorySelectedLeaf.Name
                    ? categorySelectedLeaf.Name
                    : " "
                  : " "}
              </span>
            </StepLabel>
          </Step>
          <Step>
            <StepLabel>Enter product details</StepLabel>
          </Step>
        </Stepper>
        <Button
          variant="outlined"
          color="success"
          onClick={handleBack}
          sx={{ marginBottom: "-2%", width: "190px", marginRight: "5px" }}
          disabled={activeStep === 0}
        >
          Save & Go back
        </Button>
        <Button
          variant="contained"
          onClick={handleNext}
          sx={{ marginBottom: "-2%" }}
          disabled={categorySelectedLeaf === null || !isInputFilled}
        >
          {activeStep === 1 ? "Finish" : "Next"}
        </Button>
      </Box>

      <Divider color="black" width={"100% "} />

      {activeStep === 0 && (
        <ProductListing
          nextStep={handleNext}
          categorySelectedLeaf={categorySelectedLeaf}
          setCategorySelectedLeaf={setCategorySelectedLeaf}
          categoriesNested={categoriesNested}
          setCategoriesNested={setCategoriesNested}
          categoriesSelected={categoriesSelected}
          setCategoriesSelected={setCategoriesSelected}
        />
      )}
      {activeStep === 1 && (
        <NewProduct
          categorySelected={categorySelected}
          qcData={qcData}
          setQcData={setQcData}
          setIsInputFilled={setIsInputFilled}
        />
      )}
      {activeStep === 2 && <FinalProductDetails qcData={qcData} />}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button disabled={activeStep === 0} onClick={handleBack}>
          Back
        </Button>
        <Button onClick={handleNext}>
          {activeStep === 1 ? "Finish" : "Next"}
        </Button>
      </Box>
    </>
  );
}
