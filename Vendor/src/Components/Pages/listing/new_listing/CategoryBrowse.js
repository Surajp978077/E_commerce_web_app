import { useEffect } from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Box,
} from "@mui/material";
import { categoriesInstance } from "../../../../api/axios";

const CategoryList = ({
  categories,
  onCategorySelect,
  categoriesSelected,
  level,
}) => {
  const handleToggle = (category) => {
    onCategorySelect(category, level);
  };

  return (
    <List
      sx={{
        overflowY: "scroll",
        border: "2px solid #f5f5f5",
        borderRadius: "5px",
        maxHeight: 400,
        maxWidth: 250,
        minWidth: 200,
      }}
    >
      {categories.map(
        (category, index) =>
          category.$id && (
            <ListItem
              key={`${category.CategoryId}-${index}`}
              onClick={() => handleToggle(category)}
              sx={{ borderBottom: "1px solid darkGrey" }}
            >
              <ListItemButton
                selected={
                  categoriesSelected[level]?.CategoryId === category.CategoryId
                }
              >
                <img
                  src={category.CategoryImageUrl}
                  alt=""
                  style={{ width: "50px", height: "50px", marginRight: "4%" }}
                />
                <ListItemText primary={category.Name} />
              </ListItemButton>
            </ListItem>
          )
      )}
    </List>
  );
};

export const CategoryBrowse = ({
  selectedResult,
  categoriesNestedSearch,
  nextStep,
  categorySelectedLeaf,
  setCategorySelectedLeaf,
  categoriesNested,
  setCategoriesNested,
  categoriesSelected,
  setCategoriesSelected,
}) => {
  useEffect(() => {
    if (selectedResult && selectedResult.length > 0 && categoriesNestedSearch) {
      setCategoriesNested(categoriesNestedSearch);
      setCategoriesSelected(selectedResult);
      setCategorySelectedLeaf(selectedResult[selectedResult.length - 1]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedResult, categoriesNestedSearch]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoriesInstance.get("/");
        setCategoriesNested([response.data.$values]);
      } catch (error) {
        console.log("Error fetching categories:", error);
      }
    };

    if (categoriesNested.length === 0) {
      fetchCategories();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCategorySelect = (category, level) => {
    if (categoriesSelected[level]?.CategoryId === category.CategoryId) {
      return;
    }

    setCategoriesNested((categoriesNestedPrev) =>
      categoriesNestedPrev.slice(0, level + 1)
    );

    if (
      category.ChildCategories &&
      category.ChildCategories.$values.length > 0
    ) {
      setCategoriesNested((categoriesNestedPrev) => [
        ...categoriesNestedPrev,
        category.ChildCategories.$values,
      ]);
      setCategorySelectedLeaf(null);
    } else {
      setCategorySelectedLeaf(category);
    }

    setCategoriesSelected((categoriesSelectedPrev) => {
      const newArray = [...categoriesSelectedPrev.slice(0, level + 1)];
      newArray[level] = {
        CategoryId: category.CategoryId,
        Name: category.Name,
      };
      return newArray;
    });
  };

  return (
    <div>
      <Typography
        className="mx-4"
        variant="subtitle2"
        sx={{ color: "rgba(0, 0, 0, 0.54)" }}
      >
        Browse Categories:&nbsp;
        <span style={{ fontWeight: "bold" }}>
          {categoriesSelected.map((category) => category.Name).join(" / ")}
        </span>
      </Typography>
      <div style={{ display: "flex" }}>
        <div style={{ overflowX: "auto", display: "flex" }}>
          {categoriesNested.map((categories, index) => (
            <CategoryList
              key={index}
              categories={categories}
              onCategorySelect={handleCategorySelect}
              categoriesSelected={categoriesSelected}
              level={index}
            />
          ))}
        </div>
        {categorySelectedLeaf && (
          <Box
            sx={{
              border: "2px solid #f5f5f5",
              borderRadius: "5px",
              maxHeight: 400,
              flexGrow: 1,
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{
                color: "rgba(0, 0, 0, 0.54)",
                borderBottom: "1px solid darkGrey",
                padding: "1rem",
              }}
            >
              Category selected:{" "}
              <span style={{ fontWeight: "bold" }}>
                {categorySelectedLeaf.Name}
              </span>
            </Typography>
            <Typography variant="subtitle2" sx={{ padding: "1rem" }}>
              {categorySelectedLeaf.Description}
            </Typography>
            {/* <Button
              variant="contained"
              sx={{
                position: "absolute", // Position the button absolutely
                bottom: "-5em", // Distance from the bottom
                right: "3em", // Distance from the right
              }}
              onClick={nextStep}
            >
              Next
            </Button> */}
          </Box>
        )}
      </div>
    </div>
  );
};
