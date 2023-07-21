import { useContext, useEffect } from "react";
import { VendorInfoContext } from "../../components/context_api/vendorInfo/VendorInfoContext";
import React, { useState } from "react";
import { TextField, Button, Grid, Typography, Card } from "@mui/material";
import ImagePlaceholder from "../../assets/images/ImagePlaceholder.png";

export default function AboutPage() {
  const { userInfo } = useContext(VendorInfoContext);
  const [name, setName] = useState(userInfo.UserName);
  const [gstin, setGstin] = useState(userInfo.vendor.GSTIN || "");
  const [pinCode, setPinCode] = useState(userInfo.vendor.DeliveryPinCode || "");
  const [imageUrl, setImageUrl] = useState(
    userInfo.vendor.VendorProfilePicURL || ""
  );
  const [previewImageUrl, setPreviewImageUrl] = useState(imageUrl);

  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
    setPreviewImageUrl(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create the profile object with form data
    const profileData = {
      name,
      gstin,
      pinCode,
      imageUrl,
    };

    // Call the API to submit the profile data
    // Replace the API endpoint and method with your actual implementation
    console.log(profileData);
    // axios.post("/api/profile", profileData)
    //   .then(response => {
    //     console.log("Profile submitted successfully", response.data);
    //   })
    //   .catch(error => {
    //     console.error("Error submitting profile", error);
    //   });
  };

  // const [userInfo1, setUserInfo1] = useState(userInfo);
  useEffect(() => {
    console.log(imageUrl);
  }, [imageUrl]);

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
            <Typography variant="h6">Profile Information</Typography>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                margin: "-10px",
              }}
            >
              <label htmlFor="name">Name : </label>
              <TextField
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                sx={{ width: "75%" }}
                required
                margin="normal"
                size="small"
              />
            </div>

            <TextField
              label="GSTIN"
              value={gstin}
              onChange={(e) => setGstin(e.target.value)}
              sx={{ width: "75%" }}
              required
              margin="normal"
            />
            <TextField
              label="Delivery Pin Code"
              value={pinCode}
              onChange={(e) => setPinCode(e.target.value)}
              sx={{ width: "75%" }}
              required
              margin="normal"
            />

            <div>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </div>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
