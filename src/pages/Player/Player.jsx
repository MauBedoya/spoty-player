import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { spotifyApi } from "../../helpers/spotify";

import MusicPlayer from "../../components/MusicPlayer";
import Loader from "../../components/Loader";

import styles from "./Player.module.css";

// use "location" to catch the "state" sended with "Navigate"
export default function Player() {
  let location = useLocation();
  const [loader, setLoader] = useState(true);
  const [tracks, setTracks] = useState([]); // toDo: playlist visible
  const [currentTrack, setCurrentTrack] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  // console.log(currentTrack);
  useEffect(() => {
    if (location.state) {
      spotifyApi(
        `https://api.spotify.com/v1/playlists/${location.state.id}/tracks`,
        (data) => {
          setTracks(data.items);
          setCurrentTrack(data.items[0].track)
          setLoader(false)
        }
      )
    }
  }, [location.state]);

  // toDo: prev and next track 
  const changeTrack = (e) => {
    if (currentIndex < tracks.length - 1 && e.target.matches(".next-btn *")) {
      setCurrentTrack(tracks[currentIndex + 1].track);
      setCurrentIndex(currentIndex + 1);
    } else if (currentIndex >= 1 && e.target.matches(".prev-btn *")) {
      setCurrentTrack(tracks[currentIndex - 1].track);
      setCurrentIndex(currentIndex - 1);
    }
  }

  return (
    <div className={styles["player-grid"]}>
      {
        // set loader while currentTrack state is updated after first render
        loader
          ? <Loader />
          : <MusicPlayer 
            imgLink={currentTrack.album.images[0]?.url}
            title={currentTrack.name}
            author={currentTrack.artists}
            audioSrc={currentTrack.preview_url}
            changeTrack={changeTrack}
          />
      }
    </div>
  )
}
