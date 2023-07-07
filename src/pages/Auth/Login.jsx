import React from "react"
import { loginEndpoint } from "../../helpers/spotify.js";
import styles from "./Login.module.css";

export default function Login() {
  return (
    <div className={styles.login}>
      <img
        src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png"
        alt="Spotify logo"
        className={styles.logo}
      />
      <a href={loginEndpoint}>
        <div className={styles["login-btn"]}>LOG IN</div>
      </a>
    </div>
  )
}
