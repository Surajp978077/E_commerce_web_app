import { React, useContext } from "react";
import { VendorInfoContext } from "./components/context_api/vendorInfo/VendorInfoContext";

export default function Test() {
  const { userInfo } = useContext(VendorInfoContext);

  return <div>{userInfo.vendor.GSTIN}</div>;
}
