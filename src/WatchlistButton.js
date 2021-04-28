import React, {useState} from "react";
import './WatchlistButton.css'

function WatchlistButton({userEmail, media}) {
    const [isDropDown, setDropDown] = useState(false);
    const [isInWatchlistState, setIsInWatchlistState] = useState(false);
    const [getAllWatchlistsstate, setgetAllWatchlistsstate] = useState( [ 'Default List', 'MyMovieList', 'watchlater'] );
    const listName = null;
    const [ListTorF, setListTorF] = useState([]);
    
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
    
    const handleAddtoList = () => {
       setDropDown(!isDropDown);
        var listTF = [];
        for (var i = 0; i < getAllWatchlistsstate.length; i++) {
            // const [isInWatchlistState, setIsInWatchlistState] = useState(false);
            isWatchitemOnWatchlist(userEmail, getAllWatchlistsstate[i], media);
            console.log(getAllWatchlistsstate[i], isInWatchlistState);
            listTF.push(isInWatchlistState);
        }
        setListTorF(listTF);
    };
    console.log("ListTorF: ----------", ListTorF);
    const handleAddorRemoveClick = (index) => {
        const listName = index;
        const position = getAllWatchlistsstate.findIndex(x => x ===listName);
        console.log("TorF: ----------", position);
        // addOrRemoveWatchitemFromWatchlist(userEmail, listName, media, !TorF);
        
        
    //   isWatchitemOnWatchlist(userEmail, listName, media);
        // setIsInWatchlistState(!TorF);
    };
    
    const handleCreateList = () => {
        const listName = document.getElementById("CreateWatchlist").value;
        addOrRemoveWatchlist(userEmail, listName, true);
        setDropDown(!isDropDown);
    };
    
    const handledeleteList = (index) => {
        const listName = index;
        addOrRemoveWatchlist(userEmail, listName, false);
        setDropDown(!isDropDown);
    };

    // console.log("Email " + userEmail +" listName " + listName + " Media " + media);
    
    if (isDropDown){
        return (
            <div> 
                <button type="button" onClick={ () => handleAddtoList() }>Close Wactlist</button><br></br>
                
                <input
                  placeholder="New Watchlist"
                  id="CreateWatchlist"
                />
                <button type="button" onClick={ () => handleCreateList() }>Create</button>
                <div>
                    {getAllWatchlistsstate.map(index => 
                    <>
                        <button class="listName" onClick={ () => handleAddorRemoveClick(index) }> { index } </button>
                        <button onClick={ () => handledeleteList(index) }>
                            <img src="trash-sign-red-icon.jpg" width="20" height="24" alt='Trash'></img>
                        </button><br></br>
                    </>
                    )}
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
