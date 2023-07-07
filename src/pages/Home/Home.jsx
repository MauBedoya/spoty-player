import React, { useEffect, useState } from "react";
import { 
  BrowserRouter as Router,
  Routes,
  Route 
} from "react-router-dom";
import Library from "../Library";
import Feed from "../Feed";
import Trending from "../Trending";
import Player from "../Player";
import Favorites from "../Favorites";
import styles from "./Home.module.css";
import Navbar from "../../components/Navbar/";
import Login from "../Auth/Login";

export default function Home() {

  let [ token, setToken ] = useState("");

  // verify or extract and save the Access Token in session storage and state
  //? better use localStorage instead sessionStorage?
  useEffect(() => {
    const lastToken = sessionStorage.getItem("currentToken"); 
    const hash = window.location.hash;
    // validation help to not re-log-in on each page reload
    if (lastToken || hash) {
      const extractedToken = hash.split("&")[0].split("=")[1];

      sessionStorage.setItem("currentToken", extractedToken);
      setToken(extractedToken);
    }
  }, [])


  return !token
    ? (<Login />)
    : (
    // creating routes
    <Router>
      <div className={styles["main-body"]}>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Library />}></Route>
          <Route path="/feed" element={<Feed />}></Route>
          <Route path="/trending" element={<Trending />}></Route>
          <Route path="/player" element={<Player />}></Route>
          <Route path="/favorites" element={<Favorites />}></Route>
        </Routes>
      </div>
    </Router>
  )
}