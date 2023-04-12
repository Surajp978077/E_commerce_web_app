// import { useEffect } from 'react';
import jwtDecode from 'jwt-decode';

function TokenHandler() {
  const urlParams = new URLSearchParams(window.location.search);
  let token = urlParams.get('token');
  // useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    }
    else {
        token = localStorage.getItem('token');
        if (!token) {
          window.location.href = 'https://localhost:7140/Home/Login/?redirectUrl=' + encodeURIComponent(window.location.href);
        }
    }
  // }, []);

  if (token) {
    const decodedToken = jwtDecode(token);
    console.log(decodedToken.Email);
    return (<h4>{decodedToken.Email}</h4>);
  }
  return null
}

export default TokenHandler;