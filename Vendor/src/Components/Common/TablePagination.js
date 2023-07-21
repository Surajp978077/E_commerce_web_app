import { Pagination } from "@mui/material";
import React from "react";

export default function TablePagination(props) {
  const { totalPages, currentPage, setCurrentPage, products } = props;
  return (
    <Pagination
      count={totalPages}
      page={parseInt(currentPage)}
      onChange={(event, page) => setCurrentPage(page)}
      color="primary"
      disabled={!products.length}
      size="large"
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    />
  );
}
