import { useState } from 'react';
import { productInstance } from '../api/axios';

export const CategoryForm = ({ category, handleCloseForm, onCategoryUpdate }) => {
    console.log(`Category: ${category}`);
    console.log(`handleCloseForm: ${handleCloseForm}`);
    console.log(`onCategoryUpdate: ${onCategoryUpdate}`);
    const [categoryName, setcategoryName] = useState('');
    const [categoryDescription, setcategoryDescription] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            let formData;
            if (category) {
                formData = {
                    Name: categoryName,
                    Description: categoryDescription,
                    ParentCategoryId: category.CategoryId
                };
            } else {
                formData = {
                    Name: categoryName,
                    Description: categoryDescription
                };
            }

            const response = await productInstance.post('/categories', formData);
            console.log(response);
            setcategoryName('');
            setcategoryDescription('');
            onCategoryUpdate();
        } catch (error) {
            console.log(`Error: ${error.message}`);
        }

        handleCloseForm();
    }

    return (
        <div className="popup">
            <div className="popup-inner">
                {category ? (
                    <h2>{`Add a new category to ${category.Name}`}</h2>
                ) : (
                    <h2>Add a new category</h2>
                )}

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
                    <button type="button" onClick={handleCloseForm}>Cancel</button>
                </form>
            </div>
        </div>
    );
}