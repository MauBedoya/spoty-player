import React from "react";
// icons
import { MdOutlineSpaceDashboard, MdFavoriteBorder } from "react-icons/md";
import { FaGripfire} from "react-icons/fa";
import { GoPlay } from "react-icons/go"; 
import { PiSignOutBold } from "react-icons/pi";
import { IoLibraryOutline } from "react-icons/io5";

import styles from "./Navbar.module.css";
import NavbarBtn from "../NavbarBtn/NavbarBtn";

export default function Navbar() {
  return (
    <div className={styles.navbar}>
      <img src="https://picsum.photos/200?random=8" className={styles["profile-img"]} alt="profile picture" />
      <div className={styles["btn-container"]}>
        <NavbarBtn title="Feed" route="/feed" icon={<MdOutlineSpaceDashboard />}/>
        <NavbarBtn title="Trending" route="/trending" icon={<FaGripfire />}/>
        <NavbarBtn title="Player" route="/player" icon={<GoPlay />}/>
        <NavbarBtn title="Favorites" route="/favorites" icon={<MdFavoriteBorder />}/>
        <NavbarBtn title="Library" route="/" icon={<IoLibraryOutline />}/>
      </div>
        <NavbarBtn title="Sing Out" route="/singOut" icon={<PiSignOutBold></PiSignOutBold>} />
    </div>
  )
}
