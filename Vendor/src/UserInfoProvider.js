import React, { useState, useEffect } from 'react';
import UserInfoContext from './UserInfoContext';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

function UserInfoProvider(props) {
    const [userInfo, setUserInfo] = useState(null);
    var token = localStorage.getItem('token');

    const decodedToken = jwtDecode(token);
    const id = decodedToken.id;

    // useEffect(() => {
    //     async function fetchData() {
    //         const response = await axios.get('https://localhost:7240/api/UserInfo/' + decodedToken.id);
    //         setUserInfo(response.data);
    //     }

    //     fetchData();
    // }, []);

    //can go into infinte loop, so better to use useEffect if that happens
    async function getUserInfo() {
        const token = localStorage.getItem('token');
        const response = await fetch(`https://localhost:7240/api/UserInfo/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        // return data;
        console.log(data)
    }
    getUserInfo()


    return (
        <UserInfoContext.Provider value={userInfo}>
            {props.children}
        </UserInfoContext.Provider>
    );
}

export default UserInfoProvider;
