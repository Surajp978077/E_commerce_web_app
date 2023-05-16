
// V3 is same, only separated to many files

import { useEffect, useState } from 'react';
import { productInstance } from '../api/axios';
// import Table from 'react-bootstrap/Table';

const Category = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await productInstance.get('/categories');
                // console.log(response.data);
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

const CategoryList = (props) => {
    // console.log(props);
    const categories = props.$values;
    const [showForm, setShowForm] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleClick = (category) => {
        setShowForm(true);
        setSelectedCategory(category);
        console.log(`Button clicked for category ${category.Name}`);
    }

    const handleClose = () => {
        setShowForm(false);
        setSelectedCategory(null);
    }

    return (
        <ul>
            {categories.map(category => {
                return category.$id && (
                    <li key={category.CategoryId}>
                        <span className='me-2'>{category.Name}</span>
                        <button onClick={() => handleClick(category)}>+</button>
                        {category.ChildCategories.$values.length > 0 && (
                            <CategoryList {...category.ChildCategories} />
                        )}
                    </li>
                )
            })}
            {showForm && selectedCategory && (
                <CategoryForm category={selectedCategory} handleClose={handleClose} />
            )}
        </ul>
    );
}

const CategoryForm = (props) => {
    const { category, handleClose } = props;
    const [categoryName, setcategoryName] = useState('');
    const [categoryDescription, setcategoryDescription] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            console.log(categoryName);
            console.log(categoryDescription);
            const formData = {
                Name: categoryName,
                Description: categoryDescription,
                ParentCategoryId: category.CategoryId
            };
            console.log(formData);
            const response = await productInstance.post('/categories', formData);
            console.log(`Category Name: ${categoryName}, Description: ${categoryDescription}`);
            console.log(response);
            setcategoryName('');
            setcategoryDescription('');
        } catch (error) {
            console.log(`Error: ${error.message}`);
        }

        handleClose();
    }

    return (
        <div className="popup">
            <div className="popup-inner">
                <h2>{`Add a new category to ${category.Name}`}</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor='categoryName'>Category Name</label>
                    <input
                        autoFocus
                        id='categoryName'
                        type='text'
                        placeholder='Category Name'
                        required
                        value={categoryName}
                        onChange={(e) => setcategoryName(e.target.value)}
                    />
                    <label htmlFor='categoryDescription'>Category Description</label>
                    <input
                        autoFocus
                        id='categoryDescription'
                        type='text'
                        placeholder='Category Description'
                        required
                        value={categoryDescription}
                        onChange={(e) => setcategoryDescription(e.target.value)}
                    />
                    <button type="submit">Submit</button>
                    <button type="button" onClick={handleClose}>Cancel</button>
                </form>
            </div>
        </div>
    );
}

export default Category;