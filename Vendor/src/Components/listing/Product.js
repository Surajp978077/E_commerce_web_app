import * as React from "react";
import Box from "@mui/material/Box";
import { Button } from "@mui/material/";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import { useState } from "react";
import { productVendorInstance } from "../../api/axios";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// Now you have access to the product object in the destination component

export default function Product(props) {
  const { product, vendorId } = props;
  const [newProduct, setNewProduct] = useState(product);
  const [open, setOpen] = useState(false);
  const [openError, setOpenError] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
    setOpenError(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await productVendorInstance.put(
        `/${vendorId}`,
        newProduct,
        {
          params: {
            prodId: newProduct.Product.ProdId,
          },
        }
      );
      if (response.status === 200) {
        setOpen(true);
      }
    } catch (error) {
      console.log(error);
      setOpenError(true);
    }
  };

  const handleChange = (e) => {
    // To see if the input of the Price is a number
    const isText = isNaN(e.target.value);
    if (
      !isText &&
      (e.target.name === "Price" || e.target.name === "Quantity")
    ) {
      setNewProduct((prevProduct) => ({
        ...prevProduct,
        [e.target.name]: e.target.value,
      }));
    } else if (e.target.name !== "Price" && e.target.name !== "Quantity") {
      setNewProduct((prevProduct) => ({
        ...prevProduct,
        Product: {
          ...prevProduct.Product,
          [e.target.name]: e.target.value,
        },
      }));
    }
  };

  return (
    <div>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="info" sx={{ width: "100%" }}>
          Info: Submitted!
        </Alert>
      </Snackbar>
      <Snackbar open={openError} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          An error occurred while saving the details
        </Alert>
      </Snackbar>
      <div
        style={{
          margin: "20px 30px",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <CloseIcon onClick={() => props.setOpen(false)} />
      </div>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          margin: "20px",

          gap: "2%",
        }}
      >
        <Card
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center", // Align content vertically at the center
            alignItems: "center", // Align items horizontally at the center
            gap: "10px",
            // minWidth: "300px",
            width: "28%",
            height: "500px",
            // backgroundColor: "#ebeae8",
            borderRadius: "20px",
            position: "relative",
          }}
        >
          <img
            src={newProduct.Product.ImageURL}
            style={{ width: "100%" }}
            alt="Product"
          />
        </Card>
        <Card
          id="form"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            width: "70%",
            // minWidth: "300px",
            // backgroundColor: "#ebeae8",
            borderRadius: "20px",
            padding: "10px",
            position: "relative",
          }}
        >
          <form onSubmit={handleSubmit}>
            <div style={{ m: 1, display: "flex", gap: "10px" }}>
              <TextField
                id="standard-basic"
                label="Name"
                variant="standard"
                name="ProdName"
                value={newProduct.Product.ProdName}
                onChange={handleChange}
                required
                sx={{ flex: 1 }}
              />
            </div>
            <div style={{ m: 1, display: "flex", gap: "10px" }}>
              <TextField
                required
                fullWidth
                id="standard-multiline-static"
                label="Description"
                name="Description"
                value={newProduct.Product.Description}
                onChange={handleChange}
                multiline
                rows={4}
                variant="standard"
              />
            </div>
            <div style={{ m: 1, display: "flex", gap: "10px" }}>
              <FormControl required fullWidth sx={{ m: 1 }} variant="standard">
                <InputLabel htmlFor="standard-adornment-amount">
                  Amount
                </InputLabel>
                <Input
                  id="standard-adornment-amount"
                  name="Price"
                  value={newProduct.Price}
                  onChange={handleChange}
                  startAdornment={
                    <InputAdornment position="start">₹</InputAdornment>
                  }
                />
              </FormControl>
              <TextField
                required
                fullWidth
                sx={{ m: 1 }}
                id="standard-number"
                label="Quantity"
                value={newProduct.Quantity}
                type="number"
                name="Quantity"
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="standard"
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                position: "absolute",
                bottom: "10px",
                right: "10px",
              }}
            >
              <Button variant="contained" type="submit">
                Submit
              </Button>
            </div>
          </form>
        </Card>
      </Box>
    </div>
  );
}