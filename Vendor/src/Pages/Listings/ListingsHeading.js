import React from "react";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import { fonts } from "../../config/config";
import Search from "./ListingsSearch";
import useMediaQuery from "@mui/material/useMediaQuery";

const styles = {
  card: {
    "& .MuiTypography-root": {
      padding: "0 ",
      margin: "-10px -15px 0 -15px ",
      width: "inherit",
    },
    width: "170px",
    border: "1px solid black",
    height: "65px",
    padding: "3px 10px 0 ",
    margin: "0 5px 5px 0",
    borderRadius: "50px",
  },
};

export default function Heading(props) {
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          height: isMobile ? "fit-content" : "150px",
          flexDirection: isMobile ? "column" : "row",
        }}
      >
        <h3
          style={{
            margin: "40px 30px 30px",
            fontSize: "40px",
            fontFamily: fonts.main,
          }}
        >
          Listing management
        </h3>

        <Search
          setRender={props.setRender}
          setOpenSnackbar={props.setOpenSnackbar}
          setOpen={props.setOpen}
        />
      </div>
      <Box
        sx={{
          display: "flex",
          margin: isMobile ? 0 : "0 20px",
          width: isMobile ? "100%" : "fit-content",
          // overflowX: isMobile ? "scroll" : "",
          overflow: isMobile ? "scroll" : "hidden",
        }}
      >
        <Card sx={styles.card}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {props.productsCount}
            </Typography>
            <Typography variant="h6" sx={{ fontFamily: fonts.tertiary }}>
              Total listings
            </Typography>
          </CardContent>
        </Card>

        <Card sx={styles.card}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {props.ActiveListings}
            </Typography>
            <Typography variant="h6" sx={{ fontFamily: fonts.tertiary }}>
              Active listings
            </Typography>
          </CardContent>
        </Card>

        <Card sx={styles.card}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {props.InactiveListings}
            </Typography>
            <Typography
              variant="h6"
              // color="text.secondary"
              sx={{ fontFamily: fonts.tertiary }}
            >
              Inactive listings
            </Typography>
          </CardContent>
        </Card>
      </Box>

      <Button
        size="large"
        sx={{ margin: "20px 20px -2px" }}
        variant="contained"
        startIcon={<AddIcon />}
      >
        Add a new listing
      </Button>

      {/* <Divider sx={{ marginBlockStart: "20px" }}>
        <Chip label="PRODUCTS" />
      </Divider> */}
    </div>
  );
}
