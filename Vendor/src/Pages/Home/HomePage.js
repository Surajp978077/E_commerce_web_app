import React, { useState, useContext, useEffect } from "react";
import { productVendorInstance } from "../../api/axios";
import { Container, Grid, Alert } from "@mui/material";
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

function Home() {
  const [errorMessage, setErrorMessage] = useState("");
  const { vendor, setIsVendorSet, setVendor, userInfo } =
    useContext(VendorInfoContext);
  const [nullFields, setNullFields] = useState([]);
  const [isAnyFieldNull, setIsAnyFieldNull] = useState(false);
  const [lowQuantityItems, setLowQuantityItems] = useState([]);
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
          "Error occurred while fetching low quantity items:" + error
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

  if (errorMessage) {
    return <ErrorPage title="Error !! " desc={errorMessage} showHome={true} />;
  }

  return userInfo.vendor ? (
    <Container sx={{ marginTop: "30px", minHeight: "100vh" }}>
      <Grid container spacing={2}>
        {isAnyFieldNull && (
          <>
            <Alert severity="info" sx={{ width: "100vw" }}>
              Please complete your profile by filling up these details.
            </Alert>
            <div style={{ width: "100%", display: "flex" }}>
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
            </div>
          </>
        )}
        {lowQuantityItems.length > 0 && (
          <Card
            sx={{
              margin: "5px 0 0 15px",
              width: "500px",
              backgroundColor: "",
              border: "1px solid grey",
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
                {lowQuantityItems.length} items are running low on stock!
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
                  height: "200px",
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
      </Grid>
    </Container>
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
  );
}

export default Home;
