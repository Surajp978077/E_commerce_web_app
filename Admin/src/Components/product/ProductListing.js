import { Typography } from '@mui/material';
import { CategoryBrowse } from './CategoryBrowse';
import CategorySearch from './CategorySearch';

export const ProductListing = () => {

    return (
        <div>
            <div className='m-4'>
                <Typography variant='h5'>Select The Category For Your Product</Typography>
                <Typography variant='subtitle2'>You can use the Search or Browse options</Typography>
            </div>
            <CategorySearch />
            <Typography className='mx-4' variant='subtitle2' sx={{ color: 'rgba(0, 0, 0, 0.54)' }}>Browse Categories: </Typography>
            <CategoryBrowse />
        </div>
    );
}