import React, { useState, useEffect } from "react";
import { vendorInstance, productVendorInstance } from "../../api/axios";
import Heading from "./Heading";
import {
  TableBody,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Alert,
  AlertTitle,
  Switch,
  Pagination,
  Dialog,
} from "@mui/material/";
import { useContext } from "react";
import { UserInfoContext } from "../context_api/userInfo/UserInfoContext";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import Product from "./Product";
import useMediaQuery from "@mui/material/useMediaQuery";

const Listings = () => {
  const pageSize = 5;
  const [currentPage, setCurrentPage] = useState(
    sessionStorage.getItem("listingPage") || 1
  );
  const [totalPages, setTotalPages] = useState(0);
  const [products, setProducts] = useState([]);
  const { userInfo } = useContext(UserInfoContext);
  const id = userInfo.vendor.vendorId;
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null); // Track the selected product for the Dialog
  const [productsCount, setProductsCount] = useState(null);
  const [activeListings, setActiveListings] = useState(null);
  const [inactiveListings, setInactiveListings] = useState(null);
  const [render, setRender] = useState(false); // To re-render the component when the product is edited and closed the dialog

  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    fetchProducts();
    sessionStorage.setItem("listingPage", currentPage);
  }, [currentPage, render]);

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
        setProductsCount(response.data.TotalProducts);
        setActiveListings(response.data.ActiveListings);
        setInactiveListings(response.data.InactiveListings);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  async function handleVisibilityChange(event, prodId) {
    const visibility = event.target.checked ? 1 : 0;

    try {
      const response = await productVendorInstance.put(
        `/visibility/${id}`,
        visibility,
        {
          params: {
            prodId: prodId,
          },
        }
      );
      if (response.status === 200) {
        // Update the visibility of the product in the state
        setProducts((prevProducts) => {
          const updatedProducts = prevProducts.map((product) => {
            if (product.Product.ProdId === prodId) {
              return {
                ...product,
                Visibility: visibility,
              };
            }
            return product;
          });
          return updatedProducts;
        });
        fetchProducts();
      }
    } catch (error) {
      setError(error.message);
    }
  }

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setSelectedProduct(null);
  };
  if (error) {
    <Alert severity="error">
      <AlertTitle>Error</AlertTitle>
      {error}
      Kindly refresh the page
    </Alert>;
  }
  return (
    <>
      <Heading
        productsCount={productsCount}
        ActiveListings={activeListings}
        InactiveListings={inactiveListings}
      />
      {products.length ? (
        <>
          <div style={{ marginBlockStart: "20px" }}>
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
                  width: isMobile ? "auto" : "90%",
                  border: " 2px solid #f5f5f5 ",
                  borderRadius: "10px",
                }}
              >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
                    <TableRow>
                      <TableCell id="table-heading"></TableCell>
                      <TableCell align="left" id="table-heading">
                        Name
                      </TableCell>
                      <TableCell id="table-heading">Category</TableCell>
                      <TableCell id="table-heading">Price</TableCell>
                      <TableCell id="table-heading">Quantity</TableCell>
                      <TableCell id="table-heading">Base Price</TableCell>
                      <TableCell id="table-heading">Listing status</TableCell>
                      <TableCell id="table-heading">Edit</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product.Product.ProdId}>
                        <TableCell>
                          <img
                            src={product.Product.ImageURL}
                            style={{
                              height: "100px",
                              width: "auto",
                              borderRadius: "10px",
                              objectFit: "cover",
                              backgroundColor: "transparent",
                            }}
                            alt="product"
                          />
                        </TableCell>
                        <TableCell>{product.Product.ProdName}</TableCell>
                        <TableCell>{product.Product.Category}</TableCell>
                        <TableCell>{product.Price}</TableCell>
                        <TableCell>{product.Quantity}</TableCell>
                        <TableCell>{product.Product.Price}</TableCell>
                        <TableCell>
                          <Switch
                            checked={product.Visibility === 1}
                            onChange={(event) =>
                              handleVisibilityChange(
                                event,
                                product.Product.ProdId
                              )
                            }
                            inputProps={{ "aria-label": "controlled" }}
                          />
                        </TableCell>
                        <TableCell>
                          <EditOutlinedIcon
                            onClick={() => handleEditClick(product)}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
            <div
              style={{
                display: "inline",
                placeitems: "center",
                margin: "38px",
                position: "relative",
              }}
            >
              <Pagination
                count={totalPages}
                page={parseInt(currentPage)}
                onChange={(event, page) => setCurrentPage(page)}
                color="primary"
                disabled={!products.length}
                size="large"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              />
            </div>
          </div>
        </>
      ) : (
        <Alert sx={{ marginBlockStart: "10px" }} severity="info">
          <AlertTitle>No products</AlertTitle>
          You don't have any products listed. Click on{" "}
          <strong>New Product</strong> button to add a product.
        </Alert>
      )}
      <Dialog
        open={open}
        onClose={handleCloseDialog}
        sx={{
          "& .MuiPaper-root.MuiDialog-paper": {
            background: "rgba( 255, 255, 255, 0.05 )",
            boxShadow: " 0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
            backdropFilter: "blur( 3px )",
            WebkitBackdropFilter: "blur( 3px )",
            borderRadius: "10px",
            border: "1px solid rgba(255, 255, 255, 0.18)",
            minWidth: "80%",
          },
        }}
      >
        {selectedProduct && (
          <Product
            product={selectedProduct}
            vendorId={id}
            setOpen={setOpen}
            setRender={setRender}
          />
        )}
      </Dialog>

      {/* <Outlet /> */}
    </>
  );
};

export default Listings;
