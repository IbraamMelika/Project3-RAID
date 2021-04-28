import React, {useState} from "react";

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
    getAllFavorites(userEmail);
    
    return (
        <div>
        <p> WOOOOOOOOOOOOOOW </p>
           {allFavorites.map((fav) => (
          <a> {fav} </a>
        ))}
        </div>
    )
}

export default FavoritePage
