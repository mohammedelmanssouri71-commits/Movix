import moviePicture from '../assets/game.jpg';
import { Link } from 'react-router-dom';
import { addFavorite } from '../slices/favoriteSlice';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { UserContext } from '../contexts/UserContext';
import { useContext } from 'react';
import { show, hide } from '../slices/alertSlice';

export default function TvShowCard({tv}){
    const JSON_API_URL = process.env.REACT_APP_JSON_API_URL;
    const {user, setUser} = useContext(UserContext);
    const dispatch = useDispatch();
    const favorites = useSelector(state => state.favorites.value);
    let review = Number((tv.vote_average / 2).toFixed(2));
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
            if (favorites.find(md => md.media.id === tv.id && md.media_type === "tv" && md.userId === user.id)){
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
    return (
        <div className='movie-card' key={tv.id}>
            <Link to={`/tv-details/${tv.id}`}><img src={tv.backdrop_path ? `https://image.tmdb.org/t/p/original${tv.backdrop_path}.` : `https://image.tmdb.org/t/p/original${tv.poster_path}.`} alt="cover" loading='lazy'/></Link>
            <div className='movie-details'>
                <h3>{tv.name}</h3>
                <p className='senarist'>{tv.first_air_date}</p>
                <div>
                    {stars}
                </div>
            </div>
            <button onClick={() => {
                if(!favAlreadyExist()){
                    dispatch(show({type: "success", message: `You are added ${tv.name} to your favorites!`}));
                    addFav({id: tv.id, poster_path: tv.poster_path, name: tv.name });
                }else{
                    dispatch(show({type: "error", message: `${tv.name} is already a favourite TV Show!`}));
                }
                setTimeout(() => {
                    dispatch(hide());
                },2500)
            }}><i class="fa-regular fa-heart" style={{color: favAlreadyExist()?"red":"white"}}></i></button>
        </div>
    )
}