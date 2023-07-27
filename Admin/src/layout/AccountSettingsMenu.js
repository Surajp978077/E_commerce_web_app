import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Button, ButtonGroup, Divider, IconButton, useMediaQuery } from '@mui/material';
import {
    // PersonAdd,
    // Settings,
    Brightness7 as Brightness7Icon,
    SettingsBrightness as SettingsBrightnessIcon,
    Brightness4 as Brightness4Icon
} from '@mui/icons-material';
import { StyledAccountSettingsMenu, StyledAccountSettingsMenuItem, StyledLogoutIcon, StyledLogoutMenuItem } from './StyledComponents';
import { LOGINPAGE } from '../config/config';
import { CustomThemeContext } from '../context/theme/CustomThemeContext';

export const AccountSettingsMenu = ({ anchorEl, handleClose, usernameFirstCharacter }) => {
    const isMobileScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    
    const { mode, toggleTheme } = useContext(CustomThemeContext);
    const themeOptions = [
        {
            id: 1,
            theme: 'light',
            icon: <Brightness7Icon />
        },
        {
            id: 2,
            theme: 'system',
            icon: <SettingsBrightnessIcon />
        },
        {
            id: 3,
            theme: 'dark',
            icon: <Brightness4Icon />
        }
    ];

    const logout = () => {
        localStorage.removeItem('token');
        sessionStorage.clear();
        window.location.href = LOGINPAGE;
    };

    return (
        <StyledAccountSettingsMenu
            anchorEl={anchorEl}
            id='account-menu'
            open={Boolean(anchorEl)}
            onClose={handleClose}
            onClick={handleClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
            <StyledAccountSettingsMenuItem
                component={Link}
                to='/profile'
                onClick={handleClose}>
                <Avatar>{usernameFirstCharacter}</Avatar> Profile
            </StyledAccountSettingsMenuItem>
            {/* <StyledAccountSettingsMenuItem onClick={handleClose}>
                <Avatar /> My account
            </StyledAccountSettingsMenuItem> */}

            <Divider />

            <StyledAccountSettingsMenuItem>
                <ButtonGroup
                    color='primary'
                    aria-label='theme switcher'
                    size={isMobileScreen ? 'small' : 'medium'}
                >
                    {themeOptions.map(({ id, theme, icon }) => (
                        <Button
                            key={id}
                            variant={mode === theme ? 'contained' : 'outlined'}
                            onClick={() => toggleTheme(theme)}
                        >
                            {icon}
                            {theme}
                        </Button>
                    ))}
                </ButtonGroup>
            </StyledAccountSettingsMenuItem>

            <Divider />

            {/* <StyledAccountSettingsMenuItem onClick={handleClose}>
                <IconButton size='small'>
                    <PersonAdd fontSize='small' />
                </IconButton>
                Add another account
            </StyledAccountSettingsMenuItem>
            <StyledAccountSettingsMenuItem onClick={handleClose}>
                <IconButton size='small'>
                    <Settings fontSize='small' />
                </IconButton>
                Settings
            </StyledAccountSettingsMenuItem> */}
            <StyledLogoutMenuItem onClick={logout}>
                <IconButton size='small'>
                    <StyledLogoutIcon fontSize='small' />
                </IconButton>
                Logout
            </StyledLogoutMenuItem>
        </StyledAccountSettingsMenu>
    );
};
