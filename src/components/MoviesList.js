import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import logger from '../utils/logger';


export default function MoviesList(){
    const API_KEY = process.env.REACT_APP_API_KEY;
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const [category, setCategory] = useState("top_rated");

    const [movies, setMovies] = useState([]); 

    function getMovies(){
        const url = `${BASE_URL}/movie/${encodeURIComponent(category)}?api_key=${encodeURIComponent(API_KEY)}`;
        fetch(url)
        .then(response => response.json())
        .then(data => {
            setMovies(data.results); 
            logger.debug("Films récupérés", data);
        })
        .catch(error => logger.error("Erreur de récupération", error));
    }
    useEffect(() => {
        logger.info("Récupération des films...");
        getMovies();
    },[category])
    function handleCat(e){
        setCategory(e.target.value);
    }
    const moviesList = movies.map(m => <MovieCard movie={m} key={m.id}/>)
    return (
        <div className="movie-list">
            <select onChange={handleCat}>
                <option value={"top_rated"}>Top rated</option>
                <option value={"popular"}>Popular</option>
                <option value={"upcoming"}>Upcoming</option>
                <option value={"now_playing"}>Now Playing</option>
            </select>
            <h2>{category.toUpperCase().replaceAll("_", " ")}</h2>
            <div>
                {moviesList}
            </div>
        </div>
    )
}