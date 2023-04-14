import Info from "./Components/Info";
import jwtDecode from 'jwt-decode';

export default function Card() {
    var token = localStorage.getItem('token');

    const decodedToken = jwtDecode(token);
    console.log(decodedToken)
    return (
        <div id='flexbox'>
            <div id="card">
                <Info Name={decodedToken.UserName} Email={decodedToken.Email} Street={decodedToken.Street} State={decodedToken.State} Pincode={decodedToken.Pincode} />

            </div>
            {/* <div id="card">
                <Info Name={name} Bio="Frontend Developer" />

            </div>
            <div id="card">
                <Info Name={3} Bio="Frontend Developer" />

            </div>
            <div id="card">
                <Info Name={3} Bio="Frontend Developer" />

            </div>
            <div id="card">
                <Info Name={3} Bio="Frontend Developer" />

            </div>
            <div id="card">
                <Info Name={3} Bio="Frontend Developer" />

            </div>
            <div id="card">
                <Info Name={3} Bio="Frontend Developer" />

            </div>
            <div id="card">
                <Info Name={3} Bio="Frontend Developer" />

            </div>
            <div id="card">
                <Info Name={3} Bio="Frontend Developer" />

            </div>
            <div id="card">
                <Info Name={3} Bio="Frontend Developer" />

            </div>
            <div id="card">
                <Info Name={3} Bio="Frontend Developer" />

            </div> */}
        </div>
    )
}