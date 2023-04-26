import { useEffect, useState } from 'react';
import api from '../api/products';

export const ProductGet = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await api.get('/products');
                console.log(response);
                if (response && response.data) {
                    setProducts(response.data);
                }
            }
            catch(error) {
                if (error.response) {
                    // console.log(error.response.data);
                    // console.log(error.response.status);
                    // console.log(error.response.headers);
                    console.log(`First error: ${error.response.data}`);
                    console.log(`Second error: ${error.response.status}`);
                    console.log(`Third error: ${error.response.headers}`);
                }
                else {
                    // console.log(`Error: ${error.message}`);
                    console.log(`Last Error: ${error.message}`);
                }
            }
        };
        fetchProducts();
    }, [])

    return (
        <>
            <h4>
                List of Products:
            </h4>
            <ul>
                {
                    products.map(product => {
                        return <li key={product.ProdId}>{product.ProdName}</li>
                    })
                }
            </ul>
        </>
    );
}