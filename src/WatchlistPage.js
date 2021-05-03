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
                // setgetAllWatchlistsstate(watchLists);
                var i;
                var list = [];
                for (i = 0; i < watchLists.length; i++) {
                  list.push(watchLists[i].listName);
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
            // can loop through list and get .media, .dateAdded for each
            const watchItems = responseData.watchItems
            var list = [];
            for (var i = 0; i < watchItems.length; i++) {
              list.push(watchItems[i]['media']);
            }
            setallShow(list);
            console.log('watchItems---------', list)
          });
    }
    // function getdata(){
    //     var dict = Object.create(null);
    //     var shows = [];
    //     for (var i = 0; i < allWatchlists.length; i++) {
    //         getAllWatchitemsOnWatchlist(userEmail, allWatchlists[i]);
    //         for (var j = 0; j < allShow.length; j++) {
    //             shows.push(allShow[j])
    //         }
    //         var currentListName = allWatchlists[i];
    //         dict[currentListName] = shows;
    //         shows = [];
    //     }
    //     console.log(dict);
    //     setallShow(dict);
    // }
    //This makes sure getAllFavorites is only run once each time the component is loaded
    useEffect(() => {
        getAllWatchlists(userEmail);
        getAllWatchitemsOnWatchlist(userEmail, 'Default List');
    });
    
    // getdata();
    console.log("In watchListsPage")
    //TODO: PUT WATCHLIST BELOW FAVORITE
    return (
        <div>
            {allWatchlists.map((listName) => (
              <div>
                  <p style={{color : 'white'}}> {listName} </p>
                  {allShow.map((listName) => (
                      <div>
                          <p style={{color : 'white'}}> {listName} </p>
                          
                      </div>
                    ))}
              </div>
            ))}
            
        </div>
    )
}

export default WatchlistPage
// 81 <FavoriteButton userEmail={userEmail} media={listName}/>

// {allWatchlists.map((listName) => (
//           <div>
//               <p style={{color : 'white'}}> {listName} </p>
              
//           </div>
//         ))}

// {allShow.map((listName) => (
//                   <div>
//                       <p style={{color : 'white'}}> {listName} </p>
                      
//                   </div>
//                 ))}