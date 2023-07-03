import React from "react";
import ImagePlaceholder from "../../../assets/images/ImagePlaceholder.png";

export default function FinalProductDetails(props) {
  const { qcData } = props;
  console.log(qcData);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "70%",
        height: "100%",
        backgroundColor: "white",
        borderRadius: "10px",
        boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)",
        padding: "20px",
      }}
    >
      <div>
        <h3>Submit product to QC?</h3>
      </div>
      <div>
        <img
          src={
            qcData.products.ImageURL
              ? qcData.products.ImageURL
              : ImagePlaceholder
          }
          alt="product"
          style={{
            width: "100%",
            height: "10%",
            objectFit: "contain",
            borderRadius: "10px",
            boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)",
          }}
        />
      </div>
    </div>
  );
}
