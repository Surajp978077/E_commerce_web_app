import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Collapse,
  IconButton,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import { ExpandMore as ExpandMoreIcon, Label } from "@mui/icons-material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Tooltip from "@mui/material/Tooltip";

// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function NewProduct(props) {
  const { categorySelected } = props;
  const [category, setCategory] = useState(categorySelected);
  const [imageURL, setImageURL] = useState(null);
  const [basicDetails, setBasicDetails] = useState(
    category.BasicDetails.reduce((result, key) => {
      result[key] = null;
      return result;
    }, {})
  );
  const [optionalDetails, setOptionalDetails] = useState(
    category.OptionalDetails.reduce((result, key) => {
      result[key] = null;
      return result;
    }, {})
  );

  const [productDetails, setProductDetails] = useState({
    ProdName: null,
    Description: null,
    Price: null,
    ImageURL: null,
    BasicDetails: {},
    OptionalDetails: {},
    CategoryId: category.CategoryId,
  });

  const handleChange = (index, value) => {
    setProductDetails((prev) => {
      return {
        ...prev,
        BasicDetails: {
          ...prev.BasicDetails,
          [index]: value,
        },
      };
    });
  };
  const nameanddescrptionChangeHandler = (event) => {
    const { name, value } = event.target;
    setProductDetails((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(inputValues);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          margin: "20px",
          gap: "2%",
        }}
      >
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "10px",
            width: "28%",
            height: "450px",
            borderRadius: "20px",
            position: "relative",
            padding: "20px",
          }}
        >
          <TextField
            required
            id="outlined-required"
            label="Required"
            defaultValue="Hello World"
            fullWidth
          />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <img
              src="https://images.squarespace-cdn.com/content/v1/5fd16ea5bd769522bedc068d/6a755ae6-fc01-4240-b3e0-6e5926a452ef/RSU+Tax+Calculator+Sample.jpg"
              style={{
                width: "100%",
              }}
              alt="Product"
            />
          </div>
        </Card>
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
            flex: "1", // <-- Update the style here
            height: "450px",
            borderRadius: "20px",
            position: "relative",
            padding: "20px",
          }}
        >
          <div
            style={{
              overflow: "auto",
              height: "100%",
              gap: "10px",
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <div
              style={{
                width: "95%",
                borderRadius: "10px",
                border: "1px solid #e0e0e0",
                boxShadow: " 1px 3px 2px rgba(0,0,0,0.15)",
              }}
            >
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Name & Description</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <label>Name : </label>
                  <TextField
                    required
                    id="outlined-required"
                    label="Name"
                    value={productDetails.ProdName}
                    name="ProdName"
                    size="small"
                    variant="outlined"
                    onChange={nameanddescrptionChangeHandler}
                    sx={{ margin: "0 0 10px 10px" }}
                  ></TextField>
                  <br />
                  <label
                    style={{
                      marginBottom: "10px",
                    }}
                  >
                    Description :
                  </label>
                  <Tooltip
                    title="Keep the description concise and informative"
                    placement="top-start"
                  >
                    <TextField
                      id="outlined-multiline-static"
                      label="Multiline"
                      multiline
                      rows={4}
                      fullWidth
                      name="Description"
                      value={productDetails.Description}
                      onChange={nameanddescrptionChangeHandler}
                    />
                  </Tooltip>
                </AccordionDetails>
              </Accordion>
            </div>
            <div
              style={{
                width: "95%",
                borderRadius: "10px",
                border: "1px solid #e0e0e0",
                boxShadow: " 1px 3px 2px rgba(0,0,0,0.15)",
              }}
            >
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Basic Details</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div style={{ width: "fullWidth" }}>
                    <form
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",

                        //   padding: "10px",
                      }}
                    >
                      {category.BasicDetails.map((value, index) => (
                        <TextField
                          key={index}
                          label={`Input ${index + 1}`}
                          value={value}
                          onChange={(event) =>
                            handleChange(index, event.target.value)
                          }
                          fullWidth
                          margin="normal"
                        />
                      ))}
                    </form>
                  </div>
                </AccordionDetails>
              </Accordion>
            </div>

            <div
              style={{
                width: "95%",
                borderRadius: "10px",
                border: "1px solid #e0e0e0",
                boxShadow: " 1px 3px 2px  rgba(0,0,0,0.15)",
              }}
            >
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Optional Details</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <form
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                      //   padding: "10px",
                    }}
                  >
                    {category.OptionalDetails.map((value, index) => (
                      <TextField
                        key={index}
                        label={`Input ${index + 1}`}
                        value={value}
                        onChange={(event) =>
                          handleChange(index, event.target.value)
                        }
                        fullWidth
                        margin="normal"
                      />
                    ))}
                  </form>
                </AccordionDetails>
              </Accordion>
            </div>
          </div>
        </Card>
      </Box>
    </>
  );
}