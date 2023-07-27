import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { productInstance } from '../../api/axios';
import { styled, useTheme } from '@mui/material/styles';
import {
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon
} from '@mui/icons-material';
import {
  Typography,
  Card,
  CardContent,
  Grid,
  Divider,
  Chip,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Snackbar,
  Alert
} from '@mui/material';

const NotFoundContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: `calc(100vh - ${2 * theme.navbarHeight}px)`,
}));

const NotFoundCard = styled(Card)(({ theme }) => ({
  backgroundColor: '#ffebee',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transform: `translateY(-${theme.navbarHeight}px)`,
  padding: theme.spacing(4),
  margin: theme.spacing(1),
}));

const QCRequestCard = styled(Card)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    maxWidth: '1334px',
    margin: '0 auto',
    marginTop: theme.spacing(2),
  },
  [theme.breakpoints.down('sm')]: {
    marginTop: 0,
  },
  height: '100%',
  border: `1px solid ${theme.palette.grey[300]}`,
}));

const ImageContainer = styled(Grid)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  [theme.breakpoints.down('sm')]: {
    marginBottom: theme.spacing(2),
  },
}));

const ProductImage = styled('img')(({ theme }) => ({
  width: '100%',
  maxHeight: 400,
  objectFit: 'contain',
  border: `1px solid ${theme.palette.grey[300]}`,
  [theme.breakpoints.down('md')]: {
    border: 'none',
  },
}));

const SectionDivider = styled(Divider)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const ExpandCollapseButton = styled(IconButton)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  padding: theme.spacing(1),
}));

const ButtonContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  marginTop: theme.spacing(2),
  '& > button': {
    marginLeft: theme.spacing(2),
  },
}));

const CustomDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    width: '80%',
    [theme.breakpoints.down('md')]: {
      margin: 0,
      width: '100%',
    },
  },
}));

const QCRequestReview = () => {
  const location = useLocation();
  const qcRequest = location.state;
  const [navbarHeight, setNavbarHeight] = useState(0);
  const [isBasicDetailsExpanded, setIsBasicDetailsExpanded] = useState(false);
  const [isOptionalDetailsExpanded, setIsOptionalDetailsExpanded] = useState(false);
  const [reasonDialogOpen, setReasonDialogOpen] = useState(false);
  const [reasonForRejecting, setReasonForRejecting] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [redirectTimer, setRedirectTimer] = useState(5);
  const [startRedirectCountdown, setStartRedirectCountdown] = useState(false);
  const navigate = useNavigate();

  console.log(qcRequest);

  useEffect(() => {
    // Measure the height of the navbar and update the state
    const navbar = document.getElementById('navbar');
    if (navbar) {
      const height = navbar.offsetHeight;
      setNavbarHeight(height);
    }
  }, []);

  // Set the navbarHeight value in the theme object
  const theme = {
    ...useTheme(),
    navbarHeight,
  };

  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true,
    };
    const date = new Date(dateString);
    return date.toLocaleString(undefined, options);
  };

  const toggleBasicDetails = () => {
    setIsBasicDetailsExpanded((prevState) => !prevState);
  };

  const toggleOptionalDetails = () => {
    setIsOptionalDetailsExpanded((prevState) => !prevState);
  };

  const handleAccept = () => {
    setConfirmationDialogOpen(true);
  };

  const closeConfirmationDialog = () => {
    setConfirmationDialogOpen(false);
  };

  const handleReject = () => {
    openReasonDialog();
  };

  const openReasonDialog = () => {
    setReasonDialogOpen(true);
  };

  const closeReasonDialog = () => {
    setReasonDialogOpen(false);
  };

  const handleReasonChange = (event) => {
    setReasonForRejecting(event.target.value);
  };

  const showSuccessMessage = (message) => {
    setSnackbarSeverity('success');
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const showErrorMessage = (message) => {
    setSnackbarSeverity('error');
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleConfirmAccept = async () => {
    try {
      await addProduct();
      await addProductVendor();
      await deleteQCRequest();

      setStartRedirectCountdown(true);
      closeConfirmationDialog();
    } catch (error) {
      console.error('Error accepting QC request:', error);
      if (typeof error.response?.data === 'string' && error.response.data.length < 10) {
        showErrorMessage(`Error accepting QC request: ${error.response.data}`);
      } else {
        showErrorMessage('Error accepting QC request');
      }
    }
  };

  useEffect(() => {
    if (redirectTimer === 0) {
      navigate('/qcrequest', { replace: true }); // replace: true to replace the current url with /qcrequest
    } else if (startRedirectCountdown) {
      const countdown = setTimeout(() => {
        setRedirectTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      showSuccessMessage(`QC request accepted. Redirecting to QC Request page in ${redirectTimer} seconds...`);

      return () => clearTimeout(countdown);
    }
  }, [startRedirectCountdown, redirectTimer, navigate]);

  const addProduct = async () => {
    try {
      qcRequest.Product.CategoryId = qcRequest.CategoryId;
      const response = await productInstance.post('products', qcRequest.Product);
      qcRequest.ProductVendor.ProductId = response.data.ProdId;
      console.log('Product added:', response);
    } catch (error) {
      console.error('Adding Product failed:', error);
      throw error; // Propagate the error to the caller
    }
  };

  const addProductVendor = async () => {
    try {
      const response = await productInstance.post(`productvendor/${qcRequest.VendorId}`, qcRequest.ProductVendor);
      console.log('ProductVendor added:', response);
    } catch (error) {
      console.error('Adding ProductVendor failed:', error);
      throw error; // Propagate the error to the caller
    }
  };

  const deleteQCRequest = async () => {
    try {
      const response = await productInstance.delete(`qcrequests/${qcRequest.Id}`);
      console.log('QCRequest deleted:', response);
    } catch (error) {
      console.error('Deleting QCRequest failed:', error);
      throw error; // Propagate the error to the caller
    }
  };

  const submitRejectRequest = async () => {
    try {
      const response = await productInstance.put(`qcrequests/reject/${qcRequest.Id}`, reasonForRejecting);
      console.log('Reject request sent:', response);
      showSuccessMessage('Listing rejected');
      qcRequest.Status = response.data.Status;
      qcRequest.AdminMessage = response.data.AdminMessage;
      closeReasonDialog();
    } catch (error) {
      console.error('Reject request failed:', error);
      if (error.response && error.response.data) {
        showErrorMessage(`Error rejecting listing: ${error.response.data}`);
      } else {
        showErrorMessage('Error rejecting listing');
      }
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  if (!qcRequest) {
    return (
      <NotFoundContainer theme={theme}>
        <NotFoundCard>
          <Typography variant='body1' fontWeight='bold'>
            QC Request details not found.
          </Typography>
        </NotFoundCard>
      </NotFoundContainer>
    );
  }

  return (
    <>
      <QCRequestCard>
        <CardContent>
          <Grid container spacing={2}>
            {/* Image Section */}
            <ImageContainer item xs={12} md={4}>
              <ProductImage src={qcRequest.Product.ImageURL} alt='Product' />
            </ImageContainer>

            {/* Details Section */}
            <Grid item xs={12} md={8}>
              {/* Product details Section */}
              <SectionDivider sx={{ marginTop: 0 }}>
                <Chip label='Product details' color='primary' />
              </SectionDivider>
              <Typography variant='body1'>Name: {qcRequest.Product.ProdName}</Typography>
              <Typography variant='body1'>Description: {qcRequest.Product.Description}</Typography>
              <Typography variant='body1'>MRP: ₹{qcRequest.Product.Price}</Typography>
              <Typography variant='body1'>Category: {qcRequest.CategoryName}</Typography>

              {/* Basic Details Section */}
              <SectionDivider>
                <Chip
                  label='Basic Details'
                  color='primary'
                  onClick={toggleBasicDetails}
                  clickable
                  sx={{ alignItems: 'center' }}
                />
                <ExpandCollapseButton onClick={toggleBasicDetails}>
                  {isBasicDetailsExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </ExpandCollapseButton>
              </SectionDivider>
              {isBasicDetailsExpanded && (
                Object.entries(qcRequest.Product.BasicDetails).map(([key, value]) => (
                  <Typography variant='body1' key={key}>{key}: {value}</Typography>
                ))
              )}

              {/* Optional Details Section */}
              <SectionDivider>
                <Chip
                  label='Optional Details'
                  color='primary'
                  onClick={toggleOptionalDetails}
                  clickable
                />
                <ExpandCollapseButton onClick={toggleOptionalDetails}>
                  {isOptionalDetailsExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </ExpandCollapseButton>
              </SectionDivider>
              {isOptionalDetailsExpanded && qcRequest.Product.OptionalDetails && Object.keys(qcRequest.Product.OptionalDetails).length > 0 ? (
                Object.entries(qcRequest.Product.OptionalDetails).map(([key, value]) => (
                  <Typography variant='body1' key={key}>{key}: {value}</Typography>
                ))
              ) : (
                isOptionalDetailsExpanded && <Typography variant='body1'>No optional details available.</Typography>
              )}

              {/* Vendor's Listing Section */}
              <SectionDivider>
                <Chip label='Vendors Listing' color='primary' />
              </SectionDivider>
              <Typography variant='body1'>Vendor Name: {qcRequest.VendorName}</Typography>
              <Typography variant='body1'>Price: ₹{qcRequest.ProductVendor.Price}</Typography>
              <Typography variant='body1'>Quantity: {qcRequest.ProductVendor.Quantity}</Typography>
              <Typography variant='body1'>
                Listing status: {qcRequest.ProductVendor.Visible === 0 ? 'Inactive' : 'Active'}
              </Typography>

              {/* QC Request details Section */}
              <SectionDivider>
                <Chip label='QC Request Details' color='primary' />
              </SectionDivider>
              <Typography variant='body1'>Status: {qcRequest.Status ? 'Rejected' : 'Pending'}</Typography>
              <Typography variant='body1'>Request Date: {formatDate(qcRequest.RequestDate)}</Typography>
              {qcRequest.Status
                ? <Typography variant='body1'>Admins reason for rejecting: {qcRequest.AdminMessage || 'No reason mentioned'}</Typography>
                : qcRequest.VendorMessage
                  ? <Typography variant='body1'>Vendor Message: {qcRequest.VendorMessage}</Typography>
                  : null
              }

              {/* Accept and Reject Buttons */}
              {!qcRequest.Status && !startRedirectCountdown && (
                <ButtonContainer>
                  <Button variant='contained' color='primary' onClick={handleAccept}>
                    Accept
                  </Button>
                  <Button variant='contained' color='secondary' onClick={handleReject}>
                    Reject and add reason
                  </Button>
                </ButtonContainer>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </QCRequestCard >

      {/* Reason for Accepting Dialog */}
      < CustomDialog open={confirmationDialogOpen} onClose={closeReasonDialog} >
        <DialogTitle>Confirm Accept</DialogTitle>
        <DialogContent>
          <Typography variant='body1'>
            Are you sure you want to accept the QC request?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeConfirmationDialog}>Cancel</Button>
          <Button onClick={handleConfirmAccept} color='primary'>Confirm</Button>
        </DialogActions>
      </CustomDialog >

      {/* Reason for Rejecting Dialog */}
      < CustomDialog open={reasonDialogOpen} onClose={closeReasonDialog} >
        <DialogTitle>Reason for Rejecting</DialogTitle>
        <DialogContent>
          <TextField
            label='Reason'
            multiline
            rows={4}
            fullWidth
            value={reasonForRejecting}
            onChange={handleReasonChange}
            required
            sx={{ marginTop: '5px' }}
            error={!!reasonForRejecting ? false : true}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeReasonDialog}>Cancel</Button>
          <Button onClick={submitRejectRequest} color='secondary' disabled={!!reasonForRejecting ? false : true}>Submit</Button>
        </DialogActions>
      </CustomDialog >

      {/* Snackbar for displaying messages */}
      < Snackbar open={snackbarOpen} autoHideDuration={5000} onClose={handleSnackbarClose} >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar >
    </>
  );
};

export { QCRequestReview };
