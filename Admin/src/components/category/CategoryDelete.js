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
import Snackbar from '@mui/material/Snackbar';
import { Alert } from '@mui/material';

export const CategoryDelete = ({ category, onCategoryUpdate }) => {
    const [open, setOpen] = useState(false);
    // const [error, setError] = useState('');

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('error');

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = async (event) => {
        setLoading(true);
        setError(null);

        try {
            const response = await productInstance.delete(`/categories/${category.CategoryId}`);
            console.log(response);
            onCategoryUpdate();
            handleClose(event);

            // Show Snackbar if data is empty
            if (response && response.data && response.data.Data.length === 0) {
                setSnackbarMessage('No data found.');
                setSnackbarSeverity('info');
                setSnackbarOpen(true);
            }
        } catch (error) {
            console.error('Error deleting category:', error);
            if (error.response && error.response.status === 500) {
                // setError('Please delete subcategories/products first.');
                setSnackbarMessage('Please delete subcategories/products first.');

            } else {
                // setError('Error deleting category. Please try again.');
                // console.log(`Error: ${error.message}`);
                setSnackbarMessage('Error deleting category. Please try again.');

            }
            setError(true);
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
        finally {
            setLoading(false);
        }
    };

    const handleSnackbarClose = (reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
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
            {/* <Snackbar open={!!error} autoHideDuration={4000} onClose={handleSnackbarClose}>
                <MuiAlert onClose={handleSnackbarClose} severity='error' sx={{ width: '100%' }}>
                    {error}
                </MuiAlert>
            </Snackbar> */}
            {/* Show Snackbar for 'No data available' or for 'Error' */}
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </span>
    );
};
