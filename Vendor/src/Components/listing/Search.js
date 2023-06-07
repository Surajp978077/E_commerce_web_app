import React, { useState, useEffect } from "react";
import { Hidden, TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { styled } from "@mui/material/styles";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import { productInstance } from "../../api/axios";
import useMediaQuery from "@mui/material/useMediaQuery";
import ManageSearchOutlinedIcon from "@mui/icons-material/ManageSearchOutlined";
import { colors } from "../../config/config";
const OptionWrapper = styled("li")({
  display: "flex",
  alignItems: "center",
  padding: "4px 16px",
});

const OptionIcon = styled(ListItemIcon)({
  minWidth: "auto",
  marginRight: "8px",
});
const ProductSearch = () => {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const isMobile = useMediaQuery("(max-width:600px)");

  const handleSearchTextChange = (e, value) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    fetchSearchResults();
  }, [searchText]);

  const fetchSearchResults = async () => {
    if (searchText.length < 2) return setSearchResults([]);
    try {
      const response = await productInstance.get(`/search?name=${searchText}`);
      setSearchResults(response.data);
    } catch (error) {
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
        margin: isMobile ? "50px 5px" : "50px 0",
      }}
    >
      <Typography variant="body" width={400} paddingBottom={2}>
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
            <li {...props}>
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
    </div>
  );
};

export default ProductSearch;

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
