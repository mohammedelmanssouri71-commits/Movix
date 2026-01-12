import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cast from "./Cast";
import AsideDetails from "./AsideDetails";

export default function MovieDetails(){
    const {id} = useParams();
    const API_KEY = '078720dca783d28602bfaaaff5501bdf';
    const [movie, setMovie] = useState({});
    const [credits, setCredits] = useState({});
    const [crew, setCrew] = useState([]);
    const principalJobs = ['Director', "Writer", "Screenplay", "Story", "Producer"];
    // const [genres, setGenres] = useState([]);
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
        .then(res => res.json())
        .then(data => {
            setMovie(data);
        })
    },[])
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`)
        .then(res => res.json())
        .then(data => {
            setCredits(data);
            setCrew(data.crew.filter(c => principalJobs.includes(c.job)))
        })
    })
    useEffect(() => {
        // console.log(movie);
        // console.log(movie.genres)
    }, [movie])

    const uniqueCrew = Object.values(
        crew.reduce((acc, cur) => {
            acc[cur.id] ??= cur;
            return acc;
        }, {})
        );
    function fromMinutesToHours(minutes) {
        const h = Math.floor(minutes / 60);
        const m = minutes % 60;

        return `${h}h${m < 10 ? "0" : ""}${m}min`;
}

    return (
        <div className="movie">
            <div style={{backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.backdrop_path})`}}>
                <a href={movie.homepage}><img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}.`} alt="poster" loading="lazy"/></a>
                <div className="details">
                    <h2>{movie.title} -{new Date(movie.release_date).getFullYear()}-</h2>
                    <div className="general-infos">
                        <div className="labels">
                            {movie.genres && movie.genres.map((g,index) => <span key={index} className="label">{g.name}</span>)}
                        </div>
                        <span></span>
                        <p>{fromMinutesToHours(movie.runtime)}</p>
                        <span></span>
                        <p>{movie.release_date} <span className="original-country">{movie.origin_country && movie.origin_country[0]}</span></p>
                    </div>
                    <div className="vote">
                        <div>
                            <div style={{background: `conic-gradient(violet 0% ${movie.vote_average * 10}%, #e0e0e0 ${movie.vote_average * 10}% 100%)`}}>
                                <p>{(movie.vote_average * 10).toFixed(1)}%</p>
                            </div>
                            <p>Vote Average</p>
                        </div>
                        <button>What's about you?</button>
                    </div>
                    <cite className="tagline">{movie.tagline}</cite>
                    <div className="synopsis">
                        <h3>Synopsis</h3>
                        <p>{movie.overview}</p>
                    </div>
                    <div className="crew">
                        {uniqueCrew.map(c => {
                            return (
                                <div key={c.credit_id}>
                                    <h3>{c.name}</h3>
                                    <p>{c.job}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="actions">
                    <button><i class="fa-solid fa-list"></i></button>
                    <button><i class="fa-solid fa-heart"></i></button>
                    <button><i class="fa-solid fa-play"></i></button>
                </div>
                <button className="btn-return"><Link to={"/movies"} className="link"><i class="fa-solid fa-arrow-left"></i>All movies</Link></button>
            </div>
            <div>
                <Cast cast={credits.cast}/>
                <AsideDetails/>
            </div>
        </div>
    )
}