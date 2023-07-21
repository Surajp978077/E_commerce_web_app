import React, { useState } from "react";
import { TextField, Button, Grid, Typography } from "@mui/material";

const ProfileForm = () => {
  const [name, setName] = useState("");
  const [gstin, setGstin] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [previewImageUrl, setPreviewImageUrl] = useState("");

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

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6">Profile Picture</Typography>
          {previewImageUrl && (
            <img
              src={previewImageUrl}
              alt="Profile"
              style={{ width: "100%", maxHeight: "300px", objectFit: "cover" }}
            />
          )}
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h6">Profile Information</Typography>
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="GSTIN"
            value={gstin}
            onChange={(e) => setGstin(e.target.value)}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Delivery Pin Code"
            value={pinCode}
            onChange={(e) => setPinCode(e.target.value)}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Image URL"
            value={imageUrl}
            onChange={handleImageUrlChange}
            fullWidth
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default ProfileForm;
