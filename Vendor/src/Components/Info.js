import Photo from './pic1.jpg'
import URLToken from '../URLToken'
// import PropTypes from 'prop-types';



export default function Info(props) {
    console.log(props);

    return (
        <>
            <img id='photo' src={Photo} alt='Profile pic'></img>
            <URLToken />
            <h4>{props.Name}</h4>
            <small>{props.Bio}</small>

        </>
    )
}



// Info.defaultProps = {
//     Name: 'World'
// };

// Info.propTypes = {
//     Name: PropTypes.string
// };