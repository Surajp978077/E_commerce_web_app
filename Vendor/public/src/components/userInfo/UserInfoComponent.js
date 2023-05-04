import React, { useContext } from 'react';
import UserInfoContext from './UserInfoContext';

function UserInfoComponent() {
    const userInfo = useContext(UserInfoContext);

    if (!userInfo) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{userInfo.Email}</h1>

        </div>
    );
}

export default UserInfoComponent;
