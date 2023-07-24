import { useContext, useEffect } from "react";
import { VendorInfoContext } from "../../components/context_api/vendorInfo/VendorInfoContext";
import React, { useState } from "react";
import { TextField, Button, Grid, Typography, Card } from "@mui/material";
import ImagePlaceholder from "../../assets/images/ImagePlaceholder.png";

export default function AboutPage() {
  const { userInfo } = useContext(VendorInfoContext);
  const [ProfileData, setProfileData] = useState({
    UserId: userInfo.UserId,
    UserName: userInfo.UserName,
    Email: userInfo.Email,
    Role: userInfo.Role,
    Phone: userInfo.Phone,
    AddressId: userInfo.AddressId,
    Address: {
      AddressId: 0,
      Street: userInfo.Address.Street,
      City: userInfo.Address.City,
      State: userInfo.Address.State,
      Pincode: userInfo.Address.Pincode,
    },
  });
  const [imageUrl, setImageUrl] = useState(
    userInfo.vendor.VendorProfilePicURL || ""
  );
  const [isEdited, setIsEdited] = useState(false);

  const address = {
    Street: userInfo.Address.Street,
    City: userInfo.Address.City,
    State: userInfo.Address.State,
    PinCode: userInfo.Address.Pincode,
  };

  const userInformation = {
    Name: userInfo.UserName,
    GSTIN: userInfo.vendor.GSTIN || "",
    DeliveryPinCode: userInfo.vendor.DeliveryPinCode || "",
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Call the API to submit the profile data
    // Replace the API endpoint and method with your actual implementation

    // axios.post("/api/profile", profileData)
    //   .then(response => {
    //     console.log("Profile submitted successfully", response.data);
    //   })
    //   .catch(error => {
    //     console.error("Error submitting profile", error);
    //   });
  };

  // const [userInfo1, setUserInfo1] = useState(userInfo);

  return (
    <div
      style={{
        minHeight: "100vh",
      }}
    >
      <form onSubmit={handleSubmit}>
        <Grid
          container
          spacing={2}
          sx={{
            margin: "10px 0",
            padding: "40px 40px 40px 0",
          }}
        >
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
              borderRadius: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                marginBottom: "10px",
              }}
            >
              <TextField
                required
                id="outlined-required"
                label="Image URL"
                value={imageUrl ? imageUrl : ""}
                name="ImageURL"
                size="small"
                variant="outlined"
                sx={{ width: "75%" }}
                onChange={(event) => {
                  setImageUrl(event.target.value);
                }}
                error={!Boolean(imageUrl)}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "300px",
                width: "300px",
                borderRadius: "50%", // Make the container div circular
                overflow: "hidden", // Clip the image to the container shape
              }}
            >
              <img
                src={imageUrl ? imageUrl : ImagePlaceholder}
                style={{
                  width: imageUrl ? "100%" : "70%",
                  height: imageUrl ? "100%" : "70%",
                  objectFit: "cover",
                  opacity: imageUrl ? "1" : "0.50",
                }}
                alt="Profile Pic"
                onError={(e) => {
                  e.target.src = ImagePlaceholder;
                }}
                loading="lazy"
              />
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Profile Information :</Typography>
            <Grid container>
              {Object.keys(userInformation).map((key, index) => (
                <Grid item sm={12} key={index}>
                  <TextField
                    label={key}
                    value={userInformation[key]}
                    // onChange={(e) => setName(e.target.value)}
                    sx={{ width: "75%" }}
                    // fullWidth
                    required={key === "Name"}
                    margin="normal"
                    size="small"
                  />
                </Grid>
              ))}
            </Grid>
            <Typography variant="h6">Address :</Typography>
            <Grid container>
              {Object.keys(address).map((key, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <TextField
                    label={key}
                    value={address[key]}
                    sx={{ width: "75%" }}
                    required
                    margin="normal"
                    size="small"
                  />
                </Grid>
              ))}
            </Grid>
            <div>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={!isEdited}
              >
                Submit
              </Button>
            </div>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
