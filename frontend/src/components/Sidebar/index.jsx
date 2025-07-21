import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./styles.scss";
import Header from "../Header";

const SideBar = () => {
  return (
    <div>
      <Header />
      <div className="sidebar">
        <div className="sidebar__left">
          <NavLink
            to="/dashboard"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/admin"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Admin Management
          </NavLink>
          <NavLink
            to="/client"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Client Management
          </NavLink>
        </div>
        <div className="sidebar__right">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default SideBar;
