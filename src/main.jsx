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
import { Login } from './login/login';

const router = createBrowserRouter(createRoutesFromElements(
  <Routes>
    <Route
      path="/"
      element={<Login />}
    >
    </Route>
    <Route
      path="/"
    >
    </Route>
  </Routes>)
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
