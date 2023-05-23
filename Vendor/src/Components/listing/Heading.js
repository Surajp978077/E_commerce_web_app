import React from "react";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import { Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function Heading() {
  return (
    <div>
      <Typography variant="h4" style={{ marginBlockEnd: "50px" }}>
        PRODUCTS
      </Typography>
      <Button
        size="large"
        sx={{ margin: "0 10px" }}
        variant="contained"
        startIcon={<AddIcon />}
      >
        New Product
      </Button>
      <Divider>
        <Chip label="PRODUCTS" />
      </Divider>
    </div>
  );
}
