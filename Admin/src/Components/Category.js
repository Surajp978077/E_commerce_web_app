import { useEffect, useState } from 'react';
import { productInstance } from './api/axios';

export const CategoryGet = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await productInstance.get('/categories');
                console.log(response);
                if (response && response.data && response.data.$values) {
                    setCategories(response.data.$values);
                    // setCategories(response.data);
                }
            }
            catch (error) {
                if (error.response) {
                    // Received response but not in 200 range
                    // console.log(error.response.data);
                    // console.log(error.response.status);
                    // console.log(error.response.headers);
                    console.log(`ErrorResponseData: ${error.response.data}`);
                    console.log(`ErrorResponseStatus: ${error.response.status}`);
                    console.log(`ErrorResponseHeaders: ${error.response.headers}`);
                }
                else {
                    console.log(`ErrorMessage: ${error.message}`);
                }
            }
        };
        fetchCategories();
    }, [])

    return (
        <>
            <h4>List of Categories:</h4>
            {categories && categories.length > 0 ? (
                <ul>
                    {categories.map((category) => {
                        return (
                            <>
                                {category.$id && (
                                    <li key={category.CategoryId}>
                                        {category.CategoryId} | {category.Name} | {category.Description} |
                                        {category.ParentCategoryId}
                                    </li>
                                )}
                            </>
                        );
                    })}
                </ul>
            ) : (
                <p>No categories found.</p>
            )}
        </>
    );
}

const Category = () => {
    return (
        <CategoryGet />
    );

}

export default Category;