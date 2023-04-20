import React, { useState, useEffect } from 'react';
import UserInfoContext from './UserInfoContext';
import jwtDecode from 'jwt-decode';
import URLToken from './URLToken';


function UserInfoProvider(props) {
    const [userInfo, setUserInfo] = useState(null);
    const [error, setError] = useState(null);


    useEffect(() => {
        const token = localStorage.getItem('token');
        const decodedToken = jwtDecode(token);
        const id = decodedToken.id;

        fetch(`https://localhost:7240/api/UserInfo/${id}`, {
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
                // console.log(data)
            })
            .catch((error) => {
                setError(error);
            });
    }, []);

    if (error) {
        const clientID = "ff84a00f-99ab-4f81-9f52-26df485a9dcf"
        window.location.href = 'https://localhost:7085/?ClientId=' + clientID;
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
