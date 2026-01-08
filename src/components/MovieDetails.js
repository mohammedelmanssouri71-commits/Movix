import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function MovieDetails(){
    const {id} = useParams();
    const API_KEY = '078720dca783d28602bfaaaff5501bdf';
    const [movie, setMovie] = useState({});
    let genres = [];
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
        .then(res => res.json())
        .then(data => {
            setMovie(data);
        })
    },[])
    useEffect(() => {
        console.log(movie);
    }, [movie])
    return (
        <div>
            <div>
                <a href={movie.homepage}><img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}.`} alt="poster" loading="lazy"/></a>
                <div>
                    <h2>{movie.title} {new Date(movie.release_date).getFullYear()}</h2>
                    <p>{movie.tagline}</p>
                    <div>
                        <h3>Synopsis</h3>
                        <p>{movie.overview}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}