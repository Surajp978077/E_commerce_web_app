import { useContext, useEffect } from "react";
import { VendorInfoContext } from "../../components/context_api/vendorInfo/VendorInfoContext";
import React, { useState } from "react";
import { TextField, Button, Grid, Typography, Card } from "@mui/material";
import ImagePlaceholder from "../../assets/images/ImagePlaceholder.png";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { userInfoInstance, vendorInstance } from "../../api/axios";

export default function AboutPage() {
  const { userInfo, setUserInformation, setUserInfoUpdated } =
    useContext(VendorInfoContext);
  const [ProfileData, setProfileData] = useState({
    User: {
      UserName: userInfo.UserName,
      Phone: userInfo.Phone,
      ProfilePicURL: userInfo.ProfilePicURL || "",
      Address: {
        Street: userInfo.Address.Street,
        City: userInfo.Address.City,
        State: userInfo.Address.State,
        Pincode: userInfo.Address.Pincode,
      },
    },
    vendor: {
      VendorId: userInfo.vendor.VendorId,
      Name: userInfo.vendor.VendorName,
      GSTIN: userInfo.vendor.GSTIN,
      DeliveryPinCode: userInfo.vendor.DeliveryPinCode || 0,
    },
  });
  const [imageUrl, setImageUrl] = useState(userInfo.ProfilePicURL || "");
  const [isEdited, setIsEdited] = useState(false);
  const [ispasswordValid, setIsPasswordValid] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [currentPasswordErrorMessage, setCurrentPasswordErrorMessage] =
    useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [newPasswordErrorMessage, setNewPasswordErrorMessage] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [showConfirmedPassword, setShowConfirmedPassword] = useState(false);
  const [confirmedPasswordErrorMessage, setConfirmedPasswordErrorMessage] =
    useState("");

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleCurrentPasswordChange = (e) => {
    var newPassword = e.target.value;
    setNewPassword(newPassword);
    if (newPassword && !passwordRegex.test(newPassword)) {
      setNewPasswordErrorMessage(
        "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one digit, and one special character"
      );
      setIsPasswordValid(false);
    } else {
      setNewPasswordErrorMessage("");
      setIsPasswordValid(
        newPassword === confirmedPassword && currentPassword !== ""
          ? true
          : false
      );
    }

    if (newPassword === confirmedPassword) {
      setConfirmedPasswordErrorMessage("");
    }
  };

  useEffect(() => {
    if (currentPassword === "") {
      setIsPasswordValid(false);
    } else {
      setCurrentPasswordErrorMessage("");
      setIsPasswordValid(newPassword === confirmedPassword ? true : false);
    }
  }, [currentPassword]);

  const handleConfirmPasswordChange = (e) => {
    var confirmedPassword = e.target.value;
    setConfirmedPassword(confirmedPassword);
    if (newPasswordErrorMessage !== "") {
      setIsPasswordValid(false);
      return;
    }
    if (confirmedPassword !== newPassword) {
      setConfirmedPasswordErrorMessage("Passwords do not match");
      setIsPasswordValid(false);
    } else {
      setConfirmedPasswordErrorMessage("");
      setIsPasswordValid(newPasswordErrorMessage === "" ? true : false);
    }
  };

  const [dialogOpen, setDialogOpen] = useState(false);
  console.log("userInfo", userInfo);
  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUserInfoUpdated(true);
    try {
      const response = await userInfoInstance.put(
        `UpdateVendorInfo/${userInfo.UserId}`,
        ProfileData.User
      );
      console.log("response", response);
      if (response && response.data) {
        setUserInfoUpdated(true);
        console.log("Profile submitted successfully");

        try {
          const response = await vendorInstance.put(
            "updateVendorProfile",
            ProfileData.vendor
          );
          console.log("response", response);
          if (response && response.data) {
            setUserInfoUpdated(true);
            console.log("Vendor profile submitted successfully");
            setIsEdited(false);
            window.location.reload();
          }
        } catch (error) {
          console.log("error", error);
        }
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleSubmitPassword = async (e) => {
    e.preventDefault();
    if (!currentPassword) {
      setCurrentPasswordErrorMessage("Please enter the current password.");
      return;
    }

    if (!newPassword || !confirmedPassword) {
      setNewPasswordErrorMessage("Please enter a new password.");
      setConfirmedPasswordErrorMessage("Please confirm the new password.");
      return;
    }

    if (newPassword !== confirmedPassword) {
      setConfirmedPasswordErrorMessage("Passwords do not match.");
      return;
    }

    try {
      const response = await userInfoInstance.put("UpdatePassword", {
        UserId: userInfo.UserId,
        CurrentPassword: currentPassword,
        NewPassword: newPassword,
      });

      if (response && response.data) {
        console.log("Password updated successfully");
        setDialogOpen(false);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmedPassword("");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setCurrentPasswordErrorMessage(error.response.data);
      } else {
        setCurrentPasswordErrorMessage("Error updating password");
      }
    }
  };

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
                value={ProfileData.User.ProfilePicURL}
                name="ImageURL"
                size="small"
                variant="outlined"
                sx={{ width: "75%" }}
                onChange={(event) => {
                  setIsEdited(true);
                  setProfileData(() => ({
                    ...ProfileData,
                    User: {
                      ...ProfileData.User,
                      ProfilePicURL: event.target.value,
                    },
                  }));
                }}
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
                src={
                  ProfileData.User.ProfilePicURL
                    ? ProfileData.User.ProfilePicURL
                    : ImagePlaceholder
                }
                style={{
                  width: ProfileData.User.ProfilePicURL ? "100%" : "70%",
                  height: ProfileData.User.ProfilePicURL ? "100%" : "70%",
                  objectFit: "cover",
                  opacity: ProfileData.User.ProfilePicURL ? "1" : "0.50",
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
              {Object.keys(ProfileData.User).map((key, index) =>
                key === "Address" || key === "ProfilePicURL" ? (
                  ""
                ) : (
                  <Grid item sm={12} key={index}>
                    <TextField
                      label={key}
                      value={ProfileData.User[key] || ""}
                      onChange={(e) => {
                        setIsEdited(true);
                        setProfileData(() => ({
                          ...ProfileData,
                          User: { ...ProfileData.User, [key]: e.target.value },
                        }));
                      }}
                      sx={{ width: "75%" }}
                      // fullWidth
                      required={key === "Name"}
                      margin="normal"
                      size="small"
                      type={key === "Phone" ? "number" : "text"}
                    />
                  </Grid>
                )
              )}
            </Grid>
            <Grid container>
              {Object.keys(ProfileData.vendor).map((key, index) =>
                key === "VendorId" || key === "Name" ? (
                  ""
                ) : (
                  <Grid item sm={12} key={index}>
                    <TextField
                      label={key}
                      value={ProfileData.vendor[key] || ""}
                      onChange={(e) => {
                        console.log(ProfileData.vendor);
                        setIsEdited(true);
                        setProfileData(() => ({
                          ...ProfileData,
                          vendor: {
                            ...ProfileData.vendor,
                            [key]: e.target.value,
                          },
                        }));
                      }}
                      sx={{ width: "75%" }}
                      // fullWidth
                      required={key === "Name"}
                      margin="normal"
                      size="small"
                      type={key === "DeliveryPinCode" ? "number" : "text"}
                    />
                  </Grid>
                )
              )}
            </Grid>
            <Typography variant="h6">Address :</Typography>
            <Grid container>
              {Object.keys(ProfileData.User.Address).map((key, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <TextField
                    label={key}
                    value={ProfileData.User.Address[key] || ""}
                    onChange={(e) => {
                      setIsEdited(true);
                      setProfileData(() => ({
                        ...ProfileData,
                        User: {
                          ...ProfileData.User,
                          Address: {
                            ...ProfileData.User.Address,
                            [key]: e.target.value,
                          },
                        },
                      }));
                    }}
                    sx={{ width: "75%" }}
                    required
                    margin="normal"
                    size="small"
                  />
                </Grid>
              ))}
            </Grid>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "20px",
              }}
            >
              <Button
                variant="contained"
                color="success"
                onClick={handleDialogOpen}
              >
                Change password
              </Button>
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
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        sx={{
          "& .MuiDialog-paper": {
            width: "30vw",
            minWidth: "300px",
            borderRadius: "20px",
          },
        }}
      >
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{
              color: "red",
              marginBottom: "10px",
            }}
          >
            Enter your current password and new password
          </DialogContentText>
          <FormControl
            error={Boolean(currentPasswordErrorMessage)}
            sx={{ margin: 1, width: "100%" }}
          >
            <InputLabel htmlFor="Current password">Current Password</InputLabel>
            <OutlinedInput
              id="Current password"
              fullWidth
              type={showCurrentPassword ? "text" : "password"}
              onChange={(e) => {
                setCurrentPassword(e.target.value);
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => {
                      setShowCurrentPassword((show) => !show);
                    }}
                    onMouseDown={(e) => e.preventDefault()}
                    edge="end"
                  >
                    {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              aria-describedby="component-error-text"
              label="Current Password"
            />
            <FormHelperText id="component-error-text">
              {currentPasswordErrorMessage}
            </FormHelperText>
          </FormControl>
          <FormControl
            error={Boolean(newPasswordErrorMessage)}
            sx={{ margin: 1, width: "100%" }}
          >
            <InputLabel htmlFor="New password">New Password</InputLabel>
            <OutlinedInput
              id="New password"
              fullWidth
              type={showNewPassword ? "text" : "password"}
              onChange={handleCurrentPasswordChange}
              value={newPassword}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => {
                      setShowNewPassword((show) => !show);
                    }}
                    onMouseDown={(e) => e.preventDefault()}
                    edge="end"
                  >
                    {showNewPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              aria-describedby="component-error-text"
              label="New Password"
            />
            <FormHelperText id="component-error-text">
              {newPasswordErrorMessage}
            </FormHelperText>
          </FormControl>
          <FormControl
            error={Boolean(confirmedPasswordErrorMessage)}
            variant="outlined"
            sx={{ margin: 1, width: "100%" }}
          >
            <InputLabel htmlFor="Confirm password">Confirm Password</InputLabel>
            <OutlinedInput
              id="Confirm password"
              fullWidth
              type={showConfirmedPassword ? "text" : "password"}
              onChange={handleConfirmPasswordChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => {
                      setShowConfirmedPassword((show) => !show);
                    }}
                    onMouseDown={(e) => e.preventDefault()}
                    edge="end"
                  >
                    {showConfirmedPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              aria-describedby="component-error-text"
              label="Confirm Password"
            />
            <FormHelperText id="component-error-text">
              {confirmedPasswordErrorMessage}
            </FormHelperText>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleSubmitPassword} disabled={!ispasswordValid}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
