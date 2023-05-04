import { CLIENT_ID } from "../config/config";

function URLToken() {
  const urlParams = new URLSearchParams(window.location.search);
  let token = urlParams.get("token");

  if (token) {
    localStorage.setItem("token", token);
    window.location.href = "http://localhost:3002";
  } else {
    token = localStorage.getItem("token");
    if (!token) {
      // window.location.href = 'https://localhost:7140/Home/Login/?redirectUrl=' + encodeURIComponent(window.location.href);
      window.location.href = "https://localhost:7085/?ClientId=" + CLIENT_ID;
    }
  }

  return null;
}

export default URLToken;
