import axios from 'axios';
import React, { useState } from 'react';

function Home() {
  const [vendor, setVendor] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const getVendorInfo = async (id) => {
    try {
      const response = await axios.get(`https://localhost:7044/api/Vendor/${id}`);
      setVendor(response.data);
      console.log(vendor)
      setErrorMessage('');
    } catch (error) {
      setVendor(null);
      setErrorMessage('Vendor not found');
    }
  };

  return (
    <div>
      <form onSubmit={(e) => {
        e.preventDefault();
        const id = e.target.elements.vendorId.value;
        getVendorInfo(id);
      }}>
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
