import { useEffect, useState } from 'react';
import { productInstance } from '../../api/axios';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import { CategoryDelete } from './CategoryDeleteV2';
import { CategoryAdd } from './CategoryAdd';

const Category = () => {
    const [categories, setCategories] = useState([]);
    const [updateCount, setUpdateCount] = useState(0);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await productInstance.get('/categories');
                console.log(response);
                if (response && response.data) {
                    setCategories(response.data);
                }
            }
            catch (error) {
                if (error.response) {
                    // Received response but not in 200 range
                    console.log(`ErrorResponseData: ${error.response.data}`);
                    console.log(`ErrorResponseStatus: ${error.response.status}`);
                    console.log(`ErrorResponseHeaders: ${error.response.headers}`);
                }
                else {
                    console.log(`ErrorMessage: ${error.message}`);
                }
            }
        }

        fetchCategories();
    }, [updateCount])

    const handleUpdate = () => {
        setUpdateCount(previousCount => previousCount + 1);
    }

    const categoryTree = (categories, category) => (
        <>
            <CategoryAdd category={category} onCategoryUpdate={handleUpdate} />
            {categories && categories.$values && categories.$values.length > 0 ? (
                <>
                    {categories.$values.map(category => {
                        return category.$id && (
                            <TreeItem
                                key={category.$id}
                                nodeId={category.$id}
                                sx={{ border: '2px solid #f5f5f5', borderRadius: '10px', borderColor: 'darkGrey' }}
                                label={
                                    <>
                                        <img src={category.CategoryImageUrl} alt='Image' style={{ width: '80px', margin: '4%' }} />
                                        {category.Name}
                                        <CategoryDelete category={category} onCategoryUpdate={handleUpdate} />
                                    </>}
                            >
                                {
                                    categoryTree(category.ChildCategories, category)
                                }
                            </TreeItem>
                        )
                    })}
                </>) : null}
        </>
    );

    return (
        <TreeView
            aria-label='rich object'
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpanded={['root']}
            defaultExpandIcon={<ChevronRightIcon />}
            sx={{ flexGrow: 1, maxWidth: 500, overflowY: 'auto', margin: '2%' }}
        >
            {categoryTree(categories)}
        </TreeView>
    );
}

export default Category;