import { productInstance } from '../../api/axios';

export const CategoryDelete = ({ CategoryId, onCategoryUpdate }) => {

    const handleDelete = async () => {
        try {
            const response = await productInstance.delete(`/categories/${CategoryId}`);
            console.log(response);
            onCategoryUpdate();
        } catch (error) {
            console.log(`Error: ${error.message}`);
        }
    }

    return (
        <span onClick={() => handleDelete()} style={{ cursor: 'pointer' }}>➖</span>
    );

}