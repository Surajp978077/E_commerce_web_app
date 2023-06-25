import React, { useState } from "react";
import { productInstance } from "./api/axios";
import Test2 from "./Test2";

const MyComponent = () => {
  const [detailedDescription, setDetailedDescription] = useState({
    Ram: 3,
    ROM: 120,
    OS: "Android",
  });

  const handleUpdateDetails = async () => {
    try {
      const productId = 123; // Replace with the actual product ID
      const response = await productInstance.put(
        `/2/postdetails`,
        detailedDescription
      );
      console.log(response.data); // Handle the response as needed
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {/* Render the input fields for detailed description */}
      <label>Ram:</label>
      <input
        type="number"
        value={detailedDescription.Ram}
        onChange={(e) =>
          setDetailedDescription((prevState) => ({
            ...prevState,
            Ram: parseInt(e.target.value),
          }))
        }
      />

      <label>ROM:</label>
      <input
        type="number"
        value={detailedDescription.ROM}
        onChange={(e) =>
          setDetailedDescription((prevState) => ({
            ...prevState,
            ROM: parseInt(e.target.value),
          }))
        }
      />

      <label>OS:</label>
      <input
        type="text"
        value={detailedDescription.OS}
        onChange={(e) =>
          setDetailedDescription((prevState) => ({
            ...prevState,
            OS: e.target.value,
          }))
        }
      />

      {/* Button to trigger the update */}
      <button onClick={handleUpdateDetails}>Update Details</button>
      <Test2 />
    </div>
  );
};

export default MyComponent;
