import { useEffect, useState } from 'react';
import { productInstance } from './api/axios';
import Table from 'react-bootstrap/Table';

export const CategoryGet = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await productInstance.get('/categories');
                console.log(response);
                // if (response && response.data && response.data.$values) {
                //     setCategories(response.data.$values);
                // }
                if (response && response.data) {
                    setCategories(response.data);
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
        fetchCategories();
    }, [])

    // return (
    //     <>
    //         <h4>List of Categories:</h4>
    //         {categories && categories.length > 0 ? (
    //             <ul>
    //                 {categories.map((category) => {
    //                     return (
    //                         <>
    //                             {category.$id && (
    //                                 <li key={category.CategoryId}>
    //                                     {category.CategoryId} | {category.Name} | {category.Description} |
    //                                     {category.ParentCategoryId}
    //                                 </li>
    //                             )}
    //                         </>
    //                     );
    //                 })}
    //             </ul>
    //         ) : (
    //             <p>No categories found.</p>
    //         )}
    //     </>
    // );

    // return (
    //     <>
    //         <h4>List of Categories:</h4>
    //         {categories && categories.length > 0 ? (
    //             <ul>
    //                 {categories.map((category) => {
    //                     return (
    //                         <li key={category.CategoryId.toString()}>
    //                             {category.CategoryId} | {category.Name} | {category.Description}
    //                         </li>
    //                     );
    //                 })}
    //             </ul>
    //         ) : (
    //             <p>No categories found.</p>
    //         )}
    //     </>
    // );

    return (
        <div className='m-2'>
            <h4>List of Categories:</h4>
            {categories && categories.length > 0 ? (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category) => {
                            return (
                                <tr key={category.CategoryId}>
                                    <td>{category.CategoryId}</td>
                                    <td>{category.Name}</td>
                                    <td>{category.Description}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            ) : (
                <p>No categories found.</p>
            )}
        </div>
    );
}

export const CategoryAdd = () => {
    const [categoryName, setcategoryName] = useState('');
    const [categoryDescription, setcategoryDescription] = useState('');

    var bodyFormData = new FormData();
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            bodyFormData.append('Name', categoryName);
            bodyFormData.append('Description', categoryDescription);
            const response = await productInstance.post('/categories', bodyFormData);
            console.log(`Category Name: ${categoryName}, Description: ${categoryDescription}`);
            console.log(response);
            setcategoryName('');
            setcategoryDescription('');
        } catch (error) {
            console.log(`Error: ${error.message}`);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor='addCategory'>Category Name</label>
            <input
                autoFocus
                id='categoryName'
                type='text'
                placeholder='Category Name'
                required
                value={categoryName}
                onChange={(e) => setcategoryName(e.target.value)}
            />
            <label htmlFor='addCategory'>Category Description</label>
            <input
                autoFocus
                id='categoryDescription'
                type='text'
                placeholder='Category Description'
                required
                value={categoryDescription}
                onChange={(e) => setcategoryDescription(e.target.value)}
            />
            <button type='submit'>Add</button>
        </form>
    )
}

const Category = () => {
    return (
        <>
            <CategoryAdd />
            <CategoryGet />
        </>
    );

}

export default Category;