import { Button, TextField } from "@mui/material";
import React, { useState } from "react";

export default function AddNewFields(props) {
  const { optionalDetails, setOptionalDetails, handleCancel } = props;
  const [inputValue, setInputValue] = useState("");

  const handleAddField = () => {
    console.log(inputValue);
    console.log(optionalDetails);
    setOptionalDetails((prev) => {
      return {
        ...prev,
        [inputValue]: null,
      };
    });
    handleCancel();
    console.log(optionalDetails);
  };

  return (
    <div
      style={{
        display: "flex",
        alignContent: "center",
        justifyContent: "center",
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
