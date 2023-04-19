// import { useEffect } from 'react';
// import jwtDecode from 'jwt-decode';

function URLToken() {
  const clientID = "ff84a00f-99ab-4f81-9f52-26df485a9dcf"
  const urlParams = new URLSearchParams(window.location.search);
  let token = urlParams.get('token');
  // useEffect(() => {

  if (token) {
    localStorage.setItem('token', token);
  }
  else {
    token = localStorage.getItem('token');
    if (!token) {
      // window.location.href = 'https://localhost:7140/Home/Login/?redirectUrl=' + encodeURIComponent(window.location.href);
      window.location.href = 'https://localhost:7085/?ClientId=' + clientID;
    }
  }

  return null;

}

export default URLToken;
