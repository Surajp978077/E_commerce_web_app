import { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { productInstance } from '../../api/axios';
import { CardActionArea, Grid } from '@mui/material';
import {
    DashboardContainer,
    DashboardCardContainer,
    DashboardTitle,
    DashboardContent,
    StyledQCRequestBadge,
    DisabledCard,
    DisabledTitle,
    DisabledContent,
} from './Dashboard.styles';

const DashboardCard = ({ title, content, linkTo, disabled = false }) => {
    return !disabled ? (
        <Grid item xs={12} sm={6} md={4}>
            <Link to={linkTo} style={{ textDecoration: 'none' }}>
                <DashboardCardContainer>
                    <CardActionArea>
                        <DashboardTitle variant='h6' component='div'>
                            {title}
                        </DashboardTitle>
                        <DashboardContent variant='body1'>
                            {content}
                        </DashboardContent>
                    </CardActionArea>
                </DashboardCardContainer>
            </Link>
        </Grid>
    ) : (
        <Grid item xs={12} sm={6} md={4}>
            <DisabledCard>
                <DisabledTitle variant='h6' component='div'>
                    {title}
                </DisabledTitle>
                <DisabledContent variant='body1' >
                    {content}
                </DisabledContent>
            </DisabledCard>
        </Grid>
    );
};

const Dashboard = () => {
    const [qcRequestCount, setQcRequestCount] = useState();

    const dashboardItems = [
        {
            id: 1,
            title: 'QC Request',
            content: (
                qcRequestCount !== undefined && qcRequestCount !== null ?
                    <Fragment>
                        <span>Pending requests: </span>
                        <StyledQCRequestBadge
                            color={qcRequestCount === 0 ? 'primary' : 'error'}
                            badgeContent={qcRequestCount}
                            showZero
                        />
                    </Fragment>
                    : <span>Loading...</span>
            ),
            linkTo: '/qcrequest',
        },
        {
            id: 2,
            title: 'User',
            content: 'Click to manage Users.',
            linkTo: '/user',
        },
        {
            id: 3,
            title: 'Vendor',
            content: 'Click to manage Vendors.',
            linkTo: '/vendor',
            disabled: true,
        },
        {
            id: 4,
            title: 'Category',
            content: 'Click to manage Categories.',
            linkTo: '/category',
        },
        {
            id: 5,
            title: 'Product',
            content: 'Click to manage Products.',
            linkTo: '/product',
        },
        {
            id: 6,
            title: 'Order',
            content: 'Click to manage Orders.',
            linkTo: '/order',
            disabled: true,
        },
        {
            id: 7,
            title: 'Offer',
            content: 'Click to manage Offers.',
            linkTo: '/offer',
            disabled: true,
        },
    ]

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
        <DashboardContainer>
            <Grid container spacing={4}>
                {dashboardItems.map((item) => (
                    <DashboardCard
                        key={item.id}
                        title={item.title}
                        content={item.content}
                        linkTo={item.linkTo}
                        disabled={item.disabled}
                    />
                ))}
            </Grid>
        </DashboardContainer>
    );
};

export { Dashboard };
