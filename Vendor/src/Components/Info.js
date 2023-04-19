import Photo from './pic1.jpg'
import URLToken from '../URLToken'
// import PropTypes from 'prop-types';



export default function Info(props) {
    // console.log(props);

    return (
        <>
            <img id='photo' src={Photo} alt='Profile pic'></img>

            <h4>{props.Name}</h4><br />
            <small>Email: {props.Email}</small><br />
            <small>Street: {props.Street}</small><br />
            <small>State: {props.State}</small><br />
            <small>Pincode: {props.Pincode}</small><br />


        </>
    )
}



// Info.defaultProps = {
//     Name: 'World'
// };

// Info.propTypes = {
//     Name: PropTypes.string
// };