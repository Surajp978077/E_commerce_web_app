import React, { useState, useEffect } from "react";
import { vendorInstance } from "../../api/axios";
import Heading from "./Heading";
import {
  TableBody,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material/";

const Listings = () => {
  const pageSize = 2;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  const fetchProducts = async () => {
    try {
      const response = await vendorInstance.get(`/2/products`, {
        params: {
          page: currentPage,
          pageSize: pageSize,
        },
      });
      if (response && response.data) {
        setProducts(response.data.Products);
        setTotalPages(response.data.TotalPages);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <>
      <Heading />
      <div style={{ marginBlockStart: "20px" }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead sx={{ backgroundColor: " #e6e6e6" }}>
              <TableRow>
                <TableCell align="left">Name</TableCell>
                <TableCell>Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.ProdId}>
                  <TableCell>{product.ProdName}</TableCell>
                  <TableCell>{product.Price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <Button
            variant="contained"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span style={{ margin: "0 10px" }}>Page {currentPage}</span>
          <Button
            variant="contained"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
};

export default Listings;
