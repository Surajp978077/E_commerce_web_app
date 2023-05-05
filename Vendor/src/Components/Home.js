import React, { useState } from "react";
import { vendorInstance } from "../api/axios";

function Home() {
  const [vendor, setVendor] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const getVendorInfo = async (id) => {
    try {
      const response = await vendorInstance.get(`/Vendors/${id}`);
      setVendor(response.data);
      console.log(vendor);
      setErrorMessage("");
    } catch (error) {
      setVendor(null);
      setErrorMessage("Vendor not found");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const name = event.target.elements.name.value;
    const gst = event.target.elements.gst.value;
    const deliveryPinCode = event.target.elements.deliveryPinCode.value;
    try {
      const response = await vendorInstance.post(`/Vendors`, {
        name,
        gst,
        deliveryPinCode,
      });
      setVendor(response.data);
      setErrorMessage("");
    } catch (error) {
      setVendor(null);
      setErrorMessage("Error occurred while creating new vendor");
    }
  };

  if (errorMessage === "Vendor not found") {
    return (
      <div>
        <h2>Vendor not found!</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input type="text" name="name" placeholder="Enter name" />
          <br />
          <label htmlFor="gst">GSTIN:</label>
          <input type="text" name="gst" placeholder="Enter GSTIN" />
          <br />
          <label htmlFor="deliveryPinCode">Delivery Pin Code:</label>
          <input
            type="text"
            name="deliveryPinCode"
            placeholder="Enter delivery pin code"
          />
          <br />
          <button type="submit">Create New Vendor</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const id = e.target.elements.vendorId.value;
          getVendorInfo(id);
        }}
      >
        <input type="text" name="vendorId" placeholder="Enter vendor ID" />
        <button type="submit">Get Vendor Info</button>
      </form>
      {vendor ? (
        <div>
          <h2>Vendor Info</h2>
          <p>Name: {vendor.name}</p>
          <p>GSTIN: {vendor.GSTIN}</p>
          <p>DeliveryPinCode: {vendor.DeliveryPinCode}</p>
        </div>
      ) : (
        <p>{errorMessage}</p>
      )}
    </div>
  );
}

export default Home;
