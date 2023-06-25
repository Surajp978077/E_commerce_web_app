import React, { useState } from "react";
import axios from "axios";
import { categoriesInstance } from "./api/axios";

const MyComponent = () => {
  const [data, setData] = useState([]);

  const sendDataToServer = async () => {
    try {
      const arrayData = ["value1", "value2", "value3"]; // Array data to send

      const response = await categoriesInstance.put(`/details/  `, arrayData);
      console.log(response); // Optional: Handle the response from the server

      // Optionally update state or perform other actions after successful request
    } catch (error) {
      console.error(error);
      // Handle errors
    }
  };

  return (
    <div>
      <button onClick={sendDataToServer}>Send Data</button>
    </div>
  );
};

export default MyComponent;
