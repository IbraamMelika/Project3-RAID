import React, {useState} from "react";
import FavoriteButton from "./FavoriteButton.js"
import WatchlistButton from "./WatchlistButton.js"
import YouTube from "react-youtube"
import movieTrailer from "movie-trailer"

function Page({movieObj, userEmail}) {
    const [trailerURL, setTrailerURL] = useState("");

    const name = movieObj?.title || movieObj?.name || movieObj?.original_name;

    const handleClick = (movie) => {
        movieTrailer(movie || "")
        .then((url) => {
            const urlParams = new URLSearchParams(new URL(url).search)
            setTrailerURL(urlParams.get("v"))
        })
        .catch((error) => console.log(error))
    }

    handleClick(name);
    console.log(movieObj);

    //you need this for the youtube video size
    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
          autoplay: 1,
        }
      }

    return (
        <div>
            <h1>
            This is the page for {name}
            </h1>
            
            <h3> {movieObj.overview} </h3>
            <p>Released {movieObj?.first_air_date || movieObj?.release_date}</p>
            
            <FavoriteButton userEmail={userEmail} media={name}/>
            <WatchlistButton userEmail={userEmail} media={name}/>
            
            <YouTube videoId={trailerURL} opts={opts}/>
        </div>
    )
}

export default Page
