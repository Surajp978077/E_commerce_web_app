import axios from 'axios';
import { useEffect, useState } from 'react';

export const ProductGet = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = axios.get('https://localhost:7044/api/products');
                console.log(response);
                if (response && response.data) {
                    setProducts(response.data);
                }
            } catch(error) {
                console.log(error);
            }
        };
        fetchProducts();
    }, [])

    return (
        <></>
    );
}