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
            // can loop through list and get .media, .dateAdded for each
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
    useEffect(() => {getAllWatchlists(userEmail)}, []);
    //TODO: PUT WATCHLIST BELOW FAVORITE
    return (
        <div>
            <h2 style={{color : 'white'}}>Your WatchList's:</h2>
            {allWatchlists.map((listName) => (
              <div>
                    <p style={{color : 'white'}}> {listName} </p>
                    {allShow.map((showName) => (
                      <div>
                          <li style={{color : 'white'}}> {showName} </li>
                      </div>
                    ))}
              </div>
            ))}
        </div>
    );
}

export default WatchlistPage;
// 81 <FavoriteButton userEmail={userEmail} media={listName}/>

// {allWatchlists.map((listName) => (
//           <div>
//               <p style={{color : 'white'}}> {listName} </p>
              
//           </div>
//         ))}

                //   {allShow.map((showName) => (
                //       <div>
                //           <li style={{color : 'white'}}> {showName} </li>
                //       </div>
                //     ))}