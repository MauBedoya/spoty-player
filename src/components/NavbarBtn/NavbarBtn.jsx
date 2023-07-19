import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./NavbarBtn.module.css";
import { IconContext } from "react-icons";

export default function NavbarBtn(props) {
  const { title, route, icon } = props;
  const location = useLocation();
  // verify actual location to set the button class
  const isActive = location.pathname === route;
  const btnActive = isActive
    ? "active"
    : "";

  return (
    <IconContext.Provider value={{ className: "icon-btn", size: "24px" }}>
      <Link to={route}>
        <div className={`${styles["btn"]} ${styles[btnActive]}`}>
          {icon}
          <p className={styles["title"]}>{title}</p>
        </div>
      </Link>
    </IconContext.Provider>
  )
}
