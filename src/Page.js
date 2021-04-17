import React, {useState} from "react";

import YouTube from "react-youtube"
import movieTrailer from "movie-trailer"

function Page({name}) {
    const [trailerURL, setTrailerURL] = useState("");

    //const theName = {name}

    const handleClick = (movie) => {
        movieTrailer(movie || "")
        .then((url) => {
            const urlParams = new URLSearchParams(new URL(url).search)
            setTrailerURL(urlParams.get("v"))
        })
        .catch((error) => console.log(error))
    }

    var nameStringy = JSON.stringify({name})
    var obj = JSON.parse(nameStringy)
    var values = Object.values(obj)
    //values [0] is the name of the movie
    

    handleClick(values[0])
    //console.log(trailerURL)
    console.log(values[0])

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
            
            <YouTube videoId={trailerURL} opts={opts}/>
        </div>
    )
}

export default Page
