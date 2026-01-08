import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";


export default function MoviesList(){
    const apiKey = '078720dca783d28602bfaaaff5501bdf';
    const [category, setCategory] = useState("top_rated");

    const [movies, setMovies] = useState([]); 
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${category}?api_key=${apiKey}`)
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
                <option value={"upcoming"}>Upcoming</option>
            </select>
            <h2>{category.toUpperCase().replaceAll("_", " ")}</h2>
            <div>
                {moviesList}
            </div>
        </div>
    )
}