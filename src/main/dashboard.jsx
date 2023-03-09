import { useEffect } from "react";
import {
  Outlet,
  Link,
  NavLink,
  useLoaderData,
  Form,
  redirect,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import "./dashboard.css"

export function DashBoard() {
  const navigation = useNavigation();

  return (
    <>
      <div id="sidebar">
        <h1>Mercy</h1>
        <nav>
          <ul>
            <li key="item-list">
              <NavLink
                to={`itemList`}
                className={({ isActive, isPending }) =>
                  isActive
                    ? "active"
                    : isPending
                      ? "pending"
                      : ""
                }>
                Item List
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <div id="detail"
        className={
          navigation.state === "loading" ? "loading" : ""
        }
      >
        <Outlet />
      </div>
    </>
  );
}