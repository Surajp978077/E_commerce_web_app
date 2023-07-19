import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Container, Grid, Card, Typography } from '@mui/material';
import { useState } from 'react';
import { productInstance } from '../api/axios';

const DashboardCard = ({ title, content, linkTo }) => {
    const cardStyle = {
        border: 1,
        borderColor: 'grey.300',
        '&:hover': { boxShadow: '0 0 20px rgba(0, 0, 0, 0.3)' },
        cursor: 'pointer',
    };

    return (
        <Grid item xs={12} sm={6} md={4}>
            <Link to={linkTo} style={{ textDecoration: 'none' }}>
                <Card sx={cardStyle}>
                    <Typography variant='h6' component='div' sx={{ p: 2, backgroundColor: '#E1F5FE' }}>
                        {title}
                    </Typography>
                    <Typography variant='body1' sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
                        {content}
                    </Typography>
                </Card>
            </Link>
        </Grid>
    );
};

const DashboardCardDisabled = ({ title, content }) => {
    const cardStyle = {
        border: 1,
        borderColor: 'grey.300',
        opacity: 0.6,
        cursor: 'not-allowed',
    };

    return (
        <Grid item xs={12} sm={6} md={4}>
            <Card sx={cardStyle}>
                <Typography variant='h6' component='div' sx={{ p: 2, backgroundColor: 'lightgrey' }}>
                    {title}
                </Typography>
                <Typography variant='body1' sx={{ p: 2 }}>
                    {content}
                </Typography>
            </Card>
        </Grid>
    );
};

const Dashboard = () => {
    const [qcRequestCount, setQcRequestCount] = useState();

    useEffect(() => {
        const GetCountPendingQCRequests = async () => {
            try {
                const response = await productInstance.get('qcrequests/count-pending');
                console.log(response);
                if (response && response.data !== undefined && response.data !== null) {
                    setQcRequestCount(response.data);
                }
            } catch (error) {
                console.error('Error fetching count:', error);
            }
        };

        GetCountPendingQCRequests();
    }, []);

    return (
        <Container sx={{ mt: 5 }}>
            <Grid container spacing={4}>
                <DashboardCard
                    title='QC Request'
                    content={
                        qcRequestCount !== undefined && qcRequestCount !== null ?
                            <>
                                <span>Pending requests: </span>
                                <Badge
                                    color={qcRequestCount === 0 ? 'primary' : 'error'}
                                    badgeContent={qcRequestCount}
                                    showZero
                                    sx={{ ml: 2 }}
                                />
                            </>
                            : <span>Loading...</span>
                    }
                    linkTo='/qc-request'
                />
                <DashboardCard
                    title='User'
                    content='Click to manage Users.'
                    linkTo='/user'
                />
                <DashboardCardDisabled
                    title='Vendor'
                    content='Click to manage Vendors.'
                    linkTo='/vendor'
                />
                <DashboardCard
                    title='Category'
                    content='Click to manage Categories.'
                    linkTo='/category'
                />
                <DashboardCard
                    title='Product'
                    content='Click to manage Products.'
                    linkTo='/product'
                />
                <DashboardCardDisabled
                    title='Order'
                    content='Click to manage Orders.'
                    linkTo='/order'
                />
                <DashboardCardDisabled
                    title='Offer'
                    content='Click to manage Offers.'
                    linkTo='/offer'
                />
            </Grid>
        </Container>
    );
};

export default Dashboard;
