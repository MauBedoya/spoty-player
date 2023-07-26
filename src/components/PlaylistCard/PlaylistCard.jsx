import React from "react";
import { BsPlayCircleFill } from "react-icons/bs";
import CardBtn from "../CardBtn/CardBtn";

import styles from "./PlaylistCard.module.css";

export default function PlaylistCard({ img, name, tracks, owner, play }) {
  return (
    <div 
      className={styles["card"]}
      onClick={play}>
      <div className={styles["image"]}>
        <img
          src={img}
          alt={`${name} playlist cover`}
          className={styles["cover"]}
        />
      </div>
      <div className={styles["data"]}>
        <p className={styles["name"]}>{name}</p>
        <p className={styles["tracks"]}>{`${tracks} tracks`}</p>
        <p className={styles["owner"]}>{`De ${owner}`}</p>
      </div>
      <div className={styles["btn"]}><BsPlayCircleFill /></div>
    </div>
  );
}
