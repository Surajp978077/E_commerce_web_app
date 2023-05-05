import { useEffect, useState } from 'react';
import UserInfoContext from './UserInfoContext';
import jwtDecode from 'jwt-decode';

const UserInfoProvider = (props) => {
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
        const clientId = "b6782e13-5669-4156-82a8-1850883214e4";
        window.location.href = 'https://localhost:7085/?ClientId=' + clientId;
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