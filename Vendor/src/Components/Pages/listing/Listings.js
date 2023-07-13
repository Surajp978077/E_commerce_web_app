import React, { useState, useEffect } from "react";
import { vendorInstance, productVendorInstance } from "../../../api/axios";
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
  Badge,
  CircularProgress,
} from "@mui/material/";
import Snackbar from "@mui/material/Snackbar";
import { useContext } from "react";
import { VendorInfoContext } from "../../context_api/vendorInfo/VendorInfoContext";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import Product from "./Product";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useRef } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import ListingInProgress from "./ListingInProgress";
import LoadingScreen from "../LoadingScreen";

const Listings = () => {
  const pageSize = 5;
  const [totalPages, setTotalPages] = useState(0);
  const [products, setProducts] = useState([]);
  const { userInfo, rejectedStatusCount } = useContext(VendorInfoContext);
  const id = userInfo.vendor.VendorId;
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false); // For the dialog
  const [openSnackbar, setOpenSnackbar] = useState(false); // For the snackbar
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false); // For the snackbar error
  const [selectedProduct, setSelectedProduct] = useState(null); // Track the selected product for the Dialog
  const [productsCount, setProductsCount] = useState(null);
  const [activeListings, setActiveListings] = useState(null);
  const [inactiveListings, setInactiveListings] = useState(null);
  const [render, setRender] = useState(false); // To re-render the component when the product is edited and closed the dialog
  const sortBy = useRef(null);
  const [isLoading, setIsLoading] = useState(true); // Loading state variable
  const [currentPage, setCurrentPage] = useState(
    sessionStorage.getItem("listingPage") || 1
  );

  const sortOrder = useRef(null);
  const [tabValue, setTabValue] = useState(
    sessionStorage.getItem("listingTab") || "1"
  );

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
    sessionStorage.setItem("listingTab", newValue);
  };

  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    fetchProducts();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    sessionStorage.setItem("listingPage", currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, render]);

  const fetchProducts = async () => {
    try {
      const response = await vendorInstance.get(`/${id}/products`, {
        params: {
          page: currentPage,
          pageSize: pageSize,
          sortBy: sortBy.current ? sortBy.current : null, // Sort by name or visibility
          sortOrder: sortOrder.current ? sortOrder.current : null, // Sort order (asc or desc)
        },
      });
      if (response && response.data) {
        setProducts(response.data.Products);
        setCurrentPage(
          sessionStorage.getItem("listingPage") <= response.data.TotalPages
            ? parseInt(sessionStorage.getItem("listingPage"))
            : 1
        );

        setTotalPages(response.data.TotalPages);
        setProductsCount(response.data.TotalProducts);
        setActiveListings(response.data.ActiveListings);
        setInactiveListings(response.data.InactiveListings);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
      setOpenErrorSnackbar(true);
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
      setOpenErrorSnackbar(true);
    }
  }

  function handleSort(column) {
    const newSortOrder = sortOrder.current === "asc" ? "desc" : "asc";
    sortOrder.current = newSortOrder;
    sortBy.current = column;
    fetchProducts();
  }

  function clearSort() {
    sortBy.current = null;
    sortOrder.current = null;
    fetchProducts();
  }

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setSelectedProduct(null);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
    setOpenErrorSnackbar(false);
  };

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
      <Snackbar
        open={openErrorSnackbar}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Error: {error}
        </Alert>
      </Snackbar>
      <Heading
        productsCount={productsCount}
        ActiveListings={activeListings}
        InactiveListings={inactiveListings}
        setRender={setRender}
        setOpenSnackbar={setOpenSnackbar}
        setOpen={setOpen}
      />
      <Box
        sx={{ width: "100%", typography: "body1", marginBlockStart: "20px" }}
      >
        <TabContext value={tabValue}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="My listings" value="1" />
              <Tab
                label={
                  <Badge
                    badgeContent={rejectedStatusCount}
                    color="primary"
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    sx={{
                      "& .MuiBadge-badge": {
                        backgroundColor: "#f44336",
                        color: "#fff",
                        display: "flex",
                        left: "90%",
                        top: "40%",
                      },
                    }}
                  >
                    <span
                      style={{
                        marginRight: "15px",
                      }}
                    >
                      {" "}
                      Listing in progress
                    </span>
                  </Badge>
                }
                value="2"
              />
            </TabList>
          </Box>
          <TabPanel value="1">
            {isLoading && (
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
            )}
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
                        minWidth: isMobile ? "auto" : "auto",
                        maxWidth: isMobile ? "auto" : "auto",
                        border: " 2px solid #f5f5f5 ",
                        borderRadius: "10px",
                      }}
                    >
                      <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
                          <TableRow>
                            <TableCell
                              id="table-heading"
                              sx={{
                                width: "10%",
                              }}
                            ></TableCell>

                            <TableCell
                              id="table-heading"
                              sx={{
                                width: "20%",
                              }}
                            >
                              <span
                                onClick={() => handleSort("name")}
                                style={{
                                  marginRight: "5px",
                                  fontWeight: "bold",
                                  fontSize: "15px",
                                  cursor: "pointer",
                                }}
                              >
                                Name
                              </span>
                              {sortBy.current === "name" &&
                                (sortOrder.current === "asc" ? (
                                  <span
                                    onClick={() => handleSort("name")}
                                    style={{ cursor: "pointer" }}
                                  >
                                    {" "}
                                    ▲{" "}
                                  </span>
                                ) : (
                                  <span
                                    onClick={() => handleSort("name")}
                                    style={{ cursor: "pointer" }}
                                  >
                                    {" "}
                                    ▼{" "}
                                  </span>
                                ))}
                              {sortBy.current === "name" && (
                                <ClearIcon
                                  onClick={clearSort}
                                  sx={{ cursor: "pointer", width: "20px" }}
                                />
                              )}
                            </TableCell>

                            <TableCell
                              id="table-heading"
                              sx={{
                                width: "20%",
                              }}
                            >
                              <span
                                style={{
                                  marginRight: "5px",
                                  fontWeight: "bold",
                                  // fontFamily: fonts.tertiary,
                                  fontSize: "15px",
                                }}
                              >
                                Category
                              </span>
                            </TableCell>

                            <TableCell
                              id="table-heading"
                              align="center"
                              sx={{
                                // justifyContent: "center",
                                padding: "16px 10px",
                                width: "10%",
                              }}
                            >
                              <span
                                onClick={() => handleSort("price")}
                                style={{
                                  fontWeight: "bold",
                                  cursor: "pointer",
                                }}
                              >
                                Price (₹)
                              </span>
                              {sortBy.current === "price" &&
                                (sortOrder.current === "asc" ? (
                                  <span
                                    onClick={() => handleSort("price")}
                                    style={{ cursor: "pointer" }}
                                  >
                                    {" "}
                                    ▲{" "}
                                  </span>
                                ) : (
                                  <span
                                    onClick={() => handleSort("price")}
                                    style={{ cursor: "pointer" }}
                                  >
                                    {" "}
                                    ▼{" "}
                                  </span>
                                ))}
                              {sortBy.current === "price" && (
                                <ClearIcon
                                  onClick={clearSort}
                                  sx={{ cursor: "pointer", width: "20px" }}
                                />
                              )}
                            </TableCell>

                            <TableCell
                              id="table-heading"
                              align="center"
                              sx={{
                                padding: "16px",
                                width: "10%",
                              }}
                            >
                              <span
                                onClick={() => handleSort("quantity")}
                                style={{
                                  marginRight: "5px",
                                  fontWeight: "bold",
                                  cursor: "pointer",
                                }}
                              >
                                Stock
                              </span>
                              {sortBy.current === "quantity" &&
                                (sortOrder.current === "asc" ? (
                                  <span
                                    onClick={() => handleSort("quantity")}
                                    style={{ cursor: "pointer" }}
                                  >
                                    {" "}
                                    ▲{" "}
                                  </span>
                                ) : (
                                  <span
                                    onClick={() => handleSort("quantity")}
                                    style={{ cursor: "pointer" }}
                                  >
                                    {" "}
                                    ▼{" "}
                                  </span>
                                ))}
                              {sortBy.current === "quantity" && (
                                <ClearIcon
                                  onClick={clearSort}
                                  sx={{ cursor: "pointer", width: "20px" }}
                                />
                              )}
                            </TableCell>

                            <TableCell
                              id="table-heading"
                              align="center"
                              sx={{
                                padding: "16px",
                                width: "10%",
                              }}
                            >
                              <span
                                style={{
                                  // marginRight: "5px",
                                  fontWeight: "bold",
                                  width: "fit-content",
                                  // fontFamily: fonts.tertiary,
                                  fontSize: "15px",
                                }}
                              >
                                Base Price (₹)
                              </span>
                            </TableCell>

                            <TableCell
                              id="table-heading"
                              display="flex"
                              align="center"
                              width={"200px"}
                              sx={{
                                alignItems: "center",
                              }}
                            >
                              <span
                                onClick={() => handleSort("visibility")}
                                style={{
                                  marginRight: "5px",
                                  fontWeight: "bold",
                                  cursor: "pointer",
                                }}
                              >
                                Listing status
                              </span>
                              {sortBy.current === "visibility" &&
                                (sortOrder.current === "asc" ? (
                                  <span
                                    onClick={() => handleSort("visibility")}
                                    style={{ cursor: "pointer" }}
                                  >
                                    {" "}
                                    ▲{" "}
                                  </span>
                                ) : (
                                  <span
                                    onClick={() => handleSort("visibility")}
                                    style={{ cursor: "pointer" }}
                                  >
                                    {" "}
                                    ▼{" "}
                                  </span>
                                ))}
                              {sortBy.current === "visibility" && (
                                <ClearIcon
                                  onClick={clearSort}
                                  sx={{ cursor: "pointer", width: "20px" }}
                                />
                              )}
                            </TableCell>

                            <TableCell id="table-heading" align="center">
                              <span
                                style={{
                                  marginRight: "5px",
                                  fontWeight: "bold",
                                  // fontFamily: fonts.tertiary,
                                }}
                              >
                                Edit
                              </span>
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {products.map((product) => (
                            <TableRow key={product.Product.ProdId}>
                              <TableCell>
                                <img
                                  src={product.Product.ImageURL}
                                  style={{
                                    height: "75px",
                                    width: "75px",
                                    borderRadius: "10px",
                                    objectFit: "contain",
                                    backgroundColor: "transparent",
                                  }}
                                  alt="product"
                                />
                              </TableCell>

                              <TableCell width={"200px"}>
                                {product.Product.ProdName}
                              </TableCell>

                              <TableCell width={"200px"}>
                                {product.Product.Category}
                              </TableCell>

                              <TableCell align="right">
                                {/* {product.Price} */}
                                {product.Price.toLocaleString("en-in", {
                                  // style: "currency",
                                  // currency: "INR",
                                })}
                              </TableCell>

                              <TableCell align="right">
                                {product.Quantity}
                              </TableCell>

                              <TableCell align="right">
                                {product.Product.Price.toLocaleString("en-in")}
                              </TableCell>

                              <TableCell align="center">
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

                              <TableCell
                                sx={{
                                  cursor: "pointer",
                                }}
                                onClick={() => handleEditClick(product)}
                              >
                                <EditOutlinedIcon />
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
                  VendorId={id}
                  setOpen={setOpen}
                  setRender={setRender}
                  setOpenSnackbar={setOpenSnackbar}
                />
              )}
            </Dialog>
          </TabPanel>
          <TabPanel value="2">
            <ListingInProgress />
          </TabPanel>
          <TabPanel value="3">Item Three</TabPanel>
        </TabContext>
      </Box>
      {/* <Outlet /> */}
    </>
  );
};

export default Listings;
