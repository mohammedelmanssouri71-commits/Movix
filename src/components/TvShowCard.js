import moviePicture from '../assets/game.jpg';
import { Link } from 'react-router-dom';
import { addFavorite } from '../slices/favoriteSlice';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

export default function TvShowCard({tv}){
    const JSON_API_URL = process.env.REACT_APP_JSON_API_URL;

    const dispatch = useDispatch();
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
    async function addFav(tv) {
        try {
            const res = await axios.post(`${JSON_API_URL}/favorites`, {userId: 1, type: "tv", typeId: tv.id});
            dispatch(addFavorite({userId: 1, type: "tv", typeId: tv.id}));
        } catch (error) {
            console.log(error);
        }

    }
    return (
        <div className='movie-card' key={tv.id}>
            <Link to={`/tv-details/${tv.id}`}><img src={tv.backdrop_path ? `https://image.tmdb.org/t/p/w500${tv.backdrop_path}.` : `https://image.tmdb.org/t/p/w500${tv.poster_path}.`} alt="cover" loading='lazy'/></Link>
            <div className='movie-details'>
                <h3>{tv.name}</h3>
                <p className='senarist'>{tv.first_air_date}</p>
                <p className='time'>{tv.vote_average.toFixed(2)}/10</p>
                <div>
                    {stars}
                </div>
            </div>
            <button onClick={() => addFav(tv)}><i class="fa-regular fa-heart"></i></button>
        </div>
    )
}