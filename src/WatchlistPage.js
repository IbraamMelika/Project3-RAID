import React, {useState, useEffect} from "react";
// import WatchlistButton from "./WatchlistButton.js";

function WatchlistPage({userEmail}) {
    const [allWatchlists, setAllWatchlists] = useState([]);
    const [allShow, setallShow] = useState([]);

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
            const watchLists = responseData.watchLists.watchlists;
                var i;
                var list = [];
                for (i = 0; i < watchLists.length; i++) {
                    let nameOfList = watchLists[i].listName;
                    list.push(nameOfList);
                    getAllWatchitemsOnWatchlist(email, watchLists[i].listName);
                }
                setAllWatchlists(list);
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
            // can loop through list and get .listName, .media, .dateAdded for each
            const watchItems = responseData.watchItems;
            // console.log(watchItems);
            var list = [];
            for (var i = 0; i < watchItems.length; i++) {
              list.push(watchItems[i]['media']);
            }
            setallShow(list);
            console.log('watchItems---------', list);
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
            // console.log(responseData);
          });
    }
    const handledeleteList = (index, index2) => {
        const listName = index;
        const media = index2;
        addOrRemoveWatchitemFromWatchlist(userEmail, listName, media, false);
    };
    useEffect(() => {
        getAllWatchlists(userEmail);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    //TODO: PUT WATCHLIST BELOW FAVORITE
    return (
        <div>
            <h2 style={{color : 'white'}}>Your WatchLists:</h2>
            {allWatchlists.map((listName) => (
              <div>
                    <h3 style={{color : 'white'}}> {listName} </h3>
                    {allShow.map((showName) => (
                      <div>
                          <li style={{color : 'white'}}> {showName} </li>
                          <button onClick={ () => handledeleteList(listName, showName) }>
                            <img src="trash-sign-red-icon.jpg" width="20" height="24" alt='Trash'></img>
                          </button><br></br>
                      </div>
                    ))}
              </div>
            ))}
        </div>
    );
}

export default WatchlistPage;
