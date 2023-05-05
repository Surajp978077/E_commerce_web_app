import { useContext } from 'react';
import Cards from './Cards';
// import jwtDecode from 'jwt-decode';
import UserInfoContext from './UserInfoContext';

export default function Info() {
    // const token = localStorage.getItem('token');
    // const decodedToken = jwtDecode(token);
    const userInfo = useContext(UserInfoContext);

    return (
        <Cards Name={userInfo.UserName} Email={userInfo.Email}
        Street={userInfo.Address.Street} State={userInfo.Address.State}
        Pincode={userInfo.Address.Pincode} />
    )
}