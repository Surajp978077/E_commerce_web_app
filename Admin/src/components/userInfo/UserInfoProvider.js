import { useEffect, useState } from 'react';
import { UserInfoContext } from './UserInfoContext';
import jwtDecode from 'jwt-decode';
import { LOGINPAGE, LOADING } from '../../config/config';
import { userInfoInstance } from '../../api/axios';
import { Grid, Typography } from '@mui/material';

export const UserInfoProvider = (props) => {
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);
  const [redirectTimer, setRedirectTimer] = useState(1);

  useEffect(() => {
    const token = localStorage.getItem('token');

    const getUserInfo = async (token) => {
      try {
        const decodedToken = jwtDecode(token);
        const response = await userInfoInstance.get(`/${decodedToken.id}`);
        if (response?.data) {
          setUserInfo(response.data);
        }
      } catch (error) {
        handleApiError(error);
      }
    };

    if (token) {
      getUserInfo(token);
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

  // const redirect = () => {
  //   window.location.href = LOGINPAGE;
  // }

  // const handleApiError = (error) => {
  //   console.log(error);
  //   if (error.response) {
  //     if (error.response.status === 401) {
  //       redirect();
  //     } else {
  //       const errorMessage = error.response.data?.message
  //         ? `Error: ${error.response.data.message}`
  //         : error.message;
  //       setError(
  //         <>
  //           Error code: {error.code}
  //           <br />
  //           Error status: {error.response.status}
  //           <br />
  //           Error message: {errorMessage}
  //         </>
  //       );
  //     }
  //   } else if (error.request) {
  //     setError(
  //       <>
  //         Error code: {error.code}
  //         <br />
  //         Error message: {error.message}
  //       </>
  //     );
  //   } else {
  //     redirect();
  //   }
  // };

  const handleApiError = (error) => {
    if (error.code === 'ECONNABORTED') {
      // setError('Request timed out');
      setError(error.message);
    } else if (error.response) {
      if (error.response.status === 401) {
        setError('Not Authorized');
      } else {
        const errorMessage = error.response.data?.message
          ? `Error: ${error.response.data.message}`
          : 'An unknown error occurred';
        setError(errorMessage);
      }
    } else if (error.request) {
      setError('Could not connect to API');
    } else {
      setError('An error occurred');
    }

    setRedirectTimer(2);
  };

  // if (userInfo && userInfo.Role !== 'Admin') {
  //   redirect();
  // }

  // if (error) {
  //   return (
  //     <div>
  //       Could not connect to the server.
  //       <br />
  //       {error}
  //       <br />
  //       Kindly contact the development team.
  //     </div>
  //   );
  // }

  if (error || (userInfo && userInfo.Role !== 'Admin')) {
    return (
      <div>
        {error || 'Not Authorized'}
        <br />
        Redirecting to login page in {redirectTimer} seconds...
      </div>
    );
  }

  if (!userInfo) {
    return (
      <Grid container justifyContent='center' alignItems='center' sx={{ height: '100vh', backgroundColor: 'rgba(0, 0, 0, 0.622)' }}>
        <Grid item>
          <div>
            <img src={LOADING} alt='loading' style={{ height: '150px' }} />
          </div>
          <Typography variant='h5' align='center'>
            Loading...
          </Typography>
        </Grid>
      </Grid>
    );
  }

  return (
    <UserInfoContext.Provider value={{ userInfo, setUserInfo }}>
      {props.children}
    </UserInfoContext.Provider>
  );
};