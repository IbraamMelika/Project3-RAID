import React, {useState} from "react";

function WatchlistButton({userEmail, media}) {
    const [isDropDown, setDropDown] = useState(false);
    const [isInWatchlistState, setIsInWatchlistState] = useState(false);
    const [getAllWatchlistsstate, setgetAllWatchlistsstate] = useState( [ 'MyMovieList', 'watchlater'] );
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
                // setgetAllWatchlistsstate(watchLists);
                var i;
                var list = [];
                for (i = 0; i < watchLists.length; i++) {
                  list.push(watchLists[i].listName);
                }
                setgetAllWatchlistsstate(list);
                console.log(list);
              });
              
    }
    if (isDropDown !== false){
        getAllWatchlists(userEmail);    
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
            setIsInWatchlistState(isOnWatchlist);
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
            const watchItems = responseData.watchItems;
            console.log(watchItems);
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
    

    // add a state called isInWatchlistState to keep track of whether or not this media is favorited or not
    // Call the fucntion isFavorite. Inside the function, add a line to save the server result to isInWatchlistState
    // If the function is favorited, Display the text "Unfavorite". If it is unfavorited, display "Favorite"
    // when the button is clicked, use the changeFavorite function to tell the server to set it from favorite to unfavorite, or vice versa
    // Then, set the isInWatchlistState here to the opposite of what it is.
    const handleAddtoList = () => {
       setDropDown(!isDropDown);
    };
    const handleAddorRemoveClick = () => {
       addOrRemoveWatchitemFromWatchlist(userEmail, listName, media, !isInWatchlistState);
    //   isWatchitemOnWatchlist(userEmail, listName, media);
       setIsInWatchlistState(!isInWatchlistState);
    };
    const handleCreateList = () => {
        const listName = document.getElementById("CreateWatchlist").value;
        addOrRemoveWatchlist(userEmail, listName, true);
        setDropDown(!isDropDown);
    };

    console.log("Email " + userEmail +" listName " + listName + " Media " + media);
    
    if (isDropDown){
        return (
            <div> 
                <button type="button" onClick={ () => handleAddtoList() }>Close Wactlist</button>
                
                <input
                  placeholder="New Watchlist"
                  id="CreateWatchlist"
                />
                <button type="button" onClick={ () => handleCreateList() }>Create</button>
                <div>
                    {getAllWatchlistsstate.map(index => <button onClick={ () => handleAddorRemoveClick(index) }>{index}</button>)}
                </div>
            </div>
        );
    } 
    else {
        return (
        <div> 
            <button type="button" onClick={ () => handleAddtoList() }>Add to Wactlist</button>
        </div>
        );
    }
}

export default WatchlistButton;

// <div className="watchLists">
//                 {getAllWatchlistsstate.map((square, i) => (
//                   <button class="watchListsNames" key={i} value={square} onClick={() => { handleClick(i); }} ></button>
//                 ))}
//             </div>