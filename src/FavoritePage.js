import React, {useState} from "react";
import FavoriteButton from "./FavoriteButton.js";

function FavoritePage({userEmail}) {
    const [allFavorites, setAllFavorites] = useState([]);
    const [hasFetchedFavorites, setHasFetchedFavorites] = useState(false);
    
    function getAllFavorites(email){
      email = encodeURIComponent(email);
      const url = "/api/v1/favorite?email=" + email;
      
      fetch(url, {
          method: 'GET',
           headers: {
              'Content-Type': 'application/json'
             },
           })
         .then(response => {
            return response.json();
          }).then(responseData => {
            const favoritesList = responseData.allFavorites
            setAllFavorites(favoritesList);
          });
}

    //Ok so the useEffect doens't actually work, so I did this
    if (!hasFetchedFavorites){
        getAllFavorites(userEmail);
    }
    setHasFetchedFavorites(true);
    
    //TODO: PUT WATCHLIST BELOW FAVORITE
    return (
        <div>
           {allFavorites.map((fav) => (
          <div>
              <p style={{color : 'white'}}> {fav} </p>
              <FavoriteButton userEmail={userEmail} media={fav}/>
          </div>
        ))}
        </div>
    )
}

export default FavoritePage
