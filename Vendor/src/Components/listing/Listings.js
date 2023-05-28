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
  Alert,
  AlertTitle,
} from "@mui/material/";
import { useContext } from "react";
import { UserInfoContext } from "../userInfo/UserInfoContext";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useNavigate, useLocation } from "react-router-dom";

const Listings = () => {
  const pageSize = 2;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [products, setProducts] = useState([]);
  const { userInfo } = useContext(UserInfoContext);
  const id = userInfo.vendor.vendorId;
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  const fetchProducts = async () => {
    try {
      const response = await vendorInstance.get(`/${id}/products`, {
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
  // console.log(products.length == 0);
  return (
    <>
      <Heading />
      {products.length ? (
        <div
          style={{
            marginBlockStart: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TableContainer
              component={Paper}
              sx={{
                width: "80%",
              }}
            >
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left" id="table-heading">
                      Name
                    </TableCell>
                    <TableCell id="table-heading"> Price</TableCell>
                    <TableCell id="table-heading">Quantity</TableCell>
                    <TableCell id="table-heading">Base Price</TableCell>
                    <TableCell id="table-heading"> </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.Product.ProdId}>
                      <TableCell>{product.Product.ProdName}</TableCell>
                      <TableCell>{product.Price}</TableCell>
                      <TableCell>{product.Quantity}</TableCell>
                      <TableCell>{product.Product.Price}</TableCell>
                      <TableCell>
                        <EditOutlinedIcon
                          onClick={() =>
                            navigate(
                              `${location.pathname}/products/${product.Product.ProdId}`
                            )
                          }
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
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
      ) : (
        <Alert sx={{ marginBlockStart: "10px" }} severity="info">
          <AlertTitle>No products</AlertTitle>
          You don't have any products listed, Click on{" "}
          <strong>New Product</strong> button to add a product
        </Alert>
      )}
    </>
  );
};

export default Listings;
