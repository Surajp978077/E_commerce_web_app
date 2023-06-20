import { useState } from 'react';
import { productInstance } from '../../api/axios';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

export const CategoryDelete = ({ category, onCategoryUpdate }) => {
    const [open, setOpen] = useState(false);
    const [error, setError] = useState('');

    const handleOpen = (event) => {
        event.stopPropagation();
        setOpen(true);
    };

    const handleClose = (event) => {
        event.stopPropagation();
        setOpen(false);
    };

    const handleDelete = async (event) => {
        event.stopPropagation();
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

    const handleSnackbarClose = (event, reason) => {
        if (event) {
            event.stopPropagation();
        }
        if (reason === 'clickaway') {
            return;
        }
        setError('');
    };

    return (
        <>
            <IconButton onClick={handleOpen} aria-label='delete'>
                <DeleteIcon />
            </IconButton>
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
        </>
    );
};

// import { productInstance } from '../../api/axios';
// import IconButton from '@mui/material/IconButton';
// import DeleteIcon from '@mui/icons-material/Delete';

// export const CategoryDelete = ({ category, onCategoryUpdate }) => {

//     const handleDelete = async (event) => {
//         event.stopPropagation();

//         const confirmed = window.confirm(`Are you sure you want to delete '${category.Name}' category?`);
//         if (confirmed) {
//             try {
//                 const response = await productInstance.delete(`/categories/${category.CategoryId}`);
//                 console.log(response);
//                 onCategoryUpdate();
//             } catch (error) {
//                 if (error.response && error.response.status === 500) {
//                     displayErrorPopup('Please delete subcategories/products first');
//                 } else {
//                     console.log(`Error: ${error.message}`);
//                 }
//             }
//         }
//     }

//     const displayErrorPopup = (message) => {
//         alert(message);
//     }

//     return (
//         // <span onClick={handleDelete} style={{ cursor: 'pointer' }}>➖</span>
//         <IconButton onClick={handleDelete} aria-label='delete'>
//             <DeleteIcon />
//         </IconButton>
//     );

// }