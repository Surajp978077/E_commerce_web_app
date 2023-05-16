import { useState } from 'react';
import { CategoryList } from "./CategoryListV4"

export const CategoryItem = ({ category, handleShowForm, onCategoryUpdate }) => {
    const [showDropdowns, setShowDropdowns] = useState(false);

    const handleToggleDropdowns = () => {
        setShowDropdowns(!showDropdowns);
    };

    return (
        <li>
            <span className='me-2'>{category.Name}</span>
            <button onClick={() => handleShowForm(category)}>+</button>
            {category.ChildCategories.$values.length > 0 && (
                <>
                    <button onClick={handleToggleDropdowns}>
                        {showDropdowns ? "↑" : "↓"}
                    </button>
                    {showDropdowns && (
                        <CategoryList categories={category.ChildCategories} onCategoryUpdate={onCategoryUpdate} />
                    )}
                </>
            )}
        </li>
    )
}