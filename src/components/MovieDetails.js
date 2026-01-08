import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function MovieDetails(){
    const {id} = useParams();
    const API_KEY = '078720dca783d28602bfaaaff5501bdf';
    const [movie, setMovie] = useState({});
    // const [genres, setGenres] = useState([]);
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
        .then(res => res.json())
        .then(data => {
            setMovie(data);
            // setGenres(data.genres.map(genre => genre.name))
        })
    },[])
    useEffect(() => {
        // console.log(movie);
        // console.log(movie.genres)
    }, [movie])
    return (
        <div className="movie">
            <div>
                <a href={movie.homepage}><img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}.`} alt="poster" loading="lazy"/></a>
                <div>
                    <h2>{movie.title} {new Date(movie.release_date).getFullYear()}</h2>
                    <div>
                        {/* {genres.map((g,index) => <span key={index}>{g.name}</span>)} */}
                    </div>
                    <cite>{movie.tagline}</cite>
                    <div>
                        <h3>Synopsis</h3>
                        <p>{movie.overview}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}