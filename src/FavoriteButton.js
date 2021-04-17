import React, {useState} from "react";

import YouTube from "react-youtube"
import movieTrailer from "movie-trailer"
import changeFavorite from "./App.js"

function FavoriteButton({email, media}) {
    function isFavorite(email, media){
      email = encodeURIComponent(email);
      media = encodeURIComponent(media);
      
      const url = "/api/v1/favorite?email=" + email + "&media=" + media;
      
      fetch(url, {
          method: 'GET',
           headers: {
              'Content-Type': 'application/json'
             }
           })
         .then(response => {
            return response.json();
          }).then(responseData => {
            const isFavorite = responseData.isFavorite;
            // Here save whether or not this thing is favorited to the state
            console.log("Is Favorite: " + isFavorite);
          });
}

    
    // add a state to keep track of whether or not this media  is favorited or not
    // If the function is favorited, Display the text "Unfavorite. If it is unfavorited, display "Favorite"
    //when the button is clicked, use the chabgeFavorite function to tell the server to set it from favorite to unfavorite, or vice versa
    // Then, set the state here that keeps track of whether or not the thing is favorited to the opposite of what it is.
    
    const handleClick = (something) => {
       
    }

    console.log("Email " + email + " Media " + media);
    
    return (
        <div>
           
        </div>
    )
}

export default FavoriteButton
