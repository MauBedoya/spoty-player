import React from "react"
import { loginEndpoint } from "../../helpers/spotify.js";
import styles from "./Login.module.css";

export default function Login() {
  return (
    <div className={styles["login"]}>
      <img
        src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png"
        alt="Spotify logo"
        className={styles.logo}
      />
      <div className={styles["information"]}>
        <h2 className={styles["title"]}>Importante!!</h2>
        <ul>
          <li>Este es un proyecto en desarrollo. Se irán agregando funcionalidades mas adelante.</li>
          <li>Es necesario tener una cuenta en <a href="https://open.spotify.com/" className={styles["link"]}>Spotify</a>, ya que hacemos uso de la API que requiere un inicio de sesión mediante OAuth2.</li>
          <li>El uso de la aplicación esta limitado a <span>1 hora</span>, pasado el tiempo permitido, se debe reingresar a la pestaña de la aplicación donde aparecerá el botón de <span>LOG IN</span>.</li>
        </ul>
      </div>
      <a href={loginEndpoint}>
        <div className={styles["login-btn"]}>LOG IN</div>
      </a>
    </div>
  )
}
