import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './routes/App'
import {
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";
import './index.css'

const router = createBrowserRouter(createRoutesFromElements(
  <Route
    path="/"
    element={<App />}
  >
  </Route>)
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
