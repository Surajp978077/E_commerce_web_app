import React, { useState, useContext, useEffect } from "react";
import { productVendorInstance, vendorInstance } from "../../api/axios";
import {
  Container,
  Grid,
  Alert,
  Table,
  ListItemIcon,
  ListItemButton,
  Stack,
} from "@mui/material";
import VendorForm from "./HomeVendorForm";
import { Skeleton } from "@mui/material";
import ErrorPage from "../../components/Common/ErrorPage";
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import { VendorInfoContext } from "../../components/context_api/vendorInfo/VendorInfoContext";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useNavigate } from "react-router-dom";
import {
  DraftsOutlined,
  InboxOutlined,
  PeopleAltOutlined,
} from "@mui/icons-material";

function Home() {
  const [errorMessage, setErrorMessage] = useState("");
  const {
    vendor,
    setIsVendorSet,
    setVendor,
    userInfo,
    rejectedStatusCount,
    pendingStatusCount,
  } = useContext(VendorInfoContext);
  const [nullFields, setNullFields] = useState([]);
  const [isAnyFieldNull, setIsAnyFieldNull] = useState(false);
  const [lowQuantityItems, setLowQuantityItems] = useState([]);
  const [activeListings, setActiveListings] = useState(0);
  const [inactiveListings, setInactiveListings] = useState(0);
  const [productsCount, setProductsCount] = useState(0);
  const [error, setError] = useState("");
  const [time, setTime] = useState(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLowQuantityItems = async () => {
      try {
        const response = await productVendorInstance.get(
          `/low-stock/${userInfo.vendor.VendorId}`
        );
        if (response && response.data) {
          setLowQuantityItems(response.data);
        }
      } catch (error) {
        setLowQuantityItems([]);
        setErrorMessage(
          "Error occurred while fetching low quantity items: " + error
        );
      }
    };
    fetchLowQuantityItems();
  }, [userInfo.vendor]);

  useEffect(() => {
    // Calculate nullFields with updated values
    const fields = userInfo.vendor ? Object.keys(userInfo.vendor) : [];
    const nullFields = fields.filter(
      (field) => userInfo.vendor[field] === null || userInfo.vendor[field] === 0
    );

    // Set the updated values in state
    setNullFields(nullFields);
    setIsAnyFieldNull(
      userInfo.vendor &&
        Object.values(userInfo.vendor).some(
          (value) => value === null || value === 0
        )
    );
  }, [userInfo.vendor, vendor]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await vendorInstance.get(
          `/${userInfo.vendor.VendorId}/products`,
          {
            params: {
              page: 1,
              pageSize: 0,
            },
          }
        );
        if (response && response.data) {
          setProductsCount(response.data.TotalProducts);
          setActiveListings(response.data.ActiveListings);
          setInactiveListings(response.data.InactiveListings);
          setTime(new Date());
        }
      } catch (error) {
        setError(error.message);
      }
    };
    fetchProducts();
  }, []);
  if (errorMessage) {
    return <ErrorPage title="Error!!" desc={errorMessage} showHome={true} />;
  }

  return (
    <Grid
      container
      sx={{
        minHeight: "100vh",
        backgroundColor: "white",
      }}
    >
      <Grid
        item
        xs={12}
        md={3}
        sx={{
          // borderRight: "1px solid grey",
          padding: "10px",
          // backgroundColor: "red",
        }}
      >
        {lowQuantityItems.length > 0 && (
          <Card
            sx={{
              backgroundColor: "",
              border: "1px solid grey",
              boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75)",
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                sx={{
                  color: "red",
                  fontWeight: "bold",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                {lowQuantityItems.length} item(s) are running low on stock!
                <OpenInNewIcon
                  sx={{
                    cursor: "pointer",
                    color: "black",
                  }}
                  onClick={() => {
                    navigate("/listings");
                  }}
                />
              </Typography>
              <List
                sx={{
                  overflowY: "auto",
                  maxHeight: "200px",
                }}
              >
                {lowQuantityItems.map((item) => (
                  <ListItem key={item.ProductId}>
                    <ListItemText
                      primary={item.ProdName}
                      secondary={`Quantity: ${item.Quantity}`}
                    />
                    <img
                      src={item.ImageURL}
                      alt={item.ProdName}
                      style={{
                        width: "70px",
                        height: "70px",
                        objectFit: "contain",
                      }}
                    />
                    <Divider />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        )}
        <div
          style={{
            width: "100%",
            height: "fit-content",
            backgroundColor: "white",
            marginTop: "10px",
            boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75)",
          }}
        >
          <Typography variant="h6" padding={1}>
            Useful Links
          </Typography>
          <Divider sx={{ backgroundColor: "black" }} />
          <List dense>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  navigate(`/listings/${2}`);
                }}
              >
                <ListItemIcon>
                  <InboxOutlined />
                </ListItemIcon>
                <ListItemText primary="Rejected products from QC" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <DraftsOutlined />
                </ListItemIcon>
                <ListItemText primary="Drafts" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <PeopleAltOutlined />
                </ListItemIcon>
                <ListItemText primary="Vendor community" />
              </ListItemButton>
            </ListItem>
          </List>
        </div>
      </Grid>

      <Grid
        item
        xs={12}
        md={6}
        sx={{
          // backgroundColor: "grey",
          padding: "10px",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "fit-content",
            border: "1px solid grey",
            boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75)",
            padding: "10px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6">Listings</Typography>
            <Typography
              variant="body2"
              sx={{
                color: "grey",
              }}
            >
              Last updated: {time.toLocaleString()}
            </Typography>
          </div>
          <Divider sx={{ backgroundColor: "black" }} />
          <Grid container spacing={2}>
            <Grid item sm>
              <Typography variant="h4" align="center">
                {activeListings}
              </Typography>
              <Typography variant="h6" align="center">
                Active Listings
              </Typography>
            </Grid>
            <Grid item sm>
              <Typography variant="h4" align="center">
                {inactiveListings}
              </Typography>
              <Typography variant="h6" align="center">
                Inactive Listings
              </Typography>
            </Grid>
            <Grid item sm>
              <Typography variant="h4" align="center">
                {productsCount}
              </Typography>
              <Typography variant="h6" align="center">
                Total Products
              </Typography>
            </Grid>
            <Grid item sm>
              <Typography variant="h4" align="center">
                {lowQuantityItems.length}
              </Typography>
              <Typography variant="h6" align="center">
                Low Stock Items
              </Typography>
            </Grid>
          </Grid>
        </div>

        <div
          style={{
            width: "100%",
            height: "fit-content",
            border: "1px solid grey",
            boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75)",
            padding: "10px",
            marginTop: "10px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6">Quality Control</Typography>
            <Typography
              variant="body2"
              sx={{
                color: "grey",
              }}
            >
              Last updated: {time.toLocaleString()}
            </Typography>
          </div>
          <Divider sx={{ backgroundColor: "black" }} />
          <Grid container spacing={2}>
            <Grid item sm>
              <Typography variant="h4" align="center">
                {pendingStatusCount}
              </Typography>
              <Typography variant="h6" align="center">
                Pending
              </Typography>
            </Grid>
            <Grid item sm>
              <Typography variant="h4" align="center">
                {rejectedStatusCount}
              </Typography>
              <Typography variant="h6" align="center">
                Rejected
              </Typography>
            </Grid>
          </Grid>
        </div>
      </Grid>

      <Grid
        item
        xs={12}
        md={3}
        sx={{
          padding: "10px",
        }}
      >
        {userInfo.vendor ? (
          isAnyFieldNull && (
            <>
              <Alert
                severity="info"
                sx={{ width: "100%", padding: "0 0 0 2px" }}
              >
                Please complete your profile by filling up these details.
              </Alert>

              {nullFields.map((field) => (
                <VendorForm
                  field={field}
                  key={field}
                  label={field}
                  vendor={vendor}
                  setIsVendorSet={setIsVendorSet}
                  setVendor={setVendor}
                />
              ))}
            </>
          )
        ) : (
          <Skeleton
            animation="wave"
            variant="rectangular"
            width={"500px"}
            height={"210px"}
            sx={{
              marginTop: "30px",
              marginLeft: "8%",
              bgcolor: "#e8e9eb",
              borderRadius: "5px",
            }}
          />
        )}
      </Grid>
    </Grid>

    // ) : (
    //   <Skeleton
    //     animation="wave"
    //     variant="rectangular"
    //     width={"500px"}
    //     height={"210px"}
    //     sx={{
    //       marginTop: "30px",
    //       marginLeft: "8%",
    //       bgcolor: "#e8e9eb",
    //       borderRadius: "5px",
    //     }}
    //   />
    // );
  );
}

export default Home;
