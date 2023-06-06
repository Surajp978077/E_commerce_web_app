import React, { useState, useEffect } from 'react';
import { productInstance } from '../../api/axios';

const CategoryItem = ({ category, onCategorySelect, level }) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleToggle = () => {
    if (!isSelected) {
      if (category.ChildCategories && category.ChildCategories.$values.length > 0) {
        onCategorySelect(category.ChildCategories?.$values, level);
      }
      setIsSelected(true);
    } else {
      onCategorySelect([], level);
      setIsSelected(false);
    }
  };

  return (
    <div>
      <p onClick={handleToggle} style={{ fontWeight: isSelected ? 'bold' : 'normal' }}>
        {category.Name}
      </p>
    </div>
  );
};

export const CategoryBrowse = () => {
  const [categories, setCategories] = useState([]);
  const [nestedCategories, setNestedCategories] = useState([]);

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

  const handleCategorySelect = (children, level) => {
    setNestedCategories((prevNestedCategories) => prevNestedCategories.slice(0, level));

    if (children.length > 0) {
      setNestedCategories((prevNestedCategories) => [...prevNestedCategories, children]);
    } else {
      setNestedCategories((prevNestedCategories) => prevNestedCategories.slice(0, level));
    }
  };

  return (
    <div className='m-3' style={{ display: 'flex' }}>
      <div style={{ height: '400px', overflowY: 'scroll', minWidth: '200px', padding: '0 10px' }}>
        {categories.map((category) => (
          <CategoryItem
            key={category.CategoryId}
            category={category}
            onCategorySelect={handleCategorySelect}
            level={0}
          />
        ))}
      </div>
      {nestedCategories.map((nestedCategory, index) => (
        <div
          key={index}
          style={{ height: '400px', overflowY: 'scroll', minWidth: '200px', padding: '0 10px' }}
        >
          {nestedCategory.map((category) => (
            <CategoryItem
              key={category.CategoryId}
              category={category}
              onCategorySelect={handleCategorySelect}
              level={index + 1}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

// import React, { useState, useEffect } from 'react';
// import { productInstance } from '../../api/axios';
// import { Box, Typography } from '@mui/material';

// const CategoryItem = ({ category, onCategorySelect, selectedCategory }) => {
//   const handleToggle = () => {
//     onCategorySelect(category);
//   };

//   return (
//     <Box
//       sx={{
//         cursor: 'pointer',
//         mb: 2,
//         backgroundColor: category === selectedCategory ? '#f0f0f0' : 'transparent',
//         fontWeight: category === selectedCategory ? 'bold' : 'normal',
//       }}
//       onClick={handleToggle}
//     >
//       <Typography variant='body1'>{category.Name}</Typography>
//     </Box>
//   );
// };

//   export const CategoryBrowse = () => {
//   const [categories, setCategories] = useState([]);
//   const [nestedCategories, setNestedCategories] = useState({});
//   const [selectedCategory, setSelectedCategory] = useState(null);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await productInstance.get('/categories');
//         setCategories(response.data.$values);
//       } catch (error) {
//         console.log('Error fetching categories:', error);
//       }
//     };

//     fetchCategories();
//   }, []);

//   const handleCategorySelect = (category) => {
//     const isCategorySelected = selectedCategory && selectedCategory.CategoryId === category.CategoryId;

//     if (isCategorySelected || category.ChildCategories?.$values.length === 0) {
//       setSelectedCategory(category);
//     }

//     if (category.ChildCategories?.$values.length > 0) {
//       setNestedCategories(prevNestedCategories => ({
//         ...prevNestedCategories,
//         [category.CategoryId]: category.ChildCategories?.$values
//       }));
//     }
//   };

//   return (
//     <Box sx={{ display: 'flex', padding: '10px' }}>
//       <Box sx={{ height: '400px', overflowY: 'scroll', minWidth: '200px', padding: '0 10px' }}>
//         {categories.map((category) => (
//           <CategoryItem
//             key={category.CategoryId}
//             category={category}
//             onCategorySelect={handleCategorySelect}
//             selectedCategory={selectedCategory}
//           />
//         ))}
//       </Box>
//       {Object.keys(nestedCategories).map((categoryId) => (
//         <Box
//           key={categoryId}
//           sx={{ height: '400px', overflowY: 'scroll', minWidth: '200px', padding: '0 10px' }}
//         >
//           {nestedCategories[categoryId].map((category) => (
//             <CategoryItem
//               key={category.CategoryId}
//               category={category}
//               onCategorySelect={handleCategorySelect}
//               selectedCategory={selectedCategory}
//             />
//           ))}
//         </Box>
//       ))}
//     </Box>
//   );
// };