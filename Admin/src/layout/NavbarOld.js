import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import { Outlet } from 'react-router-dom';
import { LOGO, colors } from '../config/config';
import { useLocation, Link as RouterLink } from 'react-router-dom';
import ClearIcon from '@mui/icons-material/Clear';
import ListItemButton from '@mui/material/ListItemButton';
import { LOGINPAGE } from '../config/config';
import {
  Avatar,
  IconButton,
  Menu,
  Typography,
  MenuItem,
  Tooltip,
  ButtonGroup,
} from '@mui/material';
import jwtDecode from 'jwt-decode';
import useMediaQuery from '@mui/material/useMediaQuery';
import { UserInfoContext } from '../components/userInfo/UserInfoContext';
import {
  FiberManualRecord,
  ScienceOutlined,
} from '@mui/icons-material';
import List from '@mui/material/List';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { ThemeContext } from '../context/theme/ThemeContext';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import StorefrontIcon from '@mui/icons-material/Storefront';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import DevicesIcon from '@mui/icons-material/Devices';

function ListItemLink(props) {
  const { icon, primary, to, onClick } = props;
  const location = useLocation();

  const CustomRouterLink = React.forwardRef((props, ref) => (
    <RouterLink ref={ref} to={to} {...props} />
  ));

  return (
    <ListItemButton
      component={CustomRouterLink}
      sx={{
        '&.Mui-selected': {
          // backgroundColor: 'rgba(0, 0, 0, 0.08)',
          backgroundImage: `linear-gradient(to right, ${colors.theme} 2%, ${colors.secondary} 10px)`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 100%',
        },
      }}
      selected={location.pathname === to}
      onClick={onClick}
    >
      {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
      <ListItemText primary={primary} />
    </ListItemButton>
  );
}

export const NavbarOld = () => {
  const anchor = 'left';
  const [state, setState] = React.useState({ [anchor]: false });
  const { userInfo } = React.useContext(UserInfoContext);
  const { mode, toggleTheme } = React.useContext(ThemeContext);

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

  const [anchorElUser, setAnchorElUser] = React.useState(null);
  var token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  function logout() {
    localStorage.removeItem('token');
    window.location.href = LOGINPAGE;
  }
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState((prevState) => ({
      ...prevState,
      [anchor]: open,
    }));
  };

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const isMobile = useMediaQuery('(max-width:600px)');
  const list = (anchor) => (
    <Box
      sx={{
        width:
          anchor === 'top' || anchor === 'bottom'
            ? 'auto'
            : isMobile
              ? '100vw'
              : 350,
      }}
      role='presentation'
    >
      <Toolbar id='offcanvas-header'>
        <IconButton sx={{ p: 0 }}>
          <Avatar
            // src={userInfo.ProfilePic}
            sx={{ backgroundColor: colors.theme }}
          ></Avatar>
        </IconButton>
        <Typography sx={{ marginLeft: '10px' }}>
          Hello, {userInfo.UserName}
        </Typography>
        <ClearIcon
          id='drawer-close-btn'
          onClick={toggleDrawer(anchor, false)}
        />
      </Toolbar>
      <Divider />
      <List>
        <ListItemLink
          to='/'
          primary='Dashboard'
          icon={<DashboardIcon />}
          onClick={toggleDrawer(anchor, false)}
        />
        <ListItemLink
          to='/qcrequest'
          primary='QC Request'
          icon={<PlaylistAddCheckIcon />}
          onClick={toggleDrawer(anchor, false)}
        />

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <ListItemLink
            // to={'/user'}
            primary='User Managment'
            icon={<ManageAccountsOutlinedIcon />}
            onClick={handleClick}
          // onClick={toggleDrawer(anchor, false)}
          >{open ? <ExpandLess /> : <ExpandMore />}</ListItemLink>

          {/* <div
            onClick={handleClick}
            style={{
              width: '3em',
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            {open ? <ExpandLess /> : <ExpandMore />}
          </div> */}
        </div>

        <Collapse
          in={open}
          timeout='auto'
          unmountOnExit
          sx={{
            paddingLeft: '20px',
          }}
        >
          <List component='div' disablePadding>
            <ListItemLink
              to={'/user'}
              primary='User'
              icon={<PersonOutlineIcon />}
              onClick={toggleDrawer(anchor, false)}
            />
          </List>

          <List component='div' disablePadding>
            <ListItemLink
              // to='/vendor'
              primary='Vendor'
              icon={<StorefrontIcon />}
              onClick={toggleDrawer(anchor, false)}
            />
          </List>
        </Collapse>


        <ListItemLink
          to='/category'
          primary='Category'
          icon={<CategoryOutlinedIcon />}
          onClick={toggleDrawer(anchor, false)}
        />
        <ListItemLink
          to='/product'
          primary='Product'
          icon={<DevicesIcon />}
          onClick={toggleDrawer(anchor, false)}
        />

        <ListItemLink
          to='/Test'
          primary='Test'
          icon={<ScienceOutlined />}
          onClick={toggleDrawer(anchor, false)}
        />
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        id='navbar'
        position='sticky'
        sx={{
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Toolbar>
          <React.Fragment key={anchor}>
            <Button
              onClick={toggleDrawer(anchor, true)}
              sx={{ color: 'black' }}
            >
              <MenuIcon />
            </Button>
            <Drawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
            >
              {list('left')}
            </Drawer>
            <RouterLink to='/' className='header-title'>
              <img src={LOGO} className='header-logo' alt='header-Logo' />
            </RouterLink>
          </React.Fragment>
          <Box sx={{ flexGrow: 1 }} />

          <Tooltip title='Open account' sx={{ marginLeft: 'auto' }}>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar
                alt={decodedToken.UserName.charAt(0)}
                // src={userInfo.vendor.VendorProfilePicURL}
                sx={{ backgroundColor: colors.theme }}
              >
                {decodedToken.UserName ? decodedToken.UserName.charAt(0) : ''}
              </Avatar>
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            id='menu-appbar'
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem
              key='Profile'
              component={RouterLink}
              to='/profile'
              onClick={handleCloseUserMenu}
            >
              <Typography textAlign='center'>Profile</Typography>
            </MenuItem>
            <MenuItem key='Logout' onClick={logout}>
              <Typography color='error' textAlign='center'>
                Logout
              </Typography>
            </MenuItem>
            <MenuItem key='Theme'>
              <ButtonGroup color='primary' aria-label='theme switcher'>
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
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Outlet />
    </Box>
  );
}
