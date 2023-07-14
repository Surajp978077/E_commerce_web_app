import React, { useState } from "react";
import ImagePlaceholder from "../../assets/images/ImagePlaceholder.png";
import Stack from "@mui/material/Stack";
import { Button, Paper } from "@mui/material";
import { fonts } from "../../config/config";
import NewListingSubmitDialoge from "./NewListingSubmitDialoge";

export default function FinalProductPreview(props) {
  const { qcData, isRejectedItem, setOpenSnackbar } = props;

  // styles for paper component
  const paperStyles = {
    width: "90%",
    borderRadius: "10px",
    boxShadow: "0px 0px 10px 0px grey",
    backgroundColor: "#adf7d5",
  };

  const productKeys = ["Product Name", "Product Description", "M.R.P (Rs)"];
  const productValues = [
    qcData.product.ProdName,
    qcData.product.Description,
    qcData.product.Price,
  ];

  const basicDetailsKeys = Object.keys(qcData.BasicDetails);
  const basicDetailsValues = Object.values(qcData.BasicDetails);

  const optionalDetailsKeys = Object.keys(qcData.OptionalDetails);
  const optionalDetailsValues = Object.values(qcData.OptionalDetails);

  const productVendorKeys = [
    "Selling Price (Rs)",
    "Quantity",
    "Listing Status",
  ];
  const productVendorValues = Object.values(qcData.productVendor);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [openError, setOpenError] = useState(false);

  const handleClickOpen = () => {
    setDialogOpen(true);
  };
  return (
    <div
      style={{
        padding: "10px 25%",
      }}
    >
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        spacing={2}
        width={"100%"}
        sx={{
          border: "50px",
          borderRadius: "10px",
          backgroundColor: "#bcf5ec",
          padding: "10px 0 20px 0",
        }}
      >
        <div>
          <h6>Submit product to QC?</h6>
        </div>
        <Paper sx={paperStyles}>
          <img
            src={
              qcData.product.ImageURL
                ? qcData.product.ImageURL
                : ImagePlaceholder
            }
            alt="product"
            style={{
              width: "100%",
              borderRadius: "10px",
              objectFit: "contain",
            }}
          />
        </Paper>

        <Paper sx={paperStyles}>
          <h5
            style={{
              padding: "10px 0 0 10px",
              fontFamily: fonts.main,
              textDecoration: "underline",
            }}
          >
            Product Details :
          </h5>
          <div
            style={{
              padding: "10px 10px",
            }}
          >
            {productKeys.map((key, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <h6>{key} :</h6>
                {key === "Product Description" ? (
                  <pre>
                    {" "}
                    <h6>{productValues[index]}</h6>
                  </pre>
                ) : (
                  <h6>{productValues[index]}</h6>
                )}
              </div>
            ))}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <h6>Category :</h6>
              <h6>{qcData.CategoryName}</h6>
            </div>
          </div>
        </Paper>
        <Paper sx={paperStyles}>
          <h5
            style={{
              padding: "10px 0 0 10px",
              fontFamily: fonts.main,
              textDecoration: "underline",
            }}
          >
            Basic Details :
          </h5>
          <div
            style={{
              padding: "10px 10px",
            }}
          >
            {basicDetailsKeys.map((key, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <h6>{key} :</h6>

                <h6>{basicDetailsValues[index]}</h6>
              </div>
            ))}
          </div>
        </Paper>
        <Paper sx={paperStyles}>
          <h5
            style={{
              padding: "10px 0 0 10px",
              fontFamily: fonts.main,
              textDecoration: "underline",
            }}
          >
            Optional Details :
          </h5>
          <div
            style={{
              padding: "10px 10px",
            }}
          >
            {optionalDetailsKeys.map((key, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <h6>{key} :</h6>

                <h6>{optionalDetailsValues[index]}</h6>
              </div>
            ))}
          </div>
        </Paper>
        <Paper sx={paperStyles}>
          <h5
            style={{
              padding: "10px 0 0 10px",
              fontFamily: fonts.main,
              textDecoration: "underline",
            }}
          >
            Product Vendor Details :
          </h5>
          <div
            style={{
              padding: "10px 10px",
            }}
          >
            {productVendorKeys.map((key, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <h6>{key} :</h6>
                {key === "Listing Status" ? (
                  key === "Listing Status" ? (
                    <h6>Active</h6>
                  ) : (
                    <h6>Inactive</h6>
                  )
                ) : (
                  <h6>{productVendorValues[index]}</h6>
                )}
              </div>
            ))}
          </div>
        </Paper>
        {isRejectedItem && qcData.AdminMessage && (
          <Paper sx={paperStyles}>
            <h5
              style={{
                padding: "10px 0 0 10px",
                fontFamily: fonts.main,
                textDecoration: "underline",
              }}
            >
              Admin Message :
            </h5>
            <div
              style={{
                padding: "10px 10px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <h6>{qcData.AdminMessage} :</h6>
              </div>
            </div>
          </Paper>
        )}
        {isRejectedItem && (
          <>
            <Paper sx={paperStyles}>
              <h5
                style={{
                  padding: "10px 0 0 10px",
                  fontFamily: fonts.main,
                  textDecoration: "underline",
                }}
              >
                Vendor Message :
              </h5>
              <div
                style={{
                  padding: "10px 10px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <h6>{qcData.VendorMessage}</h6>
                </div>
              </div>
            </Paper>

            <Button
              variant="contained"
              color="success"
              size="small"
              onClick={(e) => {
                e.preventDefault();
                handleClickOpen();
              }}
            >
              Next
            </Button>
          </>
        )}
      </Stack>
      <NewListingSubmitDialoge
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        setOpenSnackbar={setOpenSnackbar}
        qcData={qcData}
        setOpenError={setOpenError}
        isRejectedItem={true}
      />
    </div>
  );
}
