import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import { fonts } from "../../config/config";
import { QCInstance } from "../../api/axios";
import { useNavigate } from "react-router-dom";

export default function NewListingSubmitDialoge(props) {
  const { dialogOpen, setDialogOpen, qcData, setOpenError, isRejectedItem } =
    props;

  const navigate = useNavigate();
  const handleClose = () => {
    setDialogOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setDialogOpen(false);

    // call the api to submit the product to QC
    const submitProduct = async () => {
      try {
        if (isRejectedItem) {
          const response = await QCInstance.put(
            `/VendorResponse/${qcData.Id}`,
            {
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
              AdminMessage: qcData.AdminMessage,
              VendorMessage: qcData.VendorMessage,
            }
          );
          if (response.status === 200) {
            navigate("/listings");
          }
        } else {
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
        }
      } catch (error) {
        setOpenError(true);
      }
    };
    submitProduct();
  };
  return (
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
  );
}
