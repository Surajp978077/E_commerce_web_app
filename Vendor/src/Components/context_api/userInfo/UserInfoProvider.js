import React, { useState, useEffect, useRef } from "react";
import jwtDecode from "jwt-decode";
import { userInfoInstance } from "../../../api/axios";
import { UserInfoContext } from "./UserInfoContext";
import { LOGINPAGE } from "../../../config/config";
import ErrorPage from "../../Common/ErrorPage";
import LoadingScreen from "../../Common/LoadingScreen";

export const UserInfoProvider = (props) => {
  const [userInformation, setUserInformation] = useState(null);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const timerId = useRef(5);
  const [timer, setTimer] = useState(5);
  const [userInfoUpdated, setUserInfoUpdated] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const decodedToken = jwtDecode(token);
        const response = await userInfoInstance.get(`/${decodedToken.id}`);
        if (response && response.data) {
          setUserInformation(response.data);
        } else {
          throw new Error("Invalid status code");
        }
      } catch (error) {
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

    console.log("tokenChangeListener");

    window.addEventListener("storage", tokenChangeListener);

    return () => {
      window.removeEventListener("storage", tokenChangeListener);
    };
  }, [token, userInfoUpdated]);
  useEffect(() => {
    console.log("useEffect", userInformation);
  }, [userInformation]);

  if (error) {
    setTimeout(() => {
      window.location.href = LOGINPAGE;
    }, 5000);

    setInterval(() => {
      timerId.current = timer - 1;
      setTimer(timer - 1);
    }, 1000);

    return (
      <div>
        Error: {error} <br /> Redirecting back to login page in {timer} seconds!
      </div>
    );
  }

  if (userInformation && userInformation.Role !== "Vendor") {
    return (
      <ErrorPage
        title="You are not a Vendor"
        desc="Kindly Register or Login as a Vendor"
      />
    );
  }
  return userInformation ? (
    <UserInfoContext.Provider
      value={{
        userInformation,
        setUserInformation,
        setUserInfoUpdated,
        userInfoUpdated,
      }}
    >
      {props.children}
    </UserInfoContext.Provider>
  ) : (
    <LoadingScreen />
  );
};
