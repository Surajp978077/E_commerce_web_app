import { Divider, Typography } from "@mui/material";
import { CategoryBrowse } from "./NewListingCategoryBrowse";
import CategorySearch from "./NewListingCategorySearch";
import { useState } from "react";
import { fonts } from "../../config/config";

export const ProductListing = (props) => {
  const [selectedResult, setSelectedResult] = useState([]);
  const [categoriesNestedSearch, setCategoriesNestedSearch] = useState([]);

  return (
    <div>
      <div className="m-4">
        <Typography variant="h5" fontFamily={fonts.main}>
          Select The Category For Your Product
        </Typography>
        <Typography variant="subtitle2" fontFamily={fonts.secondary}>
          You can use the Search or Browse options
        </Typography>
      </div>
      <CategorySearch
        selectedResult={selectedResult}
        setSelectedResult={setSelectedResult}
        setCategoriesNestedSearch={setCategoriesNestedSearch}
      />
      <Divider
        sx={{ width: "100%", marginBottom: "16px", borderColor: "darkGrey" }}
      />
      <CategoryBrowse
        selectedResult={selectedResult}
        categoriesNestedSearch={categoriesNestedSearch}
        nextStep={props.nextStep}
        categorySelectedLeaf={props.categorySelectedLeaf}
        setCategorySelectedLeaf={props.setCategorySelectedLeaf}
        categoriesNested={props.categoriesNested}
        setCategoriesNested={props.setCategoriesNested}
        categoriesSelected={props.categoriesSelected}
        setCategoriesSelected={props.setCategoriesSelected}
      />
    </div>
  );
};
