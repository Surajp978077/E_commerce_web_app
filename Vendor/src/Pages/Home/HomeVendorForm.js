import React, { useContext, useEffect, useState } from "react";
import { Grid, TextField, Button, Alert } from "@mui/material";
import { UserInfoContext } from "../../components/context_api/userInfo/UserInfoContext";
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
      <Grid item xs={12}>
        {alert ? (
          <Alert
            severity="error"
            icon={<WarningIcon />}
            sx={{ width: "100%", margin: "2px", marginTop: "10px" }}
          >
            <strong>Error:</strong> Please enter the details only in{" "}
            <strong>{typeof vendor[field]}</strong> format
            <Button
              sx={{ color: "inherit", marginLeft: "1vh" }}
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
            boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75)",
            padding: "10px",
            marginTop: "10px",
          }}
        >
          <h5>Update {fieldDisplayLabels[label]}</h5>
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
                sx={{ margin: "0" }}
              />
            </div>

            <Button
              variant="contained"
              type="submit"
              size="small"
              sx={{ marginTop: "0.2rem" }}
            >
              Submit
            </Button>
          </form>
        </div>
      </Grid>
    </>
  );
};

export default VendorForm;
