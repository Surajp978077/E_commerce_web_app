import React, { useEffect, useState, useContext } from "react";
import { ProductListing } from "./NewListingCategorySelection";
import {
  Box,
  Divider,
  Stepper,
  Step,
  StepLabel,
  Snackbar,
  Alert,
} from "@mui/material";
import { fonts } from "../../config/config";
import Button from "@mui/material/Button";
import NewProduct from "../../components/NewProduct";
import { categoriesInstance } from "../../api/axios";
import ErrorPage from "../../components/Common/ErrorPage";
import { VendorInfoContext } from "../../components/context_api/vendorInfo/VendorInfoContext";
import FinalProductDetails from "./FinalProductPreview";
import CircularProgress from "@mui/material/CircularProgress";
import { useLocation } from "react-router-dom";
import NewListingSubmitDialoge from "./NewListingSubmitDialoge";

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
  const [dialogOpen, setDialogOpen] = useState(false);
  const [openError, setOpenError] = useState(false);
  const location = useLocation();
  // const setOpenSnackbar = location.state && location.state.setOpenSnackbar;
  const state = location.state;
  const setOpenSnackbar = state && state.setOpenSnackbar;

  const handleClickOpen = () => {
    setDialogOpen(true);
  };

  const fetchCategories = async () => {
    try {
      const response = await categoriesInstance.get(
        `/${categorySelectedLeaf.CategoryId}`
      );
      if (response.status === 200 && response.data) {
        setCategorySelected(response.data);
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

  useEffect(() => {
    if (categorySelected) {
      setQcData((prevData) => ({
        ...prevData,
        CategoryId: categorySelected.CategoryId,
        CategoryName: categorySelected.Name,
        BasicDetails: categorySelected.BasicDetails.reduce((result, key) => {
          result[key] = null;
          return result;
        }, {}),
        OptionalDetails: categorySelected.OptionalDetails.reduce(
          (result, key) => {
            result[key] = null;
            return result;
          },
          {}
        ),
      }));
    }
  }, [categorySelected]);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleErrorClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenError(false);
  };

  if (errorMessage) {
    return <ErrorPage desc={errorMessage} />;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
      }}
    >
      <Snackbar
        open={openError}
        autoHideDuration={2000}
        onClose={handleErrorClose}
      >
        <Alert
          onClose={handleErrorClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          An error occurred while submitting the details
        </Alert>
      </Snackbar>
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
            right: "10%",
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
          <Step>
            <StepLabel>Review</StepLabel>
          </Step>
        </Stepper>
        <Button
          variant="outlined"
          color="success"
          onClick={handleBack}
          sx={{ marginBottom: "-2%", width: "150px", marginRight: "5px" }}
          disabled={activeStep === 0}
        >
          Go back
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            activeStep === 2 ? handleClickOpen() : handleNext();
          }}
          sx={{ marginBottom: "-2%" }}
          disabled={
            categorySelectedLeaf === null ||
            categorySelected === null ||
            !isInputFilled
          }
          startIcon={
            categorySelectedLeaf && categorySelected === null ? (
              <CircularProgress size={20} />
            ) : null
          }
        >
          {activeStep === 2 ? "Submit" : "Next"}
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
          qcData={qcData}
          setQcData={setQcData}
          setIsInputFilled={setIsInputFilled}
        />
      )}
      {activeStep === 2 && <FinalProductDetails qcData={qcData} />}
      <NewListingSubmitDialoge
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        setOpenSnackbar={setOpenSnackbar}
        qcData={qcData}
        setOpenError={setOpenError}
      />
    </div>
  );
}
