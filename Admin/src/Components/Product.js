import { useEffect, useState } from 'react';
import { productInstance } from './api/axios';
import { Table } from 'react-bootstrap';

export const ProductGet = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await productInstance.get('/products');
                console.log(response.data);
                if (response && response.data) {
                    setProducts(response.data);
                }
            }
            catch (error) {
                if (error.response) {
                    // Received response but not in 200 range
                    // console.log(error.response.data);
                    // console.log(error.response.status);
                    // console.log(error.response.headers);
                    console.log(`ErrorResponseData: ${error.response.data}`);
                    console.log(`ErrorResponseStatus: ${error.response.status}`);
                    console.log(`ErrorResponseHeaders: ${error.response.headers}`);
                }
                else {
                    console.log(`ErrorMessage: ${error.message}`);
                }
            }
        };
        fetchProducts();
    }, [])

    return (
        <div className='m-2'>
            <h4>List of Products:</h4>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.ProdId}>
                            <td><img src={product.ImageURL} alt='Product' style={{ width: '50px', height: '50px' }} /></td>
                            <td>{product.ProdName}</td>
                            <td>{product.Description}</td>
                            <td>{product.Price}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

const Product = () => {
    return (
        <ProductGet />
    );

}

export default Product;