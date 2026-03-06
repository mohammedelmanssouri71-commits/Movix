import moviePicture from '../assets/game.jpg';
import { Link } from 'react-router-dom';
import { addFavorite } from '../slices/favoriteSlice';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { type } from '@testing-library/user-event/dist/type';
import { UserContext } from '../contexts/UserContext';
import { useContext } from 'react';
import { show, hide } from "../slices/alertSlice";

export default function MovieCard({movie}){
    const JSON_API_URL = process.env.REACT_APP_JSON_API_URL;
    const {user, setUser} = useContext(UserContext);
    const favorites = useSelector(state => state.favorites.value);

    const dispatch = useDispatch();
    let review = Number((movie.vote_average / 2).toFixed(2));
    let stars = [];
    let i = 1;
    let j = 1;
    while (i < review){
        stars.push(<i class="fa-solid fa-star" key={i}></i>);
        i++;
    }
    if (review % 2 !== 0){
        stars.push(<i class="fa-solid fa-star-half-stroke" key={i}></i>);
    }

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
    return (
        <div className='movie-card' key={movie.id}>
            <Link to={`/movie-details/${movie.id}`}><img src={movie.backdrop_path ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}.` : `https://image.tmdb.org/t/p/original${movie.poster_path}.`} alt="cover" loading='lazy'/></Link>
            <div className='movie-details'>
                <h3>{movie.title}</h3>
                <p className='senarist'>{movie.release_date}</p>
                <div>
                    {stars}
                </div>
                <div className='labels'>
                    {/* {labels} */}
                </div>
            </div>
            <button onClick={() => {
                if(!favAlreadyExist()){
                    dispatch(show({type: "success", message: `You are added ${movie.title} to your favorites!`}));
                    addFav({id: movie.id, poster_path: movie.poster_path, title:  movie.title});
                }else{
                    dispatch(show({type: "error", message: `${movie.title} is already a favourite movie!`}));
                }
                setTimeout(() => {
                    dispatch(hide());
                },2500)
            }}><i class="fa-regular fa-heart" style={{color: favAlreadyExist()?"red":"white"}}></i></button>
        </div>
    )
}