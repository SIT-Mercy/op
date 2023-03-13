import React, { useEffect, useState, createContext, useContext } from "react";
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import {
  Outlet,
  Link,
  NavLink,
  useLoaderData,
  Form,
  redirect,
  useNavigation,
  useSubmit,
  useNavigate,
} from "react-router-dom";
import "./dashboard.css"
import { env, i18n } from "../env"
import { Button } from "@mui/material";

const drawerWidth = 240;

export const IsDrawerOpenContext = createContext()

export function DashBoard() {
  const navigation = useNavigation();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const navigate = useNavigate()
  const loginInfo = env.loginInfo
  const drawer = (
    <div id="sidebar">
      <Toolbar>
        <a>{loginInfo.name}</a>
      </Toolbar>
      <Divider />
      <nav>
        <ul>
          <NavItem
            key="student-list"
            to="students"
            title={i18n.get("students.title")}
          />
          <NavItem
            key="item-list"
            to="items"
            title={i18n.get("items.title")}
          />
        </ul>
      </nav>
      <Divider />
      <Toolbar>
        <Button onClick={() => {
          env.loginInfo = null
          navigate("/")
        }}>{i18n.get("logout")}</Button>
      </Toolbar>
    </div>
  );
  const content = <div id="panel"
    className={
      navigation.state === "loading" ? "loading" : ""
    }>
    <IsDrawerOpenContext.Provider value={{ isDrawerOpen, setIsDrawerOpen }}>
      <Outlet />
    </IsDrawerOpenContext.Provider>
  </div>
  return (
    <Box sx={{ display: 'flex' }}>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={isDrawerOpen}
          onClose={() => {
            setIsDrawerOpen(false);
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <CssBaseline />
        <Toolbar />
        {content}
      </Box>
    </Box>
  )
}

function NavItem(props) {
  return <ListItemButton
    component={NavLink} to={props.to}>
    {props.title}
  </ListItemButton>
}

export function ResponsiveAppBar(props) {
  const { isDrawerOpen, setIsDrawerOpen } = useContext(IsDrawerOpenContext);
  return <AppBar
    position="fixed"
    sx={{
      width: { sm: `calc(100% - ${drawerWidth}px)` },
      ml: { sm: `${drawerWidth}px` },
    }}
  >
    <Toolbar>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={() => {
          setIsDrawerOpen(!isDrawerOpen)
        }}
        sx={{ mr: 2, display: { sm: 'none' } }}
      >
        <MenuIcon />
      </IconButton>
      {props.children}
    </Toolbar>
  </AppBar>
}