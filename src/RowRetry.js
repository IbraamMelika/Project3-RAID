import React, { useState, useEffect } from "react";
import axios from "./axios";

import Page from './Page.js'
import './Row.css'
import YouTube from "react-youtube"
import movieTrailer from "movie-trailer"

const base_url = "https://image.tmdb.org/t/p/original/";

function RowRetry({ title, fetchURL, isLargeRow }) {
  const [movies, setMovies] = useState([]);

  const [Clicker, setClicker] = useState("");

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchURL);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchURL]);

  //you need this for the youtube video size
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    }
  }

  const handleClick = (movie) => {
    if (Clicker) {
      setClicker('')
    } else {
      setClicker("gMAwNk1m4YQ")
    }
  }


  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row_posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            //********/
            onClick={() => handleClick(movie)} // add the onclick for each movie/show
            //*******/
            className={`row_poster ${isLargeRow && "row_posterLarge"}`} //if its a isLargeRow className is "row_posterLarge"
            src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} //if it has isLargeRow use movie.backdrop_path else use the other one
            alt={movie.name}
          />
          
        ))}
      </div>

      {Clicker && <Page name={movie.name}/>}

    </div>
  );
}

export default RowRetry;
