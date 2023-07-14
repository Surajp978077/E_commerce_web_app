import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Typography, Card, CardContent, Grid, Divider, Chip, IconButton } from '@mui/material';
import { ExpandMore as ExpandMoreIcon, ExpandLess as ExpandLessIcon } from '@mui/icons-material';
import { styled, useTheme } from '@mui/material/styles';
import { userInfoInstance } from '../../api/axios';

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

const ProductCard = styled(Card)(({ theme }) => ({
    // backgroundColor: '#f9fbe7',
    // padding: theme.spacing(2),
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
    // borderRadius: theme.spacing(1),
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
    // borderRadius: theme.spacing(1),
}));

const SectionDivider = styled(Divider)(({ theme }) => ({
    marginTop: theme.spacing(2),
}));

const ExpandCollapseButton = styled(IconButton)(({ theme }) => ({
    marginLeft: theme.spacing(1),
    padding: theme.spacing(1),
}));

const VendorDetailsGrid = styled(Grid)(({ theme }) => ({
    marginTop: theme.spacing(1),
    display: 'flex',
    flexWrap: 'wrap',
    [theme.breakpoints.down('md')]: {
        '& > :not(:last-child)': {
            marginBottom: theme.spacing(2), // Add margin-bottom to all children except the last one
        },
    },
}));

const VendorDetailsCard = styled(Card)(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
        marginRight: theme.spacing(2),
        flex: '1 1 50%',
    },
    padding: theme.spacing(2),
    height: '100%',
}));

export const ProductDetails = () => {
    const location = useLocation();
    const product = location.state;
    const [navbarHeight, setNavbarHeight] = useState(0);
    const [userInfo, setUserInfo] = useState(null);
    const [isBasicDetailsExpanded, setIsBasicDetailsExpanded] = useState(false);
    const [isOptionalDetailsExpanded, setIsOptionalDetailsExpanded] = useState(false);

    useEffect(() => {
        const getUserInfo = async () => {
            try {
                const response = await userInfoInstance.get(`/${product.VendorUserId}`);
                if (response?.data) {
                    setUserInfo(response.data);
                    console.log(response);
                }
            } catch (error) {
                if (error.response) {
                    console.log(`ErrorResponseData: ${error.response.data}`);
                    console.log(`ErrorResponseStatus: ${error.response.status}`);
                    console.log(`ErrorResponseHeaders: ${error.response.headers}`);
                } else {
                    console.log(`ErrorMessage: ${error.message}`);
                }
            }
        };

        getUserInfo();
    }, [product?.VendorUserId]);

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

    if (!product) {
        return (
            <NotFoundContainer theme={theme}>
                <NotFoundCard>
                    <Typography variant='body1' fontWeight='bold'>
                        Product details not found.
                    </Typography>
                </NotFoundCard>
            </NotFoundContainer>
        );
    }

    if (!userInfo) {
        return <div>Loading...</div>;
    }

    return (
        <ProductCard>
            <CardContent>
                <Grid container spacing={2}>
                    {/* Image Section */}
                    <ImageContainer item xs={12} md={4}>
                        <ProductImage src={product.ProductImageUrl} alt='Product' />
                    </ImageContainer>

                    {/* Details Section */}
                    <Grid item xs={12} md={8}>
                        {/* Product details Section */}
                        <SectionDivider sx={{ marginTop: 0 }}>
                            <Chip label='Product details' color='primary' />
                        </SectionDivider>
                        <Typography variant='body1'>Name: {product.ProductName}</Typography>
                        <Typography variant='body1'>Description: {product.ProductDescription}</Typography>
                        <Typography variant='body1'>MRP: ₹{product.ProductBasePrice.toLocaleString('en-IN')}</Typography>

                        {/* Basic Details Section */}
                        <SectionDivider>
                            <Chip
                                label='Basic Details'
                                color='primary'
                                onClick={toggleBasicDetails}
                                clickable
                            />
                            <ExpandCollapseButton onClick={toggleBasicDetails}>
                                {isBasicDetailsExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                            </ExpandCollapseButton>
                        </SectionDivider>
                        {isBasicDetailsExpanded && product.ProductBasicDetails && Object.keys(product.ProductBasicDetails).length > 0 ? (
                            Object.entries(product.ProductBasicDetails).map(([key, value]) => (
                                <Typography variant='body1' key={key}>{key}: {value}</Typography>
                            ))
                        ) : (
                            isBasicDetailsExpanded && <Typography variant='body1'>No basic details available.</Typography>
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
                        {isOptionalDetailsExpanded && product.ProductOptionalDetails && Object.keys(product.ProductOptionalDetails).length > 0 ? (
                            Object.entries(product.ProductOptionalDetails).map(([key, value]) => (
                                <Typography variant='body1' key={key}>{key}: {value}</Typography>
                            ))
                        ) : (
                            isOptionalDetailsExpanded && <Typography variant='body1'>No optional details available.</Typography>
                        )}

                        {/* Vendor's Listing Section */}
                        <SectionDivider>
                            <Chip label='Vendors Listing' color='primary' />
                        </SectionDivider>
                        <Typography variant='body1'>Price: ₹{product.ProductVendorPrice.toLocaleString('en-IN')}</Typography>
                        <Typography variant='body1'>Quantity: {product.ProductVendorQuantity.toLocaleString('en-IN')}</Typography>
                        <Typography variant='body1'>
                            Listed On: {formatDate(product.ProductVendorListedOn)}
                        </Typography>
                        <Typography variant='body1'>
                            Listing status: {product.ProductVendorVisible === 0 ? 'Inactive' : 'Active'}
                        </Typography>
                        {/* Vendor's Details Section */}
                        <SectionDivider>
                            <Chip label='Vendor Details' color='primary' />
                        </SectionDivider>
                        <VendorDetailsGrid container>
                            <Grid item xs={12} md={6}>
                                <VendorDetailsCard variant='outlined'>
                                    <Typography variant='h6'>Basic Details</Typography>
                                    <Typography variant='body1'>Name: {userInfo.UserName}</Typography>
                                    <Typography variant='body1'>GSTIN: {product.VendorGSTIN ? product.VendorGSTIN : '-'}</Typography>
                                    <Typography variant='body1'>Delivery Pin Code: {product.VendorDeliveryPinCode === 0 ? '-' : product.VendorDeliveryPinCode}</Typography>
                                    <Typography variant='body1'>Email: {userInfo.Email}</Typography>
                                    <Typography variant='body1'>Phone: {userInfo.Phone}</Typography>
                                </VendorDetailsCard>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <VendorDetailsCard variant='outlined'>
                                    <Typography variant='h6'>Address</Typography>
                                    <Typography variant='body1'>City: {userInfo.Address.City}</Typography>
                                    <Typography variant='body1'>Pincode: {userInfo.Address.Pincode}</Typography>
                                    <Typography variant='body1'>State: {userInfo.Address.State}</Typography>
                                    <Typography variant='body1'>Street: {userInfo.Address.Street}</Typography>
                                </VendorDetailsCard>
                            </Grid>
                        </VendorDetailsGrid>
                    </Grid>
                </Grid>
            </CardContent>
        </ProductCard>
    );
};
