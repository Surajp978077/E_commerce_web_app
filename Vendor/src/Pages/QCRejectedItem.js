import React, { useState } from "react";
import { useLocation } from "react-router";
import NewProduct from "./NewListing/NewListingNewProduct";

export default function QCRejectedItem() {
  const location = useLocation();

  const [product, setProduct] = useState(location.state.product);
  const [isInputFilled, setIsInputFilled] = useState(false);
  const [qcData, setQcData] = useState({
    product: {
      ProdName: product.Product.ProdName,
      Description: product.Product.Description,
      Price: product.Product.Price,
      ImageURL: product.Product.ImageURL,
    },
    BasicDetails: product.Product.BasicDetails,
    OptionalDetails: product.Product.OptionalDetails,
    CategoryId: null,
    CategoryName: null,
    productVendor: {
      Price: product.ProductVendor.Price,
      Quantity: product.ProductVendor.Quantity,
      Visible: product.ProductVendor.Visible,
    },

    AdminMessage: product.AdminMessage,
  });
  console.log(product);
  return (
    <>
      <NewProduct
        qcData={qcData}
        setQcData={setQcData}
        setIsInputFilled={setIsInputFilled}
        isRejectedItem={true}
        isInputFilled={isInputFilled}
      />
    </>
  );
}
