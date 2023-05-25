import React from "react";
import { LOADING } from "../config/config";

export default function LoadingScreen() {
  return (
    <div className="loading-container">
      <img className="loading-image" src={LOADING} alt="loading" />
    </div>
  );
}
