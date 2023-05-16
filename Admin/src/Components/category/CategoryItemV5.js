import { useState } from 'react';
import { CategoryList } from "./CategoryListV5"

export const CategoryItem = ({ category, handleShowForm, onCategoryUpdate }) => {
    const [showDropdowns, setShowDropdowns] = useState(false);

    const handleToggleDropdowns = () => {
        setShowDropdowns(!showDropdowns);
    };

    return (
        <li>
            <span className='me-2'>{category.Name}</span>
            <span onClick={() => handleShowForm(category)} style={{ cursor: 'pointer' }}>➕</span>
            <span className='' onClick={handleToggleDropdowns} style={{ cursor: 'pointer' }}>
                {showDropdowns ? "🔼" : "🔽"}
            </span>
            {showDropdowns && (
                category.ChildCategories.$values.length > 0 && (
                    <CategoryList categories={category.ChildCategories} onCategoryUpdate={onCategoryUpdate} />
                )
            )}
        </li>
    )
}