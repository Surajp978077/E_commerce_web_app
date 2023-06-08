import Info from "./Info";
import React, { useContext } from "react";

import { VendorInfoContext } from "../context_api/vendorInfo/VendorInfoContext";

export default function Card() {
  const { userInfo } = useContext(VendorInfoContext);
  // const [userInfo1, setUserInfo1] = useState(userInfo);
  return (
    <div id="flexbox">
      <div id="card">
        <Info
          Name={userInfo.UserName}
          Email={userInfo.Email}
          Street={userInfo.Address.Street}
          State={userInfo.Address.State}
          Pincode={userInfo.Address.Pincode}
          GSTIN={userInfo.vendor.GSTIN}
        />
      </div>
    </div>
  );
}
