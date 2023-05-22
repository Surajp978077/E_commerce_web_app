import { useEffect, useState } from 'react';
import { UserInfoContext } from './UserInfoContext';
import jwtDecode from 'jwt-decode';
import { LOGINPAGE } from '../../config/config';

export const UserInfoProvider = (props) => {
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const id = decodedToken.id;

    fetch(`https://localhost:7240/api/userinfo/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch user info');
        }
        return response.json();
      })
      .then((data) => {
        setUserInfo(data);
        console.log(data)
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  if (error) {
    console.log(error);
    window.location.href = LOGINPAGE;
  }

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  return (
    <UserInfoContext.Provider value={{ userInfo, setUserInfo }}>
      {props.children}
    </UserInfoContext.Provider>
  );
}