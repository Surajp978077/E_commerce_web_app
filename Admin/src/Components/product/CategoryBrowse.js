import { useEffect, useState } from 'react';
import { productInstance } from '../../api/axios';

const CategoryList = ({ categories, onCategorySelect, categoriesSelected, level }) => {

    const handleToggle = (category) => {
        onCategorySelect(category, level);
    }

    return (
        <div
            style={{ height: '400px', overflowY: 'scroll', minWidth: '200px', padding: '0 10px' }}
        >
            {categories.map((category) => (
                <p onClick={() => handleToggle(category)} style={{ fontWeight: categoriesSelected[level] === category.CategoryId ? 'bold' : 'normal' }}>
                    {category.Name}
                </p>
            ))}
        </div>
    );
}

export const CategoryBrowse = () => {
    const [categoriesNested, setCategoriesNested] = useState([]);
    const [categoriesSelected, setCategoriesSelected] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await productInstance.get('/categories');
                setCategoriesNested([response.data.$values]);
            } catch (error) {
                console.log('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, [])

    const handleCategorySelect = (category, level) => {
        if (categoriesSelected[level] === category.CategoryId) {
            return;
        }

        setCategoriesNested((categoriesNestedPrev) => categoriesNestedPrev.slice(0, level));
        if (category.ChildCategories && category.ChildCategories.$values.length > 0) {
            setCategoriesNested((categoriesNestedPrev) => [...categoriesNestedPrev, category.ChildCategories.$values]);
        }
        setCategoriesSelected((categoriesSelectedPrev) => categoriesSelectedPrev.slice(0, level));
        setCategoriesSelected((categoriesSelectedPrev) => {
            const newArray = [...categoriesSelectedPrev];
            newArray[level] = category.CategoryId;
            return newArray;
        });
    }

    return (
        <div className='m-3' style={{ display: 'flex' }}>
            {categoriesNested.map((categories, index) => (
                <CategoryList
                    key={index}
                    categories={categories}
                    onCategorySelect={handleCategorySelect}
                    categoriesSelected={categoriesSelected}
                    level={index + 1}
                />
            ))}
        </div>
    );
}