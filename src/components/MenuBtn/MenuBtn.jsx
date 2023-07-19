import React from "react";
import styles from "./MenuBtn.module.css";

export default function MenuBtn({ btnOnClick, menu }) {

  return (
    <button onClick={btnOnClick} className={`${styles["hamburger"]} ${styles["hamburger--arrowturn"]}  ${styles[menu]}`} type="button">
      <span className={styles["hamburger-box"]}>
        <span className={styles["hamburger-inner"]}></span>
      </span>
    </button>
  )
}
