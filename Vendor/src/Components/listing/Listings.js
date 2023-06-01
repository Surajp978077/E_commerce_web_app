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
} from "@mui/material/";
import { useContext } from "react";
import { UserInfoContext } from "../userInfo/UserInfoContext";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useNavigate, useLocation } from "react-router-dom";
import ErrorPage from "../ErrorPage";

const Listings = () => {
  const pageSize = 5;
  const [currentPage, setCurrentPage] = useState(
    sessionStorage.getItem("listingPage") || 1
  );
  const [totalPages, setTotalPages] = useState(0);
  const [products, setProducts] = useState([]);
  const { userInfo } = useContext(UserInfoContext);
  const id = userInfo.vendor.vendorId;
  const navigate = useNavigate();
  const location = useLocation();

  const [error, setError] = useState("");

  useEffect(() => {
    fetchProducts();
    sessionStorage.setItem("listingPage", currentPage);
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
      setError(error);
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
      }
    } catch (error) {
      setError(error);
    }
  }

  if (error) {
    return (
      <ErrorPage
        desc="Looks like something did not go as planned. Go back to the Login or Home page."
        showHome={true}
      />
    );
  }

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
                border: " 2px solid #f5f5f5 ",
                borderRadius: "10px",
              }}
            >
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead
                  sx={{
                    backgroundColor: "#f5f5f5",
                  }}
                >
                  <TableRow>
                    <TableCell id="table-heading"></TableCell>
                    <TableCell align="left" id="table-heading">
                      Name
                    </TableCell>
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
                            objectFit: "cover", // Ensures the image covers the entire container
                            backgroundColor: "transparent",
                          }}
                          alt="product"
                        />
                      </TableCell>
                      <TableCell>{product.Product.ProdName}</TableCell>
                      <TableCell>{product.Price}</TableCell>
                      <TableCell>{product.Quantity}</TableCell>
                      <TableCell>{product.Product.Price}</TableCell>
                      <TableCell>
                        <Switch
                          checked={product.Visibility === 1 ? true : false}
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
                          onClick={() =>
                            navigate(
                              `${location.pathname}/products/${product.Product.ProdId}`,
                              {
                                state: { product: product, vendorId: id },
                              }
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
              onChange={(event, page) => setCurrentPage(page)} // event is required even though it is not used, because the onChange function expects it, otherwise it throws an error
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
      ) : (
        <Alert sx={{ marginBlockStart: "10px" }} severity="info">
          <AlertTitle>No products</AlertTitle>
          You don't have any products listed. Click on{" "}
          <strong>New Product</strong> button to add a product.
        </Alert>
      )}
    </>
  );
};

export default Listings;
