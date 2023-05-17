import { useEffect, useState } from 'react';
import { productInstance } from '../api/axios';
import { CategoryList } from './CategoryListV1';

const Category = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await productInstance.get('/categories');
                console.log(response);
                if (response && response.data) {
                    setCategories(response.data);
                }
            }
            catch (error) {
                if (error.response) {
                    // Received response but not in 200 range
                    console.log(`ErrorResponseData: ${error.response.data}`);
                    console.log(`ErrorResponseStatus: ${error.response.status}`);
                    console.log(`ErrorResponseHeaders: ${error.response.headers}`);
                }
                else {
                    console.log(`ErrorMessage: ${error.message}`);
                }
            }
        }

        fetchCategories();
    }, [])

    return (
        <div className='m-2'>
            <h4>List of Categories:</h4>
            {categories && categories.$values && categories.$values.length > 0 ? (
                <CategoryList {...categories} />
            ) : (
                <p>No categories found.</p>
            )}
        </div>
    );
}

export default Category;