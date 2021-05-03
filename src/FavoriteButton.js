import React, {useState, useEffect} from "react";

function FavoriteButton({userEmail, media}) {
    const [isFavoriteState, setFavoriteState] = useState(false);
    
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
            setFavoriteState(isFavorite);
            console.log("Is Favorite: " + isFavorite);
          });
    }
    
    function changeFavorite(email, media, willBeFavorite){
      /* willBeFavorite is a boolean value */
      if (media === ""){
          console.log("EMPTY NAME!!!")
          return;
      }
      
      email = encodeURIComponent(email);
      media = encodeURIComponent(media);
      
      const url = "/api/v1/favorite";
      const data = JSON.stringify({'email': email, 'media': media, 'willBeFavorite': willBeFavorite});
      
      fetch(url, {
          method: 'POST',
           headers: {
              'Content-Type': 'application/json'
             },
             body: data
           })
         .then(response => {
            return response.json();
          }).then(responseData => {
            console.log(responseData);
          });
    }

    useEffect(() => {
        console.log("Fetching isFavorite");
        isFavorite(userEmail, media);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    

    // add a state called isFavoriteState to keep track of whether or not this media  is favorited or not
    // Call the fucntion isFavorite. Inside the function, add a line to save the server result to isFavoriteState
    // If the function is favorited, Display the text "Unfavorite". If it is unfavorited, display "Favorite"
    // when the button is clicked, use the changeFavorite function to tell the server to set it from favorite to unfavorite, or vice versa
    // Then, set the isFavoriteState here to the opposite of what it is.
    
    const handleClick = () => {
       changeFavorite(userEmail, media, !isFavoriteState);
       
       setFavoriteState(!isFavoriteState);
    }

    console.log("Email " + userEmail + " Media " + media);
    
    if (isFavoriteState){
        return (<div> <button type="button" onClick={ () => handleClick() }>Unfavorite</button>  </div>)
    } else {
        return (<div> <button type="button" onClick={ () => handleClick() }>Favorite</button> </div>)
    }
}

export default FavoriteButton
