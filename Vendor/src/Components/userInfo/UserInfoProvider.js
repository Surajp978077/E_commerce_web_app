import React, { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import { userInfoInstance } from "../../api/axios";
import UserInfoContext from "./UserInfoContext";
import { CLIENT_ID } from "../../config/config";

const UserInfoProvider = (props) => {
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const decodedToken = jwtDecode(token);
        const id = decodedToken.id;
        const response = await userInfoInstance.get(`/${id}`);
        console.log(response);
        if (response && response.data) {
          setUserInfo(response.data);
        } else {
          throw new Error("Invalid status code");
        }
      } catch (error) {
        console.log(error);
        if (error.code === "ECONNABORTED") {
          setError("Request timed out");
        } else if (error.response) {
          setError(`Error: ${error.response.data.message}`);
        } else if (error.request) {
          // Check if error is due to authorization
          if (error.request.status === 401) {
            setError("Invalid request");
          } else {
            setError("Could not connect to API");
          }
        } else {
          // Set error message for timeout
          setError("API response took too long");
        }
      }
    };

    if (token) {
      fetchData();
    }

    const tokenChangeListener = () => {
      setToken(localStorage.getItem("token"));
    };

    window.addEventListener("storage", tokenChangeListener);

    return () => {
      window.removeEventListener("storage", tokenChangeListener);
    };
  }, [token]);

  if (error) {
    setTimeout(() => {
      window.location.href = `https://localhost:7085/?ClientId=${CLIENT_ID}`;
    }, 5000);

    return (
      <div>
        Error: {error} <br /> Redirecting back to login page in 5 seconds!
      </div>
    );
  }

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  return (
    <UserInfoContext.Provider value={userInfo}>
      {props.children}
    </UserInfoContext.Provider>
  );
};

export default UserInfoProvider;
