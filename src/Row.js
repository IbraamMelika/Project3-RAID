import React, { useState, useEffect } from 'react';
import instance from './axios';
import axios from "axios"


function Row({ title, fetchURl }) {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        async function fetchData(){
            const request = await axios.get(fetchURl); //54:51
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchURl])

    console.log(movies);

    return(
        <div className="row">
            <h2>{title}</h2>
            <div className="row_posters">
                {movies.map(movie =>(
                    <img src={movie.poster_path} alt={movie.name}/>
                ))}
                
            </div>
        </div>
    )
}

export default Row