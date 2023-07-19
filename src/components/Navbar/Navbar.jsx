import React, { useEffect, useState } from "react";
// icons
import { MdOutlineSpaceDashboard, MdFavoriteBorder } from "react-icons/md";
import { FaGripfire} from "react-icons/fa";
import { GoPlay } from "react-icons/go"; 
import { PiSignOutBold } from "react-icons/pi";
import { IoLibraryOutline } from "react-icons/io5";
import NavbarBtn from "../NavbarBtn/NavbarBtn";
import {api, spotifyApi} from "../../helpers/spotify";

import styles from "./Navbar.module.css";

export default function Navbar({ menu }) {

  const [profileImg, setProfileImg] = useState("/userPlaceholder.png");

  useEffect(() => {
    spotifyApi(api.CURRENT_USER, (data) => {
      if (data.images[0]) setProfileImg(data.images[0].url)
    });
  }, [])

  return (
    <div className={`${styles["navbar"]} ${styles[menu]}`}>
      <img src={profileImg} className={styles["profile-img"]} alt="profile picture" />
      <div className={styles["btn-container"]}>
        <NavbarBtn title="Player" route="/player" icon={<GoPlay />}/>
        <NavbarBtn title="Favorites" route="/favorites" icon={<MdFavoriteBorder />}/>
        <NavbarBtn title="Library" route="/" icon={<IoLibraryOutline />}/>
      </div>
        <NavbarBtn title="Sing Out" route="/singOut" icon={<PiSignOutBold></PiSignOutBold>} />
    </div>
  )
}
