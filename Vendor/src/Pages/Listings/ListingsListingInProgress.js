import React, { useContext, useEffect, useState } from "react";
import { QCInstance } from "../../api/axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { VendorInfoContext } from "../../components/context_api/vendorInfo/VendorInfoContext";
import { useLocation, useNavigate } from "react-router";
import LoadingScreen from "../../components/Common/LoadingScreen";

const ListingInProgress = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state variable
  const { vendor } = useContext(VendorInfoContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchRejectedQCRequests();
  }, []);

  const fetchRejectedQCRequests = async () => {
    try {
      const response = await QCInstance.get(`rejected/${vendor.Id}`, {
        params: {
          page: 1,
          pageSize: 10,
        },
      });
      if (response && response.data && response.data.Data) {
        setProducts(response.data.Data);
      }
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.log(error);
      setLoading(false); // Set loading to false in case of error
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  if (!products.length) {
    return <p>No products found.</p>;
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow
              key={product.Id}
              onClick={() => {
                if (product.Status === 1) {
                  // Redirect to a specific route and pass state
                  navigate(`${location.pathname}/rejectedQC`, {
                    state: { product },
                  });
                }
              }}
              sx={{
                backgroundColor: product.Status === 1 ? "#fa7a7a" : "#fbfc44",
                cursor: product.Status === 1 ? "pointer" : null,
              }}
            >
              <TableCell>
                <img
                  src={product.Product.ImageURL}
                  alt="product"
                  style={{ width: "50px", height: "50px" }}
                />
              </TableCell>
              <TableCell>{product.Product.ProdName}</TableCell>
              <TableCell>{product.Product.Description}</TableCell>
              <TableCell>{product.Product.Price}</TableCell>
              <TableCell>{product.CategoryName}</TableCell>
              <TableCell>
                {product.Status === 1 ? "Rejected" : "Pending"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ListingInProgress;
