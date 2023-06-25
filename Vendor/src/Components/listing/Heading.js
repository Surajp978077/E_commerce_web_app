import React from "react";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Link, Navigate } from "react-router-dom";
import { fonts } from "../../config/config";
import Search from "./Search";
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
        <Link to="/listings/total-listings" style={{ textDecoration: "none" }}>
          <Card sx={styles.card}>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {props.productsCount}
                </Typography>
                <Typography
                  variant="h6"
                  // color="text.secondary"
                  sx={{ fontFamily: fonts.tertiary }}
                >
                  Total listings
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Link>
        <Link to="/listings/number" style={{ textDecoration: "none" }}>
          <Card sx={styles.card}>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {props.ActiveListings}
                </Typography>
                <Typography variant="h6" sx={{ fontFamily: fonts.tertiary }}>
                  Active listings
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Link>
        <Link
          to="/listings/inactive-listings"
          style={{ textDecoration: "none" }}
        >
          <Card sx={styles.card}>
            <CardActionArea>
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
            </CardActionArea>
          </Card>
        </Link>
      </Box>
      <Link
        // onClick={Navigat)}
        to="/new_listing"
        style={{ textDecoration: "none", color: "white" }}
      >
        <Button
          size="large"
          sx={{ margin: "8px 20px 0px" }}
          variant="contained"
          startIcon={<AddIcon />}
        >
          Add a new listing
        </Button>
      </Link>
      <Divider sx={{ marginBlockStart: "20px" }}>
        <Chip label="PRODUCTS" />
      </Divider>
    </div>
  );
}
