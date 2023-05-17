import { useState } from 'react';
import { CategoryForm } from './CategoryFormV2';
import { CategoryItem } from './CategoryItemV2';

export const CategoryList = ({ categories, onCategoryUpdate }) => {
    const [showForm, setShowForm] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    // const handleShowForm = (category) => {
    //     setShowForm(true);
    //     setSelectedCategory(category);
    // }

    // const handleCloseForm = () => {
    //     setShowForm(false);
    //     setSelectedCategory(null);
    // }

    return (
        <ul>
            {categories && categories.$values && categories.$values.length > 0 ? (
                categories.$values.map(category => {
                    return category.$id && (
                        <CategoryItem key={category.CategoryId} category={category} handleShowForm={() => { setShowForm(true); setSelectedCategory(category); }} onCategoryUpdate={onCategoryUpdate} />
                    )
                })
            ) : (
                <p>No categories found.</p>
            )}
            {showForm && selectedCategory && (
                <CategoryForm category={selectedCategory} handleCloseForm={() => { setShowForm(false); setSelectedCategory(null); }} onCategoryUpdate={onCategoryUpdate} />
            )}
        </ul>
    );
}