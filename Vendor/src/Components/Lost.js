import React from "react";
import { Link } from "react-router-dom";

export default function Lost() {
  return (
    <div style={{ margin: "30px" }}>
      <h3>Oops</h3>
      <p>
        Looks like you are lost, Let's take you back to{" "}
        <Link to={"/"}>homepage</Link>{" "}
      </p>
    </div>
  );
}
