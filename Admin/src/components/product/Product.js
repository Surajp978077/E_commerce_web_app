import { useEffect, useState } from 'react';
import { productInstance } from '../../api/axios';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Box,
    Divider,
    Chip,
    Pagination,
    Button,
    CircularProgress,
    Typography,
    Snackbar,
    Alert,
    useTheme,
} from '@mui/material';
import CategorySearch from './CategorySearch';
import { ArrowDownward, ArrowUpward, Clear } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export const Product = () => {
    const [products, setProducts] = useState([]);
    const [selectedResult, setSelectedResult] = useState([]);
    const [categorySelectedLeaf, setCategorySelectedLeaf] = useState(() => {
        const storedCategorySelectedLeaf = sessionStorage.getItem('categorySelectedLeaf');
        return storedCategorySelectedLeaf
            ? JSON.parse(storedCategorySelectedLeaf)
            : null
    });
    const [pagination, setPagination] = useState(() => {
        const storedPagination = sessionStorage.getItem('productPagination');
        return storedPagination ? JSON.parse(storedPagination) : {
            totalItems: 0,
            totalPages: 0,
            page: 1,
            pageSize: 10,
            sortBy: 'ProductVendorListedOn',
            sortDesc: false,
        };
    });
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('error');

    const theme = useTheme(); // Remove and use styled components.

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            setError(null);

            try {
                const categoryId = categorySelectedLeaf ? categorySelectedLeaf.CategoryId : 0;
                const response = await productInstance.get(`/productvendor/category/${categoryId}`, {
                    params: {
                        page: pagination.page,
                        pageSize: pagination.pageSize,
                        sortBy: pagination.sortBy,
                        sortDesc: pagination.sortDesc,
                    },
                });
                console.log('Response:', response);
                if (response && response.data) {
                    setProducts(response.data.Data);
                    setPagination(prevPagination => ({
                        ...prevPagination,
                        totalPages: response.data.TotalPages
                    }));
                }

                // Show Snackbar if data is empty
                if (response && response.data && response.data.Data.length === 0) {
                    setSnackbarMessage('No data found.');
                    setSnackbarSeverity('info');
                    setSnackbarOpen(true);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
                setError(true);
                setSnackbarMessage('Failed to fetch data.');
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [categorySelectedLeaf, pagination.page, pagination.pageSize, pagination.sortBy, pagination.sortDesc]);

    useEffect(() => {
        sessionStorage.setItem('productPagination', JSON.stringify(pagination));
        sessionStorage.setItem('categorySelectedLeaf', JSON.stringify(categorySelectedLeaf));
    }, [pagination, categorySelectedLeaf]);

    const handlePageChange = (event, page) => {
        setPagination(prevPagination => ({ ...prevPagination, page: page }));
    };

    const handleSort = (column) => {
        if (pagination.sortBy === column) {
            setPagination(prevPagination => ({ ...prevPagination, sortDesc: !prevPagination.sortDesc }));
        } else {
            setPagination(prevPagination => ({ ...prevPagination, sortBy: column, sortDesc: false }));
        }
        setPagination(prevPagination => ({ ...prevPagination, page: 1 }));
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

    const handleCategoryDeselect = (categorySelectedLeaf) => {
        if (categorySelectedLeaf) {
            setCategorySelectedLeaf(null);
            setSelectedResult([]);
        }
    };

    const handleViewDetails = (product) => {
        navigate('/product/details', { state: product });
    };

    const handleSnackbarClose = (reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CategorySearch
                selectedResult={selectedResult}
                setSelectedResult={setSelectedResult}
                categorySelectedLeaf={categorySelectedLeaf}
                setCategorySelectedLeaf={setCategorySelectedLeaf}
            />

            <Divider sx={{ width: '100%', marginY: '16px' }}>
                <Chip label='PRODUCTS' />
            </Divider>

            {categorySelectedLeaf && (
                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '1rem' }}>
                    <Typography variant='body1'>Category Selected: {categorySelectedLeaf.Name}</Typography>
                    <Clear sx={{ cursor: 'pointer' }} size='small' onClick={() => handleCategoryDeselect(categorySelectedLeaf)} />
                </Box>
            )}

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
                <Pagination
                    count={pagination.totalPages}
                    page={pagination.page > pagination.totalPages ? pagination.totalPages : pagination.page}
                    onChange={handlePageChange} />
            </Box>

            <Paper
                variant='outlined'
                sx={{ border: '2px solid #f5f5f5', borderRadius: '10px', position: 'relative' }}
            >
                <TableContainer variant='outlined' component={Paper}>
                    <Table
                        sx={{
                            minHeight: loading || error || products.length === 0 ? '400px' : undefined
                        }}
                    >
                        <TableHead sx={{ backgroundColor: theme.palette.mode === 'dark' ? '#292929' : '#F0EEEE' }}>
                            <TableRow>
                                <TableCell />
                                <TableCell
                                    sx={{ fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' }}
                                    onClick={() => handleSort('ProductName')}
                                >
                                    Product Name &nbsp;
                                    {pagination.sortBy === 'ProductName' && (
                                        <span>{pagination.sortDesc ? <ArrowDownward /> : <ArrowUpward />}</span>
                                    )}
                                </TableCell>
                                <TableCell
                                    sx={{ fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer', textAlign: 'right' }}
                                    onClick={() => handleSort('ProductBasePrice')}
                                >
                                    Base Price (₹) &nbsp;
                                    {pagination.sortBy === 'ProductBasePrice' && (
                                        <span>{pagination.sortDesc ? <ArrowDownward /> : <ArrowUpward />}</span>
                                    )}
                                </TableCell>
                                <TableCell
                                    sx={{ fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' }}
                                    onClick={() => handleSort('VendorName')}
                                >
                                    Vendor's Name &nbsp;
                                    {pagination.sortBy === 'VendorName' && (
                                        <span>{pagination.sortDesc ? <ArrowDownward /> : <ArrowUpward />}</span>
                                    )}
                                </TableCell>
                                <TableCell
                                    sx={{ fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' }}
                                    onClick={() => handleSort('ProductVendorListedOn')}
                                >
                                    Listed on &nbsp;
                                    {pagination.sortBy === 'ProductVendorListedOn' && (
                                        <span>{pagination.sortDesc ? <ArrowDownward /> : <ArrowUpward />}</span>
                                    )}
                                </TableCell>
                                <TableCell
                                    sx={{ fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer', textAlign: 'right' }}
                                    onClick={() => handleSort('ProductVendorPrice')}
                                >
                                    Price (₹) &nbsp;
                                    {pagination.sortBy === 'ProductVendorPrice' && (
                                        <span>{pagination.sortDesc ? <ArrowDownward /> : <ArrowUpward />}</span>
                                    )}
                                </TableCell>
                                <TableCell
                                    sx={{ fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer', textAlign: 'right' }}
                                    onClick={() => handleSort('ProductVendorQuantity')}
                                >
                                    Quantity &nbsp;
                                    {pagination.sortBy === 'ProductVendorQuantity' && (
                                        <span>{pagination.sortDesc ? <ArrowDownward /> : <ArrowUpward />}</span>
                                    )}
                                </TableCell>
                                <TableCell
                                    sx={{ fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' }}
                                    onClick={() => handleSort('ProductVendorVisible')}
                                >
                                    Listing status &nbsp;
                                    {pagination.sortBy === 'ProductVendorVisible' && (
                                        <span>{pagination.sortDesc ? <ArrowDownward /> : <ArrowUpward />}</span>
                                    )}
                                    <br />
                                </TableCell>
                                <TableCell />
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {/* Show table rows when there is data */}
                            {products.map((product) => {
                                return (
                                    <TableRow key={product.ProductVendorId}>
                                        <TableCell sx={{ width: '70px', padding: '4px 2px 4px 4px' }}>
                                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                                                <img src={product.ProductImageUrl} alt='Product' style={{ width: '50px', height: '50px' }} />
                                            </Box>
                                        </TableCell>
                                        <TableCell>{product.ProductName}</TableCell>
                                        <TableCell sx={{ textAlign: 'right' }}>{product.ProductBasePrice.toLocaleString('en-IN')}</TableCell>
                                        <TableCell>{product.VendorName}</TableCell>
                                        <TableCell>{formatDate(product.ProductVendorListedOn)}</TableCell>
                                        <TableCell sx={{ textAlign: 'right' }}>{product.ProductVendorPrice.toLocaleString('en-IN')}</TableCell>
                                        <TableCell sx={{ textAlign: 'right' }}>{product.ProductVendorQuantity.toLocaleString('en-IN')}</TableCell>
                                        <TableCell>{product.ProductVendorVisible === 1 ? 'Active' : 'Inactive'}</TableCell>
                                        <TableCell>
                                            <Button variant='outlined' color='primary' onClick={() => handleViewDetails(product)}>
                                                View Details
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}

                            {/* Show loading state */}
                            {loading && (
                                <TableRow>
                                    <TableCell
                                        sx={{
                                            position: 'absolute',
                                            top: '60%',
                                            left: '50%',
                                            transform: 'translate(-50%, -50%)',
                                            width: 'fit-content',
                                            border: 0,
                                            padding: 0,
                                        }}
                                    >
                                        <CircularProgress />
                                    </TableCell>
                                </TableRow>
                            )}

                            {/* Show 'No data found' message */}
                            {!loading && !error && products.length === 0 && (
                                <TableRow>
                                    <TableCell
                                        sx={{
                                            position: 'absolute',
                                            top: '60%',
                                            left: '50%',
                                            transform: 'translate(-50%, -50%)',
                                            width: 'fit-content',
                                            border: 0,
                                            padding: 0,
                                        }}
                                    >
                                        <Typography>{snackbarMessage}</Typography>
                                    </TableCell>
                                </TableRow>
                            )}

                            {/* Show error message */}
                            {!loading && error && (
                                <TableRow>
                                    <TableCell
                                        sx={{
                                            position: 'absolute',
                                            top: '60%',
                                            left: '50%',
                                            transform: 'translate(-50%, -50%)',
                                            width: 'fit-content',
                                            border: 0,
                                            padding: 0,
                                        }}
                                    >
                                        <Typography color='error'>{snackbarMessage}</Typography>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>

            {/* Show Snackbar for 'No data available' or for 'Error' */}
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};
