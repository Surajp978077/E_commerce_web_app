import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Card, TextField, Typography } from "@mui/material";
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Tooltip from "@mui/material/Tooltip";
import ImagePlaceHolder from "../assets/images/ImagePlaceholder.png";
import AddNewFields from "../Pages/NewListing/NewListingAddNewFields";
import CloseIcon from "@mui/icons-material/Close";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ErrorIcon from "@mui/icons-material/Error";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function NewProduct(props) {
  const {
    qcData,
    setQcData,
    setIsInputFilled,
    isInputFilled,
    isRejectedItem,
    setSteps,
  } = props;
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);
  const imageURLSubmit = useRef(null);
  const nameDescriptionSubmit = useRef(null);
  const basicDetailsSubmit = useRef(null);
  const optionalDetailsSubmit = useRef(null);
  const priceStockSubmit = useRef(null);
  // eslint-disable-next-line no-unused-vars
  const [render, setRender] = useState(false); // to re-render the component when the accordion submit button is clicked
  const [basicDetails, setBasicDetails] = useState(qcData.BasicDetails);

  const [optionalDetails, setOptionalDetails] = useState(
    qcData.OptionalDetails
  );

  const [productDetails, setProductDetails] = useState(
    Object.keys(qcData.product).length !== 0
      ? qcData.product
      : {
          ProdName: null,
          Description: null,
          Price: null,
          ImageURL: null,
        }
  );

  const [productVendor, setProductVendor] = useState(
    Object.keys(qcData.productVendor).length !== 0
      ? qcData.productVendor
      : {
          Price: 0,
          Quantity: 0,
          Visible: null, // true or false
        }
  );

  useEffect(() => {
    setIsInputFilled(false);
    if (
      imageURLSubmit.current === true &&
      nameDescriptionSubmit.current === true &&
      basicDetailsSubmit.current === true &&
      optionalDetailsSubmit.current === true &&
      priceStockSubmit.current === true
    ) {
      setIsInputFilled(true);
    }
    return () => {
      setIsInputFilled(true);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    qcData,
    imageURLSubmit.current,
    nameDescriptionSubmit.current,
    basicDetailsSubmit.current,
    optionalDetailsSubmit.current,
    priceStockSubmit.current,
  ]);

  const handleCancelAdditionalFields = () => {
    setShowAdditionalFields(false);
  };

  const handleChangeBasic = (index, value) => {
    setBasicDetails((prev) => {
      return {
        ...prev,
        [index]: value,
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

  const handleProductInfoChange = (event) => {
    const { name, value } = event.target;
    let updatedValue = value;

    if (name === "Price") {
      updatedValue = value.replace(/[^0-9]/g, ""); // Remove non-numeric characters and decimal points
    }

    setProductDetails((prev) => ({
      ...prev,
      [name]: updatedValue,
    }));
  };

  const handleProductVendorInfoChange = (event) => {
    const { name, value } = event.target;
    let updatedValue = value;

    if (name === "Price" || name === "Quantity") {
      updatedValue = value.replace(/[^0-9]/g, ""); // Remove non-numeric characters and decimal points
    }

    setProductVendor((prev) => {
      return {
        ...prev,
        [name]: updatedValue,
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

  const handleVisible = (event, visibleValue) => {
    priceStockSubmit.current =
      priceStockSubmit.current === false ? priceStockSubmit.current : null;
    setProductVendor((prev) => ({
      ...prev,
      Visible: visibleValue,
    }));
  };

  const handleSave = (options) => {
    const handleOptionalDetails = () => {
      setQcData((prev) => ({
        ...prev,
        OptionalDetails: optionalDetails,
      }));
      optionalDetailsSubmit.current = true;
    };

    const handleNameDescription = () => {
      if (
        Boolean(productDetails.ProdName) &&
        Boolean(productDetails.Description)
      ) {
        setQcData((prev) => ({
          ...prev,
          product: {
            ...prev.product,
            ProdName: productDetails.ProdName,
            Description: productDetails.Description,
          },
        }));
        nameDescriptionSubmit.current = true;
      } else {
        nameDescriptionSubmit.current = false;
      }
    };

    const handleBasicDetails = () => {
      if (!Object.values(basicDetails).some((value) => !Boolean(value))) {
        setQcData((prev) => ({
          ...prev,
          BasicDetails: basicDetails,
        }));
        basicDetailsSubmit.current = true;
      } else {
        basicDetailsSubmit.current = false;
      }
    };

    const handlePriceStock = () => {
      if (
        Boolean(productDetails.Price) &&
        !Object.values(productVendor).some((value) => !Boolean(value))
      ) {
        setQcData((prev) => ({
          ...prev,
          product: {
            ...prev.product,
            Price: productDetails.Price,
          },
          productVendor: productVendor,
        }));
        priceStockSubmit.current = true;
      } else {
        priceStockSubmit.current = false;
      }
    };

    const handleImageURL = () => {
      if (!productDetails.ImageURL) {
        imageURLSubmit.current = false;
        return;
      }
      setQcData((prev) => {
        return {
          ...prev,
          product: productDetails,
        };
      });
      imageURLSubmit.current = true;
    };

    switch (options) {
      case "OptionalDetails":
        handleOptionalDetails();
        break;
      case "NameDescription":
        handleNameDescription();
        break;
      case "BasicDetails":
        handleBasicDetails();
        break;
      case "PriceStock":
        handlePriceStock();
        break;
      case "ImageURL":
        handleImageURL();
        break;
      case "All":
        handleOptionalDetails();
        handleNameDescription();
        handleBasicDetails();
        handlePriceStock();
        handleImageURL();
        break;
      default:
        break;
    }

    setRender((prev) => !prev); // Re-render the component
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
            padding: "20px 5px",
          }}
        >
          <div style={{ display: "flex", width: "100%" }}>
            <TextField
              required
              id="outlined-required"
              label="Image URL"
              value={productDetails.ImageURL ? productDetails.ImageURL : ""}
              name="ImageURL"
              size="small"
              variant="outlined"
              sx={{ width: "75%" }}
              onChange={(event) => {
                imageURLSubmit.current = null;
                setProductDetails((prev) => {
                  return {
                    ...prev,
                    ImageURL: event.target.value,
                  };
                });
              }}
              error={
                imageURLSubmit.current === false &&
                !Boolean(productDetails.ImageURL)
              }
            />
            <Button
              variant="contained"
              sx={{
                height: "40px",
                borderRadius: "20px",
                backgroundColor:
                  imageURLSubmit.current === true ? "#4caf50" : "#F9A826",
                color: "#fff",
                width: "25%",
                "&:hover": {
                  backgroundColor: "#F9A826",
                  color: "#fff",
                },
              }}
              onClick={() => {
                handleSave("ImageURL");
              }}
            >
              {imageURLSubmit.current === false ? (
                <ErrorIcon fontSize="small" sx={{ color: "black" }} />
              ) : (
                ""
              )}
              {imageURLSubmit.current === true ? (
                <CheckCircleIcon fontSize="small" sx={{ color: "black" }} />
              ) : (
                ""
              )}{" "}
              Submit
            </Button>
          </div>

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
                imageURLSubmit.current = false;
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
                  <Typography>
                    {nameDescriptionSubmit.current === false ? (
                      <ErrorIcon fontSize="small" sx={{ color: "#f44336" }} />
                    ) : (
                      ""
                    )}
                    {nameDescriptionSubmit.current === true ? (
                      <CheckCircleIcon
                        fontSize="small"
                        sx={{ color: "#4caf50" }}
                      />
                    ) : (
                      ""
                    )}{" "}
                    Name & Description
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <form>
                    <Button
                      type="reset"
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={(e) => {
                        e.preventDefault();
                        nameDescriptionSubmit.current =
                          nameDescriptionSubmit.current === false
                            ? nameDescriptionSubmit.current
                            : null;
                        setProductDetails((prev) => {
                          return {
                            ...prev,
                            ProdName: null,
                            Description: null,
                          };
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
                      onClick={(e) => {
                        e.preventDefault();
                        handleSave("NameDescription");
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
                      error={
                        nameDescriptionSubmit.current === false &&
                        !Boolean(productDetails.ProdName)
                      }
                      onChange={(e) => {
                        nameDescriptionSubmit.current =
                          nameDescriptionSubmit.current === false
                            ? nameDescriptionSubmit.current
                            : null;
                        handleProductInfoChange(e);
                      }}
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
                        required
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
                        error={
                          nameDescriptionSubmit.current === false &&
                          !Boolean(productDetails.Description)
                        }
                        onChange={(e) => {
                          nameDescriptionSubmit.current =
                            nameDescriptionSubmit.current === false
                              ? nameDescriptionSubmit.current
                              : null;
                          handleProductInfoChange(e);
                        }}
                        sx={{ margin: "0 0 10px 10px" }}
                      />
                    </Tooltip>
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
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>
                    {basicDetailsSubmit.current === false ? (
                      <ErrorIcon
                        fontSize="small"
                        sx={{
                          color: "#f44336",
                        }}
                      />
                    ) : (
                      ""
                    )}
                    {basicDetailsSubmit.current === true ? (
                      <CheckCircleIcon
                        fontSize="small"
                        sx={{
                          color: "#4caf50",
                        }}
                      />
                    ) : (
                      ""
                    )}{" "}
                    Basic Details
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div style={{ width: "fullWidth" }}>
                    <form>
                      <Button
                        type="reset"
                        variant="outlined"
                        color="error"
                        size="small"
                        onClick={(e) => {
                          e.preventDefault();
                          basicDetailsSubmit.current =
                            basicDetailsSubmit.current === false
                              ? basicDetailsSubmit.current
                              : null;
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
                        onClick={(e) => {
                          e.preventDefault();
                          handleSave("BasicDetails");
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
                                  basicDetailsSubmit.current === false &&
                                  !Boolean(basicDetails[key])
                                }
                                onChange={(event) => {
                                  basicDetailsSubmit.current =
                                    basicDetailsSubmit.current === false
                                      ? basicDetailsSubmit.current
                                      : null;
                                  handleChangeBasic(key, event.target.value);
                                }}
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
                  <Typography>
                    {optionalDetailsSubmit.current ? (
                      <CheckCircleIcon
                        fontSize="small"
                        sx={{
                          color: "#4caf50",
                        }}
                      />
                    ) : (
                      ""
                    )}{" "}
                    Optional Details
                  </Typography>
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
                        onClick={(e) => {
                          e.preventDefault();
                          optionalDetailsSubmit.current = null;
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
                        onClick={(e) => {
                          e.preventDefault();
                          handleSave("OptionalDetails");
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
                                onChange={(event) => {
                                  optionalDetailsSubmit.current =
                                    optionalDetailsSubmit.current === false
                                      ? optionalDetailsSubmit.current
                                      : null;
                                  handleChangeOptional(key, event.target.value);
                                }}
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
                  <Typography>
                    {priceStockSubmit.current === false ? (
                      <ErrorIcon fontSize="small" sx={{ color: "#f44336" }} />
                    ) : (
                      ""
                    )}
                    {priceStockSubmit.current === true ? (
                      <CheckCircleIcon
                        fontSize="small"
                        sx={{ color: "#4caf50" }}
                      />
                    ) : (
                      ""
                    )}{" "}
                    Price & Stock
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div style={{ width: "fullWidth", gap: "10px" }}>
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
                        onClick={(e) => {
                          e.preventDefault();
                          priceStockSubmit.current =
                            priceStockSubmit.current === false
                              ? priceStockSubmit.current
                              : null;
                          setProductVendor((prev) => {
                            const resetProductVendor = {};
                            for (let key in prev) {
                              resetProductVendor[key] = null;
                            }

                            return resetProductVendor;
                          });
                          setProductDetails((prev) => {
                            return { ...prev, Price: null };
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
                        onClick={(e) => {
                          e.preventDefault();
                          handleSave("PriceStock");
                        }}
                      >
                        Save
                      </Button>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginBottom: "10px",
                        }}
                      >
                        <label
                          style={{
                            width: "50%",
                            textAlign: "right",
                            paddingRight: "10px",
                          }}
                        >
                          M.R.P <span style={{ fontWeight: "bolder" }}>:</span>
                        </label>
                        <div style={{ width: "50%" }}>
                          <TextField
                            required
                            id="outlined-required"
                            label="MRP"
                            value={
                              productDetails.Price ? productDetails.Price : ""
                            }
                            error={
                              priceStockSubmit.current === false &&
                              !Boolean(productDetails.Price)
                            }
                            name="Price"
                            size="small"
                            variant="outlined"
                            type="number"
                            onChange={(event) => {
                              priceStockSubmit.current =
                                priceStockSubmit.current === false
                                  ? priceStockSubmit.current
                                  : null;
                              handleProductInfoChange(event);
                            }}
                          />
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginBottom: "10px",
                        }}
                      >
                        <label
                          style={{
                            width: "50%",
                            textAlign: "right",
                            paddingRight: "10px",
                          }}
                        >
                          Your selling price{" "}
                          <span style={{ fontWeight: "bolder" }}>:</span>
                        </label>
                        <div style={{ width: "50%" }}>
                          <TextField
                            required
                            id="outlined-required"
                            label="Price"
                            value={
                              productVendor.Price ? productVendor.Price : ""
                            }
                            error={
                              priceStockSubmit.current === false &&
                              !Boolean(productVendor.Price)
                            }
                            name="Price"
                            size="small"
                            variant="outlined"
                            type="number"
                            onChange={(event) => {
                              priceStockSubmit.current =
                                priceStockSubmit.current === false
                                  ? priceStockSubmit.current
                                  : null;
                              handleProductVendorInfoChange(event);
                            }}
                          />
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginBottom: "10px",
                        }}
                      >
                        <label
                          style={{
                            width: "50%",
                            textAlign: "right",
                            paddingRight: "10px",
                          }}
                        >
                          Listing status{" "}
                          <span style={{ fontWeight: "bolder" }}>:</span>
                        </label>
                        <div
                          style={{
                            width: "fit-content",
                            border:
                              priceStockSubmit.current === false &&
                              !Boolean(productVendor.Visible)
                                ? "1px solid red"
                                : "none",
                          }}
                        >
                          <ToggleButtonGroup
                            value={productVendor.Visible}
                            exclusive
                            onChange={handleVisible}
                            aria-label="Listing Status"
                            size="small"
                          >
                            <ToggleButton
                              value="1"
                              aria-label="Active"
                              color="info"
                            >
                              <Typography>Active</Typography>
                            </ToggleButton>
                            <ToggleButton
                              value="0"
                              aria-label="Inactive"
                              color="error"
                            >
                              <Typography>Inactive</Typography>
                            </ToggleButton>
                          </ToggleButtonGroup>
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginBottom: "10px",
                        }}
                      >
                        <label
                          style={{
                            width: "50%",
                            textAlign: "right",
                            paddingRight: "10px",
                          }}
                        >
                          Stock <span style={{ fontWeight: "bolder" }}>:</span>
                        </label>
                        <div style={{ width: "50%" }}>
                          <TextField
                            required
                            id="outlined-required"
                            label="Stock"
                            value={
                              productVendor.Quantity
                                ? productVendor.Quantity
                                : ""
                            }
                            error={
                              priceStockSubmit.current === false &&
                              !productVendor.Quantity
                            }
                            name="Quantity"
                            size="small"
                            variant="outlined"
                            type="number"
                            onChange={(event) => {
                              priceStockSubmit.current =
                                priceStockSubmit.current === false
                                  ? priceStockSubmit.current
                                  : null;
                              handleProductVendorInfoChange(event);
                            }}
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                </AccordionDetails>
              </Accordion>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Typography fontSize={"13px"} color={"GrayText"}>
              Fields marked with{" "}
              <span style={{ fontSize: "20px", color: "red" }}> * </span> are
              required.
            </Typography>
            <div>
              <Button
                variant="contained"
                color="info"
                size="small"
                onClick={(e) => {
                  e.preventDefault();
                  handleSave("All");
                }}
              >
                Save all
              </Button>
            </div>
          </div>
        </Card>
      </Box>
      {isRejectedItem && (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <TextField
              id="outlined-multiline-static"
              label="Admin Message"
              multiline
              variant="outlined"
              rows={4}
              error
              value={qcData.AdminMessage}
              InputProps={{
                readOnly: true,
              }}
              sx={{ width: "45%", margin: "1%" }}
            />
            <TextField
              id="outlined-multiline-static"
              label="Vendor Message"
              multiline
              variant="outlined"
              rows={4}
              value={qcData.VendorMessage ? qcData.VendorMessage : ""}
              onChange={(e) => {
                setQcData((prev) => ({
                  ...prev,
                  VendorMessage: e.target.value,
                }));
              }}
              sx={{
                width: "45%",
                margin: "1%",
              }}
            />
          </div>
          {isRejectedItem && (
            <Button
              variant="contained"
              color="success"
              size="small"
              disabled={isInputFilled ? false : true}
              onClick={(e) => {
                e.preventDefault();
                setSteps(2);
              }}
              sx={{ marginLeft: "10px", left: "93vw", position: "absolute" }}
            >
              Next
            </Button>
          )}
        </>
      )}
    </>
  );
}
