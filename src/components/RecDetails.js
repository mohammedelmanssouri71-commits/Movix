import { useEffect, useState, useRef } from "react";
import Trailer from "./Trailer";
import Loader from "./Loader";
import { Link } from "react-router-dom";


export default function RecDetails({media, type, onStart, onStop}){
    const API_KEY = process.env.REACT_APP_API_KEY;
    const API_KEY_YOUTUBE = process.env.REACT_APP_API_KEY_YOUTUBE;
    const BASE_URL = process.env.REACT_APP_BASE_URL;

    const [videoId, setVideoId] = useState(null);
    const [show, setShow] = useState(false);
    const trailerContainer = useRef();
    const query = media.title || media.name + " Officiel Trailer";
    // useEffect(() => {
    //     if(videoId) {
    //         fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=1&q=${query}&key=${API_KEY_YOUTUBE}`)
    //         .then(res => res.json())
    //         .then(data => setVideoId(data.items[0].id.videoId))
    //     }
    // },[])

    function displayVideo(){
        fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=1&q=${query}&key=${API_KEY_YOUTUBE}`)
            .then(res => res.json())
            .then(data => setVideoId(data.items[0].id.videoId))
    }

    function showTrailer(display){
        trailerContainer.current.style.display = display;
        setShow(show => !show);
        onStop();
    }

    // if (!videoId) return <Loader/>;

    return (
        <div className="rec-details">
            <img src={`https://image.tmdb.org/t/p/original${media.backdrop_path}`} alt="backdrop" loading="lazy"/>
            <div>
                <div>
                    <h2>{media.name || media.title}</h2>
                    <p>{media.overview.slice(0,50)}...<Link to={`/${type}-details/${media.id}`}className="link">Show More</Link></p>
                    <div className="rating">
                        <i class="fa-solid fa-star"></i>
                        <div>
                            <p><span className="logo">TMDB</span>Rating</p>
                            <span className="note">{media.vote_average.toFixed(1)}/10</span>
                        </div>
                    </div>
                </div>
                <div>
                    <button title="watch Trailer" onClick={() => {
                        displayVideo();
                        showTrailer("block")
                    }}><i class="fa-solid fa-play"></i></button>
                    <div className="trailer" ref={trailerContainer}>
                        <button onClick={() => {
                            showTrailer("none");
                            onStart();
                        }}><i class="fa-solid fa-xmark"></i></button>
                        {show && <Trailer videoId={videoId}/>}
                    </div>
                </div>
            </div>
        </div>
    )
}