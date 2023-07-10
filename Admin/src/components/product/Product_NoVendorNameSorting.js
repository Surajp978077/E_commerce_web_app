import { useEffect, useState } from 'react';
import { productInstance, userInfoInstance } from '../../api/axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Divider, Chip, Pagination } from '@mui/material';
import CategorySearch from './CategorySearch';

export const Product = () => {
    const [products, setProducts] = useState([]);
    const [vendorUsers, setVendorUsers] = useState([]);
    const [selectedResult, setSelectedResult] = useState([]);
    const [categorySelectedLeaf, setCategorySelectedLeaf] = useState(null);
    const [pagination, setPagination] = useState(() => {
        const storedPagination = sessionStorage.getItem('productPagination');
        return storedPagination
            ? JSON.parse(storedPagination)
            : {
                page: 1,
                pageSize: 5,
                sortBy: 'ProdName',
                sortDesc: false,
                totalItems: 0,
                totalPages: 0,
            };
    });

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await productInstance.get(`/productvendor/category/${categorySelectedLeaf.CategoryId}`, {
                    params: {
                        page: pagination.page,
                        pageSize: pagination.pageSize,
                        sortBy: pagination.sortBy,
                        sortDesc: pagination.sortDesc,
                    },
                });
                console.log(response.data);
                if (response && response.data) {
                    setProducts(response.data.Data);
                    setPagination(prevPagination => ({ ...prevPagination, totalPages: response.data.TotalPages }));
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

        if (categorySelectedLeaf) {
            fetchProducts();
        }
    }, [categorySelectedLeaf, pagination.page, pagination.pageSize, pagination.sortBy, pagination.sortDesc]);

    useEffect(() => {
        const fetchVendorUsers = async () => {
            try {
                const vendorUserIds = products.map(product => product.VendorUserId);
                console.log(vendorUserIds);
                const response = await userInfoInstance.get('/vendors', {
                    params: {
                        vendorUserIds: vendorUserIds
                    }
                });
                console.log(response.data);
                if (response && response.data) {
                    setVendorUsers(response.data);
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

        if (products.length > 0) {
            fetchVendorUsers();
        }
    }, [products]);

    useEffect(() => {
        sessionStorage.setItem('productPagination', JSON.stringify(pagination));
    }, [pagination]);

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

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', margin: '3%' }}>
            <CategorySearch
                selectedResult={selectedResult}
                setSelectedResult={setSelectedResult}
                categorySelectedLeaf={categorySelectedLeaf}
                setCategorySelectedLeaf={setCategorySelectedLeaf}
            />

            <Divider sx={{ width: '100%', marginY: '16px' }}>
                <Chip label='PRODUCTS' />
            </Divider>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
                <Pagination count={pagination.totalPages} page={pagination.page} onChange={handlePageChange} />
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Image</TableCell>
                            <TableCell
                                sx={{ fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' }}
                                onClick={() => handleSort('ProductName')}
                            >
                                Product Name &nbsp;
                                {pagination.sortBy === 'ProductName' &&  (
                                <Chip
                                    size='small'
                                    label={pagination.sortDesc ? '▼' : '▲'}
                                    color='primary'
                                />
                            )}
                            </TableCell>
                            <TableCell
                                sx={{ fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' }}
                                onClick={() => handleSort('ProductBasePrice')}
                            >
                                Base Price
                                {pagination.sortBy === 'ProductBasePrice' && <span>{pagination.sortDesc ? ' ▼' : ' ▲'}</span>}
                            </TableCell>
                            <TableCell>Vendor's Name</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Visible</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product) => {
                            const matchingVendorUser = vendorUsers.find((user) => user.UserId === product.VendorUserId);
                            return (
                                <TableRow key={product.UniqueId}>
                                    <TableCell>
                                        <img src={product.ProductImageUrl} alt='Product' style={{ width: '50px', height: '50px' }} />
                                    </TableCell>
                                    <TableCell>{product.ProductName}</TableCell>
                                    <TableCell>{product.ProductBasePrice}</TableCell>
                                    <TableCell>{matchingVendorUser?.UserName}</TableCell>
                                    <TableCell>{product.ProductVendorPrice}</TableCell>
                                    <TableCell>{product.ProductVendorQuantity}</TableCell>
                                    <TableCell>{product.ProductVendorVisible}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};
