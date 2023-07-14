import React, { useEffect, useState } from 'react';
import { productInstance } from '../../api/axios';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ErrorIcon from '@mui/icons-material/Error';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  Switch,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
  Snackbar,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import ImagePlaceholder from '../../assets/images/ImagePlaceholder.png';

const CategoryEdit = ({ category, onCategoryUpdate }) => {
  const obj = {
    nameTest: 'test',
    otherTest: 'other',
    etcTest: 'etc'
  }
  const test = obj => ({...obj, nameTest: 'updatedTest'});
  const objUpdated = test(obj);
  console.log(obj);
  console.log(objUpdated);
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const { Name, Description, CategoryImageUrl, HasSpecifications, BasicDetails, OptionalDetails } = category;

  const [categoryName, setCategoryName] = useState(Name || '');
  const [categoryDescription, setCategoryDescription] = useState(Description || '');
  const [categoryImageUrl, setCategoryImageUrl] = useState(CategoryImageUrl || '');
  const [hasSpecifications, setHasSpecifications] = useState(HasSpecifications);

  const [errors, setErrors] = useState({
    nameError: '',
    descriptionError: '',
    imageUrlError: '',
    keySpecErrors: [],
    optionalSpecErrors: [],
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  // Function for normalizing basic and optional details
  const normalizeDetails = (details) => {
    return Array.isArray(details) ? details : typeof details === 'string' ? JSON.parse(details) : [];
  };

  // Set initial state for basic details
  const [basicDetails, setBasicDetails] = useState(normalizeDetails(BasicDetails));
  // Set initial state for optional details
  const [optionalDetails, setOptionalDetails] = useState(normalizeDetails(OptionalDetails));

  // Initialize basic and optional details
  useEffect(() => {
    setBasicDetails(normalizeDetails(BasicDetails));
    setOptionalDetails(normalizeDetails(OptionalDetails));
  }, [BasicDetails, OptionalDetails]);

  const isFormChanged =
    categoryName !== (Name || '') ||
    categoryDescription !== (Description || '') ||
    categoryImageUrl !== (CategoryImageUrl || '') ||
    hasSpecifications !== HasSpecifications ||
    JSON.stringify(basicDetails) !== JSON.stringify(normalizeDetails(BasicDetails)) ||
    JSON.stringify(optionalDetails) !== JSON.stringify(normalizeDetails(OptionalDetails));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
      setErrors({
        nameError: '',
        descriptionError: '',
        imageUrlError: '',
        keySpecErrors: [],
        optionalSpecErrors: [],
      });
    }
  };

  const resetForm = () => {
    setCategoryName(Name || '');
    setCategoryDescription(Description || '');
    setCategoryImageUrl(CategoryImageUrl || '');
    setHasSpecifications(HasSpecifications);

    setBasicDetails(normalizeDetails(BasicDetails));
    setOptionalDetails(normalizeDetails(OptionalDetails));
    setErrors({
      nameError: '',
      descriptionError: '',
      imageUrlError: '',
      keySpecErrors: [],
      optionalSpecErrors: [],
    });
  };

  const handleSnackbarClose = (reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleImageError = () => {
    if (categoryImageUrl.trim() !== '') {
      setErrors((prevErrors) => ({ ...prevErrors, imageUrlError: 'Invalid image URL' }));
    }
  };

  const validateCategoryName = (name) => {
    if (name.trim() === '') {
      return 'Category name cannot be blank';
    }
    return '';
  };

  const validateCategoryDescription = (description) => {
    if (description.trim() === '') {
      return 'Category description cannot be blank';
    }
    return '';
  };

  const validateCategoryImageUrl = (imageUrl) => {
    if (imageUrl.trim() === '') {
      return 'Category image URL cannot be blank';
    }
    return '';
  };

  const validateKeySpecifications = (details) => {
    return details.map((detail) => {
      if (detail.trim() === '') {
        return 'Specification cannot be blank (remove/fill)';
      }
      return '';
    });
  };

  const handleErrors = () => {
    const validationErrors = {
      nameError: validateCategoryName(categoryName),
      descriptionError: validateCategoryDescription(categoryDescription),
      imageUrlError: validateCategoryImageUrl(categoryImageUrl),
      keySpecErrors: [],
      optionalSpecErrors: [],
    };

    if (hasSpecifications) {
      validationErrors.keySpecErrors = validateKeySpecifications(basicDetails);
      validationErrors.optionalSpecErrors = validateKeySpecifications(optionalDetails);
    }

    setErrors(validationErrors);

    // Check if any validation errors exist
    return Object.values(validationErrors).every((error) => !error);
  };

  const handleSubmit = async () => {
    const isValid = handleErrors();

    if (!isValid) {
      return;
    }

    try {
      const formData = {
        Name: categoryName,
        Description: categoryDescription,
        CategoryImageUrl: categoryImageUrl,
        HasSpecifications: hasSpecifications,
        BasicDetails: hasSpecifications ? basicDetails : null,
        OptionalDetails: hasSpecifications ? optionalDetails : null,
      };

      const response = await productInstance.put(`/categories/${category.CategoryId}`, formData);
      console.log(response);

      onCategoryUpdate();
      setSnackbarMessage('Category updated successfully');
      setSnackbarSeverity('success');
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data && error.response.data.Message) {
        setSnackbarMessage(error.response.data.Message);
      } else {
        setSnackbarMessage('Error updating category');
      }
      setSnackbarSeverity('error');
    }

    setSnackbarOpen(true);
    handleClose();
  };

  const handleAddKeySpecification = () => {
    setBasicDetails([...basicDetails, '']);
    setErrors((prevErrors) => ({ ...prevErrors, keySpecErrors: [...prevErrors.keySpecErrors, ''] }));
  };

  const handleRemoveKeySpecification = (index) => {
    const updatedBasicDetails = [...basicDetails];
    updatedBasicDetails.splice(index, 1);
    setBasicDetails(updatedBasicDetails);

    const updatedKeySpecErrors = [...errors.keySpecErrors];
    updatedKeySpecErrors.splice(index, 1);
    setErrors((prevErrors) => ({ ...prevErrors, keySpecErrors: updatedKeySpecErrors }));
  };

  const handleKeySpecificationChange = (index, value) => {
    const updatedBasicDetails = [...basicDetails];
    updatedBasicDetails[index] = value;
    setBasicDetails(updatedBasicDetails);

    const updatedKeySpecErrors = [...errors.keySpecErrors];
    updatedKeySpecErrors[index] = '';
    setErrors((prevErrors) => ({ ...prevErrors, keySpecErrors: updatedKeySpecErrors }));
  };

  const handleAddOptionalSpecification = () => {
    setOptionalDetails([...optionalDetails, '']);
    setErrors((prevErrors) => ({ ...prevErrors, optionalSpecErrors: [...prevErrors.optionalSpecErrors, ''] }));
  };

  const handleRemoveOptionalSpecification = (index) => {
    const updatedOptionalDetails = [...optionalDetails];
    updatedOptionalDetails.splice(index, 1);
    setOptionalDetails(updatedOptionalDetails);

    const updatedOptionalSpecErrors = [...errors.optionalSpecErrors];
    updatedOptionalSpecErrors.splice(index, 1);
    setErrors((prevErrors) => ({ ...prevErrors, optionalSpecErrors: updatedOptionalSpecErrors }));
  };

  const handleOptionalSpecificationChange = (index, value) => {
    const updatedOptionalDetails = [...optionalDetails];
    updatedOptionalDetails[index] = value;
    setOptionalDetails(updatedOptionalDetails);

    const updatedOptionalSpecErrors = [...errors.optionalSpecErrors];
    updatedOptionalSpecErrors[index] = '';
    setErrors((prevErrors) => ({ ...prevErrors, optionalSpecErrors: updatedOptionalSpecErrors }));
  };

  const handleWrapperClick = (event) => {
    event.stopPropagation();
  };

  return (
    <span onClick={handleWrapperClick}>
      <Button variant='text' onClick={handleClickOpen}>
        <EditIcon />
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby='responsive-dialog-title'
        disableEscapeKeyDown
      >
        <DialogTitle id='responsive-dialog-title'>
          <Typography variant='h5' component='div'>
            Edit category: {category.Name}
          </Typography>
        </DialogTitle>
        <DialogContent
          style={{
            display: 'flex',
            flexDirection: 'column',
            maxHeight: fullScreen ? '100vh' : 'calc(100vh - 64px)',
          }}
        >
          <Grid container spacing={2} style={{}}>
            <Grid item xs={12} md={6}>
              <div
                style={{
                  position: 'sticky',
                  top: 0,
                  maxHeight: '100%',
                  overflow: 'auto',
                }}
              >
                <TextField
                  autoFocus
                  id='categoryImageUrl'
                  label='Category Image URL'
                  placeholder='Category Image URL'
                  required
                  value={categoryImageUrl}
                  onChange={(e) => {
                    setCategoryImageUrl(e.target.value);
                    setErrors((prevErrors) => ({ ...prevErrors, imageUrlError: '' }));
                  }}
                  fullWidth
                  margin='normal'
                  variant='outlined'
                  error={!!errors.imageUrlError}
                  helperText={errors.imageUrlError}
                />
                <img
                  src={
                    categoryImageUrl.trim() === '' || errors.imageUrlError
                      ? ImagePlaceholder
                      : categoryImageUrl
                  }
                  alt='Category'
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'contain',
                    opacity: categoryImageUrl.trim() === '' || errors.imageUrlError ? '0.5' : '1',
                  }}
                  onError={handleImageError}
                />
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <div style={{ maxHeight: '100%', overflow: 'auto' }}>
                <Accordion
                  sx={{
                    border: '1px solid rgba(0, 0, 0, .125)',
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    sx={{
                      color: errors.nameError || errors.descriptionError ? 'error.main' : 'inherit',
                    }}
                  >
                    {errors.nameError || errors.descriptionError ? (
                      <ErrorIcon style={{ marginRight: '8px' }} />
                    ) : null}
                    <Typography variant='body1'>Category Name and Description</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div>
                      <TextField
                        id='categoryName'
                        label='Category Name'
                        placeholder='Category Name'
                        required
                        value={categoryName}
                        onChange={(e) => {
                          setCategoryName(e.target.value);
                          setErrors((prevErrors) => ({ ...prevErrors, nameError: '' }));
                        }}
                        fullWidth
                        margin='normal'
                        variant='outlined'
                        error={!!errors.nameError}
                        helperText={errors.nameError}
                      />
                      <TextField
                        id='categoryDescription'
                        label='Category Description'
                        placeholder='Category Description'
                        required
                        value={categoryDescription}
                        onChange={(e) => {
                          setCategoryDescription(e.target.value);
                          setErrors((prevErrors) => ({ ...prevErrors, descriptionError: '' }));
                        }}
                        fullWidth
                        margin='normal'
                        variant='outlined'
                        error={!!errors.descriptionError}
                        helperText={errors.descriptionError}
                      />
                    </div>
                  </AccordionDetails>
                </Accordion>

                <FormControlLabel
                  control={
                    <Switch
                      checked={hasSpecifications}
                      onChange={(e) => setHasSpecifications(e.target.checked)}
                      color='primary'
                      disabled={category.ChildCategories?.$values && category.ChildCategories.$values.length > 0}
                    />
                  }
                  label='Has Specifications'
                  title={
                    category.ChildCategories?.$values && category.ChildCategories.$values.length > 0
                      ? 'Cannot add specifications as there are subcategories'
                      : ''
                  }
                />
                {hasSpecifications && (
                  <div>
                    <Accordion
                      sx={{
                        border: '1px solid rgba(0, 0, 0, .125)',
                      }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        sx={{
                          color: errors.keySpecErrors.some((error) => error !== '') ? 'error.main' : 'inherit',
                        }}
                      >
                        {errors.keySpecErrors.some((error) => error !== '') ? (
                          <ErrorIcon style={{ marginRight: '8px' }} />
                        ) : null}
                        <Typography variant='body1'>Key Specifications</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <div>
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
                                error={!!errors.keySpecErrors[index]}
                                helperText={errors.keySpecErrors[index]}
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
                      </AccordionDetails>
                    </Accordion>

                    <Accordion
                      sx={{
                        border: '1px solid rgba(0, 0, 0, .125)',
                      }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        sx={{
                          color: errors.optionalSpecErrors.some((error) => error !== '') ? 'error.main' : 'inherit',
                        }}
                      >
                        {errors.optionalSpecErrors.some((error) => error !== '') ? (
                          <ErrorIcon style={{ marginRight: '8px' }} />
                        ) : null}
                        <Typography variant='body1'>Optional Specifications</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <div>
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
                                error={!!errors.optionalSpecErrors[index]}
                                helperText={errors.optionalSpecErrors[index]}
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
                      </AccordionDetails>
                    </Accordion>
                  </div>
                )}
              </div>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button type='submit' variant='contained' onClick={handleSubmit} autoFocus disabled={!isFormChanged}>
            Update
          </Button>
          <Button variant='outlined' onClick={resetForm}>
            Reset Form
          </Button>
          <Button variant='outlined' onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </span>
  );
};

export default CategoryEdit;



// import React from 'react';
// import { useEffect, useState } from 'react';
// import { productInstance } from '../../api/axios';
// import EditIcon from '@mui/icons-material/Edit';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import ErrorIcon from '@mui/icons-material/Error';
// import {
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   FormControlLabel,
//   Grid,
//   Switch,
//   TextField,
//   Typography,
//   useMediaQuery,
//   useTheme,
//   Snackbar,
//   Alert,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
// } from '@mui/material';
// import ImagePlaceholder from '../../assets/images/ImagePlaceholder.png';

// export const CategoryEdit = ({ category, onCategoryUpdate }) => {
//   console.log(category);
//   const [open, setOpen] = useState(false);
//   const theme = useTheme();
//   const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

//   const [categoryName, setCategoryName] = useState(category.Name ?? '');
//   const [categoryDescription, setCategoryDescription] = useState(category.Description ?? '');
//   const [categoryImageUrl, setCategoryImageUrl] = useState(category.CategoryImageUrl ?? '');
//   const [hasSpecifications, setHasSpecifications] = useState(category.HasSpecifications);

//   const [errors, setErrors] = useState({
//     nameError: '',
//     descriptionError: '',
//     imageUrlError: '',
//     keySpecErrors: [],
//     optionalSpecErrors: [],
//   });

//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState('');
//   const [snackbarSeverity, setSnackbarSeverity] = useState('success');

//   // Function for normalizing basic and optional details
//   const normalizeDetails = (details) => {
//     return Array.isArray(details) ? details : typeof details === 'string' ? JSON.parse(details) : [];
//   };

//   // Set initial state for basic details
//   const [basicDetails, setBasicDetails] = useState([]);
//   // Set initial state for optional details
//   const [optionalDetails, setOptionalDetails] = useState([]);

//   // Initialize basic and optional details
//   useEffect(() => {
//     setBasicDetails(normalizeDetails(category.BasicDetails));
//     setOptionalDetails(normalizeDetails(category.OptionalDetails));
//   }, [category.BasicDetails, category.OptionalDetails]);

//   const isFormChanged =
//     categoryName !== (category.Name ?? '') ||
//     categoryDescription !== (category.Description ?? '') ||
//     categoryImageUrl !== (category.CategoryImageUrl ?? '') ||
//     hasSpecifications !== category.HasSpecifications ||
//     JSON.stringify(basicDetails) !== JSON.stringify(normalizeDetails(category.BasicDetails)) ||
//     JSON.stringify(optionalDetails) !== JSON.stringify(normalizeDetails(category.OptionalDetails));

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = (event, reason) => {
//     if (reason !== 'backdropClick') {
//       setOpen(false);
//       setErrors({
//         nameError: '',
//         descriptionError: '',
//         imageUrlError: '',
//         keySpecErrors: [],
//         optionalSpecErrors: [],
//       });
//     }
//   };

//   const handleResetForm = () => {
//     setCategoryName(category.Name ?? '');
//     setCategoryDescription(category.Description ?? '');
//     setCategoryImageUrl(category.CategoryImageUrl ?? '');
//     setHasSpecifications(category.HasSpecifications);

//     setBasicDetails(normalizeDetails(category.BasicDetails));
//     setOptionalDetails(normalizeDetails(category.OptionalDetails));
//     setErrors({
//       nameError: '',
//       descriptionError: '',
//       imageUrlError: '',
//       keySpecErrors: [],
//       optionalSpecErrors: [],
//     });
//   };

//   const handleSnackbarClose = (reason) => {
//     if (reason === 'clickaway') {
//       return;
//     }
//     setSnackbarOpen(false);
//   };

//   const handleImageError = () => {
//     if (categoryImageUrl.trim() !== '') {
//       setErrors((prevErrors) => ({ ...prevErrors, imageUrlError: 'Invalid image URL' }));
//     }
//   };

//   const handleErrors = () => {
//     const validationErrors = {
//       nameError: '',
//       descriptionError: '',
//       imageUrlError: '',
//       keySpecErrors: [],
//       optionalSpecErrors: [],
//     };

//     // Validate category name
//     if (categoryName.trim() === '') {
//       validationErrors.nameError = 'Category name cannot be blank';
//     }

//     // Validate category description
//     if (categoryDescription.trim() === '') {
//       validationErrors.descriptionError = 'Category description cannot be blank';
//     }

//     // Validate category image URL
//     if (categoryImageUrl.trim() === '') {
//       validationErrors.imageUrlError = 'Category image URL cannot be blank';
//     }

//     // Validate specifications if hasSpecifications is selected
//     if (hasSpecifications) {
//       // Validate key product specifications
//       const updatedKeySpecErrors = basicDetails.map((detail) => {
//         if (detail.trim() === '') {
//           return 'Key specification cannot be blank (remove/fill)';
//         }
//         return '';
//       });

//       // Validate optional specifications
//       const updatedOptionalSpecErrors = optionalDetails.map((detail) => {
//         if (detail.trim() === '') {
//           return 'Optional specification cannot be blank (remove/fill)';
//         }
//         return '';
//       });

//       // Update key and optional specification errors
//       validationErrors.keySpecErrors = updatedKeySpecErrors;
//       validationErrors.optionalSpecErrors = updatedOptionalSpecErrors;
//     }

//     setErrors(validationErrors);

//     // Check if any validation errors exist
//     return Object.values(validationErrors).every((error) => !error);
//   };

//   const handleSubmit = async () => {
//     const isValid = handleErrors();

//     if (!isValid) {
//       return;
//     }

//     try {
//       const formData = {
//         Name: categoryName,
//         Description: categoryDescription,
//         CategoryImageUrl: categoryImageUrl,
//         HasSpecifications: hasSpecifications,
//         BasicDetails: hasSpecifications ? basicDetails : null,
//         OptionalDetails: hasSpecifications ? optionalDetails : null,
//       };

//       const response = await productInstance.put(`/categories/${category.CategoryId}`, formData);
//       console.log(response);

//       onCategoryUpdate();
//       setSnackbarMessage('Category updated successfully');
//       setSnackbarSeverity('success');
//     } catch (error) {
//       console.log(error);
//       if (error.response && error.response.data && error.response.data.Message) {
//         setSnackbarMessage(error.response.data.Message);
//       } else {
//         setSnackbarMessage('Error updating category');
//       }
//       setSnackbarSeverity('error');
//     }

//     setSnackbarOpen(true);
//     handleClose();
//   };

//   const handleAddKeySpecification = () => {
//     setBasicDetails([...basicDetails, '']);
//     setErrors((prevErrors) => ({ ...prevErrors, keySpecErrors: [...prevErrors.keySpecErrors, ''] }));
//   };

//   const handleRemoveKeySpecification = (index) => {
//     const updatedBasicDetails = [...basicDetails];
//     updatedBasicDetails.splice(index, 1);
//     setBasicDetails(updatedBasicDetails);

//     const updatedKeySpecErrors = [...errors.keySpecErrors];
//     updatedKeySpecErrors.splice(index, 1);
//     setErrors((prevErrors) => ({ ...prevErrors, keySpecErrors: updatedKeySpecErrors }));
//   };

//   const handleKeySpecificationChange = (index, value) => {
//     const updatedBasicDetails = [...basicDetails];
//     updatedBasicDetails[index] = value;
//     setBasicDetails(updatedBasicDetails);

//     const updatedKeySpecErrors = [...errors.keySpecErrors];
//     updatedKeySpecErrors[index] = '';
//     setErrors((prevErrors) => ({ ...prevErrors, keySpecErrors: updatedKeySpecErrors }));
//   };

//   const handleAddOptionalSpecification = () => {
//     setOptionalDetails([...optionalDetails, '']);
//     setErrors((prevErrors) => ({ ...prevErrors, optionalSpecErrors: [...prevErrors.optionalSpecErrors, ''] }));
//   };

//   const handleRemoveOptionalSpecification = (index) => {
//     const updatedOptionalDetails = [...optionalDetails];
//     updatedOptionalDetails.splice(index, 1);
//     setOptionalDetails(updatedOptionalDetails);

//     const updatedOptionalSpecErrors = [...errors.optionalSpecErrors];
//     updatedOptionalSpecErrors.splice(index, 1);
//     setErrors((prevErrors) => ({ ...prevErrors, optionalSpecErrors: updatedOptionalSpecErrors }));
//   };

//   const handleOptionalSpecificationChange = (index, value) => {
//     const updatedOptionalDetails = [...optionalDetails];
//     updatedOptionalDetails[index] = value;
//     setOptionalDetails(updatedOptionalDetails);

//     const updatedOptionalSpecErrors = [...errors.optionalSpecErrors];
//     updatedOptionalSpecErrors[index] = '';
//     setErrors((prevErrors) => ({ ...prevErrors, optionalSpecErrors: updatedOptionalSpecErrors }));
//   };

//   const handleWrapperClick = (event) => {
//     event.stopPropagation();
//   };

//   return (
//     <span onClick={handleWrapperClick}>
//       <Button variant='text' onClick={handleClickOpen}>
//         <EditIcon />
//       </Button>
//       <Dialog
//         fullScreen={fullScreen}
//         open={open}
//         onClose={handleClose}
//         aria-labelledby='responsive-dialog-title'
//         disableEscapeKeyDown
//       >
//         <DialogTitle id='responsive-dialog-title'>
//           <Typography variant='h5' component='div'>
//             Edit category: {category.Name}
//           </Typography>
//         </DialogTitle>
//         <DialogContent
//           style={{
//             display: 'flex',
//             flexDirection: 'column',
//             // flexGrow: 1,
//             maxHeight: fullScreen ? '100vh' : 'calc(100vh - 64px)',
//           }}
//         >
//           <Grid container spacing={2} style={{}}>
//             <Grid item xs={12} md={6}>
//               <div
//                 style={{
//                   position: 'sticky',
//                   top: 0,
//                   maxHeight: '100%',
//                   overflow: 'auto',
//                 }}
//               >
//                 <TextField
//                   autoFocus
//                   id='categoryImageUrl'
//                   label='Category Image URL'
//                   placeholder='Category Image URL'
//                   required
//                   value={categoryImageUrl}
//                   onChange={(e) => {
//                     setCategoryImageUrl(e.target.value);
//                     setErrors((prevErrors) => ({ ...prevErrors, imageUrlError: '' }));
//                   }}
//                   fullWidth
//                   margin='normal'
//                   variant='outlined'
//                   error={!!errors.imageUrlError}
//                   helperText={errors.imageUrlError}
//                 />
//                 <img
//                   src={
//                     categoryImageUrl.trim() === '' || errors.imageUrlError
//                       ? ImagePlaceholder
//                       : categoryImageUrl
//                   }
//                   alt='Category'
//                   style={{
//                     width: '100%',
//                     height: '200px',
//                     objectFit: 'contain',
//                     opacity: categoryImageUrl.trim() === '' || errors.imageUrlError ? '0.5' : '1',
//                   }}
//                   onError={handleImageError}
//                 />
//               </div>
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <div style={{ maxHeight: '100%', overflow: 'auto' }}>
//                 <Accordion
//                   sx={{
//                     border: '1px solid rgba(0, 0, 0, .125)',
//                   }}
//                 >
//                   <AccordionSummary
//                     expandIcon={<ExpandMoreIcon />}
//                     sx={{
//                       color: errors.nameError || errors.descriptionError ? 'error.main' : 'inherit',
//                     }}
//                   >
//                     {errors.nameError || errors.descriptionError ? (
//                       <ErrorIcon style={{ marginRight: '8px' }} />
//                     ) : null}
//                     <Typography variant='body1'>Category Name and Description</Typography>
//                   </AccordionSummary>
//                   <AccordionDetails>
//                     <div>
//                       <TextField
//                         id='categoryName'
//                         label='Category Name'
//                         placeholder='Category Name'
//                         required
//                         value={categoryName}
//                         onChange={(e) => {
//                           setCategoryName(e.target.value);
//                           setErrors((prevErrors) => ({ ...prevErrors, nameError: '' }));
//                         }}
//                         fullWidth
//                         margin='normal'
//                         variant='outlined'
//                         error={!!errors.nameError}
//                         helperText={errors.nameError}
//                       />
//                       <TextField
//                         id='categoryDescription'
//                         label='Category Description'
//                         placeholder='Category Description'
//                         required
//                         value={categoryDescription}
//                         onChange={(e) => {
//                           setCategoryDescription(e.target.value);
//                           setErrors((prevErrors) => ({ ...prevErrors, descriptionError: '' }));
//                         }}
//                         fullWidth
//                         margin='normal'
//                         variant='outlined'
//                         error={!!errors.descriptionError}
//                         helperText={errors.descriptionError}
//                       />
//                     </div>
//                   </AccordionDetails>
//                 </Accordion>

//                 <FormControlLabel
//                   control={
//                     <Switch
//                       checked={hasSpecifications}
//                       onChange={(e) => setHasSpecifications(e.target.checked)}
//                       color='primary'
//                       disabled={category.ChildCategories?.$values && category.ChildCategories.$values.length > 0}
//                     />
//                   }
//                   label='Has Specifications'
//                   title={
//                     category.ChildCategories?.$values && category.ChildCategories.$values.length > 0
//                       ? 'Cannot add specifications as there are subcategories'
//                       : ''
//                   }
//                 />
//                 {hasSpecifications && (
//                   <div>
//                     <Accordion
//                       sx={{
//                         border: '1px solid rgba(0, 0, 0, .125)',
//                       }}
//                     >
//                       <AccordionSummary
//                         expandIcon={<ExpandMoreIcon />}
//                         sx={{
//                           color: errors.keySpecErrors.some((error) => error !== '') ? 'error.main' : 'inherit',
//                         }}
//                       >
//                         {errors.keySpecErrors.some((error) => error !== '') ? (
//                           <ErrorIcon style={{ marginRight: '8px' }} />
//                         ) : null}
//                         <Typography variant='body1'>Key Specifications</Typography>
//                       </AccordionSummary>
//                       <AccordionDetails>
//                         <div>
//                           {basicDetails.map((keySpec, index) => (
//                             <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
//                               <TextField
//                                 id={`keySpecification-${index}`}
//                                 label={`Specification ${index + 1}`}
//                                 placeholder='Enter specification'
//                                 required
//                                 value={keySpec}
//                                 onChange={(e) => handleKeySpecificationChange(index, e.target.value)}
//                                 fullWidth
//                                 margin='normal'
//                                 variant='outlined'
//                                 style={{ marginRight: '8px' }}
//                                 error={!!errors.keySpecErrors[index]}
//                                 helperText={errors.keySpecErrors[index]}
//                               />
//                               <Button
//                                 variant='outlined'
//                                 color='error'
//                                 onClick={() => handleRemoveKeySpecification(index)}
//                               >
//                                 Remove
//                               </Button>
//                             </div>
//                           ))}
//                           <Button variant='outlined' onClick={handleAddKeySpecification}>
//                             Add Specification
//                           </Button>
//                         </div>
//                       </AccordionDetails>
//                     </Accordion>

//                     <Accordion
//                       sx={{
//                         border: '1px solid rgba(0, 0, 0, .125)',
//                       }}
//                     >
//                       <AccordionSummary
//                         expandIcon={<ExpandMoreIcon />}
//                         sx={{
//                           color: errors.optionalSpecErrors.some((error) => error !== '') ? 'error.main' : 'inherit',
//                         }}
//                       >
//                         {errors.optionalSpecErrors.some((error) => error !== '') ? (
//                           <ErrorIcon style={{ marginRight: '8px' }} />
//                         ) : null}
//                         <Typography variant='body1'>Optional Specifications</Typography>
//                       </AccordionSummary>
//                       <AccordionDetails>
//                         <div>
//                           {optionalDetails.map((optionalSpec, index) => (
//                             <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
//                               <TextField
//                                 id={`optionalSpecification-${index}`}
//                                 label={`Specification ${index + 1}`}
//                                 placeholder='Enter specification'
//                                 required
//                                 value={optionalSpec}
//                                 onChange={(e) => handleOptionalSpecificationChange(index, e.target.value)}
//                                 fullWidth
//                                 margin='normal'
//                                 variant='outlined'
//                                 style={{ marginRight: '8px' }}
//                                 error={!!errors.optionalSpecErrors[index]}
//                                 helperText={errors.optionalSpecErrors[index]}
//                               />
//                               <Button
//                                 variant='outlined'
//                                 color='error'
//                                 onClick={() => handleRemoveOptionalSpecification(index)}
//                               >
//                                 Remove
//                               </Button>
//                             </div>
//                           ))}
//                           <Button variant='outlined' onClick={handleAddOptionalSpecification}>
//                             Add Specification
//                           </Button>
//                         </div>
//                       </AccordionDetails>
//                     </Accordion>
//                   </div>
//                 )}
//               </div>
//             </Grid>
//           </Grid>
//         </DialogContent>
//         <DialogActions>
//           <Button type='submit' variant='contained' onClick={handleSubmit} autoFocus disabled={!isFormChanged}>
//             Update
//           </Button>
//           <Button variant='outlined' onClick={handleResetForm}>
//             Reset Form
//           </Button>
//           <Button variant='outlined' onClick={handleClose}>
//             Cancel
//           </Button>
//         </DialogActions>
//       </Dialog>
//       <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
//         <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
//           {snackbarMessage}
//         </Alert>
//       </Snackbar>
//     </span>
//   );
// };

// Without Accordian for sections
// import { useEffect, useState } from 'react';
// import { productInstance } from '../../api/axios';
// import EditIcon from '@mui/icons-material/Edit';
// import {
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   FormControlLabel,
//   Switch,
//   TextField,
//   Typography,
//   useMediaQuery,
//   useTheme,
//   Snackbar,
//   Alert,
// } from '@mui/material';
// import ImagePlaceholder from '../../assets/images/ImagePlaceholder.png';

// export const CategoryEdit = ({ category, onCategoryUpdate }) => {
//   console.log(category);
//   const [open, setOpen] = useState(false);
//   const theme = useTheme();
//   const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

//   const [categoryName, setCategoryName] = useState(category.Name ?? '');
//   const [nameError, setNameError] = useState('');
//   const [categoryDescription, setCategoryDescription] = useState(category.Description ?? '');
//   const [descriptionError, setDescriptionError] = useState('');
//   const [categoryImageUrl, setCategoryImageUrl] = useState(category.CategoryImageUrl ?? '');
//   const [imageUrlError, setImageUrlError] = useState('');
//   const [hasSpecifications, setHasSpecifications] = useState(category.HasSpecifications);

//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState('');
//   const [snackbarSeverity, setSnackbarSeverity] = useState('success');

//   // Function for normalizing basic and optional details
//   const normalizeDetails = (details) => {
//     return Array.isArray(details)
//       ? details
//       : typeof details === 'string'
//         ? JSON.parse(details)
//         : [];
//   };

//   // Set initial state for basic details
//   const [basicDetails, setBasicDetails] = useState([]);
//   const [keySpecErrors, setKeySpecErrors] = useState([]);

//   // Set initial state for optional details
//   const [optionalDetails, setOptionalDetails] = useState([]);
//   const [optionalSpecErrors, setOptionalSpecErrors] = useState([]);

//   // Initialize basic and optional details
//   useEffect(() => {
//     setBasicDetails(normalizeDetails(category.BasicDetails));
//     setOptionalDetails(normalizeDetails(category.OptionalDetails));
//   }, [category.BasicDetails, category.OptionalDetails])

//   const isFormChanged = (
//     categoryName !== (category.Name ?? '') ||
//     categoryDescription !== (category.Description ?? '') ||
//     categoryImageUrl !== (category.CategoryImageUrl ?? '') ||
//     hasSpecifications !== category.HasSpecifications ||
//     JSON.stringify(basicDetails) !== JSON.stringify(normalizeDetails(category.BasicDetails)) ||
//     JSON.stringify(optionalDetails) !== JSON.stringify(normalizeDetails(category.OptionalDetails))
//   );

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = (reason) => {
//     if (reason !== 'backdropClick') {
//       setOpen(false);
//       setNameError('');
//       setDescriptionError('');
//       setImageUrlError('');
//       setKeySpecErrors([]);
//       setOptionalSpecErrors([]);
//     }
//   };

//   const handleResetForm = () => {
//     setCategoryName(category.Name ?? '');
//     setNameError('');
//     setCategoryDescription(category.Description ?? '');
//     setDescriptionError('');
//     setCategoryImageUrl(category.CategoryImageUrl ?? '');
//     setImageUrlError('');
//     setHasSpecifications(category.HasSpecifications);

//     setBasicDetails(normalizeDetails(category.BasicDetails));
//     setOptionalDetails(normalizeDetails(category.OptionalDetails));
//   };

//   const handleSnackbarClose = (reason) => {
//     if (reason === 'clickaway') {
//       return;
//     }
//     setSnackbarOpen(false);
//   };

//   const handleImageError = () => {
//     if (categoryImageUrl.trim() !== '') {
//       setImageUrlError('Invalid image URL');
//     }
//   };

//   const handleSubmit = async () => {
//     // Validate category name
//     if (categoryName.trim() === '') {
//       setNameError('Category name cannot be blank');
//       return;
//     }

//     // Validate category description
//     if (categoryDescription.trim() === '') {
//       setDescriptionError('Category description cannot be blank');
//       return;
//     }

//     // Validate category image URL
//     if (categoryImageUrl.trim() === '') {
//       setImageUrlError('Category image URL cannot be blank');
//       return;
//     }

//     // Validate specifications if hasSpecifications is selected
//     if (hasSpecifications) {
//       // Validate key product specifications
//       const updatedKeySpecErrors = basicDetails.map((detail) => {
//         if (detail.trim() === '') {
//           return 'Key specification cannot be blank (remove/fill)';
//         }
//         return '';
//       });

//       // Validate optional specifications
//       const updatedOptionalSpecErrors = optionalDetails.map((detail) => {
//         if (detail.trim() === '') {
//           return 'Optional specification cannot be blank (remove/fill)';
//         }
//         return '';
//       });

//       // Check if any errors exist in key or optional specifications
//       if (
//         updatedKeySpecErrors.some((error) => error !== '') ||
//         updatedOptionalSpecErrors.some((error) => error !== '')
//       ) {
//         setKeySpecErrors(updatedKeySpecErrors);
//         setOptionalSpecErrors(updatedOptionalSpecErrors);
//         return;
//       }
//     }

//     try {
//       const formData = {
//         Name: categoryName,
//         Description: categoryDescription,
//         CategoryImageUrl: categoryImageUrl,
//         HasSpecifications: hasSpecifications,
//         BasicDetails: hasSpecifications ? basicDetails : null,
//         OptionalDetails: hasSpecifications ? optionalDetails : null,
//       };

//       const response = await productInstance.put(`/categories/${category.CategoryId}`, formData);
//       console.log(response);

//       onCategoryUpdate();
//       setSnackbarMessage('Category updated successfully');
//       setSnackbarSeverity('success');
//     } catch (error) {
//       console.log(error);
//       if (error.response && error.response.data && error.response.data.Message) {
//         setSnackbarMessage(error.response.data.Message);
//       } else {
//         setSnackbarMessage('Error updating category');
//       }
//       setSnackbarSeverity('error');
//     }

//     setSnackbarOpen(true);
//     handleClose();
//   };

//   const handleAddKeySpecification = () => {
//     setBasicDetails([...basicDetails, '']);
//     setKeySpecErrors([...keySpecErrors, '']);
//   };

//   const handleRemoveKeySpecification = (index) => {
//     const updatedBasicDetails = [...basicDetails];
//     updatedBasicDetails.splice(index, 1);
//     setBasicDetails(updatedBasicDetails);

//     const updatedKeySpecErrors = [...keySpecErrors];
//     updatedKeySpecErrors.splice(index, 1);
//     setKeySpecErrors(updatedKeySpecErrors);
//   };

//   const handleKeySpecificationChange = (index, value) => {
//     const updatedBasicDetails = [...basicDetails];
//     updatedBasicDetails[index] = value;
//     setBasicDetails(updatedBasicDetails);

//     const updatedKeySpecErrors = [...keySpecErrors];
//     updatedKeySpecErrors[index] = '';
//     setKeySpecErrors(updatedKeySpecErrors);
//   };

//   const handleAddOptionalSpecification = () => {
//     setOptionalDetails([...optionalDetails, '']);
//     setOptionalSpecErrors([...optionalSpecErrors, '']);
//   };

//   const handleRemoveOptionalSpecification = (index) => {
//     const updatedOptionalDetails = [...optionalDetails];
//     updatedOptionalDetails.splice(index, 1);
//     setOptionalDetails(updatedOptionalDetails);

//     const updatedOptionalSpecErrors = [...optionalSpecErrors];
//     updatedOptionalSpecErrors.splice(index, 1);
//     setOptionalSpecErrors(updatedOptionalSpecErrors);
//   };

//   const handleOptionalSpecificationChange = (index, value) => {
//     const updatedOptionalDetails = [...optionalDetails];
//     updatedOptionalDetails[index] = value;
//     setOptionalDetails(updatedOptionalDetails);

//     const updatedOptionalSpecErrors = [...optionalSpecErrors];
//     updatedOptionalSpecErrors[index] = '';
//     setOptionalSpecErrors(updatedOptionalSpecErrors);
//   };

//   const handleWrapperClick = (event) => {
//     event.stopPropagation();
//   };

//   return (
//     <span onClick={handleWrapperClick}>
//       <Button variant='text' onClick={handleClickOpen}>
//         <EditIcon />
//       </Button>
//       <Dialog
//         fullScreen={fullScreen}
//         open={open}
//         onClose={handleClose}
//         aria-labelledby='responsive-dialog-title'
//         disableEscapeKeyDown
//       >
//         <DialogTitle id='responsive-dialog-title'>
//           <Typography variant='h5' component='div'>
//             Edit category: {category.Name}
//           </Typography>
//         </DialogTitle>
//         <DialogContent>
//           <TextField
//             autoFocus
//             id='categoryName'
//             label='Category Name'
//             placeholder='Category Name'
//             required
//             value={categoryName}
//             onChange={(e) => {
//               setCategoryName(e.target.value);
//               setNameError('');
//             }}
//             fullWidth
//             margin='normal'
//             variant='outlined'
//             error={!!nameError}
//             helperText={nameError}
//           />
//           <TextField
//             id='categoryDescription'
//             label='Category Description'
//             placeholder='Category Description'
//             required
//             value={categoryDescription}
//             onChange={(e) => {
//               setCategoryDescription(e.target.value);
//               setDescriptionError('');
//             }}
//             fullWidth
//             margin='normal'
//             variant='outlined'
//             error={!!descriptionError}
//             helperText={descriptionError}
//           />
//           <TextField
//             id='categoryImageUrl'
//             label='Category Image URL'
//             placeholder='Category Image URL'
//             required
//             value={categoryImageUrl}
//             onChange={(e) => {
//               setCategoryImageUrl(e.target.value);
//               setImageUrlError('');
//             }}
//             fullWidth
//             margin='normal'
//             variant='outlined'
//             error={!!imageUrlError}
//             helperText={imageUrlError}
//           />
//           <img
//             src={(categoryImageUrl.trim() === '' || imageUrlError)
//               ? ImagePlaceholder
//               : categoryImageUrl
//             }
//             alt='Category'
//             style={{
//               width: '100%',
//               height: '200px',
//               objectFit: 'contain',
//               opacity: (categoryImageUrl.trim() === '' || imageUrlError) ? '0.5' : '1',
//             }}
//             onError={handleImageError}
//           />
//           <FormControlLabel
//             control={
//               <Switch
//                 checked={hasSpecifications}
//                 onChange={(e) => setHasSpecifications(e.target.checked)}
//                 color='primary'
//                 disabled={category.ChildCategories?.$values && category.ChildCategories.$values.length > 0}
//               />
//             }
//             label='Has Specifications'
//             title={
//               category.ChildCategories?.$values && category.ChildCategories.$values.length > 0
//                 ? 'Cannot add specifications as there are subcategories'
//                 : ''
//             }
//           />
//           {hasSpecifications && (
//             <div>
//               <Typography variant='body1' component='div'>
//                 Key Specifications:
//               </Typography>
//               {basicDetails.map((keySpec, index) => (
//                 <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
//                   <TextField
//                     id={`keySpecification-${index}`}
//                     label={`Specification ${index + 1}`}
//                     placeholder='Enter specification'
//                     required
//                     value={keySpec}
//                     onChange={(e) => handleKeySpecificationChange(index, e.target.value)}
//                     fullWidth
//                     margin='normal'
//                     variant='outlined'
//                     style={{ marginRight: '8px' }}
//                     error={!!keySpecErrors[index]}
//                     helperText={keySpecErrors[index]}
//                   />
//                   <Button
//                     variant='outlined'
//                     color='error'
//                     onClick={() => handleRemoveKeySpecification(index)}
//                   >
//                     Remove
//                   </Button>
//                 </div>
//               ))}
//               <Button variant='outlined' onClick={handleAddKeySpecification}>
//                 Add Specification
//               </Button>

//               <Typography variant='body1' component='div' style={{ marginTop: '16px' }}>
//                 Optional Specifications:
//               </Typography>
//               {optionalDetails.map((optionalSpec, index) => (
//                 <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
//                   <TextField
//                     id={`optionalSpecification-${index}`}
//                     label={`Specification ${index + 1}`}
//                     placeholder='Enter specification'
//                     required
//                     value={optionalSpec}
//                     onChange={(e) => handleOptionalSpecificationChange(index, e.target.value)}
//                     fullWidth
//                     margin='normal'
//                     variant='outlined'
//                     style={{ marginRight: '8px' }}
//                     error={!!optionalSpecErrors[index]}
//                     helperText={optionalSpecErrors[index]}
//                   />
//                   <Button
//                     variant='outlined'
//                     color='error'
//                     onClick={() => handleRemoveOptionalSpecification(index)}
//                   >
//                     Remove
//                   </Button>
//                 </div>
//               ))}
//               <Button variant='outlined' onClick={handleAddOptionalSpecification}>
//                 Add Specification
//               </Button>
//             </div>
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button type='submit' variant='contained' onClick={handleSubmit} autoFocus disabled={!isFormChanged}>
//             Update
//           </Button>
//           <Button variant='outlined' onClick={handleResetForm}>
//             Reset Form
//           </Button>
//           <Button variant='outlined' onClick={handleClose}>
//             Cancel
//           </Button>
//         </DialogActions>
//       </Dialog>
//       <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
//         <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
//           {snackbarMessage}
//         </Alert>
//       </Snackbar>
//     </span>
//   );
// };
