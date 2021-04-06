import React, { useState, useEffect } from "react";
import axios from "./axios";

import './Row.css'

const base_url = "https://image.tmdb.org/t/p/original/";

function RowRetry({ title, fetchURL, isLargeRow }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchURL);
      //console.log(request.data.results);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchURL]);

  //console.log(movies);

  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row_posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            className={`row_poster ${isLargeRow && "row_posterLarge"}`} //if its a isLargeRow className is "row_posterLarge"
            src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} //if it has isLargeRow use movie.backdrop_path else use the other one
            alt={movie.name}
          />
        ))}
      </div>
    </div>
  );
}

export default RowRetry;
