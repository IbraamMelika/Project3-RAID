import React, {useState} from "react";
import changeFavorite from "./App.js"

function FavoriteButton({userEmail, media}) {
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

    
    // add a state called isFavoriteState to keep track of whether or not this media  is favorited or not
    // Call the fucntion isFavorite. Inside the function, add a line to save the server result to isFavoriteState
    // If the function is favorited, Display the text "Unfavorite". If it is unfavorited, display "Favorite"
    // when the button is clicked, use the changeFavorite function to tell the server to set it from favorite to unfavorite, or vice versa
    // Then, set the isFavoriteState here to the opposite of what it is.
    
    const handleClick = (something) => {
       
    }

    console.log("Email " + userEmail + " Media " + media);
    
    return (
        <div>
         
        </div>
    )
}

export default FavoriteButton
