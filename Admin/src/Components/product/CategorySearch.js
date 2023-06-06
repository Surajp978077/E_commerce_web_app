import React, { useState, useEffect } from 'react';
import { productInstance } from '../../api/axios';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Typography } from '@mui/material';

const CategorySearch = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedResult, setSelectedResult] = useState(null);
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
    }, []);

    useEffect(() => {
        const handleSearch = () => {
            if (!searchQuery) {
                setSearchResults([]);
                return;
            }

            const results = categories.reduce((searchResults, category) => {
                const searchLeafNodes = (node, path = []) => {
                    if (node.ChildCategories && node.ChildCategories.$values.length > 0) {
                        node.ChildCategories.$values.forEach((childNode) => {
                            searchLeafNodes(childNode, [...path, node.Name]); // Append the current node's name
                        });
                    } else {
                        if (node.Name && node.Name.toLowerCase().includes(searchQuery.toLowerCase())) {
                            searchResults.push({ path, node: { Name: node.Name, CategoryId: node.CategoryId } });
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

    const handleSelectResult = (event, result) => {
        if (result) {
            setSelectedResult(result);
            setSearchQuery(result.path.join(' / ') + ' / ' + result.node.Name);
        }
    };

    return (
        <div className='m-4'>
            <Autocomplete
                options={searchResults}
                getOptionLabel={(result) => result.path.join(' / ') + ' / ' + result.node.Name}
                onChange={handleSelectResult}
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

            {selectedResult && (
                <div className='my-3'>
                    <Typography variant='h5'>Selected Category:</Typography>
                    <Typography>
                        {selectedResult.path.join(' / ')} / {selectedResult.node.Name}
                    </Typography>
                </div>
            )}
        </div>
    );
};

export default CategorySearch;