import React, {useState, useEffect} from "react";

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

    //This makes sure getAllFavorites is only run once each time the component is loaded
    useEffect(() => {
        getAllFavorites(userEmail);
    }, []);
    
    return (
        <div>
           {allFavorites.map((fav) => (
          <a> {fav} </a>
        ))}
        </div>
    )
}

export default FavoritePage
