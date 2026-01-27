import { Link } from "react-router-dom";


export default function SearchCard({movie}){
    return (
        <div className="search-card">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path? movie.poster_path:movie.backdrop_path}`} alt="poster" loading="lazy"/>
            <div>
                <div>
                    <h2><Link className="link" to={`/movies-details/${movie.id}`}>{movie.title}</Link></h2>
                    <span>{movie.release_date}</span>
                </div>
                <p>{movie.overview}</p>
            </div>
        </div>
    )
}