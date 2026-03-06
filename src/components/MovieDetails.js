import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Cast from "./Cast";
import AsideDetails from "./AsideDetails";
import Trailer from "./Trailer";
import SimilarMovies from "./SimilarMovies";
import { addFavorite } from '../slices/favoriteSlice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Loader from "./Loader";
import VoteModal from "./VoteModal";
import { UserContext } from '../contexts/UserContext';
import { useContext } from 'react';
import { show, hide } from "../slices/alertSlice";
import CommentsList from "./CommentsList";

export default function MovieDetails(){ 
    const API_KEY = process.env.REACT_APP_API_KEY;
    const API_KEY_YOUTUBE = process.env.REACT_APP_API_KEY_YOUTUBE;
    const JSON_API_URL = process.env.REACT_APP_JSON_API_URL;
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const IMAGE_BASE_URL = process.env.REACT_APP_IMAGE_BASE_URL;
    const dispatch = useDispatch();
    const {user, setUser} = useContext(UserContext);
    const favorites = useSelector((state) => state.favorites.value);

    const {id} = useParams();
    const [movie, setMovie] = useState({});
    const [credits, setCredits] = useState({});
    const [crew, setCrew] = useState([]);
    const [showTrailer, setShowTrailer] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [videoId, setVideoId] = useState(null);
    const [loading, setLoading] = useState(true);
    const principalJobs = ['Director', "Writer", "Screenplay", "Story", "Producer"];

    const trailerContainer = useRef();
    useEffect(() => {

        Promise.all([
            fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`)
            .then(res => res.json()),

            fetch(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`)
            .then(res => res.json())
        ])
            .then(([movieData, creditsData]) => {
            setMovie(movieData);
            setCredits(creditsData);
            setCrew(creditsData.crew.filter(c => principalJobs.includes(c.job)));
            })
            .catch(error => {
            console.error("Erreur API :", error);
            })
            .finally(() => {
                setLoading(false);
            })

}, [id, API_KEY]);

    if (loading) return <Loader/>
    const uniqueCrew = Object.values(
        crew.reduce((acc, cur) => {
            acc[cur.id] ??= cur;
            return acc;
        }, {})
    );

    function favAlreadyExist(){
        if (user){
            if (favorites.find(mv => mv.media.id === movie.id && mv.media_type === "movie" && user.id === mv.userId)){
                return true;
            }else{
                return false;
            }
        }else{
            return false;
        }
    }
    async function addFav(movie) {
        try {
            const res = await axios.post(`${JSON_API_URL}/favorites`, {userId: user.id, media_type: "movie", media: movie});
            dispatch(addFavorite({userId: user.id, media_type: "movie", media: movie}));
        } catch (error) {
            console.log(error);
        }
    }

    function handleTrailer(){
        const query = movie.title + " Movie Officiel Trailer";
        fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=1&q=${query}&key=${API_KEY_YOUTUBE}`)
    .then(res => res.json())
    .then(data => setVideoId(data.items[0].id.videoId))
    .finally(() => {
        trailerContainer.current.style.display = "block";
        setShowTrailer(true);
    });
    }
    function handleClose(){
        setShowTrailer(false);
        trailerContainer.current.style.display = "none";
    }
    function fromMinutesToHours(minutes) {
        const h = Math.floor(minutes / 60);
        const m = minutes % 60;

        return `${h}h${m < 10 ? "0" : ""}${m}min`;
}

    return (
        <div className="movie">
            <div style={{backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path? movie.backdrop_path:movie.poster_path})`}}>
                <a href={movie.homepage}><img src={`https://image.tmdb.org/t/p/original${movie.poster_path? movie.poster_path:movie.backdrop_path}`} alt="poster" loading="lazy"/></a>
                <div className="details">
                    <h2>{movie.title} -{movie.release_date && new Date(movie.release_date).getFullYear()}-</h2>
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
                    <Link className="link" to={`/media-photos/movie/${movie.id}`}><button><i class="fa-solid fa-photo-film"></i></button></Link>
                    <button><i class="fa-solid fa-list"></i></button>
                    <button onClick={() => {
                        if(user){
                            if(!favAlreadyExist()){
                                dispatch(show({type: "success", message: `You are added ${movie.title} to your favorites!`}));
                                addFav({id: movie.id, poster_path: movie.poster_path, title:  movie.title});
                            }else{
                                dispatch(show({type: "error", message: `${movie.title} is already a favourite movie!`}));
                            }
                            setTimeout(() => {
                                dispatch(hide());
                            },2500)
                        }else{
                            dispatch(show({type: "info", message: "Please log in to add a new favorite!"}));
                            setTimeout(() => {
                                dispatch(hide());
                            },2500)
                        }
                    }}><i class="fa-solid fa-heart" style={{color: favAlreadyExist() ?"red":"white"}}></i></button>
                    <button onClick={handleTrailer}><i class="fa-solid fa-play"></i></button>
                    <button onClick={() => {
                        if(user){
                            setShowComments(true);
                        }else{
                            dispatch(show({type: "info", message: "Please log in to view the comments section!"}));
                            setTimeout(() => {
                                dispatch(hide());
                            },2500)
                        }
                    }}><i class="fa-solid fa-comment"></i></button>
                    <Link to={"/movies"} className="link"><button className="btn-return"><i class="fa-solid fa-arrow-left"></i></button></Link>
                </div>
            </div>
            <div className="trailer" ref={trailerContainer}>
                {showTrailer && <Trailer videoId={videoId}/>}
                <button className="close-btn" onClick={handleClose}><i class="fa-solid fa-xmark"></i></button>
            </div>
            {showComments &&  
            <div className="comments-container">
                <CommentsList media={{id: movie.id, type:'movie'}}/>
                <button className="close-btn" onClick={() => setShowComments(false)}><i class="fa-solid fa-xmark"></i></button>
            </div>
            }
            <div>
                <Cast cast={credits.cast || []}/>
                <AsideDetails/>
            </div>
            <SimilarMovies movie_id={id}/>
        </div>
    )
}