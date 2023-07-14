import { useEffect, useState } from 'react';
import { productInstance } from '../../api/axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box, Divider, Chip } from '@mui/material';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';

export const Product = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await productInstance.get('/products/all');
                console.log(response.data);
                if (response && response.data) {
                    setProducts(response.data);
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
        fetchProducts();
    }, []);

    return (
        <div>
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', margin: '3%' }}>
                <Button
                    component={Link}
                    to='/product-listing'
                    variant='contained'
                    color='primary'
                    startIcon={<AddIcon />}
                >
                    New Product
                </Button>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Divider sx={{ width: '100%', marginBottom: '16px' }} >
                    <Chip label='PRODUCTS' />
                </Divider>
                <TableContainer
                    component={Paper}
                    sx={{
                        width: '95%',
                        border: '2px solid #f5f5f5',
                        borderRadius: '10px',
                    }}
                >
                    <Table sx={{ minWidth: 650 }}>
                        <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Image</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Name</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Description</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Price</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products.map((product) => (
                                <TableRow key={product.ProdId} sx={{ '&:hover': { backgroundColor: '#f5f5f5' } }}>
                                    <TableCell>
                                        <img src={product.ImageURL} alt='Product' style={{ width: '50px', height: '50px' }} />
                                    </TableCell>
                                    <TableCell>{product.ProdName}</TableCell>
                                    <TableCell>{product.Description}</TableCell>
                                    <TableCell>{product.Price}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </div>
    );
};