import { useState } from 'react';
import { CategoryForm } from './CategoryFormV1';

export const CategoryList = (props) => {
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