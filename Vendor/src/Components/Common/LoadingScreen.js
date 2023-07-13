import React from "react";
import { LOADING } from "../../config/config";
import { Typography } from "@mui/material";

export default function LoadingScreen() {
  return (
    <div className="loading-container">
      <img className="loading-image" src={LOADING} alt="loading" />

      <Typography variant="h5" align="center">
        Loading...
      </Typography>
    </div>
  );
}
