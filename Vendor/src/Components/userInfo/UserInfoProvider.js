import React, { useState, useEffect } from 'react';
import UserInfoContext from './UserInfoContext'
import jwtDecode from 'jwt-decode';
import { userInfoInstance } from '../../api/axios';

function UserInfoProvider(props) {
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const id = decodedToken.id;

    const fetchData = async () => {
      try {
        const response = await userInfoInstance.get(`/${id}`);
        if (response.status !== 200) {
          throw new Error('Invalid status code');
        }
        setUserInfo(response.data);
      } catch (error) {
        if (error.code === 'ECONNABORTED') {
          setError('Request timed out');
        } else if (error.response) {
          setError('Error: ' + error.response.data.message);
        } else if (error.request) {
          // Check if error is due to authorization
          if (error.request.status === 401) {
            setError('Invalid request');
            setTimeout(() => {
                const clientID = "ff84a00f-99ab-4f81-9f52-26df485a9dcf"
                window.location.href = 'https://localhost:7085/?ClientId=' + clientID;
            }, 5000); // redirect after 5 seconds
          } else {
            setError('Could not connect to API');
            setTimeout(() => {
                const clientID = "ff84a00f-99ab-4f81-9f52-26df485a9dcf"
                window.location.href = 'https://localhost:7085/?ClientId=' + clientID;
            }, 5000);
          }
        } else {
          setError('Unknown error occurred');
        }
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error} <br/> Redirecting back to login page in 5 seconds!</div>;
  }

  if (!userInfo) {
    return <div>Loading...</div>;
  }

    return (
        <UserInfoContext.Provider value={userInfo}>
            {props.children}
        </UserInfoContext.Provider>
    );
}


export default UserInfoProvider;
