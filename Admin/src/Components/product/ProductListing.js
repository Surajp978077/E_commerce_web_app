import { Divider, Typography } from '@mui/material';
import { CategoryBrowse } from './CategoryBrowse';
import CategorySearch from './CategorySearch';
import { useState } from 'react';

export const ProductListing = () => {
    const [selectedResult, setSelectedResult] = useState(null);
    const [categoriesNestedSearch, setCategoriesNestedSearch] = useState([]);

    return (
        <div>
            <div className='m-4'>
                <Typography variant='h5'>Select The Category For Your Product</Typography>
                <Typography variant='subtitle2'>You can use the Search or Browse options</Typography>
            </div>
            <CategorySearch
                selectedResult={selectedResult}
                setSelectedResult={setSelectedResult}
                categoriesNestedSearch={categoriesNestedSearch}
                setCategoriesNestedSearch={setCategoriesNestedSearch}
            />
            <Divider sx={{ width: '100%', marginBottom: '16px', borderColor: 'darkGrey' }} />
            <CategoryBrowse selectedResult={selectedResult} categoriesNestedSearch={categoriesNestedSearch} />
        </div>
    );
}