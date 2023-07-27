import { styled } from '@mui/material/styles';
import { AppBar, Drawer, Box, ListItemButton, IconButton, Menu, MenuItem, Divider, alpha, Container } from '@mui/material';
import { Logout as LogoutIcon } from '@mui/icons-material';

const drawerWidth = 240;

export const StyledAppBar = styled(AppBar, {
    shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        })
    }),
    backgroundColor: theme.palette.background.default,
}));

export const StyledDrawerListItemButton = styled(ListItemButton, {
    shouldForwardProp: (prop) => prop !== 'active' && prop !== 'isChild'
})(({ theme, active, isChild }) => ({
    backgroundImage: active
        ? `linear-gradient(to right,
          ${theme.palette.mode === 'dark' ? '#000' : '#0080ff 2%'}, 
          ${theme.palette.mode === 'dark' ? '#333' : '#b8d9f3 10px'})`
        : 'none',
    '&:hover': {
        backgroundColor: active ? theme.palette.action.selected : theme.palette.action.hover,
    },
    padding: theme.spacing(2, 4),
    margin: isChild ? theme.spacing(0, 0, 0, 4) : 0,
}));

export const StyledDrawer = styled(Drawer)({
    width: drawerWidth,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
        width: drawerWidth,
        boxSizing: 'border-box'
    }
});

export const DrawerHeader = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    // justifyContent: 'flex-end',
    justifyContent: 'space-between',
}));

export const MainContainer = styled(Container, {
    shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
    flexGrow: 1,
    paddingTop: theme.spacing(2),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        }),
        marginLeft: 0,
        width: `calc(100% - ${drawerWidth}px)`,
    }),
    [theme.breakpoints.down('md')]: {
        marginLeft: theme.spacing(0)
    }
}));

export const StyledLogoIconButton = styled(IconButton, {
    shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
    display: open ? 'none' : 'initial',
}));

export const StyledLogo = styled('img', {
    shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
    display: open ? 'none' : 'initial',
    maxWidth: '120px',
}));

export const StyledAccountSettingsMenu = styled(Menu)(({ theme }) => ({
    overflow: 'visible',
    filter: 'drop-shadow(0px 2px 8px rgba(0, 0, 0, 0.32))',
    marginTop: theme.spacing(1.5),
    '& .MuiAvatar-root': {
        width: 32,
        height: 32,
        marginLeft: theme.spacing(-0.5),
        marginRight: theme.spacing(1),
    },
    // '&:before': {  // Creates a decorative triangle
    //     content: '''',
    //     display: 'block',
    //     position: 'absolute',
    //     top: 0,
    //     right: 14,
    //     width: 10,
    //     height: 10,
    //     backgroundColor: theme.palette.background.paper,
    //     transform: 'translateY(-50%) rotate(45deg)',
    // },
}));

export const StyledAccountSettingsMenuItem = styled(MenuItem)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    '& .MuiAvatar-root': {
        //   width: theme.spacing(4),
        //   height: theme.spacing(4),
        backgroundColor: theme.palette.primary.main
    },
}));

export const StyledAccountSettingsIconButton = styled(IconButton)(({ theme }) => ({
    marginLeft: 'auto',
    '& .MuiAvatar-root': {
        //   width: theme.spacing(4),
        //   height: theme.spacing(4),
        backgroundColor: theme.palette.primary.main
    },
}));

export const StyledLogoutMenuItem = styled(MenuItem)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    color: theme.palette.error.main,
}));

export const StyledLogoutIcon = styled(LogoutIcon)(({ theme }) => ({
    color: theme.palette.error.main,
}));

export const StyledDivider = styled(Divider)(({ theme }) => ({
    borderColor: alpha(theme.palette.divider, 0.4)
}));
