import React, { useState, useEffect, useContext } from "react";
import { Dialog, TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { styled } from "@mui/material/styles";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import { productVendorInstance, vendorInstance } from "../../../api/axios";
import useMediaQuery from "@mui/material/useMediaQuery";
import ManageSearchOutlinedIcon from "@mui/icons-material/ManageSearchOutlined";
import { colors, fonts } from "../../../config/config";
import { VendorInfoContext } from "../../context_api/vendorInfo/VendorInfoContext";
import Product from "./Product";

const OptionWrapper = styled("li")({
  display: "flex",
  alignItems: "center",
  padding: "4px 16px",
});

const OptionIcon = styled(ListItemIcon)({
  minWidth: "auto",
  marginRight: "8px",
});
const Search = (props) => {
  const { setRender, setOpenSnackbar } = props; // To re-render the component when the product is edited and closed the dialog
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const isMobile = useMediaQuery("(max-width:600px)");
  const { vendor } = useContext(VendorInfoContext);
  const [open, setOpen] = useState(false); // Track the Dialog open state
  const [selectedProduct, setSelectedProduct] = useState(null); // Track the selected product for the Dialog
  const [message, setMessage] = useState("");

  const handleSearchTextChange = (e, value) => {
    setSearchText(e.target.value);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setSelectedProduct(null);
  };
  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchText.length < 2) return setSearchResults([]);
      try {
        const response = await vendorInstance.get(`/search?name=${searchText}`);
        setSearchResults(response.data);
      } catch (error) {
        console.error("Error occurred while fetching search results:", error);
      }
    };

    fetchSearchResults();
  }, [searchText]);

  // have to make a function to handle the selection of the product
  const handleSelect = (prodId) => async () => {
    try {
      const response = await productVendorInstance.get(`/${vendor.Id}`, {
        params: {
          productId: prodId,
        },
      });

      if (response.status === 200) {
        setSelectedProduct(response.data.productVendor);
        setMessage(response.data.message);
        setOpen(true);
        // product ,VendorId, setrender, message
      }
    } catch (error) {
      setOpen(false);
      console.error("Error occurred while fetching search results:", error);
    }
  };
  const options = searchResults.map((option) => ({
    category: option.Category,
    ...option,
  }));
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        margin: isMobile ? "50px 5px" : "10px 0",
      }}
    >
      <Typography
        variant="h6"
        width={400}
        paddingBottom={2}
        fontFamily={fonts.tertiary}
      >
        Create listing using products available on E-shop
      </Typography>
      <div
        style={{
          width: isMobile ? "500px" : "500px",

          display: "flex",
          alignContent: "center",
          flexWrap: "wrap",
          // flexDirection: "column",
        }}
      >
        <Autocomplete
          sx={{
            "& .MuiAutocomplete-inputRoot": {
              "& .MuiAutocomplete-input": {
                width: "100%",
                height: "100%",
              },
            },
          }}
          id="grouped-demo"
          options={options.sort(
            (a, b) => -b.category.localeCompare(a.category)
          )}
          groupBy={(option) => option.category}
          getOptionLabel={(option) => option.ProdName}
          renderOption={(props, option) => (
            <li {...props} onClick={handleSelect(option.ProdId)}>
              <OptionWrapper>
                <OptionIcon>
                  <img
                    src={option.ImageURL}
                    alt="product"
                    style={{ height: "50px" }}
                  />
                </OptionIcon>
                <Typography variant="body1">{option.ProdName}</Typography>
              </OptionWrapper>
            </li>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search products"
              value={searchText}
              onChange={handleSearchTextChange}
              onBlur={() => setSearchResults([])}
            />
          )}
        />
        <ManageSearchOutlinedIcon
          style={{
            backgroundColor: colors.theme,
            height: "100%",
            width: "10%",
            color: "white",
          }}
        />
      </div>
      <Dialog
        open={open}
        onClose={handleCloseDialog}
        sx={{
          "& .MuiPaper-root.MuiDialog-paper": {
            background: "rgba( 255, 255, 255, 0.05 )",
            boxShadow: " 0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
            backdropFilter: "blur( 3px )",
            WebkitBackdropFilter: "blur( 3px )",
            borderRadius: "10px",
            border: "1px solid rgba(255, 255, 255, 0.18)",
            minWidth: "80%",
          },
        }}
      >
        {selectedProduct && (
          <Product
            product={selectedProduct}
            VendorId={vendor.Id}
            setOpen={setOpen}
            setRender={setRender}
            message={message ? message : null}
            isAProduct={message ? false : true}
            setOpenSnackbar={setOpenSnackbar}
          />
        )}
      </Dialog>
    </div>
  );
};

export default Search;

/* <List>
        {searchResults.length > 0 &&
          searchResults.map((product) => (
            <ListItem key={product.ProdId}>
              <ListItemText primary={product.ProdName} />
            </ListItem>
          ))}
      </List> */
/* <Autocomplete
        sx={{
          width: "100%",
        }}
        options={searchResults}
        getOptionLabel={(option) => option.prodName}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search Products"
            value={searchText}
            onChange={handleSearchTextChange}
          />
        )}
        onInputChange={fetchSearchResults}
        clearOnBlur={false}
      /> */
