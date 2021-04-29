import React, {useState, useEffect} from "react";
import FavoriteButton from "./FavoriteButton.js";

function FavoritePage({userEmail}) {
    const [allFavorites, setAllFavorites] = useState([]);
    
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

    
    useEffect(() => {
        getAllFavorites(userEmail);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    
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
