import { useEffect, useState } from 'react';
import { productInstance } from '../api/axios';
import { CategoryList } from './CategoryListV5';
import { CategoryForm } from './CategoryFormV5';

const Category = () => {
    const [categories, setCategories] = useState([]);
    const [updateCount, setUpdateCount] = useState(0);
    const [showForm, setShowForm] = useState(false);

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
        };
        fetchCategories();
    }, [updateCount])

    const handleUpdate = () => {
        setUpdateCount(previousCount => previousCount + 1);
    }

    // const handleShowForm = () => {
    //     setShowForm(true);
    // }

    // const handleCloseForm = () => {
    //     setShowForm(false);
    // }

    return (
        <div className='m-2'>
            <h4>List of Categories: <span onClick={() => setShowForm(true)} style={{ cursor: 'pointer' }}>➕</span></h4>
            <CategoryList categories={categories} onCategoryUpdate={handleUpdate} />
            {showForm && (
                <CategoryForm handleCloseForm={() => setShowForm(false)} onCategoryUpdate={handleUpdate} />
            )}
        </div>
    );
}

export default Category;