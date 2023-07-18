import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import { Outlet } from "react-router-dom";
import { LOGO, colors } from "../../config/config";
import { useLocation, Link as RouterLink } from "react-router-dom";
import ClearIcon from "@mui/icons-material/Clear";
import ListItemButton from "@mui/material/ListItemButton";
import { LOGINPAGE } from "../../config/config";
import {
  Avatar,
  IconButton,
  Menu,
  Typography,
  MenuItem,
  Tooltip,
} from "@mui/material";
import jwtDecode from "jwt-decode";
import useMediaQuery from "@mui/material/useMediaQuery";
import { VendorInfoContext } from "../context_api/vendorInfo/VendorInfoContext";
import {
  FiberManualRecord,
  ReceiptLongOutlined,
  ScienceOutlined,
} from "@mui/icons-material";
import HomeIcon from "@mui/icons-material/Home";
import List from "@mui/material/List";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import DonutLargeOutlinedIcon from "@mui/icons-material/DonutLargeOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

function ListItemLink(props) {
  const { icon, primary, to, rejectedStatusCount, onClick } = props;
  const location = useLocation();

  const CustomRouterLink = React.forwardRef((props, ref) => (
    <RouterLink ref={ref} to={to} {...props} />
  ));

  return (
    <ListItemButton
      component={CustomRouterLink}
      sx={{
        "&.Mui-selected": {
          // backgroundColor: "rgba(0, 0, 0, 0.08)",
          backgroundImage:
            "linear-gradient(to right, #007bff 0%, #007bff 0.2rem, #b8d9f3 10px)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
        },
      }}
      selected={location.pathname === to}
      onClick={onClick}
    >
      {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
      <ListItemText primary={primary} />
      {(to === "/listings" || primary === "Listings in Progress") &&
        rejectedStatusCount > 0 && (
          <FiberManualRecord sx={{ color: colors.theme, fontSize: 12 }} />
        )}
    </ListItemButton>
  );
}

export default function Navbar() {
  const anchor = "left";
  const [state, setState] = React.useState({ [anchor]: false });
  const { rejectedStatusCount } = React.useContext(VendorInfoContext);

  const [anchorElUser, setAnchorElUser] = React.useState(null);
  var token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  function logout() {
    localStorage.removeItem("token");
    window.location.href = LOGINPAGE;
  }
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
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

  const isMobile = useMediaQuery("(max-width:600px)");
  const list = (anchor) => (
    <Box
      sx={{
        width:
          anchor === "top" || anchor === "bottom"
            ? "auto"
            : isMobile
            ? "100vw"
            : "20vw",
      }}
      role="presentation"
    >
      <Toolbar id="offcanvas-header">
        <IconButton sx={{ p: 0 }}>
          <Avatar
            src={decodedToken.profilePic}
            sx={{ backgroundColor: colors.theme }}
          ></Avatar>
        </IconButton>
        <Typography sx={{ marginLeft: "10px" }}>
          Hello, {decodedToken.UserName}
        </Typography>
        <ClearIcon
          id="drawer-close-btn"
          onClick={toggleDrawer(anchor, false)}
        />
      </Toolbar>
      <Divider />
      <List>
        <ListItemLink
          to="/"
          primary="Home"
          icon={<HomeIcon />}
          onClick={toggleDrawer(anchor, false)}
        />

        <ListItemLink
          to="/profile"
          primary="Profile"
          icon={<AccountBoxOutlinedIcon />}
          onClick={toggleDrawer(anchor, false)}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <ListItemLink
            to="/listings"
            primary="Listings Managment"
            icon={<ReceiptLongOutlined />}
            rejectedStatusCount={rejectedStatusCount}
            onClick={toggleDrawer(anchor, false)}
          />

          <div
            onClick={handleClick}
            style={{
              width: "3em",
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {open ? <ExpandLess /> : <ExpandMore />}
          </div>
        </div>

        <Collapse
          in={open}
          timeout="auto"
          unmountOnExit
          sx={{
            paddingLeft: "20px",
          }}
        >
          <List component="div" disablePadding>
            <ListItemLink
              to={`/listings/${2}`}
              primary="Listings in Progress"
              icon={<DonutLargeOutlinedIcon />}
              onClick={toggleDrawer(anchor, false)}
              rejectedStatusCount={rejectedStatusCount}
            />
          </List>

          <List component="div" disablePadding>
            <ListItemLink
              to="/new_listing"
              primary="Add a new Listing"
              icon={<AddOutlinedIcon />}
              onClick={toggleDrawer(anchor, false)}
            />
          </List>
        </Collapse>

        <ListItemLink
          to="/Test"
          primary="Test"
          icon={<ScienceOutlined />}
          onClick={toggleDrawer(anchor, false)}
        />
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        id="navbar"
        position="sticky"
        sx={{
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Toolbar>
          <React.Fragment key={anchor}>
            <Button
              onClick={toggleDrawer(anchor, true)}
              sx={{ color: "black" }}
            >
              <MenuIcon />
            </Button>
            <Drawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
            >
              {list("left")}
            </Drawer>
            <RouterLink to="/" className="header-title">
              <img src={LOGO} className="header-logo" alt="header-Logo" />
            </RouterLink>
          </React.Fragment>
          <Box sx={{ flexGrow: 1 }} />

          <Tooltip title="Open account" sx={{ marginLeft: "auto" }}>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar
                alt={decodedToken.UserName.charAt(0)}
                src={decodedToken.profilePic}
                sx={{ backgroundColor: colors.theme }}
              >
                {decodedToken.UserName ? decodedToken.UserName.charAt(0) : ""}
              </Avatar>
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem
              key="Profile"
              component={RouterLink}
              to="/profile"
              onClick={handleCloseUserMenu}
            >
              <Typography textAlign="center">Profile</Typography>
            </MenuItem>
            <MenuItem key="Logout" onClick={logout}>
              <Typography color="error" textAlign="center">
                Logout
              </Typography>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Outlet />
    </Box>
  );
}
