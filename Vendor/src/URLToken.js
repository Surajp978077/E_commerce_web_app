import { useEffect } from 'react';
import jwtDecode from 'jwt-decode';

function URLToken() {

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
  // console.log(decodedToken.Email);
  // console.log(decodedToken);
  // }, [token]) 

  if (token) {
    const decodedToken = jwtDecode(token);
    return (<h4>{decodedToken.Email}</h4>);
  }
  console.log(token)
  // console.log(decodedToken)
  return null;

}

export default URLToken;
