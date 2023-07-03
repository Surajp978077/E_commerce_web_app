import React, { useEffect, useState, useContext } from "react";
import { Box, Button, Card, TextField, Typography } from "@mui/material";
import { ExpandMore as ExpandMoreIcon, Label } from "@mui/icons-material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Tooltip from "@mui/material/Tooltip";
import ImagePlaceHolder from "../../../assets/images/ImagePlaceholder.png";
import { VendorInfoContext } from "../../context_api/vendorInfo/VendorInfoContext";
import AddNewFields from "./AddNewFields";
import CloseIcon from "@mui/icons-material/Close";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function NewProduct(props) {
  const { categorySelected } = props;
  const { userInfo } = useContext(VendorInfoContext);
  const [category, setCategory] = useState(categorySelected);
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
    productVendor: {},
    Vendor: {
      VendorId: userInfo.vendor.VendorId,
      VendorName: userInfo.vendor.Name,
    },
  });

  const [productVendor, setProductVendor] = useState({
    Price: 0,
    Quantity: 0,
    Visible: null, // true or false
  });

  const [showAdditionalFields, setShowAdditionalFields] = useState(false);

  const handleCancelAdditionalFields = () => {
    setShowAdditionalFields(false);
  };

  const handleChangeBasic = (index, value) => {
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
  // Add this function to handle changes in optional details
  const handleChangeOptional = (key, value) => {
    setOptionalDetails((prev) => ({
      ...prev,
      [key]: value,
    }));
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

  const handleRemoveField = (fieldKey) => {
    setOptionalDetails((prev) => {
      const newOptionalDetails = { ...prev };
      delete newOptionalDetails[fieldKey];
      return newOptionalDetails;
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(inputValues);
  };

  const handleReset = () => {
    setProductDetails({
      ProdName: null,
      Description: null,
      Price: null,
      ImageURL: null,
      BasicDetails: {},
      OptionalDetails: {},
      CategoryId: category.CategoryId,
      productVendor: {
        Price: 0,
        Quantity: 0,
        Visible: null, // true or false
      },
    });

    setBasicDetails(
      category.BasicDetails.reduce((result, key) => {
        result[key] = null;
        return result;
      }, {})
    );
    setOptionalDetails(
      category.OptionalDetails.reduce((result, key) => {
        result[key] = null;
        return result;
      }, {})
    );
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
            label="Image URL"
            fullWidth
            value={productDetails.ImageURL ? productDetails.ImageURL : ""}
            name="ImageURL"
            size="small"
            variant="outlined"
            onChange={(event) => {
              setProductDetails((prev) => {
                return {
                  ...prev,
                  ImageURL: event.target.value,
                };
              });
              console.log(productDetails.ImageURL);
            }}
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
              src={
                productDetails.ImageURL
                  ? productDetails.ImageURL
                  : ImagePlaceHolder
              }
              style={{
                width: productDetails.ImageURL ? "100%" : "70%",
                height: productDetails.ImageURL ? "100%" : "70%",
                objectFit: "contain",
                opacity: productDetails.ImageURL ? "1" : "0.50",
              }}
              alt="Product"
              onError={(e) => {
                e.target.src = ImagePlaceHolder;
                setProductDetails((prev) => {
                  return {
                    ...prev,
                    ImageURL: null,
                  };
                });
              }}
              loading="lazy"
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
                  <Typography>Name, Description & Price</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <form>
                    <Button
                      type="reset"
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() => {
                        setBasicDetails((prev) => {
                          const resetBasicDetails = {};
                          for (let key in prev) {
                            resetBasicDetails[key] = "";
                          }
                          return resetBasicDetails;
                        });
                      }}
                      sx={{
                        position: "absolute",
                        top: "10px",
                        right: "110px",
                      }}
                    >
                      Reset
                    </Button>
                    <Button
                      variant="outlined"
                      color="success"
                      size="small"
                      onClick={() => {
                        setProductDetails((prev) => {
                          return {
                            ...prev,
                            BasicDetails: basicDetails,
                          };
                        });
                      }}
                      sx={{
                        position: "absolute",
                        top: "10px",
                        right: "40px",
                      }}
                    >
                      Save
                    </Button>{" "}
                    <label>Name : </label>
                    <TextField
                      required
                      id="outlined-required"
                      label="Name"
                      value={
                        productDetails.ProdName ? productDetails.ProdName : ""
                      }
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
                        value={
                          productDetails.Description
                            ? productDetails.Description
                            : ""
                        }
                        onChange={nameanddescrptionChangeHandler}
                        sx={{ margin: "0 0 10px 10px" }}
                      />
                    </Tooltip>
                    <br />
                    <label>Base Price : </label>
                    <TextField
                      required
                      id="outlined-required"
                      label="Base Price"
                      value={productDetails.Price ? productDetails.Price : ""}
                      name="Price"
                      size="small"
                      variant="outlined"
                      type="number"
                      onChange={nameanddescrptionChangeHandler}
                      sx={{ margin: "0 0 10px 10px" }}
                    ></TextField>
                  </form>
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
              <Accordion
                sx={{
                  border: () => {
                    for (let key in basicDetails) {
                      if (
                        productDetails.BasicDetails[key] === "" ||
                        productDetails.BasicDetails[key] === null
                      ) {
                        return "1px solid red";
                      }
                    }
                  },
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Basic Details</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div style={{ width: "fullWidth" }}>
                    <form>
                      <Button
                        type="reset"
                        variant="outlined"
                        color="error"
                        size="small"
                        onClick={() => {
                          setBasicDetails((prev) => {
                            const resetBasicDetails = {};
                            for (let key in prev) {
                              resetBasicDetails[key] = "";
                            }
                            return resetBasicDetails;
                          });
                        }}
                        sx={{
                          position: "absolute",
                          top: "10px",
                          right: "110px",
                        }}
                      >
                        Reset
                      </Button>
                      <Button
                        variant="outlined"
                        color="success"
                        size="small"
                        onClick={() => {
                          setProductDetails((prev) => {
                            return {
                              ...prev,
                              BasicDetails: basicDetails,
                            };
                          });
                        }}
                        sx={{
                          position: "absolute",
                          top: "10px",
                          right: "40px",
                        }}
                      >
                        Save
                      </Button>

                      {Object.keys(basicDetails).map((key, index) => (
                        <React.Fragment key={index}>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              margin: "-10px",
                            }}
                          >
                            <label
                              htmlFor={key}
                              style={{
                                width: "50%",
                                textAlign: "right",
                                paddingRight: "10px",
                              }}
                            >
                              {key}{" "}
                              <span style={{ fontWeight: "bolder" }}>:</span>
                            </label>
                            <div style={{ width: "50%" }}>
                              <TextField
                                id={key}
                                label={key}
                                variant="outlined"
                                margin="normal"
                                size="small"
                                value={
                                  basicDetails[key] ? basicDetails[key] : ""
                                }
                                error={
                                  basicDetails[key] === "" ||
                                  basicDetails[key] === null
                                    ? true
                                    : false
                                }
                                onChange={(event) =>
                                  handleChangeBasic(index, event.target.value)
                                }
                                InputLabelProps={{
                                  shrink: true,
                                }}
                              />
                            </div>
                          </div>
                          <br />
                        </React.Fragment>
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
                  <div style={{ width: "fullWidth" }}>
                    <form>
                      <Button
                        type="reset"
                        variant="outlined"
                        color="error"
                        size="small"
                        sx={{
                          position: "absolute",
                          top: "10px",
                          right: "110px",
                        }}
                        onClick={() => {
                          setOptionalDetails((prev) => {
                            const resetOptionalDetails = {};
                            for (let key in prev) {
                              resetOptionalDetails[key] = "";
                            }
                            return resetOptionalDetails;
                          });
                        }}
                      >
                        Reset
                      </Button>
                      <Button
                        variant="outlined"
                        color="success"
                        size="small"
                        sx={{
                          position: "absolute",
                          top: "10px",
                          right: "40px",
                        }}
                        onClick={() => {
                          setProductDetails((prev) => {
                            return {
                              ...prev,
                              OptionalDetails: optionalDetails,
                            };
                          });
                        }}
                      >
                        Save
                      </Button>
                      {Object.keys(optionalDetails).map((key, index) => (
                        <React.Fragment key={index}>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              margin: "-10px",
                            }}
                          >
                            <label
                              htmlFor={key}
                              style={{
                                width: "50%",
                                textAlign: "right",
                                paddingRight: "10px",
                              }}
                            >
                              {key}{" "}
                              <span style={{ fontWeight: "bolder" }}>:</span>
                            </label>
                            <div style={{ width: "50%" }}>
                              <TextField
                                id={key}
                                label={key}
                                size="small"
                                value={optionalDetails[key] || ""}
                                onChange={(event) =>
                                  handleChangeOptional(key, event.target.value)
                                }
                                margin="normal"
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                variant="outlined"
                              />
                              <CloseIcon
                                color="error"
                                onClick={() => {
                                  handleRemoveField(key);
                                }}
                                sx={{
                                  position: "relative",
                                  top: "20px",
                                  cursor: "pointer",
                                  marginLeft: "40px",
                                }}
                              />
                            </div>
                          </div>
                          <br />
                        </React.Fragment>
                      ))}
                      {!showAdditionalFields ? (
                        <Button
                          variant="contained"
                          color="info"
                          onClick={() => {
                            setShowAdditionalFields(true);
                          }}
                          sx={{
                            margin: "0 0 10px 10px",
                            display: "flex",
                            marginLeft: "auto",
                          }}
                        >
                          Add More Details
                        </Button>
                      ) : (
                        <AddNewFields
                          optionalDetails={optionalDetails}
                          setOptionalDetails={setOptionalDetails}
                          handleCancel={handleCancelAdditionalFields}
                        />
                      )}
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
                  <Typography>Price & Stock</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div style={{ width: "fullWidth" }}>
                    <form>
                      <Button
                        type="reset"
                        variant="outlined"
                        color="error"
                        size="small"
                        sx={{
                          position: "absolute",
                          top: "10px",
                          right: "110px",
                        }}
                        onClick={() => {
                          setOptionalDetails((prev) => {
                            const resetOptionalDetails = {};
                            for (let key in prev) {
                              resetOptionalDetails[key] = "";
                            }
                            return resetOptionalDetails;
                          });
                        }}
                      >
                        Reset
                      </Button>
                      <Button
                        variant="outlined"
                        color="success"
                        size="small"
                        sx={{
                          position: "absolute",
                          top: "10px",
                          right: "40px",
                        }}
                        onClick={() => {
                          setProductDetails((prev) => {
                            return {
                              ...prev,
                              OptionalDetails: optionalDetails,
                            };
                          });
                        }}
                      >
                        Save
                      </Button>
                      {Object.keys(optionalDetails).map((key, index) => (
                        <React.Fragment key={index}>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              margin: "-10px",
                            }}
                          >
                            <label
                              htmlFor={key}
                              style={{
                                width: "50%",
                                textAlign: "right",
                                paddingRight: "10px",
                              }}
                            >
                              {key}{" "}
                              <span style={{ fontWeight: "bolder" }}>:</span>
                            </label>
                            <div style={{ width: "50%" }}>
                              <TextField
                                id={key}
                                label={key}
                                size="small"
                                value={optionalDetails[key] || ""}
                                onChange={(event) =>
                                  handleChangeOptional(key, event.target.value)
                                }
                                margin="normal"
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                variant="outlined"
                              />
                              <CloseIcon
                                color="error"
                                onClick={() => {
                                  handleRemoveField(key);
                                }}
                                sx={{
                                  position: "relative",
                                  top: "20px",
                                  cursor: "pointer",
                                  marginLeft: "40px",
                                }}
                              />
                            </div>
                          </div>
                          <br />
                        </React.Fragment>
                      ))}
                    </form>
                  </div>
                </AccordionDetails>
              </Accordion>
            </div>
          </div>
        </Card>
      </Box>
    </>
  );
}
