import Cards from './Cards';
import { useContext } from 'react';
import { UserInfoContext } from './UserInfoContext';
// import jwtDecode from 'jwt-decode';

export default function Info() {
    // const token = localStorage.getItem('token');
    // const decodedToken = jwtDecode(token);
    const { userInfo } = useContext(UserInfoContext);
    console.log(userInfo)
    return (
        <Cards Name={userInfo.UserName} Email={userInfo.Email}
            Street={userInfo.Address.Street} State={userInfo.Address.State}
            Pincode={userInfo.Address.Pincode} />
    )
}