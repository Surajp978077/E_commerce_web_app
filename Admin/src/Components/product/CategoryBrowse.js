import { useEffect, useState } from 'react';
import { productInstance } from '../../api/axios';
import { Typography } from '@mui/material';

const CategoryList = ({ categories, onCategorySelect, categoriesSelected, level }) => {

    const handleToggle = (category) => {
        onCategorySelect(category, level);
    }

    return (
        <div
            style={{ height: '400px', overflowY: 'scroll', minWidth: '200px' }}
        >
            {categories.map((category, index) => (
                <p
                    key={`${category.CategoryId}-${index}`}
                    onClick={() => handleToggle(category)}
                    style={{
                        fontWeight:
                            categoriesSelected[level]?.CategoryId === category.CategoryId
                                ? 'bold'
                                : 'normal'
                    }}
                >
                    {category.Name}
                </p>
            ))}
        </div>
    );
}

export const CategoryBrowse = ({ selectedResult, categoriesNestedSearch }) => {
    const [categoriesNested, setCategoriesNested] = useState([]);
    const [categoriesSelected, setCategoriesSelected] = useState([]);

    useEffect(() => {
        if (selectedResult && categoriesNestedSearch) {
            setCategoriesNested(categoriesNestedSearch);
            setCategoriesSelected(selectedResult);
            console.log(categoriesNestedSearch);
        }
    }, [selectedResult, categoriesNestedSearch])
    

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
        console.log(level);
        if (categoriesSelected[level]?.CategoryId === category.CategoryId) {
            return;
        }
        console.log(level);
        setCategoriesNested((categoriesNestedPrev) => categoriesNestedPrev.slice(0, level + 1));

        if (category.ChildCategories && category.ChildCategories.$values.length > 0) {
            setCategoriesNested((categoriesNestedPrev) => [...categoriesNestedPrev, category.ChildCategories.$values]);
        }

        setCategoriesSelected((categoriesSelectedPrev) => categoriesSelectedPrev.slice(0, level + 1));

        setCategoriesSelected((categoriesSelectedPrev) => {
            const newArray = [...categoriesSelectedPrev];
            newArray[level] = {
                CategoryId: category.CategoryId,
                Name: category.Name
            };
            return newArray;
        });
    }

    return (
        <div>
            <Typography className='mx-4' variant='subtitle2' sx={{ color: 'rgba(0, 0, 0, 0.54)' }}>Browse Categories:&nbsp;
                <span style={{ fontWeight: 'bold' }}>
                    {categoriesSelected.map((category, index) => (
                        index === 0 ?
                            <span key={category.CategoryId}>{category.Name}</span>
                            : <span key={category.CategoryId}> / {category.Name}</span>
                    ))}
                </span>
            </Typography>
            <div className='m-4' style={{ display: 'flex' }}>
                {categoriesNested.map((categories, index) => (
                    <CategoryList
                        key={index}
                        categories={categories}
                        onCategorySelect={handleCategorySelect}
                        categoriesSelected={categoriesSelected}
                        level={index}
                    />
                ))}
            </div>
        </div>
    );
}