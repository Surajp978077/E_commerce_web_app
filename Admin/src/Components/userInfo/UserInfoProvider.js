import { useEffect, useState } from 'react';
import { UserInfoContext } from './UserInfoContext';
import jwtDecode from 'jwt-decode';
import { LOGINPAGE } from '../../config/config';
import { LOADING } from '../../config/config';
import { userInfoInstance } from '../../api/axios';

export const UserInfoProvider = (props) => {
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [redirectTimer, setRedirectTimer] = useState(1);

  useEffect(() => {
    const token = localStorage.getItem('token');

    const getUserInfo = async (token) => {
      try {
        const decodedToken = jwtDecode(token);
        const response = await userInfoInstance.get(`/${decodedToken.id}`);
        if (response && response.data) {
          setUserInfo(response.data);
        }
      } catch (error) {
        handleApiError(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (token) {
      getUserInfo(token);
    } else {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (redirectTimer === 0) {
      window.location.href = LOGINPAGE;
    } else if (error || (userInfo && userInfo.Role !== 'Admin')) {
      const countdown = setTimeout(() => {
        setRedirectTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => clearTimeout(countdown);
    }
  }, [error, userInfo, redirectTimer]);

  const handleApiError = (error) => {
    if (error.code === 'ECONNABORTED') {
      setError('Request timed out');
    } else if (error.response) {
      if (error.response.status === 401) {
        setError('Not Authorized');
      } else {
        const errorMessage = error.response.data && error.response.data.message
          ? `Error: ${error.response.data.message}`
          : 'An unknown error occurred';
        setError(errorMessage);
      }
    } else if (error.request) {
      setError('Could not connect to API');
    } else {
      setError('An error occurred');
    }

    setRedirectTimer(1);
  };

  if (error || (userInfo && userInfo.Role !== 'Admin')) {
    return (
      <div>
        {error || 'Not Authorized'}
        <br />
        Redirecting to login page in {redirectTimer} seconds...
      </div>
    );
  }

  if (isLoading) {
    return (
      <div>
        <img src={LOADING} alt='loading' />
      </div>
    );
  }

  return (
    <UserInfoContext.Provider value={{ userInfo, setUserInfo }}>
      {props.children}
    </UserInfoContext.Provider>
  );
};