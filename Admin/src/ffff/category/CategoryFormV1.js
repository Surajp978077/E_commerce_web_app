import { useState } from 'react';
import { productInstance } from '../../api/axios';

export const CategoryForm = (props) => {
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