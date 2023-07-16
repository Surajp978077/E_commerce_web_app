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
  Snackbar,
  Alert,
  CircularProgress,
  Box,
} from "@mui/material";
import { VendorInfoContext } from "../../components/context_api/vendorInfo/VendorInfoContext";
import { useLocation, useNavigate } from "react-router";
import TablePagination from "../../components/Common/TablePagination";

const ListingInProgress = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state variable
  const { vendor } = useContext(VendorInfoContext);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchRejectedQCRequests = async () => {
      try {
        const response = await QCInstance.get(`rejected/${vendor.Id}`, {
          params: {
            page: currentPage,
            pageSize: 10,
          },
        });
        if (response && response.data && response.data.Data) {
          setProducts(response.data.Data);
          setTotalPages(response.data.TotalPages);
        }
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.log(error);
        setLoading(false); // Set loading to false in case of error
      }
    };
    fetchRejectedQCRequests();
  }, [currentPage]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!products.length) {
    return <p>No more pending products.</p>;
  }

  return (
    <>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleClose}
        sx={{ width: "20%" }}
      >
        <Alert onClose={handleClose} severity="info" sx={{ width: "100%" }}>
          Info: Submitted!
        </Alert>
      </Snackbar>
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
                <TableCell
                  style={{
                    maxHeight: "60px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    // display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {product.Product.Description}
                </TableCell>
                <TableCell>{product.Product.Price}</TableCell>
                <TableCell>{product.CategoryName}</TableCell>
                <TableCell>
                  {product.Status === 1 ? "Rejected" : "Pending..."}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div
        style={{
          display: "inline",
          placeitems: "center",
          margin: "38px",
          position: "relative",
        }}
      >
        <TablePagination
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          products={products}
        />
      </div>
    </>
  );
};

export default ListingInProgress;
