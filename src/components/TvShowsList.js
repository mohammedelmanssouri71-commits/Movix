import { useEffect, useState } from "react";
        import MovieCard from "./MovieCard";

export default function TvShowsList(){
    const API_KEY = process.env.REACT_APP_API_KEY;
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const [category, setCategory] = useState("top_rated");
        
    const [movies, setMovies] = useState([]); 
    useEffect(() => {
        fetch(`${BASE_URL}/tv/${category}?api_key=${API_KEY}`)
                .then(response => response.json())
                .then(data => {
                    setMovies(data.results); 
                })
                .catch(error => console.error('Erreur :', error));        
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
                        <option value={"airing_today"}>Airing Today</option>
                    </select>
                    <h2>{category.toUpperCase().replaceAll("_", " ")}</h2>
                    <div>
                        {moviesList}
                    </div>
                </div>
            )
        }