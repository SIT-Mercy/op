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
import { DashBoard } from './main/dashboard'
import {
  ItemPanel,
  loader as itemListLoader,
  action as itemListAction,
} from './main/item'
import {
  StudentPanel,
  loader as studentListLoader,
} from "./main/student/index"
import {
  NewItem,
  action as newItemAction
} from './main/item/new';

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
        action: itemListAction,
        element: <ItemPanel />,
      },
      {
        path: "items/new",
        action: newItemAction,
        element: <NewItem />
      },
      {
        path: "students",
        loader: studentListLoader,
        element: <StudentPanel />,
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
