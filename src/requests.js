import App from './App';
const API_KEY =`${process.env.REACT_APP_API_KEY}`;

console.log(API_KEY);
console.log("APP LEVEL", App);
// console.log("searchChangeHandler LEVEL", App.searchChangeHandler.searchTerm);

// const searchValue = (props) => {
//     console.log(props.searchTerm);
// };

// console.log(searchValue);

const requests = {
    // fetchSearch: `/search/multi?api_key=${API_KEY}&language=en-US&query=${searchValue}&page=1&include_adult=false`,
    fetchSearch: `/search/multi?api_key=${API_KEY}&language=en-US&query=avenger&page=1&include_adult=false`,
    fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
    fetchNetlfixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
    fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
    fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
    fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
    fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
    fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
};

export default requests;