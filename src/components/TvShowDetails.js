import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TvShowCard from "./TvShowCard";
import { Link } from "react-router-dom";
import Trailer from "./Trailer";
import Cast from "./Cast";
import AsideDetails from "./AsideDetails";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite } from '../slices/favoriteSlice';
import axios from "axios";
import { UserContext } from '../contexts/UserContext';
import { useContext } from 'react';
import Loader from "./Loader";
import { show, hide } from "../slices/alertSlice";
import CommentsList from "./CommentsList";


export default function TvShowDetails(){
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const JSON_API_URL = process.env.REACT_APP_JSON_API_URL;
    const API_KEY = process.env.REACT_APP_API_KEY;
    const API_KEY_YOUTUBE = process.env.REACT_APP_API_KEY_YOUTUBE; 

    const {user, setUser} = useContext(UserContext);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const favorites = useSelector(state => state.favorites.value);

    const {id} = useParams();
    const [tvShow, setTvShow] = useState(null);
    const [showTrailer, setShowTrailer] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [videoId, setVideoId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [uniqueCrew, setUniqueCrew] = useState(null);
    const [similarTvShows, setSimilarTvShows] = useState(null);
    const principalJobs = ['Director', "Writer", "Screenplay", "Story", "Producer"];
    const trailerContainer = useRef();

    useEffect(() => {
        fetch(`${BASE_URL}/tv/${id}?api_key=${API_KEY}&append_to_response=credits,similar`)
        .then(res => {
            return res.json();
        })
        .then(data => {
            setTvShow(data);
            setUniqueCrew(data.credits.crew.filter(c => principalJobs.includes(c.job)));
            setSimilarTvShows(data.similar.results);
            console.log(data);
        })
        .finally(() => {
            setLoading(false);
        })
    },[id, API_KEY])
    if (loading) return <Loader/>;

    const similarTvShowsList = similarTvShows.map(s => <TvShowCard tv={s} key={s.id}/>) 


    function favAlreadyExist(){
        if (user){
            if (favorites.find(md => md.media.id === tvShow.id && md.media_type === "tv" && md.userId === user.id)){
                return true;
            }else{
                return false;
            }
        }else{
            return false;
        }
    }
    async function addFav(tv) {
        try {
            const res = await axios.post(`${JSON_API_URL}/favorites`, {userId: user.id, media_type: "tv", media: tv});
            dispatch(addFavorite({userId: user.id, media_type: "tv", media: tv}));
        } catch (error) {
            console.log(error);
        }
    }

    function handleTrailer(){
        const query = tvShow.name + " Tv Show Officiel Trailer";
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

    return (
        <div className="movie">
            <div style={{backgroundImage: `url(https://image.tmdb.org/t/p/original${tvShow.backdrop_path? tvShow.backdrop_path:tvShow.poster_path})`}}>
                <a href={tvShow.homepage}><img src={`https://image.tmdb.org/t/p/original${tvShow.poster_path? tvShow.poster_path:tvShow.backdrop_path}`} alt="poster" loading="lazy"/></a>
                <div className="details">
                    <h2>{tvShow.name} -{tvShow.first_air_date && new Date(tvShow.first_air_date).getFullYear()}-</h2>
                    <div className="general-infos">
                        <div className="labels">
                            {tvShow.genres && tvShow.genres.map((g,index) => <span key={index} className="label">{g.name}</span>)}
                        </div>
                        <span></span>
                        <p>{tvShow.seasons.length} seasons</p>
                        <span></span>
                        <p>{tvShow.first_air_date} <span className="original-country">{tvShow.origin_country && tvShow.origin_country[0]}</span></p>
                    </div>
                    <div className="vote">
                        <div>
                            <div style={{background: `conic-gradient(violet 0% ${tvShow.vote_average * 10}%, #e0e0e0 ${tvShow.vote_average * 10}% 100%)`}}>
                                <p>{(tvShow.vote_average * 10).toFixed(1)}%</p>
                            </div>
                            <p>Vote Average</p>
                        </div>
                        <button>What's about you?</button>
                    </div>
                    <cite className="tagline">{tvShow.tagline}</cite>
                    <div className="synopsis">
                        <h3>Synopsis</h3>
                        <p>{tvShow.overview}</p>
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
                    <Link className="link" to={`/media-photos/tv/${tvShow.id}`}><button><i class="fa-solid fa-photo-film"></i></button></Link>
                    <button><i class="fa-solid fa-list"></i></button>
                    <button onClick={() => {
                        if(user){
                            if(!favAlreadyExist()){
                                dispatch(show({type: "success", message: `You are added ${tvShow.name} to your favorites!`}));
                                addFav({id: tvShow.id, poster_path: tvShow.poster_path, name: tvShow.name });
                            }else{
                                dispatch(show({type: "error", message: `${tvShow.name} is already a favourite TV Show!`}));
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
                    <Link to={"/tv-shows"} className="link"><button className="btn-return"><i class="fa-solid fa-arrow-left"></i></button></Link>
                </div>
            </div>
            <div className="trailer" ref={trailerContainer}>
                {showTrailer && <Trailer videoId={videoId}/>}
                <button className="close-btn" onClick={handleClose}><i class="fa-solid fa-xmark"></i></button>
            </div>
            {showComments &&  
            <div className="comments-container">
                <CommentsList media={{id: tvShow.id, type:'tv'}}/>
                <button className="close-btn" onClick={() => setShowComments(false)}><i class="fa-solid fa-xmark"></i></button>
            </div>
            }
            <div>
                <Cast cast={tvShow.credits.cast || []}/>
                <AsideDetails/>
            </div>
            <div className="similar-movies">
                <h2>Similar Tv Shows</h2>
                <div>
                    {similarTvShowsList}
                </div>
            </div>
        </div>
    )
}