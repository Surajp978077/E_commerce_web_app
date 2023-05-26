import React from "react";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function Heading() {
  return (
    <div>
      <h3
        style={{
          margin: "40px 30px 30px",
          fontSize: "40px",
          fontFamily: "Open Sans, 'sans-serif'",
        }}
      >
        Products
      </h3>
      <Button
        size="large"
        sx={{ margin: "8px 20px 0px" }}
        variant="contained"
        startIcon={<AddIcon />}
      >
        New Product
      </Button>
      <Divider sx={{ marginBlockStart: "20px" }}>
        <Chip label="PRODUCTS" />
      </Divider>
    </div>
  );
}
