import { Link, NavLink, useLocation } from 'react-router-dom';
import {
    IconButton,
    List,
    ListItemIcon,
    ListItemText,
    useMediaQuery,
    Collapse
} from '@mui/material';
import {
    ChevronLeft as ChevronLeftIcon,
    ChevronRight as ChevronRightIcon,
    ExpandMore as ExpandMoreIcon,
    ExpandLess as ExpandLessIcon,
    Dashboard as DashboardIcon,
    PlaylistAddCheck as PlaylistAddCheckIcon,
    ManageAccountsOutlined as ManageAccountsOutlinedIcon,
    PeopleAltOutlined as PeopleAltOutlinedIcon,
    // SupervisedUserCircle as SupervisedUserCircleIcon,
    // PersonOutline as PersonOutlineIcon,
    // Storefront as StorefrontIcon,
    // Warehouse as WarehouseIcon,
    CategoryOutlined as CategoryOutlinedIcon,
    Devices as DevicesIcon
} from '@mui/icons-material';
import { StyledDrawerListItemButton, StyledDrawer, DrawerHeader, StyledLogo, StyledDivider } from './StyledComponents';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import { LOGO } from '../config/config';

const RecursiveListItem = ({ item, location, closeDrawer, isChild = false }) => {
    const [open, setOpen] = useState(false);
    const hasNestedItems = Array.isArray(item.children) && item.children.length > 0;

    const handleClick = () => {
        setOpen((prevOpen) => !prevOpen);
        if (!hasNestedItems) {
            closeDrawer(); // Close the drawer when clicking on a link without nested items
        }
    };

    return (
        <>
            <StyledDrawerListItemButton
                onClick={handleClick}
                component={NavLink}
                to={item.to}
                active={location.pathname === item.to}
                isChild={isChild}
            >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
                {hasNestedItems && (open ? <ExpandLessIcon /> : <ExpandMoreIcon />)}
            </StyledDrawerListItemButton>
            {hasNestedItems && (
                <Collapse in={open} timeout='auto' unmountOnExit>
                    <List component='div' disablePadding>
                        {item.children.map((nestedItem) => (
                            <RecursiveListItem
                                key={nestedItem.to}
                                item={nestedItem}
                                location={location}
                                isChild
                                closeDrawer={closeDrawer}
                            />
                        ))}
                    </List>
                </Collapse>
            )}
        </>
    );
};

export const SideDrawer = ({ open, handleDrawerClose }) => {
    const theme = useTheme();
    const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));
    const location = useLocation();

    const menuItems = [
        {
            text: 'Dashboard',
            to: '/',
            icon: <DashboardIcon />,
        },
        {
            text: 'QC Request',
            to: '/qcrequest',
            icon: <PlaylistAddCheckIcon />,
        },
        {
            text: 'User',
            icon: <ManageAccountsOutlinedIcon />,
            children: [
                {
                    text: 'All users',
                    to: '/user',
                    icon: <PeopleAltOutlinedIcon />,
                },
                // {
                //     text: 'Vendor',
                //     to: '/vendor',
                //     icon: <StorefrontIcon />,
                // },
            ],
        },
        {
            text: 'Category',
            to: '/category',
            icon: <CategoryOutlinedIcon />,
        },
        {
            text: 'Product',
            to: '/product',
            icon: <DevicesIcon />,
        },
    ];

    const closeDrawer = () => {
        if (isMediumScreen) {
            handleDrawerClose();
        }
    };

    return (
        <StyledDrawer
            variant={isMediumScreen ? 'temporary' : 'persistent'}
            anchor='left'
            open={open}
            onClose={handleDrawerClose}
            ModalProps={{
                keepMounted: true, // Better open performance on mobile.
            }}
        >
            <DrawerHeader>
                <Link to='/'>
                    <StyledLogo src={LOGO} alt='header-Logo' open={!open} />
                </Link>
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
            </DrawerHeader>
            <StyledDivider />
            {/* <Divider sx={{ margin: '8px 0', backgroundColor: 'rgba(0, 0, 0, 0.1)' }} /> */}
            <List>
                {menuItems.map((item, index) => (
                    <RecursiveListItem
                        key={index}
                        item={item}
                        location={location}
                        closeDrawer={closeDrawer}
                    />
                ))}
            </List>
        </StyledDrawer>
    );
};
