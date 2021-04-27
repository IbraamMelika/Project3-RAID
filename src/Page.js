import React, {useState} from "react";
import FavoriteButton from "./FavoriteButton.js"
import Comments from "./Comments.js"
import YouTube from "react-youtube"
import movieTrailer from "movie-trailer"

function Page({name, userEmail}) {
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
            
            <FavoriteButton userEmail={userEmail} media={name}/>
            
            <YouTube videoId={trailerURL} opts={opts}/>
            
            <div className="comments_section">
                <Comments name={name} userEmail={userEmail}/>
            </div>
        </div>
        
    )
}

export default Page
