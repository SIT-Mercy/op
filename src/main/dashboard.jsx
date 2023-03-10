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
import { i18n } from "../env"
export function DashBoard() {
  const navigation = useNavigation();
  return (
    <>
      <div id="sidebar">
        <h1>{i18n.get("appName")}</h1>
        <nav>
          <ul>
            <li key="item-list">
              <NavLink
                to={`items`}
                className={({ isActive, isPending }) =>
                  isActive
                    ? "active"
                    : isPending
                      ? "pending"
                      : ""
                }>
                {i18n.get("items.title")}
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