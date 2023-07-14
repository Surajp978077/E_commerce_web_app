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
import ImagePlaceholder from '../../assets/images/ImagePlaceholder.png';

export const CategoryAdd = ({ parentCategory, onCategoryUpdate }) => {
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const [categoryName, setCategoryName] = useState('');
    const [nameError, setNameError] = useState('');
    const [categoryDescription, setCategoryDescription] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    const [categoryImageUrl, setCategoryImageUrl] = useState('');
    const [imageUrlError, setImageUrlError] = useState('');
    const [hasSpecifications, setHasSpecifications] = useState(false);
    const [basicDetails, setBasicDetails] = useState(['']);
    const [keySpecErrors, setKeySpecErrors] = useState([]);
    const [optionalDetails, setOptionalDetails] = useState(['']);
    const [optionalSpecErrors, setOptionalSpecErrors] = useState([]);

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
            setImageUrlError('');
            setKeySpecErrors([]);
        }
    };

    const handleResetForm = () => {
        setCategoryName('')
        setNameError('');
        setCategoryDescription('');
        setDescriptionError('');
        setCategoryImageUrl('');
        setImageUrlError('');
        setHasSpecifications(false);
        setBasicDetails(['']);
        setKeySpecErrors([]);
        setOptionalDetails(['']);
        setOptionalSpecErrors([]);
    };

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    const handleImageError = () => {
        if (categoryImageUrl.trim() !== '') {
            setImageUrlError('Invalid image URL');
        }
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

        // Validate category imageUrl
        if (categoryImageUrl.trim() === '') {
            setImageUrlError('Category image URL cannot be blank');
            return;
        }

        // Validate specifications if hasSpecifications is selected
        if (hasSpecifications) {
            // Validate key product specifications
            const updatedKeySpecErrors = basicDetails.map((detail) => {
                if (detail.trim() === '') {
                    return 'Key specification cannot be blank (remove/fill)';
                }
                return '';
            });

            // Validate optional specifications
            const updatedOptionalSpecErrors = optionalDetails.map((detail) => {
                if (detail.trim() === '') {
                    return 'Optional specification cannot be blank (remove/fill)';
                }
                return '';
            });

            // Check if any errors exist in key or optional specifications
            if (updatedKeySpecErrors.some((error) => error !== '') || updatedOptionalSpecErrors.some((error) => error !== '')) {
                setKeySpecErrors(updatedKeySpecErrors);
                setOptionalSpecErrors(updatedOptionalSpecErrors);
                return;
            }
        }

        try {
            const formData = {
                Name: categoryName,
                Description: categoryDescription,
                CategoryImageUrl: categoryImageUrl,
                ParentCategoryId: parentCategory ? parentCategory.CategoryId : undefined,
                HasSpecifications: hasSpecifications,
                BasicDetails: hasSpecifications ? basicDetails : null,
                OptionalDetails: hasSpecifications ? optionalDetails : null,
            };

            const response = await productInstance.post('/categories', formData);
            console.log(response);

            handleResetForm();
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

    const handleAddOptionalSpecification = () => {
        setOptionalDetails([...optionalDetails, '']);
        setOptionalSpecErrors([...optionalSpecErrors, '']);
    };

    const handleRemoveOptionalSpecification = (index) => {
        const updatedOptionalDetails = [...optionalDetails];
        updatedOptionalDetails.splice(index, 1);
        setOptionalDetails(updatedOptionalDetails);

        const updatedOptionalSpecErrors = [...optionalSpecErrors];
        updatedOptionalSpecErrors.splice(index, 1);
        setOptionalSpecErrors(updatedOptionalSpecErrors);
    };

    const handleOptionalSpecificationChange = (index, value) => {
        const updatedOptionalDetails = [...optionalDetails];
        updatedOptionalDetails[index] = value;
        setOptionalDetails(updatedOptionalDetails);

        const updatedOptionalSpecErrors = [...optionalSpecErrors];
        updatedOptionalSpecErrors[index] = '';
        setOptionalSpecErrors(updatedOptionalSpecErrors);
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
                    {parentCategory ? (
                        <Typography variant='h5' component='div'>
                            Add subcategory to {parentCategory.Name}
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
                    <TextField
                        id='categoryImageUrl'
                        label='Category Image URL'
                        placeholder='Category Image URL'
                        required
                        value={categoryImageUrl}
                        onChange={(e) => {
                            setCategoryImageUrl(e.target.value);
                            setImageUrlError('');
                        }}
                        fullWidth
                        margin='normal'
                        variant='outlined'
                        error={!!imageUrlError}
                        helperText={imageUrlError}
                    />
                    <img
                        src={(categoryImageUrl.trim() === '' || imageUrlError)
                            ? ImagePlaceholder
                            : categoryImageUrl
                        }
                        alt='Category'
                        style={{
                            width: '100%',
                            height: '200px',
                            objectFit: 'contain',
                            opacity: (categoryImageUrl.trim() === '' || imageUrlError) ? '0.5' : '1',
                        }}
                        onError={handleImageError}
                    />
                    <FormControlLabel
                        control={
                            <Switch
                                checked={hasSpecifications}
                                onChange={(e) => setHasSpecifications(e.target.checked)}
                                color='primary'
                            />
                        }
                        label='Has Specifications'
                    />
                    {hasSpecifications && (
                        <div>
                            <Typography variant='body1' component='div'>
                                Key Specifications:
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

                            <Typography variant='body1' component='div' style={{ marginTop: '16px' }}>
                                Optional Specifications:
                            </Typography>
                            {optionalDetails.map((optionalSpec, index) => (
                                <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                                    <TextField
                                        id={`optionalSpecification-${index}`}
                                        label={`Specification ${index + 1}`}
                                        placeholder='Enter specification'
                                        required
                                        value={optionalSpec}
                                        onChange={(e) => handleOptionalSpecificationChange(index, e.target.value)}
                                        fullWidth
                                        margin='normal'
                                        variant='outlined'
                                        style={{ marginRight: '8px' }}
                                        error={!!optionalSpecErrors[index]}
                                        helperText={optionalSpecErrors[index]}
                                    />
                                    <Button
                                        variant='outlined'
                                        color='error'
                                        onClick={() => handleRemoveOptionalSpecification(index)}
                                    >
                                        Remove
                                    </Button>
                                </div>
                            ))}
                            <Button variant='outlined' onClick={handleAddOptionalSpecification}>
                                Add Specification
                            </Button>
                        </div>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button type='submit' variant='contained' onClick={handleSubmit} autoFocus>
                        Add
                    </Button>
                    <Button variant='outlined' onClick={handleResetForm}>
                        Reset Form
                    </Button>
                    <Button variant='outlined' autoFocus onClick={handleClose}>
                        Cancel
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
