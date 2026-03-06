import { useEffect, useState, useContext, useRef } from "react"
import RecDetails from "./RecDetails";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Loader from "./Loader";
import Trending from "./Trending";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";


export default function Dashboard(){
    const API_KEY = process.env.REACT_APP_API_KEY;
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const {user, setUser} = useContext(UserContext);


    const [movies, setMovies] = useState([]);
    const [tvShows, setTvShows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [timeWindow, setTimeWindow] = useState("day");

    const navigate = useNavigate();

    const [preferences, setPreferences] = useState({});

    const swiperRef = useRef(null);

    useEffect(() => {
        if (user === null) {
        navigate("/movies");
        }
    },[user, navigate])

    useEffect(() => {
        if (user){
            setPreferences(user.preferences);
        }
    }, [user])


    useEffect(() => {

        if (user && preferences.tv && preferences.movie) {
            Promise.all([
                fetch(`${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=${preferences.tv.join("|")}&&vote_average.gte=7&sort_by=popularity.desc&primary_release_date.gte=2024-01-01$vote_count.gte=100`)
                .then(res => res.json()),
                fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${preferences.movie.join("|")}&&vote_average.gte=7&sort_by=popularity.desc&primary_release_date.gte=2024-01-01$vote_count.gte=100`)
                .then(res => res.json())
            ])
            .then(([tvShows, movies]) => {
                setMovies(movies.results.slice(0,5));
                setTvShows(tvShows.results.slice(0,5));
            })
            .finally(() => {
                setLoading(false);
            })
            .catch(error => {
                console.error("Erreur API :", error);
            })
        }
    },[user, preferences])
    if (loading) return <Loader/>;
    return (
        <div className="rec-list">
            <Swiper
                modules={[Autoplay, Navigation, Pagination]}
                autoplay={{ delay: 5000 }}
                navigation
                pagination={{ clickable: true }}
                loop
                onSwiper={(swiper) => (swiperRef.current = swiper)}>
                {[...movies,...tvShows].map(m => (
                <SwiperSlide key={m.id}>
                    <RecDetails media={m} type={m.title ? 'movie' : 'tv'} onStop={() => swiperRef.current?.autoplay.stop()} onStart={() => swiperRef.current?.autoplay.start()}/>
                </SwiperSlide>
                ))}
            </Swiper>
            <div className="trending">
                <h2>Trending</h2>
                <div>
                    <button onClick={() => setTimeWindow('day')} className={timeWindow === 'day' ? 'active' : ""}>Today</button>
                    <button onClick={() => setTimeWindow('week')} className={timeWindow === 'week' ? 'active' : ""}>This Week</button>
                </div>
                <div>
                    <Trending time_window={timeWindow}/>
                </div>
            </div>
            <div className="recently-viewed">
                <h2>Recently Viewed</h2>
                <div>

                </div>
            </div>
        </div>
    )
}