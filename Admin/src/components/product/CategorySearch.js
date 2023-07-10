import React, { useState, useEffect, useCallback } from 'react';
import { productInstance } from '../../api/axios';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';

const CategorySearch = ({ selectedResult, setSelectedResult, categorySelectedLeaf, setCategorySelectedLeaf }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
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
                    const currentPath = [...path, node];

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

    const handleSelectResult = useCallback(
        (result) => {
            if (result) {
                setSelectedResult(result);
                setSearchQuery(result.map((item) => item.Name).join(' / '));
                setCategorySelectedLeaf(result[result.length - 1]);
            }
        },
        [setSelectedResult, setCategorySelectedLeaf]
    );

    useEffect(() => {
        if (selectedResult && selectedResult.length > 0 && categories && categories.length > 0) {
            handleSelectResult(selectedResult);
        }
    }, [selectedResult, categories, handleSelectResult]);

    return (
        <div className='m-4'>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Autocomplete
                    options={searchResults}
                    getOptionLabel={(result) => result.map((item) => item.Name).join(' / ')}
                    onChange={(event, result) => handleSelectResult(result)}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label='Filter by Category'
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    )}
                    sx={{ width: '50%' }}
                />
                <ManageSearchIcon
                    sx={{ color: 'white', backgroundColor: '#0d6efd', height: '56px', width: '56px' }}
                />
            </div>
        </div>
    );
};

export default CategorySearch;