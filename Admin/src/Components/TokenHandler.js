// import { useEffect } from 'react';
// import jwtDecode from 'jwt-decode';

function TokenHandler() {
  const clientId = "b6782e13-5669-4156-82a8-1850883214e4";
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
          window.location.href = 'https://localhost:7085/?ClientId=' + clientId;
        }
    }
  // }, []);

  return null
}

export default TokenHandler;