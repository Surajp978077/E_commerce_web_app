import React, { useState } from "react";
import { useLocation } from "react-router";
import NewProduct from "../../components/NewProduct";
import FinalProductPreview from "../NewListing/FinalProductPreview";

export default function RejectedQCPage() {
  const location = useLocation();
  const [product, setOpenSnackbar] = useState(location.state.product);
  const [isInputFilled, setIsInputFilled] = useState(false);
  const [steps, setSteps] = useState(1);
  const [qcData, setQcData] = useState(
    product
      ? {
          Id: product.Id,
          product: {
            ProdName: product.Product.ProdName,
            Description: product.Product.Description,
            Price: product.Product.Price,
            ImageURL: product.Product.ImageURL,
          },
          BasicDetails: product.Product.BasicDetails,
          OptionalDetails: product.Product.OptionalDetails,
          CategoryId: product.CategoryId,
          CategoryName: product.CategoryName,
          productVendor: {
            Price: product.ProductVendor.Price,
            Quantity: product.ProductVendor.Quantity,
            Visible: product.ProductVendor.Visible,
          },
          VendorId: product.VendorId,
          VendorName: product.VendorName,
          AdminMessage: product.AdminMessage,
        }
      : null
  );

  return (
    <>
      {steps === 1 && (
        <NewProduct
          qcData={qcData}
          setQcData={setQcData}
          setIsInputFilled={setIsInputFilled}
          isRejectedItem={true}
          isInputFilled={isInputFilled}
          setSteps={setSteps}
        />
      )}
      {steps === 2 && (
        <FinalProductPreview
          qcData={qcData}
          isRejectedItem={true}
          setOpenSnackbar={setOpenSnackbar}
        />
      )}
    </>
  );
}
