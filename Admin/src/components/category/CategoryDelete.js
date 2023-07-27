import { useState } from 'react';
import { productInstance } from '../../api/axios';
import Button from '@mui/material/Button';
import { 
    // DeleteOutline as DeleteOutlineIcon,
    DeleteForeverOutlined as DeleteForeverOutlinedIcon,
} from '@mui/icons-material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

export const CategoryDelete = ({ category, onCategoryUpdate }) => {
    const [open, setOpen] = useState(false);
    const [error, setError] = useState('');

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = async (event) => {
        try {
            const response = await productInstance.delete(`/categories/${category.CategoryId}`);
            console.log(response);
            onCategoryUpdate();
            handleClose(event);
        } catch (error) {
            if (error.response && error.response.status === 500) {
                setError('Please delete subcategories/products first');
            } else {
                setError('An error occurred while deleting the category');
                console.log(`Error: ${error.message}`);
            }
        }
    };

    const handleSnackbarClose = (reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setError('');
    };

    const handleWrapperClick = (event) => {
        event.stopPropagation();
    };

    return (
        <span onClick={handleWrapperClick}>
            <Button size='small' color='error' variant='text' onClick={handleOpen}>
                <DeleteForeverOutlinedIcon />
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    Are you sure you want to delete '{category.Name}' category?
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleDelete} autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={!!error} autoHideDuration={4000} onClose={handleSnackbarClose}>
                <MuiAlert onClose={handleSnackbarClose} severity='error' sx={{ width: '100%' }}>
                    {error}
                </MuiAlert>
            </Snackbar>
        </span>
    );
};
