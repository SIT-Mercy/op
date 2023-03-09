import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
  Routes,
} from "react-router-dom";
import './index.css'
import { Login, action as loginAction } from './login/login';
import { DashBoard } from './main/dashboard';
import { ItemList, loader as itemListLoader } from './main/itemList';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    action: loginAction,
  },
  {
    path: "dashboard",
    element: <DashBoard />,
    children: [
      {
        path: "itemList",
        loader: itemListLoader,
        element: <ItemList />
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
