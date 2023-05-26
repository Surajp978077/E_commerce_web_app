import { useState } from 'react';
import { productInstance } from '../../api/axios';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export const CategoryAdd = ({ category, onCategoryUpdate }) => {
    const [categoryName, setcategoryName] = useState('');
    const [categoryDescription, setcategoryDescription] = useState('');
    const [showForm, setShowForm] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const formData = {
                Name: categoryName,
                Description: categoryDescription,
                ParentCategoryId: category ? category.CategoryId : undefined
            };

            const response = await productInstance.post('/categories', formData);
            console.log(response);
            setcategoryName('');
            setcategoryDescription('');
            onCategoryUpdate();
        } catch (error) {
            console.log(`Error: ${error.message}`);
        }

        setShowForm(false);
    }

    return (
        <>
            <Button onClick={() => setShowForm(true)} sx={{ marginLeft: "0", width: 'fit-content', height: "inherit" }} variant='text' startIcon={<AddIcon />}>Category</Button>
            {showForm && (
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
                            <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}