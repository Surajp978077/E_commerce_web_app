import React, { useState, useContext, useEffect } from "react";
import { UserInfoContext } from "../userInfo/UserInfoContext";
import { vendorInstance } from "../../api/axios";
import { Container, Grid, Alert } from "@mui/material";
import VendorForm from "./VendorForm";
import { Skeleton } from "@mui/material";
import ErrorPage from "../ErrorPage";

function Home() {
  const [vendor, setVendor] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isVendorCreated, setIsVendorCreated] = useState(false);
  const { userInfo, setUserInfo } = useContext(UserInfoContext);
  const [nullFields, setNullFields] = useState([]);
  const [isAnyFieldNull, setIsAnyFieldNull] = useState(false);
  const [isVendorSet, setIsVendorSet] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await vendorInstance.get(`/${userInfo.UserId}`);
        if (response && response.data) {
          setVendor(response.data);

          setIsVendorSet(false);
        }
      } catch (error) {
        setVendor(null);
        setErrorMessage(error.response.data.message);
        if (error.request.status === 404) {
          if (!isVendorCreated) {
            newVendor();
            setIsVendorCreated(true);
          }
        } else {
          setErrorMessage(
            error.response.status +
              "Error occurred while fetching vendor info, make sure API is working"
          );
        }
      }
    };
    const newVendor = async () => {
      try {
        // Posting the new vendor data in database by using the user id column
        const response = await vendorInstance.post(`/${userInfo.UserId}`, {});
        setVendor(response.data);

        setIsVendorCreated(true);
      } catch (error) {
        setVendor(null);
        setErrorMessage("Error occurred while creating new vendor");
      }
    };

    fetchData();
  }, [userInfo.UserId, isVendorCreated]);

  // Had to seperate these two useeffect because of async behaviour of post and get methods of JS
  useEffect(() => {
    const updateUserInfo = () => {
      setUserInfo((prevUserInfo) => ({
        ...prevUserInfo,
        vendor: {
          vendorId: vendor.Id,
          GSTIN: vendor.GSTIN,
          DeliveryPinCode: vendor.DeliveryPinCode,
        },
      }));
      setIsVendorSet(true);
    };

    if (
      vendor &&
      JSON.stringify(userInfo.vendor) !== JSON.stringify(vendor) &&
      !isVendorSet
    ) {
      updateUserInfo();
    }

    // Calculate nullFields with updated values
    const fields = userInfo.vendor ? Object.keys(userInfo.vendor) : [];
    const nullFields = fields.filter(
      (field) => userInfo.vendor[field] === null || userInfo.vendor[field] === 0
    );

    // Set the updated values in state
    // setVendorFields(fields);
    setNullFields(nullFields);
    setIsAnyFieldNull(
      userInfo.vendor &&
        Object.values(userInfo.vendor).some(
          (value) => value === null || value === 0
        )
    );
  }, [userInfo.vendor, vendor, isVendorSet, setUserInfo]);

  if (errorMessage) {
    return (
      <ErrorPage title="Error !! " desc={errorMessage} homeButton={true} />
    );
  }

  return userInfo.vendor ? (
    <Container>
      <Grid container spacing={2}>
        {isAnyFieldNull ? (
          <>
            <Alert severity="info" sx={{ marginTop: "30px", width: "100vw" }}>
              Please complete your profile by filling up these details.
            </Alert>
            {nullFields.map((field) => (
              <VendorForm
                field={field}
                key={field}
                label={field}
                setVendor={setVendor}
                vendor={vendor}
                setIsVendorSet={setIsVendorSet}
              />
            ))}
          </>
        ) : (
          <Alert
            severity="success"
            sx={{ marginTop: "40px", height: "70px", width: "100vw" }}
          >
            <strong> Congratulations!</strong> Your profile details are all
            filled in
          </Alert>
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
        marginTop: "12px",
        marginLeft: "8%",
        bgcolor: "#e8e9eb",
        borderRadius: "5px",
      }}
    />
  );
}

export default Home;
