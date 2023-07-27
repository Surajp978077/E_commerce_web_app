import { useState, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import {
    Box,
    CssBaseline,
    useScrollTrigger,
    Slide,
    Fab,
    Fade,
    useMediaQuery,
} from '@mui/material';
import { KeyboardArrowUp as KeyboardArrowUpIcon } from '@mui/icons-material';
import { MainContainer, DrawerHeader } from './StyledComponents';
import { CustomAppBar } from './CustomAppBar';
import { SideDrawer } from './SideDrawer';
import { CustomThemeProvider } from '../context/theme/CustomThemeContext';

const HideOnScroll = (props) => {
    const { children } = props;
    const isMobileScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    const trigger = useScrollTrigger();

    // Only apply the slide effect for mobile screens.
    return (
        <Slide appear={false} direction='down' in={!isMobileScreen ? true : !trigger}>
            {children}
        </Slide>
    );
};

const ScrollTop = (props) => {
    const { children, anchorRef } = props;

    const trigger = useScrollTrigger({
        disableHysteresis: true, // Ignore the scroll direction when determining the trigger value.
        // target: window ? window() : undefined, // Defaults to window. Only need to set this if using an iframe.
        threshold: 100 // Defaults to 100. Change the trigger value when the vertical scroll strictly crosses this threshold (exclusive).
    });

    const handleClick = (event) => {
        const anchor = anchorRef.current;

        if (anchor) {
            anchor.scrollIntoView({
                block: 'center'
            });
        }
    };

    return (
        <Fade in={trigger}>
            <Box
                onClick={handleClick}
                role='presentation'
                sx={{ position: 'fixed', bottom: 16, right: 16 }}
            >
                {children}
            </Box>
        </Fade>
    );
};

export const Navbar = (props) => {
    const [open, setOpen] = useState(false);
    const scrollTopAnchorRef = useRef(null);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <CustomThemeProvider>
            <CssBaseline />
            <Box sx={{ display: 'flex' }}>
                {/* HideOnScroll is only applied for mobile screens */}
                <HideOnScroll {...props}>
                    <CustomAppBar open={open} handleDrawerOpen={handleDrawerOpen} />
                </HideOnScroll>
                <SideDrawer open={open} handleDrawerClose={handleDrawerClose} />
                <MainContainer open={open} maxWidth={false}>
                    <DrawerHeader ref={scrollTopAnchorRef} />
                    <Outlet />
                </MainContainer>
                <ScrollTop {...props} anchorRef={scrollTopAnchorRef}>
                    <Fab size='small' aria-label='scroll back to top'>
                        <KeyboardArrowUpIcon />
                    </Fab>
                </ScrollTop>
            </Box>
        </CustomThemeProvider>
    );
};
