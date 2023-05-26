import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { productInstance } from '../../api/axios';
import { Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export const CategoryAdd = ({ category, onCategoryUpdate }) => {
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const [categoryName, setCategoryName] = useState('');
    const [categoryDescription, setCategoryDescription] = useState('');
    const [nameError, setNameError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setNameError('');
        setDescriptionError('');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validate category name
        if (categoryName.trim() === '') {
            setNameError('Category name cannot be blank');
            return;
        }

        // Validate category description
        if (categoryDescription.trim() === '') {
            setDescriptionError('Category description cannot be blank');
            return;
        }

        try {
            const formData = {
                Name: categoryName,
                Description: categoryDescription,
                ParentCategoryId: category ? category.CategoryId : undefined,
            };

            const response = await productInstance.post('/categories', formData);
            console.log(response);
            setCategoryName('');
            setCategoryDescription('');
            onCategoryUpdate();
        } catch (error) {
            console.log(`Error: ${error.message}`);
        }

        handleClose();
    };

    return (
        <div>
            <Button variant="text" onClick={handleClickOpen} startIcon={<AddIcon />}>
                Category
            </Button>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {category ? (
                        <Typography variant="h5" component="div">
                            Add subcategory to {category.Name}
                        </Typography>
                    ) : (
                        <Typography variant="h4" component="div">
                            Add main category
                        </Typography>
                    )}
                </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        id="categoryName"
                        label="Category Name"
                        placeholder="Category Name"
                        required
                        value={categoryName}
                        onChange={(e) => {
                            setCategoryName(e.target.value);
                            setNameError('');
                        }}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        error={!!nameError}
                        helperText={nameError}
                    />
                    <TextField
                        id="categoryDescription"
                        label="Category Description"
                        placeholder="Category Description"
                        required
                        value={categoryDescription}
                        onChange={(e) => {
                            setCategoryDescription(e.target.value);
                            setDescriptionError('');
                        }}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        error={!!descriptionError}
                        helperText={descriptionError}
                    />
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button type="submit" onClick={handleSubmit} autoFocus>
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};


// import { useState } from 'react';
// import { productInstance } from '../../api/axios';
// import { Button } from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';

// export const CategoryAdd = ({ category, onCategoryUpdate }) => {
//     const [categoryName, setcategoryName] = useState('');
//     const [categoryDescription, setcategoryDescription] = useState('');
//     const [showForm, setShowForm] = useState(false);

//     const handleSubmit = async (event) => {
//         event.preventDefault();

//         try {
//             const formData = {
//                 Name: categoryName,
//                 Description: categoryDescription,
//                 ParentCategoryId: category ? category.CategoryId : undefined
//             };

//             const response = await productInstance.post('/categories', formData);
//             console.log(response);
//             setcategoryName('');
//             setcategoryDescription('');
//             onCategoryUpdate();
//         } catch (error) {
//             console.log(`Error: ${error.message}`);
//         }

//         setShowForm(false);
//     }

//     return (
//         <>
//             <Button onClick={() => setShowForm(true)} sx={{ marginLeft: "0", width: 'fit-content', height: "inherit" }} variant='text' startIcon={<AddIcon />}>Category</Button>
//             {showForm && (
//                 <div className="popup">
//                     <div className="popup-inner">
//                         {category ? (
//                             <h2>{`Add a new category to ${category.Name}`}</h2>
//                         ) : (
//                             <h2>Add a new category</h2>
//                         )}

//                         <form onSubmit={handleSubmit}>
//                             <label htmlFor='categoryName'>Category Name</label>
//                             <input
//                                 autoFocus
//                                 id='categoryName'
//                                 type='text'
//                                 placeholder='Category Name'
//                                 required
//                                 value={categoryName}
//                                 onChange={(e) => setcategoryName(e.target.value)}
//                             />
//                             <label htmlFor='categoryDescription'>Category Description</label>
//                             <input
//                                 autoFocus
//                                 id='categoryDescription'
//                                 type='text'
//                                 placeholder='Category Description'
//                                 required
//                                 value={categoryDescription}
//                                 onChange={(e) => setcategoryDescription(e.target.value)}
//                             />
//                             <button type="submit">Submit</button>
//                             <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
//                         </form>
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// }

