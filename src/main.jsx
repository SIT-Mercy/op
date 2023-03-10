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
  ItemList,
  loader as itemListLoader,
  action as itemListAction,
} from './main/item'
import {
  StudentList,
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
        element: <ItemList />,
      },
      {
        path: "items/new",
        action: newItemAction,
        element: <NewItem />
      },
      {
        path: "students",
        loader: studentListLoader,
        element: <StudentList />,
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
