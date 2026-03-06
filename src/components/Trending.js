import { useEffect, useState } from "react"
import MovieCard from "./MovieCard";
import TvShowCard from "./TvShowCard";


export default function Trending({time_window}){
    const API_KEY = process.env.REACT_APP_API_KEY;
    const API_KEY_YOUTUBE = process.env.REACT_APP_API_KEY_YOUTUBE;
    const JSON_API_URL = process.env.REACT_APP_JSON_API_URL;
    const BASE_URL = process.env.REACT_APP_BASE_URL;

    const [mediaTrend, setMediaTrend] = useState([]);

    useEffect(() => {
        fetch(`${BASE_URL}/trending/all/${time_window}?api_key=${API_KEY}`)
        .then(res => res.json())
        .then(data => {
            setMediaTrend(data.results.filter(m => m.media_type !== 'person'));
        });
    }, [time_window])

    return (
        <div className="trending-media">
            {mediaTrend.map(media => {
                if(media.media_type === "movie") {
                    return <MovieCard movie={media} key={`movie-${media.id}`}/>
                }else{
                    return <TvShowCard tv={media} key={`tv-${media.id}`}/>
                }
            })}
        </div>
    )
}