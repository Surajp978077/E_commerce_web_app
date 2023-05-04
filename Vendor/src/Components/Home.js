// import React, { useState } from "react";
// import { vendorInstance } from "../api/axios";

// function Home() {
//   const [vendor, setVendor] = useState(null);
//   const [errorMessage, setErrorMessage] = useState("");

//   const getVendorInfo = async (id) => {
//     try {
//       const response = await vendorInstance.get(`/Vendor/${id}`);
//       setVendor(response.data);
//       console.log(vendor);
//       setErrorMessage("");
//     } catch (error) {
//       setVendor(null);
//       setErrorMessage("Vendor not found");
//     }
//   };

//   return (
//     <div>
//       <form
//         onSubmit={(e) => {
//           e.preventDefault();
//           const id = e.target.elements.vendorId.value;
//           getVendorInfo(id);
//         }}
//       >
//         <input type="text" name="vendorId" placeholder="Enter vendor ID" />
//         <button type="submit">Get Vendor Info</button>
//       </form>
//       {vendor ? (
//         <div>
//           <h2>Vendor Info</h2>
//           <p>Name: {vendor.name}</p>
//           <p>GSTIN: {vendor.GSTIN}</p>
//           <p>DeliveryPinCode: {vendor.DeliveryPinCode}</p>
//         </div>
//       ) : (
//         <p>{errorMessage}</p>
//       )}
//     </div>
//   );
// }

// export default Home;

import React, { useState, useEffect } from "react";

function convertJwtExpToIst(token) {
  const jwtPayload = JSON.parse(atob(token.split(".")[1]));
  const expTimestamp = jwtPayload.exp;
  const expDate = new Date(expTimestamp * 1000);
  const expIst = new Date(expDate.getTime() + 330 * 60 * 1000); // add 5 hours 30 minutes (330 minutes) to GMT time to get IST
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
    timeZone: "Asia/Kolkata",
  };
  const expIstStr = expIst.toLocaleString("en-US", options);
  return expIstStr;
}

function ExpirationTime() {
  const [expTime, setExpTime] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const expIstStr = convertJwtExpToIst(token);
      setExpTime(expIstStr);
    }
  }, []);

  return <p>Token Expiration Time: {expTime}</p>;
}

export default ExpirationTime;
