import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import './index.css'
import {
  Login,
  loader as loginLoader,
  action as loginAction
} from './login/login'
import {
  DashBoard,
} from './main/dashboard'
import {
  ItemPanel,
  loader as itemListLoader,
} from './main/item'
import {
  StudentPanel,
  loader as studentListLoader,
} from "./main/student/index"
import { i18n } from './env'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    action: loginAction,
    loader: loginLoader,
  },
  {
    path: "dashboard",
    element: <DashBoard />,
    children: [
      {
        path: "items",
        loader: itemListLoader,
        element: <ItemPanel />,
      },
      {
        path: "students",
        loader: studentListLoader,
        element: <StudentPanel />,
      },
    ]
  },
]);

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "16px",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "16px",
        },
      },
    }
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>,
)

document.title = i18n.get("appName")