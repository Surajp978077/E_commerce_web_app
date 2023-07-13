import { Button, TextField } from "@mui/material";
import React, { useState } from "react";

export default function AddNewFields(props) {
  const { setOptionalDetails, handleCancel } = props;
  const [inputValue, setInputValue] = useState("");

  const handleAddField = () => {
    setOptionalDetails((prev) => {
      return {
        ...prev,
        [inputValue]: null,
      };
    });
    handleCancel();
  };

  return (
    <div
      style={{
        display: "flex",
        alignContent: "center",
        justifyContent: "right",
      }}
    >
      <TextField
        id="outlined-basic"
        label="Add new field"
        variant="outlined"
        size="small"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
        sx={{ margin: "0 0 10px 10px" }}
      />

      <Button
        variant="text"
        sx={{ margin: "0 0 10px 10px" }}
        onClick={handleAddField}
      >
        Add
      </Button>
      <Button
        variant="text"
        color="error"
        sx={{ margin: "0 0 10px 10px" }}
        onClick={handleCancel}
      >
        Cancel
      </Button>
    </div>
  );
}
