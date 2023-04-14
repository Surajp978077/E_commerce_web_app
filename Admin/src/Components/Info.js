import Cards from './Cards';
import jwtDecode from 'jwt-decode';

export default function Info() {
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    return (
        <Cards Name={decodedToken.UserName} Email={decodedToken.Email}
        Street={decodedToken.Street} State={decodedToken.State}
        Pincode={decodedToken.Pincode} />
    )
}