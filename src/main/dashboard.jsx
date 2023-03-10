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

function NavItem(props) {
  return (
    <li>
      <NavLink
        to={props.to}
        className={({ isActive, isPending }) =>
          isActive
            ? "active"
            : isPending
              ? "pending"
              : ""
        }>
        {props.title}
      </NavLink>
    </li>
  )
}