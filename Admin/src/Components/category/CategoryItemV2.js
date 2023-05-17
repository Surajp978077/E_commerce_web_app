import { useState } from 'react';
import { CategoryList } from './CategoryListV2';
import { CategoryDelete } from './CategoryDeleteV2';

export const CategoryItem = ({ category, handleShowForm, onCategoryUpdate }) => {
    const [showDropdowns, setShowDropdowns] = useState(false);

    const handleToggleDropdowns = () => {
        setShowDropdowns(!showDropdowns);
    }

    return (
        // Shows dropdown even if there are no children
        // <li>
        //     <span className='me-2'>{category.Name}</span>
        //     <span onClick={() => handleShowForm(category)} style={{ cursor: 'pointer' }}>➕</span>
        //     <CategoryDelete CategoryId={category.CategoryId} onCategoryUpdate={onCategoryUpdate} />
        //     <span className='' onClick={handleToggleDropdowns} style={{ cursor: 'pointer' }}>
        //         {showDropdowns ? "🔼" : "🔽"}
        //     </span>
        //     {showDropdowns && (
        //         category.ChildCategories.$values.length > 0 && (
        //             <CategoryList categories={category.ChildCategories} onCategoryUpdate={onCategoryUpdate} />
        //         )
        //     )}
        // </li>

        // Shows dropdown only if there are children
        <li>
            <span className='me-2'>{category.Name}</span>
            <span onClick={() => handleShowForm(category)} style={{ cursor: 'pointer' }}>➕</span>
            <CategoryDelete CategoryId={category.CategoryId} onCategoryUpdate={onCategoryUpdate} />
            {category.ChildCategories.$values.length > 0 && (
                <>
                    <span className='' onClick={handleToggleDropdowns} style={{ cursor: 'pointer' }}>
                        {showDropdowns ? "🔼" : "🔽"}
                    </span>
                    {showDropdowns && (
                        <CategoryList categories={category.ChildCategories} onCategoryUpdate={onCategoryUpdate} />
                    )}
                </>
            )}
        </li>
    );
}