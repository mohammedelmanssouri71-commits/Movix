import { useEffect, useState } from "react"
import MovieCard from "./MovieCard";

export default function SimilarMovies({movie_id}){
    const API_KEY = process.env.REACT_APP_API_KEY;
    const [similarMovies, setSimilarMovies] = useState([]);
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${movie_id}/similar?api_key=${API_KEY}`)
        .then(res => res.json())
        .then(data => setSimilarMovies(data.results.slice(0,10)));
    },[movie_id])
    const moviesList = similarMovies.map(m => <MovieCard movie={m} key={m.id}/>)
    return (
        <div className="similar-movies">
            <h2>Similar Movies</h2>
            <div>
                {moviesList}
            </div>
        </div>
    )
}