import { productInstance } from '../../api/axios';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

export const CategoryDelete = ({ category, onCategoryUpdate }) => {

    const handleDelete = async () => {
        const confirmed = window.confirm(`Are you sure you want to delete '${category.Name}' category?`);
        if (confirmed) {
            try {
                const response = await productInstance.delete(`/categories/${category.CategoryId}`);
                console.log(response);
                onCategoryUpdate();
            } catch (error) {
                if (error.response && error.response.status === 500) {
                    displayErrorPopup('Please delete subcategories/products first');
                } else {
                    console.log(`Error: ${error.message}`);
                }
            }
        }
    }

    const displayErrorPopup = (message) => {
        alert(message);
    }

    return (
        // <span onClick={handleDelete} style={{ cursor: 'pointer' }}>➖</span>
        <IconButton onClick={handleDelete} aria-label="delete">
            <DeleteIcon />
        </IconButton>
    );

}