import React from "react";
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

export default function Home() {
  return (
    // creating routes
    <Router>
      <div className={styles["main-body"]}>
        {/* navbar does not have any rout */}
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