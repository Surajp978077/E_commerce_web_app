import React, { useEffect, useState, useContext } from "react";
import { ProductListing } from "./ProductListing";
import {
  Box,
  Divider,
  Stepper,
  Step,
  StepLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Snackbar,
  Alert,
} from "@mui/material";
import { fonts } from "../../../config/config";
import Button from "@mui/material/Button";
import NewProduct from "./NewProduct";
import { QCInstance, categoriesInstance } from "../../../api/axios";
import ErrorPage from "../../Pages/ErrorPage";
import { VendorInfoContext } from "../../context_api/vendorInfo/VendorInfoContext";
import FinalProductDetails from "./FinalProductPreview";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

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
  const navigate = useNavigate();

  const location = useLocation();
  // const setOpenSnackbar = location.state && location.state.setOpenSnackbar;
  const state = location.state;
  const setOpenSnackbar = state && state.setOpenSnackbar;
  const handleClickOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  const handleSubmit = () => {
    setDialogOpen(false);
    if (setOpenSnackbar) {
      console.log("setOpenSnackbar");
      setOpenSnackbar(true);
    }

    // call the api to submit the product to QC
    const submitProduct = async () => {
      try {
        const response = await QCInstance.post(`/`, {
          Product: {
            ProdName: qcData.product.ProdName,
            Description: qcData.product.Description,
            Price: qcData.product.Price,
            ImageURL: qcData.product.ImageURL,
            BasicDetails: qcData.BasicDetails,
            OptionalDetails: qcData.OptionalDetails,
          },
          ProductVendor: {
            Price: qcData.productVendor.Price,
            Quantity: qcData.productVendor.Quantity,
            Visible: qcData.productVendor.Visible,
          },
          CategoryId: qcData.CategoryId,
          CategoryName: qcData.CategoryName,
          VendorId: qcData.VendorId,
          VendorName: qcData.VendorName,
          Status: 0,
        });
        if (
          response.status === 201 ||
          (response.status === 200 && response.data)
        ) {
          navigate("/listings");
        }
      } catch (error) {
        setOpenError(true);
      }
    };
    submitProduct();
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
    <>
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
          sx={{ marginBottom: "-2%", width: "190px", marginRight: "5px" }}
          disabled={activeStep === 0}
        >
          Save & Go back
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

      <Dialog
        open={dialogOpen}
        onClose={handleClose}
        sx={{
          "& .MuiDialog-paper": {
            height: "200px",
            borderRadius: "10px",
            padding: "10px",
            color: "black",
            fontFamily: fonts.main,
          },
        }}
      >
        <DialogTitle>Submit</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to submit the product for the QC verification?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Wait
          </Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
