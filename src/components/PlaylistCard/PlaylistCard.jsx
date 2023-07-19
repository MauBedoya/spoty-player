import React from "react";
import styles from "./PlaylistCard.module.css";

export default function PlaylistCard({ img, name, tracks, owner }) {
  return (
    <div className={styles["card"]}>
      <img
        src={img}
        alt={`${name} playlist cover`}
        className={styles["cover"]}
      />
      <div className={styles["data"]}>
        <p className={styles["name"]}>{name}</p>
        <p className={styles["tracks"]}>{`${tracks} tracks`}</p>
        <p className={styles["owner"]}>{`De ${owner}`}</p>
      </div>
    </div>
  );
}
