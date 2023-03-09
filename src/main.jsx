import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import { Login } from './login/Login';

const router = createBrowserRouter(createRoutesFromElements(
  <Route
    path="/"
    element={<Login />}
  >
  </Route>)
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
