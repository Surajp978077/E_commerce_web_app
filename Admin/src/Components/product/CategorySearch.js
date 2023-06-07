import React, { useState, useEffect } from 'react';
import { productInstance } from '../../api/axios';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
// import { Typography } from '@mui/material';

const CategorySearch = ({ selectedResult, setSelectedResult, setCategoriesNestedSearch }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    // const [selectedResult, setSelectedResult] = useState(null);
    const [categories, setCategories] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await productInstance.get('/categories');
                setCategories(response.data.$values);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchData();
    }, [])

    useEffect(() => {
        const handleSearch = () => {
            if (!searchQuery) {
                setSearchResults([]);
                return;
            }

            const results = categories.reduce((searchResults, category) => {
                const searchLeafNodes = (node, path = []) => {
                    const currentPath = [...path, { CategoryId: node.CategoryId, Name: node.Name }];

                    if (node.ChildCategories && node.ChildCategories.$values.length > 0) {
                        node.ChildCategories.$values.forEach((childNode) => {
                            searchLeafNodes(childNode, currentPath);
                        });
                    } else {
                        if (node.Name && node.Name.toLowerCase().includes(searchQuery.toLowerCase())) {
                            searchResults.push(currentPath);
                        }
                    }
                };

                searchLeafNodes(category);
                return searchResults;
            }, []);

            setSearchResults(results);
        };

        handleSearch();
    }, [searchQuery, categories]);

    const handleSelectResult = (result) => {
        if (result) {
            setSelectedResult(result);
            setSearchQuery(result.map((item) => item.Name).join(' / '));

            createNestedArray(result, categories);
        }
    }

    const createNestedArray = (result, categories) => {
        let tempArray = [categories];

        result.forEach((item, index) => {
            const matchingCategory = tempArray[index].find(
                (category) => category.CategoryId === item.CategoryId
            );

            if (matchingCategory) {
                if (
                    matchingCategory.ChildCategories &&
                    matchingCategory.ChildCategories.$values.length > 0
                ) {
                    tempArray = [...tempArray, matchingCategory.ChildCategories.$values];
                }
            }
        });

        setCategoriesNestedSearch(tempArray);
    };

    return (
        <div className='m-4'>
            <Autocomplete
                options={searchResults}
                getOptionLabel={(result) => result.map((item) => item.Name).join(' / ')}
                onChange={(event, result) => handleSelectResult(result)}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label='Search Categories'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                )}
                sx={{ width: '50%' }}
            />

            {/* {selectedResult && (
                <div className='my-3'>
                    <Typography variant='subtitle2' sx={{ color: 'rgba(0, 0, 0, 0.54)' }}>Selected Category:&nbsp;
                        <span style={{ fontWeight: 'bold' }}>
                            {selectedResult.map((item) => item.Name).join(' / ')}
                        </span>
                    </Typography>
                </div>
            )} */}
        </div>
    );
};

export default CategorySearch;


// import React, { useState, useEffect } from 'react';
// import { productInstance } from '../../api/axios';
// import TextField from '@mui/material/TextField';
// import Autocomplete from '@mui/material/Autocomplete';
// import { Typography } from '@mui/material';

// const CategorySearch = () => {
//     const [searchQuery, setSearchQuery] = useState('');
//     const [searchResults, setSearchResults] = useState([]);
//     const [selectedResult, setSelectedResult] = useState(null);
//     const [categories, setCategories] = useState([]);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await productInstance.get('/categories');
//                 setCategories(response.data.$values);
//             } catch (error) {
//                 console.error('Error fetching categories:', error);
//             }
//         };

//         fetchData();
//     }, [])

//     useEffect(() => {
//         const handleSearch = () => {
//             if (!searchQuery) {
//                 setSearchResults([]);
//                 return;
//             }

//             const results = categories.reduce((searchResults, category) => {
//                 const searchLeafNodes = (node, path = []) => {
//                     if (node.ChildCategories && node.ChildCategories.$values.length > 0) {
//                         node.ChildCategories.$values.forEach((childNode) => {
//                             searchLeafNodes(childNode, [...path, node.Name]); // Append the current node's name
//                         });
//                     } else {
//                         if (node.Name && node.Name.toLowerCase().includes(searchQuery.toLowerCase())) {
//                             searchResults.push({ path, node: { Name: node.Name, CategoryId: node.CategoryId } });
//                         }
//                     }
//                 };

//                 searchLeafNodes(category);
//                 return searchResults;
//             }, []);

//             setSearchResults(results);
//         };

//         handleSearch();
//     }, [searchQuery, categories])

//     const handleSelectResult = (result) => {
//         if (result) {
//             setSelectedResult(result);
//             setSearchQuery(result.path.join(' / ') + ' / ' + result.node.Name);
//         }
//     }

//     return (
//         <div className='m-4'>
//             <Autocomplete
//                 options={searchResults}
//                 getOptionLabel={(result) => result.path.join(' / ') + ' / ' + result.node.Name}
//                 onChange={(event, result) => handleSelectResult(result)}
//                 renderInput={(params) => (
//                     <TextField
//                         {...params}
//                         label='Search Categories'
//                         value={searchQuery}
//                         onChange={(e) => setSearchQuery(e.target.value)}
//                     />
//                 )}
//                 sx={{ width: '50%' }}
//             />

//             {selectedResult && (
//                 <div className='my-3'>
//                     <Typography variant='h5'>Selected Category:</Typography>
//                     <Typography>
//                         {selectedResult.path.join(' / ')} / {selectedResult.node.Name}
//                     </Typography>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default CategorySearch;