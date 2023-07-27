import { forwardRef, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Toolbar, Tooltip } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { StyledAccountSettingsIconButton, StyledAppBar, StyledLogoIconButton, StyledLogo } from './StyledComponents';
import { LOGO } from '../config/config';
import { AccountSettingsMenu } from './AccountSettingsMenu';
import { UserInfoContext } from '../components/userInfo/UserInfoContext';

export const CustomAppBar = forwardRef(({ open, handleDrawerOpen }, ref) => {
    const { userInfo } = useContext(UserInfoContext);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <StyledAppBar position='fixed' open={open} ref={ref}>
            <Toolbar>
                <StyledLogoIconButton
                    aria-label='open drawer'
                    onClick={handleDrawerOpen}
                    edge='start'
                    open={open}
                >
                    <MenuIcon />
                </StyledLogoIconButton>
                <Link to='/'>
                    <StyledLogo src={LOGO} alt='header-Logo' open={open} />
                </Link>
                <Tooltip title='Account settings'>
                    <StyledAccountSettingsIconButton
                        onClick={handleClick}
                        size='small'
                        aria-controls={Boolean(anchorEl) ? 'account-menu' : undefined}
                        aria-haspopup='true'
                        aria-expanded={Boolean(anchorEl) ? 'true' : undefined}
                    >
                        <Avatar>{userInfo.UserName.charAt(0)}</Avatar>
                    </StyledAccountSettingsIconButton>
                </Tooltip>
                <AccountSettingsMenu
                    anchorEl={anchorEl}
                    handleClose={handleClose}
                    usernameFirstCharacter={userInfo.UserName.charAt(0)}
                />
            </Toolbar>
        </StyledAppBar>
    );
});
