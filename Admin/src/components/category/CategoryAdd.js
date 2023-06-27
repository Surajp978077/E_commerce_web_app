import { useState } from 'react';
import { productInstance } from '../../api/axios';
import AddIcon from '@mui/icons-material/Add';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    Switch,
    TextField,
    Typography,
    useMediaQuery,
    useTheme,
    Snackbar,
    Alert,
} from '@mui/material';

export const CategoryAdd = ({ category, onCategoryUpdate }) => {
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const [categoryName, setCategoryName] = useState('');
    const [categoryDescription, setCategoryDescription] = useState('');
    const [hasProducts, setHasProducts] = useState(false);
    const [basicDetails, setBasicDetails] = useState(['']);
    const [keySpecErrors, setKeySpecErrors] = useState([]);

    const [nameError, setNameError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason !== 'backdropClick') {
            setOpen(false);
            setNameError('');
            setDescriptionError('');
            setHasProducts(false);
            setBasicDetails(['']);
            setKeySpecErrors([]);
        }
    };

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
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

        // Validate key product specifications if hasProducts is selected
        if (hasProducts) {
            const updatedKeySpecErrors = basicDetails.map((detail) => {
                if (detail.trim() === '') {
                    return 'Key specification cannot be blank (remove/fill)';
                }
                return '';
            });
            if (updatedKeySpecErrors.some((error) => error !== '')) {
                setKeySpecErrors(updatedKeySpecErrors);
                return;
            }
        }

        try {
            const formData = {
                Name: categoryName,
                Description: categoryDescription,
                ParentCategoryId: category ? category.CategoryId : undefined,
                HasProducts: hasProducts,
                BasicDetails: hasProducts ? basicDetails : null,
                OptionalDetails: null,
            };

            const response = await productInstance.post('/categories', formData);
            console.log(response);
            setCategoryName('');
            setCategoryDescription('');
            onCategoryUpdate();
            setSnackbarMessage('Category added successfully');
            setSnackbarSeverity('success');
        } catch (error) {
            console.log(error);
            if (error.response && error.response.data && error.response.data.Message) {
                setSnackbarMessage(error.response.data.Message);
            } else {
                setSnackbarMessage('Error adding category');
            }
            setSnackbarSeverity('error');
        }

        setSnackbarOpen(true);
        handleClose();
    };

    const handleAddKeySpecification = () => {
        setBasicDetails([...basicDetails, '']);
        setKeySpecErrors([...keySpecErrors, '']);
    };

    const handleRemoveKeySpecification = (index) => {
        const updatedBasicDetails = [...basicDetails];
        updatedBasicDetails.splice(index, 1);
        setBasicDetails(updatedBasicDetails);

        const updatedKeySpecErrors = [...keySpecErrors];
        updatedKeySpecErrors.splice(index, 1);
        setKeySpecErrors(updatedKeySpecErrors);
    };

    const handleKeySpecificationChange = (index, value) => {
        const updatedBasicDetails = [...basicDetails];
        updatedBasicDetails[index] = value;
        setBasicDetails(updatedBasicDetails);

        const updatedKeySpecErrors = [...keySpecErrors];
        updatedKeySpecErrors[index] = '';
        setKeySpecErrors(updatedKeySpecErrors);
    };

    return (
        <div>
            <Button variant='text' onClick={handleClickOpen} startIcon={<AddIcon />}>
                Category
            </Button>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby='responsive-dialog-title'
                disableEscapeKeyDown
            >
                <DialogTitle id='responsive-dialog-title'>
                    {category ? (
                        <Typography variant='h5' component='div'>
                            Add subcategory to {category.Name}
                        </Typography>
                    ) : (
                        <Typography variant='h4' component='div'>
                            Add main category
                        </Typography>
                    )}
                </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        id='categoryName'
                        label='Category Name'
                        placeholder='Category Name'
                        required
                        value={categoryName}
                        onChange={(e) => {
                            setCategoryName(e.target.value);
                            setNameError('');
                        }}
                        fullWidth
                        margin='normal'
                        variant='outlined'
                        error={!!nameError}
                        helperText={nameError}
                    />
                    <TextField
                        id='categoryDescription'
                        label='Category Description'
                        placeholder='Category Description'
                        required
                        value={categoryDescription}
                        onChange={(e) => {
                            setCategoryDescription(e.target.value);
                            setDescriptionError('');
                        }}
                        fullWidth
                        margin='normal'
                        variant='outlined'
                        error={!!descriptionError}
                        helperText={descriptionError}
                    />
                    <FormControlLabel
                        control={
                            <Switch
                                checked={hasProducts}
                                onChange={(e) => setHasProducts(e.target.checked)}
                                color='primary'
                            />
                        }
                        label='Has Products'
                    />
                    {hasProducts && (
                        <div>
                            <Typography variant='body1' component='div'>
                                Key Product Specifications:
                            </Typography>
                            {basicDetails.map((keySpec, index) => (
                                <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                                    <TextField
                                        id={`keySpecification-${index}`}
                                        label={`Specification ${index + 1}`}
                                        placeholder='Enter specification'
                                        required
                                        value={keySpec}
                                        onChange={(e) => handleKeySpecificationChange(index, e.target.value)}
                                        fullWidth
                                        margin='normal'
                                        variant='outlined'
                                        style={{ marginRight: '8px' }}
                                        error={!!keySpecErrors[index]}
                                        helperText={keySpecErrors[index]}
                                    />
                                    <Button
                                        variant='outlined'
                                        color='error'
                                        onClick={() => handleRemoveKeySpecification(index)}
                                    >
                                        Remove
                                    </Button>
                                </div>
                            ))}
                            <Button variant='outlined' onClick={handleAddKeySpecification}>
                                Add Specification
                            </Button>
                        </div>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button type='submit' onClick={handleSubmit} autoFocus>
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};
