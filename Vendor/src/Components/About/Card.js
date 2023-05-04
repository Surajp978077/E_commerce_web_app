import Info from "./Info";
import React, { useContext } from "react";
import UserInfoContext from "../userInfo/UserInfoContext";

export default function Card() {
  const userInfo = useContext(UserInfoContext);

  return (
    <div id="flexbox">
      <div id="card">
        <Info
          Name={userInfo.UserName}
          Email={userInfo.Email}
          Street={userInfo.Address.Street}
          State={userInfo.Address.State}
          Pincode={userInfo.Address.Pincode}
        />
      </div>
    </div>
  );
}
