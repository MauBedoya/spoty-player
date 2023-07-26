import React, { useState, useEffect, useRef } from "react";
import { BiSkipPrevious, BiSkipNext } from "react-icons/bi"
import { BsPlayCircleFill, BsPauseCircleFill } from "react-icons/bs"

import styles from "./MusicPlayer.module.css";

export default function MusicPlayer(props) {
  const { imgLink, title, author, audioSrc, changeTrack } = props;
  //toDo: maybe is useful to improve the "preview_url: null": https://github.com/spotify/web-api/issues/148

  // state of play/pause button
  const [playing, setPlaying] = useState(false);
  // state of audio duration
  const [duration, setDuration] = useState(0);
  // state of current time
  const [currentTime, setCurrentTime] = useState(0);

  // references
  const audioPlayer = useRef(); // reference to audio player
  const progressBar = useRef(); // reference to progress bar
  const animationRef = useRef() // reference to progress bar animation

  // extract track duration and current time
  useEffect(() => {
    console.log(audioSrc);
    if (audioSrc) {
      const roundedDuration = Math.floor(audioPlayer.current.duration + 1)
      setDuration(roundedDuration);
  
      progressBar.current.max = roundedDuration;
    }
  }, [
    audioPlayer?.current?.loadedmetadata,
    audioPlayer?.current?.readyState,
    // audioSrc
  ])

  // calculate and format the time of duration
  const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const minutesFormat = minutes < 10 
                            ? `0${minutes}`
                            : minutes
    const seconds = Math.floor(secs % 60);
    const secondsFormat = seconds < 10
                            ? `0${seconds}`
                            : seconds
  
    return `${minutesFormat}:${secondsFormat}`;
  }

  // toggle button and play or pause the audio
  const togglePlay = (e) => {
    if (e.target.matches(".playPause-btn *")) {
      setPlaying(!playing);
      if (playing) {
        audioPlayer.current.pause();
        // pause animation
        cancelAnimationFrame(animationRef.current);
      } else {
        audioPlayer.current.play();
        animationRef.current = requestAnimationFrame(playingAnimation);
      }
    } else {
      setPlaying(false);
      audioPlayer.current.pause();
      cancelAnimationFrame(animationRef.current);
    }
  }

  // to don't repeat
  const changePlayerCurrentTime = () => {
    progressBar.current.style.setProperty("--seek-bar-width", `${progressBar.current.value / duration * 100}%`);
    setCurrentTime(progressBar.current.value)
  }

  // change the progressbar range and update the current time
  const changeRange = () => {
    audioPlayer.current.currentTime = progressBar.current.value;
    changePlayerCurrentTime();
  }

  // animate the progress bar while playing
  const playingAnimation = () => {
    progressBar.current.value = audioPlayer.current.currentTime;
    changePlayerCurrentTime();
    // need to call again to animate the progress
    animationRef.current = requestAnimationFrame(playingAnimation);
  }

  return (
    <div className={styles["player"]}>
      <div className={styles["image"]}>
        <img src={imgLink} className={styles["shadow"]} alt="album shadow" />
        <img src={imgLink} className={styles["album-img"]} alt="album image" />
      </div>
      <div className={styles["data"]}>
        <div className={styles["marquee"]}>
          <p className={styles["name"]}>{title}</p>
        </div>
        <p className={styles["author"]}>
          {author.map((el) => {
            return el.name
          }).join(", ")}
        </p>
      </div>
      <div className={styles["controls"]}>
        <audio src={audioSrc} ref={audioPlayer} preload="metadata"></audio>
        {
          !audioSrc
            ? <div>No audio available 😢</div>
            : <div className={styles["playing-info"]}>
                <div>
                  {calculateTime(currentTime)}
                </div>
                <input type="range" defaultValue="0" className={styles["progress-bar"]} ref={progressBar} onChange={changeRange}/>
                <div>
                  {
                    duration
                    ? calculateTime(duration)
                    : `0:00`
                  }
                </div>
              </div>
        }
        <div className={styles["buttons"]}>
          <button 
            className="prev-btn" 
            onClick={(e) => {
              changeTrack(e);
              togglePlay(e);
            }}
          ><BiSkipPrevious /></button>
          <button className="playPause-btn" onClick={togglePlay}>
            {
              playing
                ? <BsPauseCircleFill />
                : <BsPlayCircleFill />
            }
          </button>
          <button 
            className="next-btn" 
            onClick={(e) => {
              changeTrack(e);
              togglePlay(e);
            }}
          ><BiSkipNext /></button>
        </div>
      </div>
    </div>
  )
}
