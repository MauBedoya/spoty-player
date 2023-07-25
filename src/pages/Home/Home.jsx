import React, { useEffect, useState, useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Library from "../Library";
import Player from "../Player";
import Favorites from "../Favorites";
import styles from "./Home.module.css";
import Navbar from "../../components/Navbar/";
import Login from "../Auth/Login";
import MenuBtn from "../../components/MenuBtn/MenuBtn";

export default function Home() {
  let [token, setToken] = useState("");
  let [menuState, setMenuState] = useState("");

  // verify or extract and save the Access Token in session storage and state
  useEffect(() => {
    const lastToken = sessionStorage.getItem("currentToken");
    const hash = window.location.hash;
    window.location.hash = "";
    // validation help to not re-log-in on each page reload
    if (!lastToken && hash) {
      const extractedToken = hash.split("&")[0].split("=")[1];

      sessionStorage.setItem("currentToken", extractedToken);
      setToken(extractedToken);
    } else {
      setToken(lastToken);
    }
  }, []);

  // toggle the "is-active" class to animate navbar and button when it's pressed
  const toggleMenu = (e) => {
    console.log(e.target);
    menuState === ""
      ? setMenuState("is-active")
      : setMenuState("")
  }
  
  return !token ? (
    <Login />
  ) : (
    // creating routes
    <Router>
      <div className={styles["main-body"]}>
        <MenuBtn btnOnClick={toggleMenu} menu={menuState}/>
        <Navbar menu={menuState}/>
        <div className={styles["screen"]}>
          <Routes>
            <Route path="/" element={<Library />}></Route>
            <Route path="/player" element={<Player />}></Route>
            <Route path="/favorites" element={<Favorites />}></Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}
