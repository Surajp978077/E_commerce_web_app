import React from "react";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import { fonts } from "../../config/config";

export default function Heading() {
  return (
    <div>
      <h3
        style={{
          margin: "40px 30px 30px",
          fontSize: "40px",
          fontFamily: fonts.main,
        }}
      >
        Listing managment
      </h3>
      <Button
        size="large"
        sx={{ margin: "8px 20px 0px" }}
        variant="contained"
        startIcon={<AddIcon />}
      >
        <Link
          to="/listings/new-product"
          style={{ textDecoration: "none", color: "white" }}
        >
          New Product
        </Link>
      </Button>
      <Divider sx={{ marginBlockStart: "20px" }}>
        <Chip label="PRODUCTS" />
      </Divider>
    </div>
  );
}
