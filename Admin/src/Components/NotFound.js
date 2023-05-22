import { Link } from 'react-router-dom';

export const NotFound = () => {
    return (
        <div className='ms-2'>
            <h1>Page not found!</h1>
            <h4>Go to the <Link to='/'>Homepage</Link>.</h4>
        </div>
    );
}