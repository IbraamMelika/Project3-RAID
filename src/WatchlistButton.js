import React, {useState} from "react";

function WatchlistButton({userEmail, media}) {
    const [isInWatchlistState, setInWatchlistState] = useState(false);
    const [isGetWacthliststate, setGetWacthliststate] = useState(null);
    const listName = "MyMovieList";
    
    function getAllWatchlists(email){
          email = encodeURIComponent(email);
          const url = "/api/v1/watchlist?email=" + email;
          
          fetch(url, {
              method: 'GET',
               headers: {
                  'Content-Type': 'application/json'
                 },
               })
             .then(response => {
                return response.json();
              }).then(responseData => {
                // can loop through this list and get .listName, .dateCreated
                const watchLists = responseData.watchLists.watchlists;
                // setGetWacthliststate(watchLists);
                var i;
                var list = [];
                for (i = 0; i < watchLists.length; i++) {
                  list.push(watchLists[i].listName);
                }
                console.log(list);
                // setGetWacthliststate(list);
              });
              
    }
    
    function isWatchitemOnWatchlist(email, listName, media){
        email = encodeURIComponent(email);
        listName = encodeURIComponent(listName);
        media = encodeURIComponent(media);
        
        const url = "/api/v1/watchitem?email=" + email + "&media=" + media + "&listName=" + listName;
        
        fetch(url, {
          method: 'GET',
           headers: {
              'Content-Type': 'application/json'
             }
           })
         .then(response => {
            return response.json();
          }).then(responseData => {
            const isOnWatchlist = responseData.isOnWatchlist;
            // Here save whether or not this thing is favorited to the state
            setInWatchlistState(isOnWatchlist);
            console.log("Is On List: " + isOnWatchlist);
          });
    }
    
    function addOrRemoveWatchlist(email, listName, addOrRemove){
      /* addOrRemove is a boolean value True for add False for remove*/
      
      email = encodeURIComponent(email);
      listName = encodeURIComponent(listName);
      
      const url = "/api/v1/watchlist";
      const data = JSON.stringify({'email': email, 'listName': listName, 'addOrRemove': addOrRemove});
      
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
    
    function getAllWatchitemsOnWatchlist(email, listName){
      email = encodeURIComponent(email);
      listName = encodeURIComponent(listName);
      const url = "/api/v1/watchitem?email=" + email + "&listName=" + listName;
      
       fetch(url, {
          method: 'GET',
           headers: {
              'Content-Type': 'application/json'
             },
           })
         .then(response => {
            return response.json();
          }).then(responseData => {
            // can loop through list and get .media, .dateAdded for each
            const watchItems = responseData.watchItems
            console.log(watchItems)
          });
    }
    
    function addOrRemoveWatchitemFromWatchlist(email, listName, media, addOrRemove){
      /* addOrRemove is a boolean value True for add False for remove*/
      
      email = encodeURIComponent(email);
      listName = encodeURIComponent(listName);
      media = encodeURIComponent(media);
      
      const url = "/api/v1/watchitem";
      const data = JSON.stringify({'email': email, 'media': media, 'listName': listName, 'addOrRemove': addOrRemove});
      
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

    console.log("Fetching isInWatchlist");
    isWatchitemOnWatchlist(userEmail, listName, media);
    getAllWatchlists(userEmail);

    // add a state called isInWatchlistState to keep track of whether or not this media is favorited or not
    // Call the fucntion isFavorite. Inside the function, add a line to save the server result to isInWatchlistState
    // If the function is favorited, Display the text "Unfavorite". If it is unfavorited, display "Favorite"
    // when the button is clicked, use the changeFavorite function to tell the server to set it from favorite to unfavorite, or vice versa
    // Then, set the isInWatchlistState here to the opposite of what it is.
    
    const handleClick = () => {
       addOrRemoveWatchitemFromWatchlist(userEmail, listName, media, !isInWatchlistState);
    //   isWatchitemOnWatchlist(userEmail, listName, media);
       setInWatchlistState(!isInWatchlistState);
    };
    const handleCreateClick = () => {
        const listName = document.getElementById("CreateWatchlist").value;
        addOrRemoveWatchlist(userEmail, listName, true);
        // setInWatchlistState(!isInWatchlistState);
    };

    console.log("Email " + userEmail +" listName " + listName + " Media " + media);
    
    if (isInWatchlistState){
        return (<div> <button type="button" onClick={ () => handleClick() }>Remove from Wactlist</button>  </div>);
    } 
    else {
        return (
        <div> 
            <button type="button" onClick={ () => handleClick() }>Add to Wactlist</button> 

            <input
              placeholder="New Watchlist"
              id="CreateWatchlist"
            />
            <button type="button" onClick={ () => handleCreateClick() }>Create</button>
        </div>
        )
    }
}

export default WatchlistButton
