import React, { useContext, useEffect, useState } from "react";
import { Grid, TextField, Button, Alert } from "@mui/material";
import { UserInfoContext } from "../context_api/userInfo/UserInfoContext";
import { vendorInstance } from "../../api/axios";
import WarningIcon from "@mui/icons-material/Warning";
import { CloseOutlined } from "@mui/icons-material";

const VendorForm = ({ field, label, setVendor, vendor, setIsVendorSet }) => {
  const { userInfo } = useContext(UserInfoContext);
  const [vendorNew, setVendorNew] = useState(vendor);
  const [alert, setAlert] = useState(false);

  // To be able to save the vendor in newvendor only when vendor changes, to prevent loss of data after submitting the form
  useEffect(() => {
    setVendorNew(vendor);
  }, [vendor]);

  function change(event) {
    event.preventDefault(); // Persist the synthetic event
    setVendorNew((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await vendorInstance.put(
        `/${userInfo.vendor.VendorId}`,
        vendorNew
      );

      if (response.status === 200) {
        setVendor((prevData) => ({
          ...prevData,
          ...vendorNew,
        }));
        setIsVendorSet(false);
      }
    } catch (error) {
      if (error.response.status === 400) {
        setAlert(true);
      }
    }
  }

  const fieldDisplayLabels = {
    Id: "ID",
    GSTIN: "GSTIN number",
    DeliveryPinCode: "Delivery pin code",
    UserId: "User ID",
  };

  return (
    <>
      <Grid item xs={12} md={6}>
        {alert ? (
          <Alert
            severity="error"
            icon={
              <WarningIcon sx={{ fontSize: "inherit", marginTop: "5px" }} />
            }
            sx={{ fontSize: 15, paddingBottom: 0 }}
          >
            <strong>Error:</strong> Please enter the details only in{" "}
            <strong>{typeof vendor[field]}</strong> format
            <Button
              sx={{ color: "inherit", marginLeft: "10vh" }}
              onClick={() => setAlert(false)}
            >
              <CloseOutlined />
            </Button>
          </Alert>
        ) : null}
        <div
          style={{
            backgroundColor: "#e8e9eb",
            borderRadius: "4px",
            boxShadow: "0 4px 5px rgba(0, 0, 0, 0.1)",
            padding: "20px",
            marginBottom: "20px",
            marginTop: "10px",
            maxWidth: "500px",
          }}
        >
          <h3>Update {fieldDisplayLabels[label]}</h3>
          <form onSubmit={handleSubmit}>
            <div>
              <label>{fieldDisplayLabels[label]}</label>
              <TextField
                id="standard-basic"
                variant="standard"
                label={`Enter ${fieldDisplayLabels[label]}`}
                onChange={change}
                name={label}
                fullWidth
                margin="normal"
                size="small"
              />
            </div>
            `{" "}
            <Button
              variant="contained"
              type="submit"
              sx={{ marginTop: "10px" }}
            >
              Submit
            </Button>
            `
          </form>
        </div>
      </Grid>
    </>
  );
};

export default VendorForm;
