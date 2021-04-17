import React, {useState} from "react";

import YouTube from "react-youtube"
import movieTrailer from "movie-trailer"

function Page({name}) {

    const [trailerURL, setTrailerURL] = useState("");

    //const theName = {name}

    const handleClick = (movie) => {
        movieTrailer("avengers" || "")
        .then((url) => {
            const urlParams = new URLSearchParams(new URL(url).search)
            setTrailerURL(urlParams.get("v"))
        })
        .catch((error) => console.log(error))
    }

    handleClick({name})
    console.log(trailerURL)

    //console.log(trailer)

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
            
            <YouTube videoId={"stcATlmqAiA"} opts={opts}/>
        </div>
    )
}

export default Page
