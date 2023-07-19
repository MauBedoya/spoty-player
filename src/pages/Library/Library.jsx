import React, { useEffect, useState } from "react";
import { api, spotifyApi } from "../../helpers/spotify";
import styles from "./Library.module.css";
import PlaylistCard from "../../components/PlaylistCard/PlaylistCard";
import Loader from "../../components/Loader";

export default function Library() {
  const [playlists, setPlaylists] = useState([]);
  const [nextPage, setNextPage] = useState();
  const [loader, setLoader] = useState(true);

  // consume first 15 playlists
  useEffect(() => {
    spotifyApi(api.USER_PLAYLISTS, (data) => {
      setPlaylists(data.items);
      setNextPage(data.next);
      setLoader(false);
    });
  }, []);

  // use "next" endpoint to add 15 more playlists
  const handleScroll = (e) => {
    let { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollTop + clientHeight + 1 >= scrollHeight) {
      if (nextPage && playlists.length <= 100) {
        setLoader(true)
        spotifyApi(nextPage, (data) => {
          setPlaylists((prevPlaylist) => [...prevPlaylist, ...data.items])
          setNextPage(data.next);
          setLoader(false)
        })
      }
    }
  };

  return (
    <div className={styles["fluid-grid"]} onScroll={handleScroll}>
      {playlists.map((el, i) => {
        return (
          <PlaylistCard
            name={el.name}
            img={el.images[0]?.url ? el.images[0].url : "/albumPlaceholder.png"}
            tracks={el.tracks.total}
            owner={el.owner.display_name}
            key={i}
          />
        );
      })}
      {loader
        ? <Loader />
        : null
      }
    </div>
  );
}
