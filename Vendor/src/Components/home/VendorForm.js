import React, { useContext, useState } from "react";
import { Col, Form } from "react-bootstrap";
import { UserInfoContext } from "../userInfo/UserInfoContext";
import { vendorInstance } from "../../api/axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const VendorForm = ({
  field,
  label,
  value,
  setVendor,
  vendor,
  setIsVendorSet,
}) => {
  const { userInfo } = useContext(UserInfoContext);
  const [vendorNew, setVendorNew] = useState(vendor);

  function change(event) {
    setVendorNew((prevData) => {
      return {
        ...prevData,
        [event.target.name]: event.target.value,
      };
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await vendorInstance.put(
        `/${userInfo.vendor.vendorId}`,
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
      console.error(error);
    }
  }

  return (
    <Col xs={12} md={6}>
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
        <h3>Update {label}</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>{label}</Form.Label>
            <TextField
              id="standard-basic"
              variant="standard"
              label={`Enter ${label}`}
              value={vendorNew[field]}
              onChange={change}
              name={label}
              fullWidth
            />
          </Form.Group>
          <Button
            variant="contained"
            type="submit"
            style={{ marginTop: "10px" }}
          >
            Submit
          </Button>
        </Form>
      </div>
    </Col>
  );
};

export default VendorForm;
