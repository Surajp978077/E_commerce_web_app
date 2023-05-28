import * as React from "react";
import Box from "@mui/material/Box";
import { Button } from "@mui/material/";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";

export default function SimplePaper() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    // You can access the form values using e.target.elements
    // For example: const name = e.target.elements.name.value;
  };

  return (
    <>
      <Box
        sx={{ display: "flex", flexWrap: "wrap", margin: "20px", gap: "2%" }}
      >
        <Card
          style={{
            width: "28%",
            height: "500px",
            backgroundColor: "#ebeae8",
            borderRadius: "20px",
          }}
        >
          product-IMAGE
        </Card>
        <Card
          id="form"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            width: "70%",
            backgroundColor: "#ebeae8",
            borderRadius: "20px",
            padding: "10px",
            position: "relative",
          }}
        >
          <form onSubmit={handleSubmit}>
            <div style={{ m: 1, display: "flex", gap: "10px" }}>
              <TextField
                id="standard-basic"
                label="Name"
                variant="standard"
                required
                sx={{ flex: 1 }}
              />
            </div>
            <div style={{ m: 1, display: "flex", gap: "10px" }}>
              <TextField
                required
                fullWidth
                id="standard-multiline-static"
                label="Description"
                multiline
                rows={4}
                variant="standard"
              />
            </div>
            <div style={{ m: 1, display: "flex", gap: "10px" }}>
              <FormControl required fullWidth sx={{ m: 1 }} variant="standard">
                <InputLabel htmlFor="standard-adornment-amount">
                  Amount
                </InputLabel>
                <Input
                  id="standard-adornment-amount"
                  startAdornment={
                    <InputAdornment position="start">₹</InputAdornment>
                  }
                />
              </FormControl>
              <TextField
                required
                fullWidth
                sx={{ m: 1 }}
                id="standard-number"
                label="Number"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="standard"
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                position: "absolute",
                bottom: "10px",
                right: "10px",
              }}
            >
              <Button variant="contained" type="submit">
                Submit
              </Button>
            </div>
          </form>
        </Card>
      </Box>
    </>
  );
}
