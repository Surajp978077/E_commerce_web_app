import React, { useState, useEffect } from 'react';
import { productInstance } from '../../api/axios';

const CategoryItem = ({ category, onCategorySelect }) => {
  const handleToggle = () => {
    onCategorySelect(category.ChildCategories?.$values);
  };

  return (
    <div>
      <p onClick={handleToggle}>{category.Name}</p>
    </div>
  );
};

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await productInstance.get('/categories');
        setCategories(response.data.$values);
      } catch (error) {
        console.log('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategorySelect = (children) => {
    setSelectedCategories([...selectedCategories, children]);
  };

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '300px', height: '400px', overflow: 'auto' }}>
        {categories.map((category) => (
          <CategoryItem
            key={category.CategoryId}
            category={category}
            onCategorySelect={handleCategorySelect}
          />
        ))}
      </div>
      <div style={{ marginLeft: '20px' }}>
        {selectedCategories.map((selectedCategory, index) => (
          <div key={index}>
            {selectedCategory.map((category) => (
              <CategoryItem
                key={category.CategoryId}
                category={category}
                onCategorySelect={handleCategorySelect}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;