import React, { useEffect, useState } from "react";
import { vendorInstance } from "./api/axios";

const Test = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await vendorInstance.get("/2/products"); // Replace with the appropriate API endpoint
        if (response && response.data) {
          setProducts(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  console.log(products);
  return (
    <div>
      <h1>Product Table</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            {/* Add more table headers as needed */}
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.ProdId}>
              <td>{product.ProdId}</td>
              <td>{product.ProdName}</td>
              <td>{product.Description}</td>
              <td>{product.Price}</td>
              {/* Add more table cells as needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Test;
