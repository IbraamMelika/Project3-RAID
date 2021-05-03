import React, { useState, useEffect } from "react";
import axios from "./axios";

import Page from './Page.js'
import './Row.css'

const base_url = "https://image.tmdb.org/t/p/original/";

function RowRetry({ title, fetchURL, isLargeRow, userEmail }) {
  const [movies, setMovies] = useState([]);
  const [Clicker, setClicker] = useState("");
  const [clickedMovie, setClickedMovie] = useState("");

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchURL);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchURL]);
  
   function handleClick(movieObj) {
    if (Clicker) {
      setClicker('')
      setClickedMovie(movieObj)
    } else {
      setClicker("click")
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
            onClick={ () => handleClick(movie) } // add the onclick for each movie/show
            //*******/
            className={`row_poster ${isLargeRow && "row_posterLarge"}`} //if its a isLargeRow className is "row_posterLarge"
            src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} //if it has isLargeRow use movie.backdrop_path else use the other one
            alt={movie.name}
          />
        ))}

      </div>

      <div className="page_contents">
        {Clicker && <Page movieObj={clickedMovie} userEmail={userEmail} movieID={movie.id}/>}
      </div>
    

    </div>
  );
}

export default RowRetry;
